"use client"

import { useEffect, useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { Student } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Loader2, ArrowLeft, CheckCircle2, User, Save, Users } from "lucide-react"
import Link from "next/link"
import { PARENT_PULSE_RUBRICS, AssessmentCategory, Question } from "@/lib/data/parent-pulse-rubrics"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function AssessParentPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    // Filters
    const [selectedGrade, setSelectedGrade] = useState<string>("")
    const [selectedSection, setSelectedSection] = useState<string>("")
    const [selectedStudentId, setSelectedStudentId] = useState<string>("")
    const [selectedParentType, setSelectedParentType] = useState<"Father" | "Mother">("Father")

    // User Profile State
    const [userRole, setUserRole] = useState<string>("admin") // Default to safe fallback or admin for testing
    const [assignedGrade, setAssignedGrade] = useState<string | null>(null)
    const [assignedSection, setAssignedSection] = useState<string | null>(null)
    const [assignedDepartment, setAssignedDepartment] = useState<string | null>(null)

    // Responses: { questionId: score }
    const [responses, setResponses] = useState<Record<string, number>>({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            // 1. Get Current User
            const { data: { user } } = await supabase.auth.getUser()

            let role = 'admin'
            let aGrade = null
            let aSection = null
            let aDept = null

            if (user) {
                // 2. Fetch Profile details
                const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
                if (profile) {
                    role = profile.role
                    aGrade = profile.assigned_class // Assuming column name 'assigned_class'
                    aSection = profile.assigned_section
                    aDept = profile.department
                }
            }

            setUserRole(role)
            setAssignedGrade(aGrade)
            setAssignedSection(aSection)
            setAssignedDepartment(aDept)

            // 3. Fetch Students
            const { data: studentsData, error } = await supabase.from('students').select('*').order('full_name')

            if (error) throw error

            let allStudents = studentsData as Student[]

            // 4. Apply Role-Based Filtering
            if (role === 'teacher' && aGrade && aSection) {
                // Teacher: assessed only their specific class-section
                allStudents = allStudents.filter(s => s.grade_level === aGrade && s.section === aSection)
                setSelectedGrade(aGrade)
                setSelectedSection(aSection)
            } else if (role === 'hod' && aDept) {
                // HOD: assess only their department
                // Map department to grades (Simple mapping logic)
                const deptGrades: Record<string, string[]> = {
                    'Pre-Primary': ['Nursery', 'LKG', 'UKG'],
                    'Foundational': ['Class 1', 'Class 2'],
                    'Primary': ['Class 3', 'Class 4', 'Class 5'],
                    'Upper Primary': ['Class 6', 'Class 7', 'Class 8'],
                    'High School': ['Class 9', 'Class 10']
                }
                const allowedGrades = deptGrades[aDept] || []
                allStudents = allStudents.filter(s => allowedGrades.includes(s.grade_level))
            }
            // Admin sees all

            setStudents(allStudents)

        } catch (error) {
            console.error(error)
            toast.error("Failed to load data")
        } finally {
            setLoading(false)
        }
    }

    // Derived Data
    const uniqueGrades = useMemo(() => Array.from(new Set(students.map(s => s.grade_level))).sort(), [students])

    const relevantSections = useMemo(() => {
        if (!selectedGrade) return []
        return Array.from(new Set(students.filter(s => s.grade_level === selectedGrade).map(s => s.section))).sort()
    }, [students, selectedGrade])

    const relevantStudents = useMemo(() => {
        if (!selectedGrade || !selectedSection) return []
        return students.filter(s => s.grade_level === selectedGrade && s.section === selectedSection)
    }, [students, selectedGrade, selectedSection])

    const selectedStudent = useMemo(() =>
        students.find(s => s.id === selectedStudentId),
        [students, selectedStudentId])

    const activeCategory = useMemo(() => {
        if (!selectedStudent) return null
        const grade = selectedStudent.grade_level

        // Find category based on grade mapping
        const category = PARENT_PULSE_RUBRICS.find(c => c.grades.includes(grade))

        // Fallback or explicit mapping if the array check fails (e.g. slight casing mismatch)
        if (category) return category

        // Additional robust mapping if needed
        if (['Nursery', 'LKG', 'UKG'].includes(grade)) return PARENT_PULSE_RUBRICS.find(c => c.id === 'pre-primary')
        if (['Class 1', 'Class 2'].includes(grade)) return PARENT_PULSE_RUBRICS.find(c => c.id === 'foundational')
        if (['Class 3', 'Class 4', 'Class 5'].includes(grade)) return PARENT_PULSE_RUBRICS.find(c => c.id === 'primary')
        if (['Class 6', 'Class 7', 'Class 8'].includes(grade)) return PARENT_PULSE_RUBRICS.find(c => c.id === 'upper-primary')
        if (['Class 9', 'Class 10'].includes(grade)) return PARENT_PULSE_RUBRICS.find(c => c.id === 'high-school')

        return null
    }, [selectedStudent])

    const handleScoreSelect = (questionId: string, score: number) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: score
        }))
    }

    const handleSubmit = async () => {
        if (!selectedStudent || !activeCategory) return

        // Validate all questions answered
        const questionIds = activeCategory.questions.map(q => q.id)
        const answeredIds = Object.keys(responses)
        const missing = questionIds.filter(id => !answeredIds.includes(id))

        if (missing.length > 0) {
            toast.error("Please answer all questions before submitting.")
            return
        }

        setSubmitting(true)

        try {
            // 1. Calculate Score
            const totalQuestions = questionIds.length
            const totalScore = Object.values(responses).reduce((acc, curr) => acc + curr, 0)
            const averageScore = Number(((totalScore / (totalQuestions * 5)) * 100).toFixed(2)) // Normalized to percentage

            // 2. Get Evaluator ID (Current User)
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error("You must be logged in to submit an assessment.")
                // In development, we might want to know this happened
                console.error("Submission blocked: No authenticated user found.")
                return
            }

            // 3. Insert into student_evaluations
            const evaluationPayload = {
                student_id: selectedStudent.id,
                evaluator_id: user.id,
                term: "Term 1", // Hardcoded for now, ideal to be dynamic
                evaluation_date: new Date().toISOString(),
                status: "published", // Auto-publish for simplicity
                evaluation_type: "parent_pulse",
                overall_score: averageScore,
                action_plan: { parent_type: selectedParentType } // Store metadata
            }

            const { data: evalData, error: evalError } = await supabase
                .from('student_evaluations')
                .insert(evaluationPayload)
                .select()
                .single()

            if (evalError) throw evalError

            // 4. Insert into module_parent_pulse
            const modulePayload = {
                evaluation_id: evalData.id,
                criteria_scores: responses,
                feedback: `Assessment completed for ${selectedParentType}`,
                module_score: averageScore
            }

            const { error: moduleError } = await supabase
                .from('module_parent_pulse')
                .insert(modulePayload)

            if (moduleError) throw moduleError

            toast.success("Assessment submitted successfully!")
            router.push('/dashboard/parent-pulse')

        } catch (error: any) {
            console.error("Submission Error:", error)
            toast.error(error.message || "Failed to submit assessment")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-24">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/parent-pulse">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-heading">New Parent Assessment</h1>
                    <p className="text-muted-foreground text-sm">Select a parent and evaluate based on observed behaviors.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Left Column: Selection & Parent Info */}
                <div className="md:col-span-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Select Parent</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Grade</Label>
                                <Select value={selectedGrade} onValueChange={(val) => {
                                    setSelectedGrade(val)
                                    setSelectedSection("")
                                    setSelectedStudentId("")
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {uniqueGrades.map(g => (
                                            <SelectItem key={g} value={g}>{g}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Section</Label>
                                <Select value={selectedSection} onValueChange={(val) => {
                                    setSelectedSection(val)
                                    setSelectedStudentId("")
                                }} disabled={!selectedGrade}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {relevantSections.map(s => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Student</Label>
                                <Select value={selectedStudentId} onValueChange={setSelectedStudentId} disabled={!selectedSection}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Student" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {relevantStudents.map(s => (
                                            <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Label>Parent Type</Label>
                                <RadioGroup value={selectedParentType} onValueChange={(val: "Father" | "Mother") => setSelectedParentType(val)} className="flex gap-4">
                                    <div className="flex items-center space-x-2 border rounded-md p-3 flex-1 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 transition-colors">
                                        <RadioGroupItem value="Father" id="r-father" />
                                        <Label htmlFor="r-father" className="cursor-pointer flex-1">Father</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 border rounded-md p-3 flex-1 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 transition-colors">
                                        <RadioGroupItem value="Mother" id="r-mother" />
                                        <Label htmlFor="r-mother" className="cursor-pointer flex-1">Mother</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                    </Card>

                    {selectedStudent && (
                        <Card className="bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-top-4">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Parent Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Name</p>
                                        <p className="font-semibold text-lg">
                                            {selectedParentType === "Father" ? selectedStudent.fatherName : selectedStudent.motherName || "N/A"}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Relation</p>
                                            <p className="font-medium">{selectedParentType}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Student Age</p>
                                            <p className="font-medium">{selectedStudent.age_group || activeCategory?.ageGroup || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column: Assessment Form */}
                <div className="md:col-span-8">
                    {selectedStudent ? (
                        activeCategory ? (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">{activeCategory.title}</h2>
                                    <span className="text-xs font-medium px-3 py-1 bg-secondary rounded-full">
                                        Assessment for {activeCategory.ageGroup}
                                    </span>
                                </div>
                                <Separator />

                                <div className="space-y-8">
                                    {activeCategory.questions.map((q, index) => (
                                        <div key={q.id} className="space-y-4 p-4 rounded-xl border bg-card/50 hover:bg-card hover:shadow-sm transition-all">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="flex items-center justify-center shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                        {q.focusArea}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-medium">{q.question}</h3>
                                                <p className="text-sm text-muted-foreground">{q.description}</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                                {q.rubrics.map((r) => {
                                                    const isSelected = responses[q.id] === r.score
                                                    return (
                                                        <div
                                                            key={r.score}
                                                            onClick={() => handleScoreSelect(q.id, r.score)}
                                                            className={`
                                                                cursor-pointer relative flex flex-col gap-2 p-3 rounded-lg border text-sm transition-all h-full
                                                                ${isSelected
                                                                    ? 'ring-2 ring-primary border-primary bg-primary/5'
                                                                    : 'hover:border-primary/50 hover:bg-accent/50'}
                                                            `}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className={`font-bold ${r.score === 1 ? 'text-red-500' :
                                                                    r.score === 2 ? 'text-orange-500' :
                                                                        r.score === 3 ? 'text-yellow-600' :
                                                                            r.score === 4 ? 'text-blue-500' : 'text-green-600'
                                                                    }`}>{r.score} - {r.label}</span>
                                                                {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground leading-snug">{r.description}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end pt-6">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        size="lg"
                                        className="w-full md:w-auto min-w-[200px]"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Submit Assessment
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Card className="border-dashed">
                                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="mb-4 rounded-full bg-muted/50 p-4">
                                        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin-slow" />
                                    </div>
                                    <h3 className="text-lg font-medium">No Assessment Framework Found</h3>
                                    <p className="text-muted-foreground max-w-sm mt-2">
                                        We couldn't find a matching assessment rubric for <strong>{selectedStudent.grade_level}</strong>. Please contact support.
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed rounded-xl text-muted-foreground">
                            <Users className="h-12 w-12 mb-4 opacity-20" />
                            <p className="font-medium">Please select a student to begin assessment</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
