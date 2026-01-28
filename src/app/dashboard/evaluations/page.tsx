import { DataTable } from "@/components/data-table"
import { columns } from "../staff/columns" // Re-use staff columns for now
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

async function getData() {
    // Mock Data
    return [
        {
            id: "728ed52f",
            full_name: "Alice Johnson",
            email: "alice@nalanda.edu",
            role: "teacher",
            department: "Mathematics",
            joining_date: "2023-01-15",
            avatar_url: ""
        } as any, // Cast to any to avoid strict type mismatch with partial profile
        {
            id: "489e1d42",
            full_name: "Bob Smith",
            email: "bob@nalanda.edu",
            role: "teacher",
            department: "Pre-Primary",
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
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-heading">Evaluations</h1>
                <p className="text-muted-foreground">Select a teacher to start a new evaluation module.</p>
            </div>

            {/* In a real app, clicking a row here would go to Teacher Detail -> Start Eval */}
            {/* For this MVP, let's just show a clear "Start Evaluation" button or link */}

            <Card>
                <CardHeader>
                    <CardTitle>Teachers Pending Evaluation</CardTitle>
                    <CardDescription>Term 1 2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    )
}
