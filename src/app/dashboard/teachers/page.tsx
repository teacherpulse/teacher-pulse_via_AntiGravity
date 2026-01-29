import { Profile } from "@/types"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"

import { teacherData } from "@/lib/mock-data"

async function getData(): Promise<Profile[]> {
    return teacherData as any
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
