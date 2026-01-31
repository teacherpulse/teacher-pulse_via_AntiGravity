"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Student } from "@/types"
import { getAssessmentData, AssessmentCategory, AssessmentQuestion, RubricLevel } from "@/lib/vidya-pulse-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, AlertCircle, ChevronLeft, Save } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function AssessStudentPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [selectedStudentId, setSelectedStudentId] = useState<string>("")
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [assessmentData, setAssessmentData] = useState<AssessmentCategory[]>([])

    // Scoring State: Record<CategoryID, Record<QuestionID, Score>>
    const [scores, setScores] = useState<Record<string, Record<string, RubricLevel>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const supabase = createClient()
    // const { toast } = useToast()

    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await supabase.from('students').select('*').order('full_name')
            if (data) setStudents(data)
        }
        fetchStudents()
    }, [])

    useEffect(() => {
        if (selectedStudentId) {
            const student = students.find(s => s.id === selectedStudentId) || null
            setSelectedStudent(student)
            // Load appropriate assessment data
            if (student) {
                setAssessmentData(getAssessmentData(student.age_group))
            } else {
                setAssessmentData([])
            }
            // Reset scores on student change
            setScores({})
        } else {
            setSelectedStudent(null)
            setAssessmentData([])
        }
    }, [selectedStudentId, students])

    const handleScoreChange = (categoryId: string, questionId: string, score: RubricLevel) => {
        setScores(prev => ({
            ...prev,
            [categoryId]: {
                ...(prev[categoryId] || {}),
                [questionId]: score
            }
        }))
    }

    const calculateCategoryScore = (categoryId: string) => {
        const categoryScores = scores[categoryId] || {}
        const values = Object.values(categoryScores)
        if (values.length === 0) return 0
        const sum = values.reduce((a, b) => a + b, 0)
        return Math.round((sum / (values.length * 5)) * 100)
    }

    const calculateTotalScore = () => {
        let totalSum = 0
        let totalQuestions = 0
        assessmentData.forEach(cat => {
            const catScores = scores[cat.id] || {}
            Object.values(catScores).forEach(s => {
                totalSum += s
                totalQuestions++
            })
        })
        if (totalQuestions === 0) return 0
        return Math.round((totalSum / (totalQuestions * 5)) * 100)
    }

    const handleSubmit = async () => {
        if (!selectedStudent) return
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log("Assessment Submitted", {
            studentId: selectedStudent.id,
            scores
        })

        // Reset or redirect
        toast.success("Assessment saved successfully!")
        setIsSubmitting(false)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/students">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Assess Student Behavior</h1>
                    <p className="text-muted-foreground">Age Group: 3-6 Years (Formative Years)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Student Selection Card */}
                    <Card className="border-t-4 border-t-primary shadow-sm">
                        <CardHeader>
                            <CardTitle>Student Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Student</label>
                                <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Search or select a student..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map(s => (
                                            <SelectItem key={s.id} value={s.id}>{s.full_name} ({s.admission_number})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedStudent && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <p className="text-xs text-muted-foreground uppercase">Grade</p>
                                        <p className="font-semibold">{selectedStudent.grade_level}</p>
                                    </div>
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <p className="text-xs text-muted-foreground uppercase">Section</p>
                                        <p className="font-semibold">{selectedStudent.section}</p>
                                    </div>
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <p className="text-xs text-muted-foreground uppercase">Gender</p>
                                        <p className="font-semibold">{selectedStudent.gender || selectedStudent.parent_gender || "N/A"}</p>
                                    </div>
                                    <div className="p-3 bg-muted/40 rounded-lg">
                                        <p className="text-xs text-muted-foreground uppercase">Age Group</p>
                                        <p className="font-semibold">{selectedStudent.age_group || "3-6 Years"}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Assessment Categories */}
                    {selectedStudent ? (
                        <div className="space-y-8">
                            {assessmentData.map((category) => (
                                <Card key={category.id} className="overflow-hidden border shadow-sm">
                                    <CardHeader className="bg-muted/30 pb-4">
                                        <CardTitle className="flex items-center justify-between">
                                            {category.title}
                                            <span className="text-sm font-normal px-3 py-1 bg-primary/10 text-primary rounded-full">
                                                {calculateCategoryScore(category.id)}% Score
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y">
                                            {category.questions.map((q) => {
                                                const currentScore = scores[category.id]?.[q.id] as RubricLevel;
                                                return (
                                                    <div key={q.id} className="p-6 space-y-4 hover:bg-muted/5 transition-colors">
                                                        <p className="font-medium text-lg text-foreground/90">{q.question}</p>

                                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                                                            {[1, 2, 3, 4, 5].map((level) => (
                                                                <button
                                                                    key={level}
                                                                    onClick={() => handleScoreChange(category.id, q.id, level as RubricLevel)}
                                                                    className={cn(
                                                                        "text-left p-3 rounded-lg border-2 text-xs transition-all duration-200 h-full flex flex-col gap-2",
                                                                        currentScore === level
                                                                            ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                                                                            : "border-transparent bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                                                                    )}
                                                                >
                                                                    <div className="flex items-center justify-between w-full">
                                                                        <span className={cn(
                                                                            "font-bold text-lg",
                                                                            level === 1 ? "text-red-500" :
                                                                                level === 5 ? "text-green-600" : "text-primary"
                                                                        )}>{level}</span>
                                                                        {currentScore === level && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                                                    </div>
                                                                    <span className="leading-snug">
                                                                        {q.rubrics[level as RubricLevel]}
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-xl bg-muted/10 text-muted-foreground">
                            Select a student to begin assessment
                        </div>
                    )}
                </div>

                {/* Right Column: Sticky Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <Card className="shadow-lg border-t-4 border-t-indigo-500">
                            <CardHeader>
                                <CardTitle>Assessment Summary</CardTitle>
                                <CardDescription>Real-time behavioral index</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-center py-4">
                                    <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-8 border-muted">
                                        <div className="absolute flex flex-col items-center">
                                            <span className="text-3xl font-bold">{calculateTotalScore()}%</span>
                                            <span className="text-xs text-muted-foreground">Overall</span>
                                        </div>
                                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                                            <circle
                                                className="text-primary transition-all duration-1000 ease-out"
                                                strokeWidth="8"
                                                strokeDasharray={251} // 2 * PI * 40 (approx)
                                                strokeDashoffset={251 - (251 * calculateTotalScore()) / 100}
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                fill="transparent"
                                                r="40"
                                                cx="50"
                                                cy="50"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {assessmentData.map(cat => (
                                        <div key={cat.id} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">{cat.title}</span>
                                                <span className="font-medium">{calculateCategoryScore(cat.id)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all duration-500"
                                                    style={{ width: `${calculateCategoryScore(cat.id)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                <Button
                                    className="w-full h-12 text-lg shadow-lg hover:shadow-xl transition-all"
                                    onClick={handleSubmit}
                                    disabled={!selectedStudent || isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : <><Save className="mr-2 h-5 w-5" /> Submit Assessment</>}
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <p>
                                    This assessment is for Ages 3-6. Ensure you are observing the child in a natural setting for accurate scoring.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
