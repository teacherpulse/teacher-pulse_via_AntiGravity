"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/stakeholders">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading">Teacher Profile</h1>
                    <p className="text-muted-foreground">ID: {params.id}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mx-auto md:mx-0">
                                T
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Name</p>
                                    <p className="font-medium">Teacher Name Placeholder</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Designation</p>
                                    <p className="font-medium">Subject Teacher</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Department</p>
                                    <p className="font-medium">High School</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Email</p>
                                    <p className="font-medium">teacher@example.com</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center h-40 bg-muted/20 rounded-lg border border-dashed">
                            <p className="text-muted-foreground">Performance Chart Placeholder</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
