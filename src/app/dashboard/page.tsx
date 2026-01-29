"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, BookOpen, TrendingUp, Activity, BarChart3 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Mock Data ---
const teacherTrend = [
    { name: 'Jan', score: 85 }, { name: 'Feb', score: 86 }, { name: 'Mar', score: 88 },
    { name: 'Apr', score: 87 }, { name: 'May', score: 89 }, { name: 'Jun', score: 90 },
    { name: 'Jul', score: 91 }, { name: 'Aug', score: 89 }, { name: 'Sep', score: 92 },
    { name: 'Oct', score: 93 }, { name: 'Nov', score: 91 }, { name: 'Dec', score: 94 },
];

const vidyaTrend = [ // Student Pulse
    { name: 'Jan', score: 75 }, { name: 'Feb', score: 78 }, { name: 'Mar', score: 76 },
    { name: 'Apr', score: 80 }, { name: 'May', score: 82 }, { name: 'Jun', score: 81 },
    { name: 'Jul', score: 85 }, { name: 'Aug', score: 84 }, { name: 'Sep', score: 86 },
    { name: 'Oct', score: 88 }, { name: 'Nov', score: 87 }, { name: 'Dec', score: 89 },
];

const parentTrend = [
    { name: 'Jan', score: 70 }, { name: 'Feb', score: 72 }, { name: 'Mar', score: 75 },
    { name: 'Apr', score: 74 }, { name: 'May', score: 76 }, { name: 'Jun', score: 78 },
    { name: 'Jul', score: 77 }, { name: 'Aug', score: 80 }, { name: 'Sep', score: 82 },
    { name: 'Oct', score: 81 }, { name: 'Nov', score: 83 }, { name: 'Dec', score: 85 },
];

const leadershipTrend = [
    { name: 'Jan', score: 60 }, { name: 'Feb', score: 65 }, { name: 'Mar', score: 64 },
    { name: 'Apr', score: 70 }, { name: 'May', score: 75 }, { name: 'Jun', score: 72 },
    { name: 'Jul', score: 78 }, { name: 'Aug', score: 80 }, { name: 'Sep', score: 82 },
    { name: 'Oct', score: 85 }, { name: 'Nov', score: 88 }, { name: 'Dec', score: 90 },
];

// Current Averages
const avgTeacher = 88;
const avgVidya = 82;
const avgParent = 76;
const schoolPulse = Math.round((avgTeacher + avgVidya + avgParent) / 3);

// Counts
const totalTeachers = 45;
const totalStudents = 1250;
const totalParents = 2100;

// Reusable Graph Component
const PulseGraph = ({ title, data, color }: { title: string, data: any[], color: string }) => (
    <Card className="glass-card hover:shadow-lg transition-all">
        <CardHeader>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-background/90 backdrop-blur-md border border-border p-2 rounded-lg shadow-xl text-xs">
                                            <p className="font-semibold">{label}</p>
                                            <p style={{ color }}>Score: {payload[0].value}%</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area type="monotone" dataKey="score" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#color-${title})`} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">Executive Dashboard</h1>
                <p className="text-muted-foreground">Real-time overview of school performance and stakeholder engagement.</p>
            </div>

            {/* Top Row: Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* School Pulse (Aggregate) */}
                <Card className="glass-card border-l-4 border-l-primary/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity className="h-24 w-24 text-primary" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">School Pulse</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">{schoolPulse}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Aggregate Score
                        </p>
                        <div className="mt-3 flex items-center text-xs text-muted-foreground">
                            <span className="text-green-500 flex items-center mr-2">
                                <TrendingUp className="mr-1 h-3 w-3" /> +2.5%
                            </span>
                            vs last month
                        </div>
                    </CardContent>
                </Card>

                {/* Total Teachers */}
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalTeachers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Faculty members
                        </p>
                        <div className="mt-3 h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[88%] rounded-full" />
                        </div>
                        <p className="text-[10px] text-right text-muted-foreground mt-1">88% Active</p>
                    </CardContent>
                </Card>

                {/* Total Students */}
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Enrolled students
                        </p>
                        <div className="mt-3 h-1.5 w-full bg-green-500/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[92%] rounded-full" />
                        </div>
                        <p className="text-[10px] text-right text-muted-foreground mt-1">92% Attendance</p>
                    </CardContent>
                </Card>

                {/* Total Parents */}
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
                        <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalParents}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Connected guardians
                        </p>
                        <div className="mt-3 h-1.5 w-full bg-purple-500/10 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[76%] rounded-full" />
                        </div>
                        <p className="text-[10px] text-right text-muted-foreground mt-1">76% App Usage</p>
                    </CardContent>
                </Card>
            </div>

            {/* Graphs Grid */}
            <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    Performance Trends
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PulseGraph title="Leadership Pulse Trend" data={leadershipTrend} color="#f59e0b" /> {/* Amber/Orange for Leadership */}
                    <PulseGraph title="Teacher Pulse Trend" data={teacherTrend} color="hsl(var(--primary))" />
                    <PulseGraph title="Vidya Pulse Trend (Students)" data={vidyaTrend} color="#10b981" /> {/* Green for Students */}
                    <PulseGraph title="Parent Pulse Trend" data={parentTrend} color="#8b5cf6" /> {/* Purple for Parents */}
                </div>
            </div>
        </div>
    )
}
