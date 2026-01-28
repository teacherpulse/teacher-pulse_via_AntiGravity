import { createClient } from "@/lib/supabase/server" // Server client
import { redirect } from "next/navigation"
import { StudentEvaluationForm } from "@/components/student-evaluation-form"

// This is a Server Component
export const dynamic = 'force-dynamic'

export default async function NewStudentEvaluationPage({
    searchParams,
}: {
    searchParams: { studentId?: string; type?: string }
}) {
    const supabase = createClient()

    // 1. Check Auth
    // @ts-ignore
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    if (!user) {
        redirect('/')
    }

    // 2. Validate Params
    if (!searchParams.studentId) {
        redirect('/dashboard/students')
    }

    // 3. Fetch Student
    const { data: student, error } = await supabase
        // @ts-ignore
        .from('students')
        .select('*')
        .eq('id', searchParams.studentId)
        .single()

    if (error || !student) {
        return <div>Error loading student.</div>
    }

    // 4. Render Form
    return (
        <div className="max-w-3xl mx-auto py-6">
            <StudentEvaluationForm
                student={student}
                evaluatorId={user.id}
                ageGroup={student.age_group}
                evaluationType={(searchParams.type as 'vidya_pulse' | 'parent_pulse') || 'vidya_pulse'}
            />
        </div>
    )
}
