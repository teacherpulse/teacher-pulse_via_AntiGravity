"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Student } from "@/types"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [newStudent, setNewStudent] = useState({
        full_name: '',
        admission_number: '',
        grade_level: '',
        section: '',
        age_group: '6-10', // Default
        parent_name: ''
    })
    const supabase = createClient()

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        const { data, error } = await supabase.from('students').select('*').order('full_name')
        if (error) console.error(error)
        else setStudents(data || [])
        setLoading(false)
    }

    const handleCreate = async () => {
        if (!newStudent.full_name || !newStudent.grade_level) return

        const { error } = await supabase.from('students').insert([newStudent])
        if (error) {
            toast.error("Failed to create student")
        } else {
            toast.success("Student added successfully")
            setOpen(false)
            fetchStudents()
            setNewStudent({
                full_name: '',
                admission_number: '',
                grade_level: '',
                section: '',
                age_group: '6-10',
                parent_name: ''
            })
        }
    }

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vidya Pulse Directory</h1>
                    <p className="text-muted-foreground">Manage students and track behavioral diagnostics.</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Student</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Student</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={newStudent.full_name} onChange={(e) => setNewStudent({ ...newStudent, full_name: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="adm" className="text-right">Admin No</Label>
                                <Input id="adm" value={newStudent.admission_number} onChange={(e) => setNewStudent({ ...newStudent, admission_number: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="grade" className="text-right">Grade</Label>
                                <Input id="grade" value={newStudent.grade_level} onChange={(e) => setNewStudent({ ...newStudent, grade_level: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="sec" className="text-right">Section</Label>
                                <Input id="sec" value={newStudent.section} onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="age" className="text-right">Age Group</Label>
                                <Select value={newStudent.age_group} onValueChange={(v) => setNewStudent({ ...newStudent, age_group: v })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Age Group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="age_3_6">3-6 Years (Foundational)</SelectItem>
                                        <SelectItem value="age_6_10">6-10 Years (Formative)</SelectItem>
                                        <SelectItem value="age_11_16">11-16 Years (Adolescence)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="parent" className="text-right">Parent Name</Label>
                                <Input id="parent" value={newStudent.parent_name} onChange={(e) => setNewStudent({ ...newStudent, parent_name: e.target.value })} className="col-span-3" />
                            </div>
                        </div>
                        <Button onClick={handleCreate}>Save Student</Button>
                    </DialogContent>
                </Dialog>
            </div>

            <DataTable columns={columns} data={students} />
        </div>
    )
}
