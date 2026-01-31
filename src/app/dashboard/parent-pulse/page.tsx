"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserX, Plus } from "lucide-react"
import Link from "next/link"

export default function ParentPulsePage() {
    const [viewStatus, setViewStatus] = useState<"active" | "inactive">("active")

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-heading">Parent Pulse</h1>
                    <p className="text-muted-foreground">Parental engagement tracking and feedback analysis.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/parent-pulse/assess">
                        <Button className="h-8 gap-2 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
                            <Plus className="h-4 w-4" /> Assess Parent
                        </Button>
                    </Link>
                    <div className="h-8 w-px bg-border mx-1" />
                    <Button
                        variant={viewStatus === 'active' ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewStatus('active')}
                        className="h-8 gap-2"
                    >
                        <Users className="h-4 w-4" /> Active Parents
                    </Button>
                    <Button
                        variant={viewStatus === 'inactive' ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewStatus('inactive')}
                        className="h-8 gap-2 text-muted-foreground"
                    >
                        <UserX className="h-4 w-4" /> Inactive Parents
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Feedback Received</CardTitle>
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">Past 30 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
                    </CardHeader>
                    <CardContent className="animate-heartbeat">
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">Average rating</p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder for Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>{viewStatus === 'active' ? 'Recent Feedback' : 'Archived Parent Records'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-24 flex items-center justify-center text-muted-foreground text-sm border border-dashed rounded-lg">
                        {viewStatus === 'active'
                            ? "No feedback records found."
                            : "No inactive parent records found."
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
