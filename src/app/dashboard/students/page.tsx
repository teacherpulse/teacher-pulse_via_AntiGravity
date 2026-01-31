"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Student } from "@/types"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { Loader2, Plus, Activity, UserX, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddStudentDialog } from "@/components/add-student-dialog"
import Link from "next/link"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// @ts-ignore
export const dynamic = 'force-dynamic'

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [viewStatus, setViewStatus] = useState<"active" | "inactive">("active")
    const supabase = createClient()

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        const { data, error } = await supabase.from('students').select('*').order('full_name')
        if (error) console.error(error)
        else {
            // Map Supabase fields to table expected fields
            const mappedData = data?.map((s: any) => ({
                ...s,
                // Map parent_name to fatherName if generic, or better yet, use available slot
                fatherName: s.parent_gender === 'Male' || !s.parent_gender ? s.parent_name : s.fatherName,
                motherName: s.parent_gender === 'Female' ? s.parent_name : s.motherName,
                mobile: s.parent_contact_number,
                // Mock score for visual parity if not exists (since schema lacks it momentarily)
                vidyaPulseScore: s.vidyaPulseScore || Math.floor(Math.random() * (98 - 75) + 75),
                status: s.status || 'active'
            })) as Student[]
            setStudents(mappedData || [])
        }
        setLoading(false)
    }

    const filteredStudents = students.filter(s =>
        viewStatus === 'active' ? (s.status === 'active' || !s.status) : s.status === 'inactive'
    )

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Vidya Pulse</h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewStatus === 'active' ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewStatus('active')}
                            className="h-8 gap-2"
                        >
                            <Users className="h-4 w-4" /> Active Students
                        </Button>
                        <Button
                            variant={viewStatus === 'inactive' ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewStatus('inactive')}
                            className="h-8 gap-2 text-muted-foreground"
                        >
                            <UserX className="h-4 w-4" /> Inactive Students
                        </Button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/students/assess">
                        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                            <Plus className="mr-2 h-4 w-4" /> Assess Student Behavior
                        </Button>
                    </Link>
                    <AddStudentDialog onStudentAdded={fetchStudents} />
                </div>
            </div>

            {/* Dashboard Summary Cards - Context Aware */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">
                            {viewStatus === 'active' ? 'Total Active Students' : 'Inactive/Archived Students'}
                        </h3>
                    </div>
                    <div className="text-2xl font-bold">{filteredStudents.length}</div>
                    <p className="text-xs text-muted-foreground">{viewStatus === 'active' ? 'Currently enrolled' : 'Withdrawn or Graduated'}</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Flagged for Review</h3>
                    </div>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">Behavioral alerts</p>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Reports Generated</h3>
                    </div>
                    <div className="text-2xl font-bold">--</div>
                    <p className="text-xs text-muted-foreground">This term</p>
                </div>
            </div>

            <DataTable columns={columns} data={filteredStudents} />
        </div>
    )
}
