"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ListChecks, Target, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { teacherData } from "@/lib/mock-data"
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock trend data for HODs
const mockTrends = [
    { name: 'Jul', score: 75 },
    { name: 'Aug', score: 78 },
    { name: 'Sep', score: 76 },
    { name: 'Oct', score: 82 },
    { name: 'Nov', score: 85 },
    { name: 'Dec', score: 88 },
    { name: 'Jan', score: 92 },
]

export default function LeadershipPage() {
    const hods = teacherData.filter(t =>
        t.role === 'HOD' ||
        t.designation.includes('Principal') ||
        t.designation.includes('HOD')
    )

    const overallAvg = Math.round(hods.reduce((acc, curr) => acc + curr.avgScore, 0) / hods.length)

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-heading">Leadership Pulse (ALMF)</h1>
                        <p className="text-muted-foreground">Academic Leadership Management Framework for HODs.</p>
                    </div>
                    <div>
                        <Link href="/dashboard/leadership/new">
                            <Button variant="default" className="shadow-lg shadow-primary/20">
                                <Plus className="mr-2 h-4 w-4" /> Create Assessment
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Directory-style Navigation */}
                <div className="flex p-1 bg-muted/40 backdrop-blur-sm border border-border/50 rounded-lg w-fit">
                    <Link href="/dashboard/leadership/assessments" className="block">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-md px-4 py-2 h-9 text-sm font-medium hover:bg-background/50"
                        >
                            <ListChecks className="mr-2 h-4 w-4 text-primary" />
                            HODs Assessments
                        </Button>
                    </Link>
                    <Link href="/dashboard/leadership/plans" className="block">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-md px-4 py-2 h-9 text-sm font-medium hover:bg-background/50"
                        >
                            <Target className="mr-2 h-4 w-4 text-amber-500" />
                            Plan of Action
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Overall Performance Card */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="glass-card border-t-4 border-t-primary shadow-xl md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Overall Leadership Performance
                        </CardTitle>
                        <CardDescription>Aggregate Average of All HODs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-primary">{overallAvg}%</span>
                            <span className="text-sm text-green-500 font-medium">↑ 3.2% vs last term</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total HODs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            {hods.length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Individual HOD Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold font-heading px-1">HOD Performance Tracking</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {hods.map((hod) => (
                        <Card key={hod.id} className="glass-card hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base group-hover:text-primary transition-colors">{hod.full_name}</CardTitle>
                                        <CardDescription className="text-xs line-clamp-1">{hod.department}</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-primary">{hod.avgScore}%</div>
                                        <div className="text-[10px] text-muted-foreground">Avg Score</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-2 pt-2 pb-1">
                                <div className="h-[140px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mockTrends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id={`colorScore-${hod.id}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }}
                                            />
                                            <YAxis
                                                domain={[0, 100]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }}
                                            />
                                            <Tooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-background/90 border p-1 rounded-md text-[10px] shadow-sm">
                                                                {payload[0].value}%
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="score"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth={2}
                                                fillOpacity={1}
                                                fill={`url(#colorScore-${hod.id})`}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

