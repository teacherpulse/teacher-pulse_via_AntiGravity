"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Student } from "@/types"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { Loader2, Plus, Activity, UserX, Users, TrendingUp, AlertCircle, CheckCircle2, XCircle, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddStudentDialog } from "@/components/add-student-dialog"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// @ts-ignore
export const dynamic = 'force-dynamic'

// Mock Trend Data
const performanceTrend = [
    { name: 'Jan', score: 65 }, { name: 'Feb', score: 72 }, { name: 'Mar', score: 68 },
    { name: 'Apr', score: 75 }, { name: 'May', score: 82 }, { name: 'Jun', score: 80 },
    { name: 'Jul', score: 85 }, { name: 'Aug', score: 88 }, { name: 'Sep', score: 86 },
    { name: 'Oct', score: 90 }, { name: 'Nov', score: 89 }, { name: 'Dec', score: 92 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
                <p className="font-semibold mb-1">{label}</p>
                <p className="text-primary text-sm">
                    Score: <span className="font-bold">{payload[0].value}%</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [viewStatus, setViewStatus] = useState<"active" | "inactive">("active")
    const supabase = createClient()

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        const { data, error } = await supabase.from('students').select('*').order('full_name')
        if (error) console.error(error)
        else {
            const mappedData = data?.map((s: any) => ({
                ...s,
                fatherName: s.parent_gender === 'Male' || !s.parent_gender ? s.parent_name : s.fatherName,
                motherName: s.parent_gender === 'Female' ? s.parent_name : s.motherName,
                mobile: s.parent_contact_number,
                vidyaPulseScore: s.vidyaPulseScore || Math.floor(Math.random() * (98 - 75) + 75),
                status: s.status || 'active'
            })) as Student[]
            setStudents(mappedData || [])
        }
        setLoading(false)
    }

    const filteredStudents = students.filter(s =>
        viewStatus === 'active' ? (s.status === 'active' || !s.status) : s.status === 'inactive'
    )

    // --- Statistics Calculation ---
    const totalStudents = filteredStudents.length
    const totalActive = students.filter(s => s.status === 'active' || !s.status).length
    const totalDatabase = students.length

    // Safety check for division by zero
    const avgScore = totalStudents > 0
        ? Math.round(filteredStudents.reduce((acc, s) => acc + (s.vidyaPulseScore || 0), 0) / totalStudents)
        : 0

    const greenZone = filteredStudents.filter(s => (s.vidyaPulseScore || 0) >= 75).length
    const yellowZone = filteredStudents.filter(s => (s.vidyaPulseScore || 0) >= 60 && (s.vidyaPulseScore || 0) < 75).length
    const orangeZone = filteredStudents.filter(s => (s.vidyaPulseScore || 0) >= 50 && (s.vidyaPulseScore || 0) < 60).length
    const redZone = filteredStudents.filter(s => (s.vidyaPulseScore || 0) < 50).length

    const attentionRequired = filteredStudents
        .filter(s => (s.vidyaPulseScore || 0) < 50)
        .sort((a, b) => (a.vidyaPulseScore || 0) - (b.vidyaPulseScore || 0))
        .slice(0, 5) // Top 5 critical items

    const topPerformers = filteredStudents
        .filter(s => (s.vidyaPulseScore || 0) >= 90)
        .sort((a, b) => (b.vidyaPulseScore || 0) - (a.vidyaPulseScore || 0))
        .slice(0, 5)

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 font-heading text-primary">Vidya Pulse</h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewStatus === 'active' ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewStatus('active')}
                            className="h-8 gap-2"
                        >
                            <Users className="h-4 w-4" /> Active Students
                        </Button>
                        <Button
                            variant={viewStatus === 'inactive' ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewStatus('inactive')}
                            className="h-8 gap-2 text-muted-foreground"
                        >
                            <UserX className="h-4 w-4" /> Inactive Students
                        </Button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/students/assess">
                        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Assess Student Behavior
                        </Button>
                    </Link>
                    <AddStudentDialog
                        onStudentAdded={fetchStudents}
                        trigger={
                            <Button className="bg-primary text-primary-foreground shadow-lg hover:brightness-110 transition-all">
                                <Plus className="mr-2 h-4 w-4" /> Add Student
                            </Button>
                        }
                    />
                </div>
            </div>

            {/* Top Row: Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-muted-foreground">In current view</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Ratio</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold">{totalActive} <span className="text-muted-foreground text-sm font-normal">/ {totalDatabase}</span></div>
                        <p className="text-xs text-muted-foreground">Active vs Total Registered</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vidya Pulse Average</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold text-primary">{avgScore}%</div>
                        <p className="text-xs text-muted-foreground">Average Score</p>
                    </CardContent>
                </Card>
            </div>

            {/* Strategy Row: Graph & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                {/* Curve Graph */}
                <Card className="glass-card lg:col-span-4 max-h-[400px]">
                    <CardHeader>
                        <CardTitle>Performance Trend</CardTitle>
                        <CardDescription>Average student performance over past 12 months</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceTrend}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Right Lists Column */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Top 5 Performers */}
                    <Card className="glass-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Trophy className="h-5 w-5 text-amber-500" />
                                Top Performers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {topPerformers.length > 0 ? (
                                <div className="space-y-3">
                                    {topPerformers.map((s) => (
                                        <div key={s.id} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-amber-500" />
                                                <span className="font-medium truncate max-w-[150px]">{s.full_name}</span>
                                            </div>
                                            <span className="font-bold text-emerald-600">{s.vidyaPulseScore}%</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-sm text-muted-foreground py-4">No top performers found.</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Attention Required */}
                    <Card className="glass-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base text-destructive">
                                <AlertCircle className="h-5 w-5" />
                                Attention Required
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {attentionRequired.length > 0 ? (
                                <div className="space-y-3">
                                    {attentionRequired.map((s) => (
                                        <div key={s.id} className="flex items-center justify-between text-sm bg-destructive/10 p-2 rounded-md border border-destructive/20">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className="h-3 w-3 text-destructive" />
                                                <span className="font-medium truncate max-w-[150px]">{s.full_name}</span>
                                            </div>
                                            <span className="font-bold text-destructive">{s.vidyaPulseScore}%</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center py-4 text-green-600 gap-2">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span className="text-sm font-medium">All students on track!</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Row: Zones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-green-500/5 border-green-500/20">
                    <CardContent className="p-6 flex flex-col items-start gap-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div className="text-xs text-green-600/60 dark:text-green-400/60 font-medium px-2 py-1 rounded-full bg-green-500/10">
                                &gt; 75%
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Green Zone</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{greenZone}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-500/5 border-yellow-500/20">
                    <CardContent className="p-6 flex flex-col items-start gap-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div className="text-xs text-yellow-600/60 dark:text-yellow-400/60 font-medium px-2 py-1 rounded-full bg-yellow-500/10">
                                60% - 75%
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Yellow Zone</p>
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{yellowZone}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-orange-500/5 border-orange-500/20">
                    <CardContent className="p-6 flex flex-col items-start gap-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <div className="text-xs text-orange-600/60 dark:text-orange-400/60 font-medium px-2 py-1 rounded-full bg-orange-500/10">
                                50% - 60%
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Orange Zone</p>
                            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{orangeZone}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-red-500/5 border-red-500/20">
                    <CardContent className="p-6 flex flex-col items-start gap-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
                                <XCircle className="h-6 w-6" />
                            </div>
                            <div className="text-xs text-red-600/60 dark:text-red-400/60 font-medium px-2 py-1 rounded-full bg-red-500/10">
                                &lt; 50%
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Red Zone</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{redZone}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <DataTable columns={columns} data={filteredStudents} />
        </div>
    )
}
