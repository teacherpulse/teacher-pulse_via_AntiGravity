"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StudentProfilePage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/stakeholders?tab=students">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading">Student Profile</h1>
                    <p className="text-muted-foreground">ID: {params.id}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Student Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="h-24 w-24 rounded-full bg-green-500/10 flex items-center justify-center text-3xl font-bold text-green-600 mx-auto md:mx-0">
                                S
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Name</p>
                                    <p className="font-medium">Student Name Placeholder</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Class</p>
                                    <p className="font-medium">10 - A</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-40 bg-muted/20 rounded-lg border border-dashed">
                            <p className="text-muted-foreground">Vidya Pulse Metrics Placeholder</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
