import EvaluationForm from "@/components/evaluation-form"
import ModuleSelector from "@/components/module-selector"
import { Profile } from "@/types"

// Mock fetcher
async function getTeacher(id: string): Promise<Profile | null> {
    if (id === '728ed52f') return { id: '728ed52f', full_name: 'Alice Johnson (Math)', role: 'teacher', email: 'alice@nalanda.edu', department: 'Mathematics', joining_date: '2023' }
    if (id === '489e1d42') return { id: '489e1d42', full_name: 'Bob Smith (Nursery)', role: 'teacher', email: 'bob@nalanda.edu', department: 'Pre-Primary', joining_date: '2022' }
    return null
}

export default async function NewEvaluationPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const teacherId = params.teacherId as string
    const moduleId = params.module as string

    if (!teacherId) return <div>Please select a teacher first.</div>

    const teacher = await getTeacher(teacherId)
    if (!teacher) return <div>Teacher not found</div>

    // 1. If Module Selected -> Show Form
    if (moduleId) {
        return (
            <EvaluationForm
                moduleId={moduleId}
                teacher={teacher}
                evaluatorId="admin-1" // Mock ID
            />
        )
    }

    // 2. Else -> Show Module Selector
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Select Module</h1>
                <p className="text-muted-foreground">Evaluating: <span className="font-semibold text-primary">{teacher.full_name}</span></p>
            </div>
            <ModuleSelector teacher={teacher} />
        </div>
    )
}
