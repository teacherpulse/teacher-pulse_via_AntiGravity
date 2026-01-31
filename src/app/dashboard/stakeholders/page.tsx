"use client"


import Link from "next/link"
import { AddStudentDialog } from "@/components/add-student-dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus, Users, TrendingUp, AlertCircle, CheckCircle2, XCircle, UserX } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { DataTable } from "@/components/data-table"
import { teacherColumns, studentColumns, parentColumns } from "./columns"

// --- Mock Data Generators ---
import { teacherData, studentData, parentData } from "@/lib/mock-data"

// --- Mock Data Generators ---
import { createClient } from "@/lib/supabase/client"
import { Student } from "@/types"
import { useEffect, useState } from "react"

const performanceTrend = [
    { name: 'Jan', score: 65 }, { name: 'Feb', score: 72 }, { name: 'Mar', score: 68 },
    { name: 'Apr', score: 75 }, { name: 'May', score: 82 }, { name: 'Jun', score: 80 },
    { name: 'Jul', score: 85 }, { name: 'Aug', score: 88 }, { name: 'Sep', score: 86 },
    { name: 'Oct', score: 90 }, { name: 'Nov', score: 89 }, { name: 'Dec', score: 92 },
];

const teacherStats = { total: 34, active: 34, avg: 85, green: 25, yellow: 5, orange: 2, red: 2 };
// Calculated stats placeholder - in real app would calculate from DB
const parentStats = { total: 2100, active: 1950, avg: 76, green: 1600, yellow: 200, orange: 150, red: 150 };

// ... existing code ...

const attentionListTeachers = [
    { name: 'Kausar Begum', score: 45 },
    { name: 'Sadiya Sultana', score: 48 },
];
const attentionListStudents = [
    { name: 'Bart Simpson', score: 35 },
    { name: 'Eric Cartman', score: 42 },
];
const attentionListParents = [
    { name: 'Homer Simpson', score: 40 },
    { name: 'Peter Griffin', score: 38 },
];

// ... existing code ...

// --- Reusable Components ---
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

