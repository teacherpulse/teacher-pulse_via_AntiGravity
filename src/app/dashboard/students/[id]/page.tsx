"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Student } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, User, GraduationCap, Calendar, BookOpen, Activity, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function StudentProfilePage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string
    const [student, setStudent] = useState<Student | null>(null)
    const [loading, setLoading] = useState(true)
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        if (id) {
            fetchStudent()
        }
    }, [id])

    const fetchStudent = async () => {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error(error)
            toast.error("Failed to load student profile")
            setLoading(false)
            return
        }

        // Map fields similar to list view
        const mappedStudent: Student = {
            ...data,
            fatherName: data.parent_gender === 'Male' || !data.parent_gender ? data.parent_name : data.fatherName,
            motherName: data.parent_gender === 'Female' ? data.parent_name : data.motherName,
            mobile: data.parent_contact_number,
            vidyaPulseScore: data.vidyaPulseScore || Math.floor(Math.random() * (98 - 75) + 75),
            status: data.status || 'active'
        }

        setStudent(mappedStudent)
        setLoading(false)
    }

    const toggleStatus = async () => {
        if (!student) return
        const newStatus = student.status === 'active' ? 'inactive' : 'active'

        const { error } = await supabase
            .from('students')
            .update({ status: newStatus })
            .eq('id', id)

        if (error) {
            toast.error(`Failed to mark student as ${newStatus}`)
        } else {
            toast.success(`Student marked as ${newStatus}`)
            setStudent({ ...student, status: newStatus as "active" | "inactive" })
            router.refresh()
        }
        setIsStatusDialogOpen(false)
    }

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>
    if (!student) return <div className="p-8 text-center text-muted-foreground">Student not found</div>

    const initials = student.full_name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "S"

    // Vidya Pulse Color Logic
    const score = student.vidyaPulseScore || 0
    let scoreColor = "text-primary"
    let scoreBg = "bg-primary/10"
    let scoreBorder = "border-primary/20"
    if (score >= 90) { scoreColor = "text-emerald-600"; scoreBg = "bg-emerald-500/10"; scoreBorder = "border-emerald-200" }
    else if (score >= 75) { scoreColor = "text-amber-600"; scoreBg = "bg-amber-500/10"; scoreBorder = "border-amber-200" }
    else { scoreColor = "text-destructive"; scoreBg = "bg-destructive/10"; scoreBorder = "border-destructive/20" }

    const isInactive = student.status === 'inactive'

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full h-10 w-10">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-heading flex items-center gap-3">
                            {student.full_name}
                            <Badge variant="secondary" className="text-base font-normal px-3 py-1">
                                {student.grade_level} - {student.section}
                            </Badge>
                            {isInactive && <Badge variant="destructive" className="ml-2">Inactive</Badge>}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">ADM: {student.admission_number || 'N/A'}</span>
                            <span>•</span>
                            <span className="capitalize">{student.gender}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                Status: <span className={isInactive ? "text-destructive font-semibold" : "text-emerald-600 font-semibold"}>{student.status === 'active' ? 'Active' : 'Inactive'}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Edit className="h-4 w-4" /> Edit Profile
                    </Button>
                    <Button
                        variant={isInactive ? "default" : "destructive"}
                        className={isInactive ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                        onClick={() => setIsStatusDialogOpen(true)}
                    >
                        {isInactive ? (
                            <>
                                <RotateCcw className="mr-2 h-4 w-4" /> Activate Profile
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" /> Mark Inactive
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Personal & Family Info */}
                <div className="md:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <Card className={isInactive ? "opacity-75" : ""}>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <Avatar className="h-32 w-32 border-4 border-muted/50 shadow-md">
                                    <AvatarFallback className="text-4xl font-bold bg-primary/5 text-primary">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                        <p className="font-semibold text-lg">{student.full_name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Admission Number</p>
                                        <p className="font-mono text-base">{student.admission_number}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Class & Section</p>
                                        <p className="text-base">{student.grade_level} - {student.section}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Gender</p>
                                        <p className="text-base capitalize">{student.gender}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                                        <p className="text-base flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            --/--/----
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Locality</p>
                                        <p className="text-base flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            {student.locality || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Family Details Card */}
                    <Card className={isInactive ? "opacity-75" : ""}>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5 text-indigo-500" />
                                Family Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Father's Name</p>
                                    <p className="text-base font-medium">{student.fatherName || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Mother's Name</p>
                                    <p className="text-base font-medium">{student.motherName || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Mobile Number</p>
                                    <p className="text-base font-mono flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        {student.mobile || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                    <p className="text-base font-mono flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        N/A
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Vidya Pulse Widget & Stats */}
                <div className="space-y-6">
                    <Card className={`overflow-hidden border-2 transition-all ${scoreBg.replace('/10', '/5')} ${scoreBorder} ${isInactive ? 'grayscale opacity-75' : ''}`}>
                        <CardHeader className="bg-white/50 dark:bg-black/50 p-6 text-center pb-2">
                            <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                                <Activity className={`h-6 w-6 ${scoreColor}`} />
                                Vidya Pulse
                            </CardTitle>
                            <CardDescription>Academic & Behavioral Index</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 flex flex-col items-center justify-center relative">
                            {/* Circular Progress Mockup */}
                            <div className="relative h-40 w-40 flex items-center justify-center">
                                <svg className="h-full w-full -rotate-90 text-muted/20" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className={scoreColor}
                                        strokeDasharray="283" // 2 * pi * 45
                                        strokeDashoffset={283 - (283 * score) / 100}
                                        strokeLinecap="round"
                                        style={{ transition: "stroke-dashoffset 1s ease-out" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={`text-5xl font-black tracking-tighter ${scoreColor}`}>
                                        {score}%
                                    </span>
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">Score</span>
                                </div>
                            </div>

                            <div className="mt-6 w-full grid grid-cols-2 gap-4 text-center">
                                <div className="bg-background rounded-lg p-3 border shadow-sm">
                                    <div className="text-muted-foreground text-xs uppercase font-bold">Attendance</div>
                                    <div className="text-lg font-bold">92%</div>
                                </div>
                                <div className="bg-background rounded-lg p-3 border shadow-sm">
                                    <div className="text-muted-foreground text-xs uppercase font-bold">Behavior</div>
                                    <div className="text-lg font-bold text-emerald-600">A+</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href={`/dashboard/students/assess?studentId=${id}`} className={`block ${isInactive ? 'pointer-events-none opacity-50' : ''}`}>
                                <Button className="w-full justify-start" variant="outline" disabled={isInactive}>
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    Create Assessment
                                </Button>
                            </Link>
                            <Button
                                className={`w-full justify-start ${isInactive ? 'opacity-50' : ''}`}
                                variant="outline"
                                disabled={isInactive}
                            >
                                <BookOpen className="mr-2 h-4 w-4" />
                                View Academic Reports
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{student.status === 'active' ? 'Mark Student Inactive' : 'Activate Student'}</DialogTitle>
                        <DialogDescription>
                            {student.status === 'active'
                                ? "Are you sure you want to mark this student as inactive? They will be moved to the inactive list and hidden from regular views."
                                : "Are you sure you want to activate this student? They will be restored to the active student list."
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>Cancel</Button>
                        <Button
                            variant={student.status === 'active' ? "destructive" : "default"}
                            onClick={toggleStatus}
                        >
                            {student.status === 'active' ? 'Mark Inactive' : 'Activate'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
