"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Printer, CheckCircle, AlertTriangle } from "lucide-react"
import { CRITERIA } from "@/lib/constants/criteria"
import { useRouter } from "next/navigation"

export default function StudentPlanPage({ params }: { params: { id: string } }) {
    const [evaluation, setEvaluation] = useState<any>(null)
    const [student, setStudent] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Evaluation
            const { data: evalData, error: evalError } = await supabase
                .from('student_evaluations')
                .select('*')
                .eq('id', params.id)
                .single()

            if (evalError) return

            // Fetch Student
            const { data: studentData, error: studentError } = await supabase
                .from('students')
                .select('*')
                .eq('id', evalData.student_id)
                .single()

            if (studentError) return

            setEvaluation(evalData)
            setStudent(studentData)
            setLoading(false)
        }
        fetchData()
    }, [params.id])

    if (loading) return <div className="flex bg-muted/20 min-h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

    // Parse Action Plan
    const actionPlan = evaluation.action_plan || {}
    const entries = Object.entries(actionPlan)

    // Helper to find label
    const getLabel = (id: string) => {
        // Search through all vidya variants
        const variants = CRITERIA.module_vidya_pulse.variants
        if (!variants) return id

        for (const ageGroup of Object.values(variants)) {
            const found = ageGroup.find(c => c.id === id)
            if (found) return found.label
        }
        return id
    }

    const isParentPulse = evaluation?.evaluation_type === 'parent_pulse'
    const zone = isParentPulse ? actionPlan.zone : null

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 print:p-0">
            <div className="flex justify-between items-center mb-8 print:hidden">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{isParentPulse ? 'Parent Engagement Report' : 'Diagnostic Report & Action Plan'}</h1>
                    <p className="text-muted-foreground">Generated automatically via {isParentPulse ? 'Parent Pulse' : 'Vidya Pulse'}</p>
                </div>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => router.push('/dashboard/students')}>Back to Directory</Button>
                    <Button onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print Plan</Button>
                </div>
            </div>

            <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <CardTitle className="text-2xl">{student?.full_name}</CardTitle>
                            <CardDescription className="text-lg">{student?.grade_level} - {student?.section}</CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Evaluation Date</div>
                            <div className="font-semibold">{new Date(evaluation.evaluation_date).toLocaleDateString()}</div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="space-y-6">
                <div className="space-y-6">
                    {isParentPulse ? (
                        <div className="space-y-8">
                            <div className={`p-8 rounded-xl border-4 text-center space-y-4 ${zone?.bg || 'bg-gray-100'} ${zone?.color?.replace('text-', 'border-') || 'border-gray-200'}`}>
                                <h2 className={`text-4xl font-extrabold ${zone?.color}`}>{zone?.label || 'Assessment Complete'}</h2>
                                <p className="text-2xl font-medium text-foreground/80">{zone?.description}</p>
                                <div className="text-sm text-muted-foreground mt-4">Based on comprehensive parent interaction evaluation</div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold border-b pb-2">Targeted Response Map</h2>
                            <div className="grid gap-6">
                                {entries.map(([id, action]) => {
                                    const label = getLabel(id)
                                    const actionText = action as string
                                    const isIntervention = actionText.includes("Action: Don't") || actionText.includes("Action: Stop") || actionText.includes("Intervention")

                                    return (
                                        <Card key={id} className={`overflow-hidden transition-all hover:shadow-md ${isIntervention ? 'border-l-4 border-l-orange-500' : 'border-l-4 border-l-green-500'}`}>
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className={`mt-1 h-8 w-8 flex items-center justify-center rounded-full ${isIntervention ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                                        {isIntervention ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="font-semibold leading-none tracking-tight">{label}</h3>
                                                        <p className="text-lg text-muted-foreground pt-2 font-medium">
                                                            {actionText}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-12 text-center text-sm text-muted-foreground print:visible hidden print:block">
                    <p>Vidya Pulse - Unified Student Diagnostic System</p>
                    <p>Nalanda High School</p>
                </div>
            </div>
            )
}
