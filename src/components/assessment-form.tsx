'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ASSESSMENT_PERIODS, MODULES, RubricScore } from "@/lib/rubrics"
import { Profile } from "@/types"
import { useState } from "react"
import { CheckCircle2, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface AssessmentFormProps {
    teachers: Profile[]
}

export default function AssessmentForm({ teachers }: AssessmentFormProps) {
    const router = useRouter()

    // Form State
    const [selectedTeacherId, setSelectedTeacherId] = useState<string>("")
    const [selectedModuleId, setSelectedModuleId] = useState<string>("")
    const [selectedPeriod, setSelectedPeriod] = useState<string>("")
    const [section, setSection] = useState<string>("")
    const [notes, setNotes] = useState<string>("")
    const [scores, setScores] = useState<Record<string, number>>({})

    const selectedModule = MODULES.find(m => m.id === selectedModuleId)

    // Derived State
    const totalCriteria = selectedModule?.criteria.length || 0
    const answeredCriteria = Object.keys(scores).length
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
    const maxScore = totalCriteria * 5
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0

    const handleScoreSelect = (criteriaId: string, value: number) => {
        setScores(prev => ({
            ...prev,
            [criteriaId]: value
        }))
    }

    const handleSubmit = async () => {
        if (!selectedTeacherId || !selectedModuleId || !selectedPeriod) {
            toast.error("Missing Details", { description: "Please fill in all required fields." })
            return
        }
        if (answeredCriteria < totalCriteria) {
            toast.error("Incomplete Assessment", { description: "Please score all criteria before submitting." })
            return
        }

        // Mock Submission
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                loading: 'Submitting assessment...',
                success: () => {
                    router.push('/dashboard/evaluations')
                    return 'Assessment submitted successfully'
                },
                error: 'Failed to submit'
            }
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Assessment</h1>
                    <p className="text-muted-foreground">Evaluate teacher performance across criteria</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Form Details & Rubrics */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <h2 className="text-lg font-semibold">Assessment Details</h2>

                            <div className="space-y-2">
                                <Label>Select Teacher *</Label>
                                <Select onValueChange={setSelectedTeacherId} value={selectedTeacherId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a teacher" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teachers.map(t => (
                                            <SelectItem key={t.id} value={t.id}>{t.full_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Module *</Label>
                                    <Select onValueChange={setSelectedModuleId} value={selectedModuleId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a module" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {MODULES.map(m => (
                                                <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Section *</Label>
                                    <Select onValueChange={setSection} value={section}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select section" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="scholars">Scholars</SelectItem>
                                            <SelectItem value="leaders">Leaders</SelectItem>
                                            <SelectItem value="champions">Champions</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Assessment Period</Label>
                                <Select onValueChange={setSelectedPeriod} value={selectedPeriod}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ASSESSMENT_PERIODS.map(p => (
                                            <SelectItem key={p} value={p}>{p}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Notes (Optional)</Label>
                                <Textarea
                                    placeholder="Add any additional observations or comments"
                                    className="min-h-[100px]"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rubrics Section - Only shows when Module is selected */}
                    {selectedModule && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Evaluation Criteria ({selectedModule.criteria.length})</h2>
                                <p className="text-sm text-muted-foreground">Rate each criterion on a scale of 1-5</p>
                            </div>

                            {selectedModule.criteria.map((criterion, index) => (
                                <Card key={criterion.id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-lg mb-4 text-primary">{index + 1}. {criterion.title}</h3>
                                        <div className="space-y-3">
                                            {criterion.scores.map((score) => {
                                                const isSelected = scores[criterion.id] === score.value
                                                return (
                                                    <div
                                                        key={score.value}
                                                        onClick={() => handleScoreSelect(criterion.id, score.value)}
                                                        className={cn(
                                                            "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:border-primary/50",
                                                            isSelected ? `border-2 ${score.colorClass} shadow-sm` : "bg-card hover:bg-muted/50"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "flex items-center justify-center size-5 rounded-full border",
                                                            isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                                                        )}>
                                                            {isSelected && <CheckCircle2 className="size-3" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={cn("font-medium mr-2", isSelected ? "text-foreground" : "text-muted-foreground")}>
                                                                {score.label}:
                                                            </span>
                                                            <span className="text-sm">
                                                                {score.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Sticky Summary */}
                <div className="space-y-6">
                    <Card className="sticky top-6">
                        <CardContent className="p-6 space-y-6">
                            <h2 className="text-lg font-semibold">Assessment Summary</h2>

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Total Criteria</div>
                                <div className="text-2xl font-bold">{totalCriteria}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Total Score</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-primary">{totalScore}</span>
                                    <span className="text-muted-foreground">/{maxScore}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Percentage</div>
                                <div className="text-2xl font-bold">{percentage}%</div>
                            </div>

                            <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!selectedModuleId}>
                                Submit Assessment
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
