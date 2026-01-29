import AssessmentForm from "@/components/assessment-form"
import { createClient } from "@/lib/supabase/server"

// @ts-ignore
export const dynamic = 'force-dynamic'

export default async function NewEvaluationPage() {
    const supabase = await createClient()

    // Fetch only teachers
    const { data: teachers, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher')
        .order('full_name')

    if (error) {
        console.error("Error fetching teachers:", error)
        return <div>Error loading teachers. Please try again later.</div>
    }

    return (
        <AssessmentForm teachers={teachers || []} />
    )
}
