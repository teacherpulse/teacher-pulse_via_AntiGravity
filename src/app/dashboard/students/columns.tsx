"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Student } from "@/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Activity, Phone, GraduationCap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const columns: ColumnDef<Student>[] = [
    {
        id: "serialNumber",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                    S.No.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center font-mono font-medium text-muted-foreground">{row.index + 1}</div>,
    },
    {
        accessorKey: "full_name",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70">
                Student Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const initials = row.original.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-primary/10 shadow-sm hover:scale-105 transition-transform">
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <Link href={`/dashboard/students/${row.original.id}`} className="font-semibold text-foreground hover:underline hover:text-primary transition-colors">
                        {row.getValue("full_name")}
                    </Link>
                </div>
            )
        },
    },
    {
        accessorKey: "grade_level",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                Class
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("grade_level")}</div>,
    },
    {
        accessorKey: "section",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                Section
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("section")}</div>,
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                Gender
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center capitalize text-muted-foreground">{row.getValue("gender")}</div>,
    },
    {
        accessorKey: "fatherName",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70">
                Father Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-muted-foreground">{row.getValue("fatherName")}</div>,
    },
    {
        accessorKey: "motherName",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70">
                Mother Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-muted-foreground">{row.getValue("motherName")}</div>,
    },
    {
        accessorKey: "mobile",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70">
                Mobile Number
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <Phone className="h-3 w-3" />
                {row.getValue("mobile")}
            </div>
        )
    },
    {
        accessorKey: "vidyaPulseScore",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                Vidya Pulse %
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const score = row.getValue("vidyaPulseScore") as number
            let colorClass = "bg-primary/10 text-primary"
            if (score >= 90) colorClass = "bg-emerald-500/10 text-emerald-600 border-emerald-200"
            else if (score >= 75) colorClass = "bg-amber-500/10 text-amber-600 border-amber-200"
            else colorClass = "bg-destructive/10 text-destructive border-destructive/20"

            return (
                <div className="flex justify-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
                        {score >= 90 && <GraduationCap className="h-3 w-3" />}
                        {score}%
                    </span>
                </div>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div className="text-right font-bold text-muted-foreground/70">Action</div>,
        cell: ({ row }) => {
            const student = row.original

            return (
                <div className="text-right">
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
                                onClick={() => navigator.clipboard.writeText(student.id)}
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/students/new?studentId=${student.id}&type=vidya_pulse`} className="flex items-center cursor-pointer text-indigo-600 font-medium">
                                    <Activity className="mr-2 h-4 w-4" />
                                    Student Diagnostic
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/students/new?studentId=${student.id}&type=parent_pulse`} className="flex items-center cursor-pointer text-pink-600 font-medium">
                                    <Activity className="mr-2 h-4 w-4" />
                                    Parent Pulse
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
