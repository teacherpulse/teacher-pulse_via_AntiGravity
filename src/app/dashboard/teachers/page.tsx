import { Profile } from "@/types"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"

async function getData(): Promise<Profile[]> {
    // Fetch data from API or Database here.
    // Using Mock Data for now
    return [
        {
            id: "728ed52f",
            full_name: "Alice Johnson",
            email: "alice@nalanda.edu",
            role: "teacher",
            department: "Mathematics",
            joining_date: "2023-01-15",
        },
        {
            id: "489e1d42",
            full_name: "Bob Smith",
            email: "bob@nalanda.edu",
            role: "teacher",
            department: "Science",
            joining_date: "2022-06-10",
        },
        {
            id: "5a2f3c1b",
            full_name: "Charlie Brown",
            email: "charlie@nalanda.edu",
            role: "teacher",
            department: "English",
            joining_date: "2024-03-01",
        },
        {
            id: "admin-1",
            full_name: "Principal Rao",
            email: "admin@nalanda.edu",
            role: "admin",
            department: "Management",
            joining_date: "2020-01-01",
        },
    ]
}

// @ts-ignore
export const dynamic = 'force-dynamic'

export default async function TeacherPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold font-heading mb-6 tracking-tight">Teacher Directory</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
