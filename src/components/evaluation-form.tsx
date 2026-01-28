"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { EvaluationSlider } from "@/components/evaluation-slider"
import { CRITERIA, ModuleCriteria } from "@/lib/constants/criteria"
import { createClient } from "@/lib/supabase/client"
import * as React from "react"
import { Profile } from "@/types"

const formSchema = z.object({
    criteria_scores: z.record(z.string(), z.array(z.number())), // Slider returns array
    feedback: z.string().optional(),
})

interface EvaluationProps {
    moduleId: string
    teacher: Profile
    evaluatorId: string
}

export default function EvaluationForm({ moduleId, teacher, evaluatorId }: EvaluationProps) {
    const router = useRouter()
    const supabase = createClient()
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    // 1. Determine which criteria set to use based on Teacher Grade/Dept
    // Logic: Map department/role to 'pre_primary', 'grade_1_2', etc.
    // For now, simple mapping logic (enhance later with real data from profile)
    const getVariant = (dept: string) => {
        const d = dept.toLowerCase()
        if (d.includes('pre') || d.includes('nursery')) return 'pre_primary'
        // Mock logic for demo -> defaulting to grade_1_2 if 'primary'
        if (d.includes('primary')) return 'grade_1_2'
        return 'grade_3_10' // Default fallback
    }

    const variantKey = getVariant(teacher.department || '')

    const moduleData = CRITERIA[moduleId as keyof typeof CRITERIA]
    if (!moduleData) return <div>Invalid Module</div>

    // Merge common and variant criteria
    const variantCriteria = moduleData.variants ? (moduleData.variants[variantKey] || []) : []
    const commonCriteria = moduleData.common || []
    const questions = [...variantCriteria, ...commonCriteria]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            criteria_scores: {},
            feedback: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            // 1. Create main evaluation record if not exists (or we create one per module session?)
            // The Plan says: One Evaluation ID -> Many Modules.
            // For simplicity in this demo flow: Create a NEW Evaluation + Module Record together.

            // A. Insert Evaluation Header
            const { data: evalData, error: evalError } = await supabase
                .from('evaluations')
                .insert({
                    teacher_id: teacher.id,
                    evaluator_id: evaluatorId,
                    term: "Term 1 2025", // Hardcoded for demo
                    status: 'draft',
                    overall_score: 0 // Calculate later
                })
                .select()
                .single()

            if (evalError) throw evalError

            // B. Calculate Module Score
            let totalScore = 0
            let maxTotal = 0

            // Convert array values from slider to single numbers
            const cleanedScores: Record<string, number> = {}
            Object.entries(values.criteria_scores).forEach(([key, val]) => {
                const score = val[0]
                cleanedScores[key] = score
                totalScore += score
                // Find max for this q
                const q = questions.find(q => q.id === key)
                if (q) maxTotal += q.max_score
            })

            // Avoid division by zero
            const actualScore = maxTotal > 0 ? (totalScore / maxTotal) * 100 : 0 // Percentage? Or 5-scale?
            // Let's store average on 5 scale
            const avgScore5 = maxTotal > 0 ? (totalScore / questions.length) : 0

            // C. Insert Module Record
            const { error: modError } = await supabase
                .from(moduleId)
                .insert({
                    evaluation_id: evalData.id,
                    criteria_scores: cleanedScores,
                    feedback: values.feedback,
                    module_score: avgScore5
                })

            if (modError) throw modError

            toast.success("Evaluation Saved!")
            router.push('/dashboard')

        } catch (error) {
            console.error(error)
            toast.error("Failed to save evaluation")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center space-x-4 mb-8">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">EVALUATING: {teacher.full_name}</h2>
                    <p className="text-muted-foreground">Module: {moduleId.replace(/_/g, ' ').toUpperCase()}</p>
                    <p className="text-sm text-blue-500 font-medium">Variant: {variantKey.replace(/_/g, '-').toUpperCase()}</p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Criteria</CardTitle>
                            <CardDescription>Rate the teacher on the following parameters (0-{questions[0]?.max_score || 5})</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {questions.map((q) => (
                                <EvaluationSlider
                                    key={q.id}
                                    name={`criteria_scores.${q.id}`}
                                    label={q.label}
                                    description={q.description}
                                    max={q.max_score}
                                />
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Qualitative Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Observations & Recommendations</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter specific feedback here..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Submit Evaluation"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
