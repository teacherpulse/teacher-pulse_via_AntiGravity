"use client"

import Link from "next/link"
import { Plus, BarChart3, TrendingUp, Users, Target, GraduationCap, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "../teachers/columns"
import { teacherData } from "@/lib/mock-data"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// Mock trend data for overall Teacher Pulse
const teacherTrendData = [
    { name: 'Jul', score: 78 },
    { name: 'Aug', score: 80 },
    { name: 'Sep', score: 79 },
    { name: 'Oct', score: 82 },
    { name: 'Nov', score: 84 },
    { name: 'Dec', score: 86 },
    { name: 'Jan', score: 88 },
]

export default function EvaluationsPage() {
    // 1. Total Average % of Teacher Pulse
    const allTeachers = teacherData.filter(t => t.department !== 'Management')
    const totalAvg = Math.round(allTeachers.reduce((acc, curr) => acc + curr.avgScore, 0) / allTeachers.length)

    // 2. Progress Tracker
    const totalPossibleAssessments = allTeachers.length * 6 // 6 rounds per year
    const completedAssessments = 112 // Mocked for now
    const progressPercent = Math.round((completedAssessments / totalPossibleAssessments) * 100)

    // Department Averages
    const getDeptAvg = (depts: string[]) => {
        const filtered = allTeachers.filter(t => depts.includes(t.department))
        if (filtered.length === 0) return 0
        return Math.round(filtered.reduce((acc, curr) => acc + curr.avgScore, 0) / filtered.length)
    }

    const prePrimaryAvg = getDeptAvg(['Pre Primary'])
    const foundationalAvg = getDeptAvg(['Grade 1 & 2', 'Foundational Primary'])
    const primaryAvg = getDeptAvg(['Primary (Grade 3 to 5)'])
    const highSchoolAvg = getDeptAvg(['High School (Grade 6 to 10)'])

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading">Teacher Pulse</h1>
                    <p className="text-muted-foreground">Manage ongoing teacher evaluations and performance reviews.</p>
                </div>
                <Link href="/dashboard/evaluations/new">
                    <Button className="shadow-lg shadow-primary/20"><Plus className="mr-2 h-4 w-4" /> Create Assessment</Button>
                </Link>
            </div>

            {/* Top Row: Main Trend + Progress */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Widget 1: Total Average with Curve */}
                <Card className="glass-card md:col-span-2 overflow-hidden border-t-4 border-t-primary">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Total Teacher Pulse
                            </CardTitle>
                            <CardDescription>Average performance across all departments</CardDescription>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-extrabold text-primary">{totalAvg}%</span>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Historical Avg</p>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={teacherTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide />
                                <YAxis domain={[60, 100]} hide />
                                <Tooltip content={({ active, payload }) => active && payload ? <div className="bg-background border p-1 rounded text-xs">{payload[0].value}%</div> : null} />
                                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPulse)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Widget 2: Assessment Progress */}
                <Card className="glass-card flex flex-col justify-center border-t-4 border-t-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-500" />
                            Progress Tracker
                        </CardTitle>
                        <CardDescription>Academic Year 2024-25</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-baseline">
                            <div className="text-3xl font-black">{completedAssessments} <span className="text-lg text-muted-foreground font-medium">/ {totalPossibleAssessments}</span></div>
                            <div className="text-sm font-bold text-blue-500">{progressPercent}%</div>
                        </div>
                        <div className="h-3 w-full bg-blue-500/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground italic text-center">Completed Assessments</p>
                    </CardContent>
                </Card>
            </div>

            {/* Departmental Averages (4 Widgets) */}
            <div className="grid gap-4 md:grid-cols-4">
                <DeptWidget
                    title="Pre-Primary"
                    sub="Nursery, LKG, UKG"
                    score={prePrimaryAvg}
                    icon={<School className="h-4 w-4 text-pink-500" />}
                    color="pink"
                />
                <DeptWidget
                    title="Foundational"
                    sub="Grade 1 & 2"
                    score={foundationalAvg}
                    icon={<GraduationCap className="h-4 w-4 text-emerald-500" />}
                    color="emerald"
                />
                <DeptWidget
                    title="Primary"
                    sub="Grade 3 to 5"
                    score={primaryAvg}
                    icon={<BarChart3 className="h-4 w-4 text-amber-500" />}
                    color="amber"
                />
                <DeptWidget
                    title="High School"
                    sub="Grade 6 to 10"
                    score={highSchoolAvg}
                    icon={<Users className="h-4 w-4 text-purple-500" />}
                    color="purple"
                />
            </div>

            {/* List Section */}
            <Card className="glass-card shadow-lg">
                <CardHeader>
                    <CardTitle>Recent Evaluations</CardTitle>
                    <CardDescription>Comprehensive view of recent teacher performance checkpoints.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={allTeachers.slice(0, 10)} />
                </CardContent>
            </Card>
        </div>
    )
}

function DeptWidget({ title, sub, score, icon, color }: { title: string, sub: string, score: number, icon: React.ReactNode, color: string }) {
    const colorVariants: Record<string, string> = {
        pink: "border-t-pink-500 text-pink-600 dark:text-pink-400",
        emerald: "border-t-emerald-500 text-emerald-600 dark:text-emerald-400",
        amber: "border-t-amber-500 text-amber-600 dark:text-amber-400",
        purple: "border-t-purple-500 text-purple-600 dark:text-purple-400",
    }

    return (
        <Card className={`glass-card border-t-4 ${colorVariants[color] || 'border-t-primary'} relative overflow-hidden group`}>
            <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center gap-2 mb-1">
                    {icon}
                    <CardTitle className="text-sm font-bold tracking-tight">{title}</CardTitle>
                </div>
                <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">{sub}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black">{score}%</div>
                <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-current opacity-30 group-hover:opacity-60 transition-opacity" style={{ width: `${score}%` }} />
                </div>
            </CardContent>
        </Card>
    )
}