function DirectoryWidgets({ stats, chartData, attentionList, type }: { stats: any, chartData: any[], attentionList: any[], type: string }) {
    return (
        <div className="space-y-6 mb-8">
            {/* Top Row: Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total {type}</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground">Registered in directory</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active vs Total</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold">{stats.active} <span className="text-muted-foreground text-sm font-normal">/ {stats.total}</span></div>
                        <p className="text-xs text-muted-foreground">Currently active users</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average % of {type}</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold text-primary">{stats.avg}%</div>
                        <p className="text-xs text-muted-foreground">Directory-wide average</p>
                    </CardContent>
                </Card>
            </div>

            {/* Middle Row: Graph & Attention List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Curve Graph */}
                <Card className="glass-card lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Performance Trend</CardTitle>
                        <CardDescription>Average score over the last 12 months.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
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

                {/* Attention Required */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <AlertCircle className="h-5 w-5" /> Attention Required
                        </CardTitle>
                        <CardDescription>Profiles scoring below 50%</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {attentionList.length > 0 ? (
                            <div className="space-y-4">
                                {attentionList.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{item.name}</span>
                                            <span className="text-xs text-muted-foreground">Critical Status</span>
                                        </div>
                                        <div className="text-red-500 font-bold text-sm">{item.score}%</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                                <CheckCircle2 className="h-8 w-8 mb-2 text-green-500" />
                                <p>All Clear!</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
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
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.green}</p>
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
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.yellow}</p>
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
                            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.orange}</p>
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
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.red}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function StakeholdersPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [teacherStatus, setTeacherStatus] = useState<"active" | "inactive">("active")
    const [studentStatus, setStudentStatus] = useState<"active" | "inactive">("active")
    const [parentStatus, setParentStatus] = useState<"active" | "inactive">("active")
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
                // Gender-based Parent Mapping
                fatherName: s.parent_gender === 'Male' || (!s.parent_gender && !s.motherName) ? s.parent_name : s.fatherName,
                motherName: s.parent_gender === 'Female' ? s.parent_name : s.motherName,
                mobile: s.parent_contact_number || s.mobile,
                vidyaPulseScore: s.vidyaPulseScore || Math.floor(Math.random() * (98 - 75) + 75),
                status: s.status || 'active'
            })) as Student[]
            setStudents(mappedData || [])
        }
        setLoading(false)
    }

    // Dynamic stats based on real data
    const studentStats = {
        total: students.length,
        active: students.length,
        avg: 82,
        green: students.filter(s => (s.vidyaPulseScore || 0) >= 75).length,
        yellow: students.filter(s => (s.vidyaPulseScore || 0) >= 60 && (s.vidyaPulseScore || 0) < 75).length,
        orange: students.filter(s => (s.vidyaPulseScore || 0) >= 50 && (s.vidyaPulseScore || 0) < 60).length,
        red: students.filter(s => (s.vidyaPulseScore || 0) < 50).length
    };

    // Filters
    const filteredTeachers = teacherData.filter((t: any) =>
        teacherStatus === 'active' ? (t.status !== 'inactive') : (t.status === 'inactive')
    )

    // For students, use the 'status' field mapped from Supabase or default 'active'
    const filteredStudents = students.filter(s =>
        studentStatus === 'active' ? (s.status === 'active' || !s.status) : s.status === 'inactive'
    )

    const filteredParents = parentData.filter((p: any) =>
        parentStatus === 'active' ? (p.status !== 'inactive') : (p.status === 'inactive')
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">Stakeholders Directory</h1>
                    <p className="text-muted-foreground">Manage details for teachers, students, and parents.</p>
                </div>
            </div>

            <Tabs defaultValue="teachers" className="space-y-4">
                <TabsList className="bg-muted/50 p-1 rounded-xl">
                    <TabsTrigger value="teachers" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">Teacher Directory</TabsTrigger>
                    <TabsTrigger value="students" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">Students Directory</TabsTrigger>
                    <TabsTrigger value="parents" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">Parents Directory</TabsTrigger>
                </TabsList>

                {/* TEACHER TAB */}
                <TabsContent value="teachers">
                    <DirectoryWidgets stats={teacherStats} chartData={performanceTrend} attentionList={attentionListTeachers} type="Teachers" />

                    <Card className="glass-card">
                        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 pb-6 gap-4">
                            <div className="space-y-1.5 w-full sm:w-auto">
                                <CardTitle>Teacher Directory</CardTitle>
                                <CardDescription>View and manage all teacher details.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Button
                                    variant={teacherStatus === 'active' ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setTeacherStatus('active')}
                                    className="h-9 gap-2"
                                >
                                    <Users className="h-4 w-4" /> Active
                                </Button>
                                <Button
                                    variant={teacherStatus === 'inactive' ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setTeacherStatus('inactive')}
                                    className="h-9 gap-2 text-muted-foreground"
                                >
                                    <UserX className="h-4 w-4" /> Inactive
                                </Button>
                                <Button className="bg-primary text-primary-foreground shadow-lg hover:brightness-110 transition-all ml-2">
                                    <Plus className="mr-2 h-4 w-4" /> Add New
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={teacherColumns} data={filteredTeachers} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* STUDENTS TAB */}
                <TabsContent value="students">
                    <DirectoryWidgets stats={studentStats} chartData={performanceTrend} attentionList={attentionListStudents} type="Students" />

                    <Card className="glass-card">
                        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 pb-6 gap-4">
                            <div className="space-y-1.5 w-full sm:w-auto">
                                <CardTitle>Students Directory</CardTitle>
                                <CardDescription>View student profile and academic metrics.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Button
                                    variant={studentStatus === 'active' ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setStudentStatus('active')}
                                    className="h-9 gap-2"
                                >
                                    <Users className="h-4 w-4" /> Active
                                </Button>
                                <Button
                                    variant={studentStatus === 'inactive' ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setStudentStatus('inactive')}
                                    className="h-9 gap-2 text-muted-foreground"
                                >
                                    <UserX className="h-4 w-4" /> Inactive
                                </Button>
                                <AddStudentDialog
                                    trigger={
                                        <Button className="bg-primary text-primary-foreground shadow-lg hover:brightness-110 transition-all ml-2">
                                            <Plus className="mr-2 h-4 w-4" /> Add New
                                        </Button>
                                    }
                                    onStudentAdded={() => window.location.reload()}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={studentColumns} data={filteredStudents} />
                            {loading && <div className="p-4 text-center text-muted-foreground">Loading specific data...</div>}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PARENTS TAB */}
                <TabsContent value="parents">
                    <DirectoryWidgets stats={parentStats} chartData={performanceTrend} attentionList={attentionListParents} type="Parents" />

                    <Card className="glass-card">
                        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 pb-6 gap-4">
                            <div className="space-y-1.5 w-full sm:w-auto">
                                <CardTitle>Parents Directory</CardTitle>
                                <CardDescription>Connect with student guardians.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Button
                                    variant={parentStatus === 'active' ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setParentStatus('active')}
                                    className="h-9 gap-2"
                                >
                                    <Users className="h-4 w-4" /> Active
                                </Button>
                                <Button
                                    variant={parentStatus === 'inactive' ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setParentStatus('inactive')}
                                    className="h-9 gap-2 text-muted-foreground"
                                >
                                    <UserX className="h-4 w-4" /> Inactive
                                </Button>
                                <Button className="bg-primary text-primary-foreground shadow-lg hover:brightness-110 transition-all ml-2">
                                    <Plus className="mr-2 h-4 w-4" /> Add New
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={parentColumns} data={filteredParents} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
