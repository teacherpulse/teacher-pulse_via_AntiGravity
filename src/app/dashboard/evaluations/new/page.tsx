import AssessmentForm from "@/components/assessment-form"
import { teacherData } from "@/lib/mock-data"

// @ts-ignore
export const dynamic = 'force-dynamic'

export default function NewEvaluationPage() {
    return (
        <AssessmentForm teachers={teacherData as any} allowCustomCriteria={false} />
    )
}
