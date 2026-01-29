"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, GraduationCap, Users, BarChart3 } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="space-y-8 p-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">Reports & Analytics</h1>
                <p className="text-muted-foreground">Comprehensive insights across all school modules.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Teacher Reports */}
                <Card className="glass-card hover:shadow-xl transition-all border-l-4 border-l-primary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Teacher Reports
                        </CardTitle>
                        <CardDescription>
                            Analytics from Leadership & Teacher Pulse.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-32 bg-primary/5 rounded-lg flex items-center justify-center border border-primary/10">
                            <BarChart3 className="h-16 w-16 text-primary/20" />
                        </div>
                        <p className="text-sm text-muted-foreground min-h-[3rem]">
                            Evaluation summaries, classroom observations, and professional development metrics.
                        </p>
                        <div className="grid gap-2">
                            <Link href="/dashboard/leadership" className="w-full">
                                <Button variant="outline" className="w-full justify-start hover:border-primary/50 hover:bg-primary/5">
                                    <BookOpen className="mr-2 h-4 w-4" /> Leadership Pulse
                                </Button>
                            </Link>
                            <Link href="/dashboard/evaluations" className="w-full">
                                <Button className="w-full justify-start">
                                    <BookOpen className="mr-2 h-4 w-4" /> Teacher Pulse
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Student Reports */}
                <Card className="glass-card hover:shadow-xl transition-all border-l-4 border-l-green-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
                            Student Reports
                        </CardTitle>
                        <CardDescription>
                            Academic insights from Vidya Pulse.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-32 bg-green-500/5 rounded-lg flex items-center justify-center border border-green-500/10">
                            <BarChart3 className="h-16 w-16 text-green-500/20" />
                        </div>
                        <p className="text-sm text-muted-foreground min-h-[3rem]">
                            Student progress reports, attendance records, and Vidya Pulse scores per class.
                        </p>
                        <Link href="/dashboard/students">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                                <GraduationCap className="mr-2 h-4 w-4" /> View Vidya Pulse
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Parent Reports */}
                <Card className="glass-card hover:shadow-xl transition-all border-l-4 border-l-purple-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            Parent Reports
                        </CardTitle>
                        <CardDescription>
                            Engagement metrics from Parent Pulse.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-32 bg-purple-500/5 rounded-lg flex items-center justify-center border border-purple-500/10">
                            <BarChart3 className="h-16 w-16 text-purple-500/20" />
                        </div>
                        <p className="text-sm text-muted-foreground min-h-[3rem]">
                            Parent satisfaction surveys, feedback trends, and communication touchpoints.
                        </p>
                        <Link href="/dashboard/parent-pulse">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
                                <Users className="mr-2 h-4 w-4" /> View Parent Pulse
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
