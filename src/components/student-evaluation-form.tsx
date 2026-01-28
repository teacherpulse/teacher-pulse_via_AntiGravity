"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { EvaluationSlider } from "@/components/evaluation-slider"
import { CRITERIA, Criterion } from "@/lib/constants/criteria"
import { getActionPlan, getParentZone } from "@/lib/constants/guidance"
import { Student } from "@/types"

const formSchema = z.object({
    term: z.string().min(1, "Term is required"),
    scores: z.record(z.string(), z.number().min(1).max(5)),
    feedback: z.string().optional(),
})

interface StudentEvaluationFormProps {
    student: Student
    evaluatorId: string
    ageGroup: string
    evaluationType?: 'vidya_pulse' | 'parent_pulse'
}

export function StudentEvaluationForm({ student, evaluatorId, ageGroup, evaluationType = 'vidya_pulse' }: StudentEvaluationFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const supabase = createClient()

    // Helper to determine variant based on type and student details
    const getVariantKey = () => {
        if (evaluationType === 'vidya_pulse') {
            return ageGroup // 'age_3_6', 'age_6_10', 'age_11_16'
        }

        // Parent Pulse - 5 Variants based on Grade/Age
        // We use grade_level if available, roughly mapped
        const grade = student.grade_level?.toLowerCase() || ''

        if (['nursery', 'lkg', 'ukg', 'pre-primary'].some(g => grade.includes(g)) || ageGroup === 'age_3_6') {
            return 'pp'
        }
        if (['grade 1', 'grade 2', 'class 1', 'class 2'].some(g => grade === g || grade.includes(g))) {
            return 'foundational'
        }
        if (['grade 3', 'grade 4', 'grade 5'].some(g => grade === g || grade.includes(g))) {
            return 'primary'
        }
        if (['grade 6', 'grade 7', 'grade 8'].some(g => grade === g || grade.includes(g))) {
            return 'upper_primary'
        }
        if (['grade 9', 'grade 10', 'grade 11', 'grade 12'].some(g => grade === g || grade.includes(g)) || ageGroup === 'age_11_16') {
            return 'high_school'
        }

        // Fallback based on coarse age group
        if (ageGroup === 'age_6_10') return 'primary' // Default to Primary for 6-10
        if (ageGroup === 'age_11_16') return 'high_school' // Default to HS for 11-16

        return 'pp'
    }

    const variantKey = getVariantKey()
    const moduleKey = evaluationType === 'vidya_pulse' ? 'module_vidya_pulse' : 'module_parent_pulse'
    const moduleData = CRITERIA[moduleKey]
    const criteriaList = moduleData.variants?.[variantKey] || []

    // Debug if no criteria found
    if (criteriaList.length === 0) {
        return <div>Error: No rubric found for age group {ageGroup}. Please check system configuration.</div>
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            term: "Term 1",
            scores: {},
            feedback: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            // 1. Calculate Scores
            const scores = values.scores
            const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
            const maxPossible = criteriaList.length * 5
            const percentage = (totalScore / maxPossible) * 100
            // Normalize to 5-point scale
            const overallScore = (percentage / 100) * 5

            // 2. Generate Action Plan
            // 2. Generate Action Plan / Report Data
            const actionPlan: Record<string, any> = {}

            if (evaluationType === 'parent_pulse') {
                // For Parent Pulse, we store the Zone info
                const zone = getParentZone(totalScore)
                actionPlan['zone'] = zone
                // We can also store per-question findings if needed, but the Zone is key.
            } else {
                // Vidya Pulse
                Object.entries(scores).forEach(([criteriaId, score]) => {
                    actionPlan[criteriaId] = getActionPlan(criteriaId, score)
                })
            }

            // 3. Insert into student_evaluations
            const { data: evalData, error: evalError } = await supabase
                .from('student_evaluations')
                .insert({
                    student_id: student.id,
                    evaluator_id: evaluatorId,
                    term: values.term,
                    status: 'published', // Auto-publish for now
                    overall_score: overallScore,
                    action_plan: actionPlan,
                    evaluation_type: evaluationType
                })
                .select()
                .single()

            if (evalError) throw evalError

            // 4. Insert into specific module table
            if (evaluationType === 'vidya_pulse') {
                const { error: moduleError } = await supabase
                    .from('module_vidya_pulse')
                    .insert({
                        evaluation_id: evalData.id,
                        criteria_scores: scores,
                        feedback: values.feedback,
                        module_score: overallScore
                    })
                if (moduleError) throw moduleError
            } else {
                const { error: moduleError } = await supabase
                    .from('module_parent_pulse')
                    .insert({
                        evaluation_id: evalData.id,
                        criteria_scores: scores,
                        feedback: values.feedback,
                        module_score: overallScore
                    })
                if (moduleError) throw moduleError
            }

            toast.success(evaluationType === 'parent_pulse' ? "Parent Assessment Saved" : "Diagnostic Completed", {
                description: "Evaluation has been saved successfully."
            })

            // Redirect to plan view
            router.push(`/dashboard/students/${evalData.id}/plan`)

        } catch (error) {
            console.error(error)
            toast.error("Error", {
                description: "Failed to save evaluation."
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{evaluationType === 'parent_pulse' ? 'Parent Pulse Assessment' : 'Vidya Pulse Diagnostic'}: {student.full_name}</CardTitle>
                        <CardDescription>
                            Level: {variantKey.toUpperCase().replace('_', ' ')} | Class: {student.grade_level}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="term"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Evaluation Term</FormLabel>
                                    <FormControl>
                                        <select
                                            {...field}
                                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                        >
                                            <option value="Term 1">Term 1</option>
                                            <option value="Term 2">Term 2</option>
                                            <option value="Term 3">Term 3</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-6">
                            {criteriaList.map((criterion) => (
                                <EvaluationSlider
                                    key={criterion.id}
                                    name={`scores.${criterion.id}`}
                                    label={criterion.label}
                                    description={criterion.description}
                                    max={criterion.max_score}
                                />
                            ))}
                        </div>

                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Observations</FormLabel>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter any specific observations or behavioral notes..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Generating Action Plan..." : "Complete Diagnosis"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
