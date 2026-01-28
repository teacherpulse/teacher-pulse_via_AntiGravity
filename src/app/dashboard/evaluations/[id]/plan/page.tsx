import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CRITERIA } from "@/lib/constants/criteria"

async function getEvaluation(id: string) {
    const supabase = createClient()
    const { data: evaluation } = await supabase
        // @ts-ignore
        .from('evaluations')
        .select('*, teacher:teacher_id(full_name, department)')
        .eq('id', id)
        .single()

    return evaluation
}

export const dynamic = 'force-dynamic'

export default async function ActionPlanPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const evaluation = await getEvaluation(id)

    if (!evaluation) return notFound()

    // Parse action plan
    // JSONB comes back as object
    const plan = evaluation.action_plan as Record<string, string>

    // Need to map criteria IDs back to labels.
    // We don't strictly know WHICH module was just evaluated in the header, 
    // but we can search all criteria or pass it.
    // For MVP, let's just search the big CRITERIA object.
    const getCriteriaLabel = (cid: string) => {
        for (const modKey in CRITERIA) {
            const mod = CRITERIA[modKey]
            // check variants
            if (mod.variants) {
                for (const vKey in mod.variants) {
                    const found = mod.variants[vKey].find((c) => c.id === cid)
                    if (found) return found.label
                }
            }
            // check common
            if (mod.common) {
                const found = mod.common.find((c) => c.id === cid)
                if (found) return found.label
            }
        }
        return cid
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Action Plan</h1>
                    <p className="text-muted-foreground">Generated for {evaluation.teacher.full_name}</p>
                </div>
                <Link href="/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </div>

            <Card className="border-l-4 border-l-primary">
                <CardHeader>
                    <CardTitle>Personalized Growth Roadmap</CardTitle>
                    <CardDescription>Based on the evaluation conducted on {evaluation.evaluation_date}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Object.keys(plan).length === 0 ? (
                            <p className="text-muted-foreground">No specific action items generated. Maintain current excellence!</p>
                        ) : (
                            <ul className="grid gap-4">
                                {Object.entries(plan).map(([cid, action]) => (
                                    <li key={cid} className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-sm mb-1 text-primary">{getCriteriaLabel(cid)}</h4>
                                        <p className="text-sm">{action}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Print Plan</Button>
            </div>
        </div>
    )
}
