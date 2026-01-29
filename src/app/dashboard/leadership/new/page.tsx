import AssessmentForm from "@/components/assessment-form"
import { createClient } from "@/lib/supabase/server"

// @ts-ignore
export const dynamic = 'force-dynamic'

export default async function NewLeadershipEvaluationPage() {
    const supabase = await createClient()

    // Fetch HODs (and Teachers who might be HODs)
    // We should ideally filter by role='hod' but if that migration isn't run yet, 
    // we can fallback to fetching all or filtering by department if needed.
    // For now, let's fetch 'hod' role. If no 'hod' role exists yet, this might return empty,
    // so user must run the SQL script.

    // As a fallback for the MVP without running SQL immediately, let's fetch 'teacher' and 'hod'
    // but ideally we only want HODs.
    // Let's assume the user runs the script.

    const { data: hods, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['hod', 'teacher']) // Keeping 'teacher' for now to ensure list isn't empty during testing before migration
        .order('full_name')

    if (error) {
        console.error("Error fetching HODs:", error)
        return <div>Error loading profiles.</div>
    }

    return (
        <AssessmentForm teachers={hods || []} defaultModule="almf" lockModule={true} allowCustomCriteria={false} showClassDetails={false} />
    )
}
