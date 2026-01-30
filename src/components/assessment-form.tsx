'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ASSESSMENT_PERIODS, LEADERSHIP_PERIODS, MODULES, RubricScore, RubricCriterion, commonScores, ModuleDefinition } from "@/lib/rubrics"
import { Profile } from "@/types"
import { useState } from "react"
import { CheckCircle2, ChevronLeft, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { ALMF_ACTION_PLANS, HOD_AUDIT_LOG_REQUIREMENTS } from "@/lib/leadership-guidance"
import { AlertCircle, Target, Users2, ShieldCheck, FileText, CheckCircle, Info } from "lucide-react"

interface AssessmentFormProps {
    teachers: Profile[]
    defaultModule?: string
    lockModule?: boolean
    allowCustomCriteria?: boolean
    showClassDetails?: boolean
    modules?: ModuleDefinition[]
}

export default function AssessmentForm({ teachers, defaultModule, lockModule = false, allowCustomCriteria = true, showClassDetails = true, modules = MODULES }: AssessmentFormProps) {
    const router = useRouter()

    // Form State
    const [selectedTeacherId, setSelectedTeacherId] = useState<string>("")
    const [selectedModuleId, setSelectedModuleId] = useState<string>(defaultModule || "")
    const [selectedPeriod, setSelectedPeriod] = useState<string>("")
    const [classLevel, setClassLevel] = useState<string>("")
    const [section, setSection] = useState<string>("")
    const [notes, setNotes] = useState<string>("")
    const [scores, setScores] = useState<Record<string, number>>({})
    const [customCriteria, setCustomCriteria] = useState<RubricCriterion[]>([])
    const [isAddingCriterion, setIsAddingCriterion] = useState(false)
    const [newCriterionTitle, setNewCriterionTitle] = useState("")

    // ALMF Specific State
    const [auditErrorCatch, setAuditErrorCatch] = useState("")
    const [auditObservation, setAuditObservation] = useState("")
    const [auditData, setAuditData] = useState("")

    const selectedModule = modules.find(m => m.id === selectedModuleId)

    // Combine static and custom criteria
    const allCriteria = selectedModule ? [...selectedModule.criteria, ...customCriteria] : []

    // Derived State
    const totalCriteria = allCriteria.length
    const answeredCriteria = Object.keys(scores).length
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
    const maxScore = totalCriteria * 5
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
    const averageScore = totalCriteria > 0 ? totalScore / totalCriteria : 0

    const selectedTeacher = teachers.find(t => t.id === selectedTeacherId)

    const getClassOptions = () => {
        if (!selectedTeacherId || !selectedTeacher) return []

        const dept = selectedTeacher.department
        if (dept === "Pre Primary") return ["Nursery", "LKG", "UKG"]
        if (dept === "Foundational Primary") return ["Nursery", "LKG", "UKG", "Grade 1", "Grade 2"]
        if (dept === "Grade 1 & 2") return ["Grade 1", "Grade 2"]
        if (dept === "Primary (Grade 3 to 5)") return ["Grade 3", "Grade 4", "Grade 5"]
        if (dept === "High School (Grade 6 to 10)") return ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"]

        // Fallback for Management or others: show all for now
        return ["Nursery", "LKG", "UKG", ...[...Array(10)].map((_, i) => `Grade ${i + 1}`)]
    }

    const classOptions = getClassOptions()

    const getActionPlan = () => {
        if (!selectedModuleId || selectedModuleId !== 'almf') return null;
        if (averageScore < 2.5) return ALMF_ACTION_PLANS[0];
        if (averageScore < 3.5) return ALMF_ACTION_PLANS[1];
        return ALMF_ACTION_PLANS[2];
    }

    const actionPlan = getActionPlan();

    const handleScoreSelect = (criteriaId: string, value: number) => {
        setScores(prev => ({
            ...prev,
            [criteriaId]: value
        }))
    }

    const handleAddCriterion = () => {
        if (!newCriterionTitle.trim()) return

        const newCriterion: RubricCriterion = {
            id: `custom_${Date.now()}`,
            title: newCriterionTitle,
            scores: commonScores // Using default scores for now
        }

        setCustomCriteria([...customCriteria, newCriterion])
        setNewCriterionTitle("")
        setIsAddingCriterion(false)
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

        if (selectedModuleId === 'almf' && (!auditErrorCatch || !auditObservation || !auditData)) {
            toast.error("Audit Log Required", { description: "Please fill in all 3 sections of the HOD Audit Log (Error Catch, Observation, Data)." })
            return
        }

        // Mock Submission - include custom criteria in payload if this were a real API call
        console.log({
            teacherId: selectedTeacherId,
            moduleId: selectedModuleId,
            period: selectedPeriod,
            scores,
            customCriteria // Backend would need to save these definitions
        })

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
                                <Label>{selectedModuleId === 'almf' ? "Select HOD *" : "Select Teacher *"}</Label>
                                <Select onValueChange={setSelectedTeacherId} value={selectedTeacherId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={selectedModuleId === 'almf' ? "Choose an HOD" : "Choose a teacher"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teachers.map(t => (
                                            <SelectItem key={t.id} value={t.id}>{t.full_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {showClassDetails && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Class Level *</Label>
                                        <Select onValueChange={setClassLevel} value={classLevel}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classOptions.length > 0 ? (
                                                    classOptions.map(opt => (
                                                        <SelectItem key={opt} value={opt.toLowerCase().replace(" ", "-")}>{opt}</SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="p-2 text-xs text-muted-foreground">Select a teacher first</div>
                                                )}
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
                                                <SelectItem value="A">Section A</SelectItem>
                                                <SelectItem value="B">Section B</SelectItem>
                                                <SelectItem value="C">Section C</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Module *</Label>
                                    {lockModule && selectedModule ? (
                                        <div className="p-3 border rounded-md bg-muted text-muted-foreground font-medium">
                                            {selectedModule.title}
                                        </div>
                                    ) : (
                                        <Select onValueChange={setSelectedModuleId} value={selectedModuleId} disabled={lockModule}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a module" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {modules.map(m => (
                                                    <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Assessment Period</Label>
                                    <Select onValueChange={setSelectedPeriod} value={selectedPeriod}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(selectedModuleId === 'almf' ? LEADERSHIP_PERIODS : ASSESSMENT_PERIODS).map(p => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
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

                            {selectedModuleId === 'almf' && (
                                <div className="space-y-6 pt-6 border-t animate-in fade-in">
                                    <div className="flex items-center gap-2">
                                        <FileText className="size-5 text-primary" />
                                        <h3 className="text-lg font-semibold">HOD Audit Log (Primary Tool)</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground italic -mt-4">
                                        To assess the HOD, the Principal must check the HOD's Audit Log for forensic accuracy.
                                    </p>

                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">1. The Error Catch <span className="text-destructive">*</span></Label>
                                            <Textarea
                                                placeholder={HOD_AUDIT_LOG_REQUIREMENTS[0].description}
                                                value={auditErrorCatch}
                                                onChange={(e) => setAuditErrorCatch(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">2. The Observation <span className="text-destructive">*</span></Label>
                                            <Textarea
                                                placeholder={HOD_AUDIT_LOG_REQUIREMENTS[1].description}
                                                value={auditObservation}
                                                onChange={(e) => setAuditObservation(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">3. The Data <span className="text-destructive">*</span></Label>
                                            <Textarea
                                                placeholder={HOD_AUDIT_LOG_REQUIREMENTS[2].description}
                                                value={auditData}
                                                onChange={(e) => setAuditData(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Rubrics Section - Only shows when Module is selected */}
                    {selectedModule && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Evaluation Criteria ({allCriteria.length})</h2>
                                <p className="text-sm text-muted-foreground">Rate each criterion on a scale of 1-5</p>
                            </div>

                            {allCriteria.map((criterion, index) => (
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
                                                            <span className={cn("font-medium mr-2", isSelected ? "" : "text-muted-foreground")}>
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

                            {/* Add Custom Criterion Section */}
                            {allowCustomCriteria && (
                                <Card className="border-dashed border-2">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                                        {isAddingCriterion ? (
                                            <div className="w-full max-w-md space-y-4">
                                                <div className="space-y-2">
                                                    <Label>New Criterion Title</Label>
                                                    <Input
                                                        value={newCriterionTitle}
                                                        onChange={(e) => setNewCriterionTitle(e.target.value)}
                                                        placeholder="e.g. Stakeholder Management"
                                                        autoFocus
                                                    />
                                                </div>
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="outline" onClick={() => setIsAddingCriterion(false)}>Cancel</Button>
                                                    <Button onClick={handleAddCriterion}>Add Criterion</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button variant="secondary" onClick={() => setIsAddingCriterion(true)} className="w-full">
                                                <Plus className="mr-2 h-4 w-4" /> Add Custom Criterion
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
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

                    {actionPlan && (
                        <Card className="border-primary/20 bg-primary/5 shadow-none animate-in slide-in-from-right-4">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Target className="size-5" />
                                    <h3 className="font-bold">Prescriptive Action Plan</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                                            <Users2 className="size-3.5" /> HOD Actions ({actionPlan.scoreRange})
                                        </h4>
                                        <ul className="text-xs space-y-1.5 list-disc pl-4 text-muted-foreground">
                                            {actionPlan.hodActions.map((action, i) => (
                                                <li key={i}>{action}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                                            <ShieldCheck className="size-3.5" /> Management Actions
                                        </h4>
                                        <ul className="text-xs space-y-1.5 list-disc pl-4 text-muted-foreground">
                                            {actionPlan.managementActions.map((action, i) => (
                                                <li key={i}>{action}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {selectedModuleId === 'almf' && (
                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-4 text-xs text-muted-foreground space-y-2">
                                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                                    <Info className="size-3.5" />
                                    ALMF Philosophy
                                </div>
                                <p>The HOD is the "Quality Assurance Engine". Their primary role is ensuring standards are executed faithfully by every teacher.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
