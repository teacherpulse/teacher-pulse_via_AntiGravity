"use client"

import { useState } from "react"
import { Profile } from "@/types"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { teacherData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Users, UserX, Plus } from "lucide-react"

export default function TeacherPage() {
    // Mocking status since static data usually doesn't have it, assume all active unless we add logic
    // We can simulate some inactive users if we wanted, or just show empty list
    const [viewStatus, setViewStatus] = useState<"active" | "inactive">("active")

    // Filter logic: In a real app this would check t.status
    // For now, we just pass all to active and empty to inactive to demonstrate UI
    const filteredData = teacherData.filter((t: any) =>
        viewStatus === 'active' ? (t.status !== 'inactive') : (t.status === 'inactive')
    )

    return (
        <div className="container mx-auto py-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading mb-2 tracking-tight">Teacher Directory</h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewStatus === 'active' ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewStatus('active')}
                            className="h-8 gap-2"
                        >
                            <Users className="h-4 w-4" /> Active Teachers
                        </Button>
                        <Button
                            variant={viewStatus === 'inactive' ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewStatus('inactive')}
                            className="h-8 gap-2 text-muted-foreground"
                        >
                            <UserX className="h-4 w-4" /> Inactive Teachers
                        </Button>
                    </div>
                </div>
                <div>
                    {/* Placeholder for Add Teacher if needed */}
                </div>
            </div>

            <DataTable columns={columns} data={filteredData} />
        </div>
    )
}
