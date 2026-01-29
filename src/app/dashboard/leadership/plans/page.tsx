"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Target, ClipboardList, ShieldCheck, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { leadershipAssessments } from "@/lib/mock-data"
import { ALMF_ACTION_PLANS } from "@/lib/leadership-guidance"
import { Badge } from "@/components/ui/badge"

export default function LeadershipPlansPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/leadership">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading">Plan of Action</h1>
                    <p className="text-muted-foreground">Auto-generated Prescriptive Guidance based on recent assessments.</p>
                </div>
            </div>

            <div className="grid gap-8">
                {leadershipAssessments.map((assessment) => {
                    const avg = assessment.avgScore / 20; // Scale 100 to 5
                    let planIndex = 0;
                    if (avg >= 3 && avg < 3.8) planIndex = 1; // 3 Range
                    if (avg >= 3.8) planIndex = 2; // 4-5 Range

                    const plan = ALMF_ACTION_PLANS[planIndex];

                    return (
                        <Card key={assessment.id} className="glass-card overflow-hidden border-t-4 border-t-primary shadow-lg">
                            <CardHeader className="bg-muted/10 pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <User className="h-5 w-5 text-primary" />
                                            {assessment.hodName}
                                        </CardTitle>
                                        <CardDescription>{assessment.department} • Assessment: {assessment.period}</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant={planIndex === 0 ? "destructive" : planIndex === 1 ? "secondary" : "default"}>
                                            {plan.scoreRange}
                                        </Badge>
                                        <div className="text-sm font-bold text-muted-foreground mt-1">Score: {assessment.avgScore}%</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* HOD Actions */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 pb-2 border-b">
                                            <ClipboardList className="h-4 w-4 text-primary" />
                                            <h3 className="font-bold text-sm tracking-tight uppercase">HOD Immediate Actions</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {plan.hodActions.map((action, i) => (
                                                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground group">
                                                    <ArrowRight className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Management Actions */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 pb-2 border-b">
                                            <ShieldCheck className="h-4 w-4 text-amber-500" />
                                            <h3 className="font-bold text-sm tracking-tight uppercase">Management/Principal Actions</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {plan.managementActions.map((action, i) => (
                                                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground group">
                                                    <Target className="h-4 w-4 text-amber-500 shrink-0 transition-transform group-hover:scale-110" />
                                                    {action}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
