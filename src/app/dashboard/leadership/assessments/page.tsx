"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, FileText, Calendar, User, BarChart } from "lucide-react"
import Link from "next/link"
import { leadershipAssessments } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function LeadershipAssessmentsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/leadership">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading">HODs Assessments</h1>
                    <p className="text-muted-foreground">Historical record of all Academic Leadership assessments.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {leadershipAssessments.map((assessment) => (
                    <Card key={assessment.id} className="glass-card overflow-hidden border-l-4 border-l-primary/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/30">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-mono">{assessment.id}</Badge>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> {assessment.date}
                                    </span>
                                </div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    {assessment.hodName}
                                </CardTitle>
                                <CardDescription>{assessment.department} • {assessment.period}</CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-primary">{assessment.avgScore}%</div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Overall Score</div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Scores Pillar */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2 border-b pb-2">
                                        <BarChart className="h-4 w-4 text-primary" />
                                        Framework Scores (ALMF)
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ScoreMetric label="Instructional Supervision" score={assessment.scores.instructional_supervision} />
                                        <ScoreMetric label="Operational Rigor" score={assessment.scores.operational_rigor} />
                                        <ScoreMetric label="Data-Driven Strategy" score={assessment.scores.data_driven_strategy} />
                                        <ScoreMetric label="Team Culture & Integrity" score={assessment.scores.team_culture_integrity} />
                                        <ScoreMetric label="HOD Audit Log Quality" score={assessment.scores.hod_audit_log} highlighted />
                                    </div>
                                    <div className="mt-4 p-3 rounded-lg bg-muted/20 border text-sm italic">
                                        <span className="font-semibold not-italic block mb-1">Principal's Notes:</span>
                                        "{assessment.notes}"
                                    </div>
                                </div>

                                {/* Audit Log Evidence */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2 border-b pb-2">
                                        <FileText className="h-4 w-4 text-amber-500" />
                                        Audit Log (Primary Evidence)
                                    </h3>
                                    <div className="h-[200px] pr-4 overflow-y-auto custom-scrollbar">
                                        <div className="space-y-4">
                                            <EvidenceSection
                                                title="The Error Catch"
                                                content={assessment.auditLog.errorCatch}
                                            />
                                            <Separator />
                                            <EvidenceSection
                                                title="The Observation"
                                                content={assessment.auditLog.observation}
                                            />
                                            <Separator />
                                            <EvidenceSection
                                                title="The Data"
                                                content={assessment.auditLog.data}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function ScoreMetric({ label, score, highlighted = false }: { label: string, score: number, highlighted?: boolean }) {
    const colors = [
        "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"
    ]
    return (
        <div className={`p-2 rounded border ${highlighted ? 'border-primary/50 bg-primary/5' : 'bg-background'}`}>
            <p className="text-[10px] text-muted-foreground uppercase leading-tight h-6 mb-1">{label}</p>
            <div className="flex items-center gap-2">
                <div className={`text-lg font-bold ${highlighted ? 'text-primary' : ''}`}>
                    {score} <small className="text-[10px] font-normal text-muted-foreground">/ 5</small>
                </div>
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${colors[score - 1]}`} style={{ width: `${(score / 5) * 100}%` }} />
                </div>
            </div>
        </div>
    )
}

function EvidenceSection({ title, content }: { title: string, content: string }) {
    return (
        <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase">{title}</p>
            <p className="text-sm leading-relaxed">{content}</p>
        </div>
    )
}
