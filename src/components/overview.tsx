"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const data = [
    {
        name: "CTM",
        total: 3.8,
    },
    {
        name: "CQI",
        total: 4.2,
    },
    {
        name: "LTO",
        total: 3.5,
    },
    {
        name: "PIE",
        total: 4.5,
    },
]

export function Overview() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>School-Wide Performance</CardTitle>
                <CardDescription>Average scores across all modules</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                            domain={[0, 5]}
                        />
                        <Bar
                            dataKey="total"
                            fill="currentColor"
                            radius={[4, 4, 0, 0]}
                            className="fill-primary"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
