import { ALMF_MODULE } from "@/lib/rubrics"
import { teacherData } from "@/lib/mock-data"
import AssessmentForm from "@/components/assessment-form"

// @ts-ignore
export const dynamic = 'force-dynamic'

export default function NewLeadershipEvaluationPage() {
    // Filter for HODs and Management
    const hods = teacherData.filter(t =>
        t.role === 'HOD' ||
        t.designation.includes('Principal') ||
        t.designation.includes('HOD')
    )

    return (
        <AssessmentForm
            teachers={hods as any}
            defaultModule="almf"
            lockModule={true}
            allowCustomCriteria={false}
            showClassDetails={false}
            modules={[ALMF_MODULE]}
        />
    )
}
