"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Profile } from "@/types"
import { ArrowUpDown, MoreHorizontal, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const columns: ColumnDef<Profile>[] = [
    {
        id: "serialNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal w-full justify-center text-center"
                >
                    S.No.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center font-mono font-medium text-muted-foreground">{row.index + 1}</div>,
    },
    {
        accessorKey: "full_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal text-left"
                >
                    Teacher Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const initials = row.original.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-primary/10 shadow-sm transition-transform hover:scale-105">
                        <AvatarImage src={row.original.avatar_url} />
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-foreground">{row.getValue("full_name")}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <span className="capitalize text-xs font-semibold tracking-wide text-muted-foreground bg-muted/30 px-2 py-1 rounded">{row.getValue("role")}</span>
    },
    {
        accessorKey: "department",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal text-left"
                >
                    Department
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium text-sm text-foreground/80">{row.getValue("department")}</div>,
    },
    {
        accessorKey: "module_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal w-full justify-center text-center"
                >
                    Name of the Module assessed
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const moduleName = row.getValue("module_name") as string
            const colors: Record<string, string> = {
                "CTM": "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
                "LTO": "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
                "PIE": "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200",
                "Leadership Pulse": "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
            }
            return (
                <div className="flex justify-center">
                    <Badge variant="outline" className={`px-3 py-1 border shadow-sm ${colors[moduleName] || "bg-secondary"}`}>
                        {moduleName}
                    </Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "current_assessment_score",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal w-full justify-center text-center"
                >
                    Average % of Current Assessment
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const score = row.getValue("current_assessment_score") as number
            let colorClass = "text-muted-foreground"
            if (score >= 90) colorClass = "text-emerald-600 font-bold"
            else if (score >= 75) colorClass = "text-amber-600 font-semibold"
            else colorClass = "text-destructive font-semibold"

            return (
                <div className="flex justify-center items-center gap-2">
                    {score >= 90 && <Award className="h-3 w-3 text-emerald-500" />}
                    <span className={colorClass}>{score}%</span>
                </div>
            )
        }
    },
    {
        accessorKey: "total_average_current_year",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal w-full justify-center text-center"
                >
                    Total Average % of the Teacher for Current Academic Year
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const score = row.getValue("total_average_current_year") as number
            let bgClass = "bg-muted"
            if (score >= 90) bgClass = "bg-emerald-500"
            else if (score >= 75) bgClass = "bg-amber-500"
            else bgClass = "bg-destructive"

            return (
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="font-bold text-sm">{score}%</span>
                    <div className="h-1 w-12 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${bgClass}`} style={{ width: `${score}%` }} />
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "assessment_date",
        header: () => <div className="text-center">Date and Time of Assessment</div>,
        cell: ({ row }) => (
            <div className="text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
                <Calendar className="h-3 w-3 opacity-70" />
                {row.getValue("assessment_date")}
            </div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const teacher = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(teacher.id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Performance</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href={`/dashboard/evaluations/new?teacherId=${teacher.id}`}>New Evaluation</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
