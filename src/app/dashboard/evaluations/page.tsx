import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "../teachers/columns" // Re-use teacher columns for now
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

async function getData() {
    // Mock Data reflecting the new structure
    return [
        {
            id: "1",
            full_name: "L SHASHIKALA",
            email: "shashikala@teacherpulse.in",
            role: "Teacher",
            department: "High School (Grade 6 to 10)",
            joining_date: "2023-01-15",
            avatar_url: ""
        } as any,
        {
            id: "11",
            full_name: "DONTHULA PAVITHRA",
            email: "dpavithra@teacherpulse.in",
            role: "HOD",
            department: "Primary (Grade 3 to 5)",
            joining_date: "2022-06-10",
            avatar_url: ""
        } as any,
    ]
}

// @ts-ignore
export const dynamic = 'force-dynamic'

export default async function EvaluationsPage() {
    const data = await getData()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading">Teacher Pulse</h1>
                    <p className="text-muted-foreground">Manage ongoing teacher evaluations and performance reviews.</p>
                </div>
                <Link href="/dashboard/evaluations/new">
                    <Button><Plus className="mr-2 h-4 w-4" /> Create Assessment</Button>
                </Link>
            </div>

            {/* Dashboard Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Evaluations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">For current term</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">Action required</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">School-wide average</p>
                    </CardContent>
                </Card>
            </div>

            {/* List Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Evaluations</CardTitle>
                    <CardDescription>Teachers pending or recently evaluated</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    )
}
