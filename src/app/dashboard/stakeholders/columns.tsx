"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Profile, Student, Parent } from "@/types"
import { ArrowUpDown, MoreHorizontal, Mail, Phone, User, Award, GraduationCap, Baby } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const teacherColumns: ColumnDef<Profile>[] = [
    {
        id: "serialNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70"
                >
                    S.No.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center font-mono font-medium text-muted-foreground">{row.index + 1}</div>,
    },
    {
        accessorKey: "full_name", // Using full_name as per Profile type
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70"
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
                    <Link href={`/dashboard/teachers/${row.original.id}`} className="font-semibold text-foreground hover:underline hover:text-primary transition-colors">
                        {row.getValue("full_name")}
                    </Link>
                </div>
            )
        }
    },
    {
        id: "designation_role",
        accessorFn: row => `${row.designation} ${row.role}`,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70"
                >
                    Designation/Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium text-sm">{row.original.designation}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider bg-muted/40 px-1.5 py-0.5 rounded w-fit mt-0.5">{row.original.role}</span>
            </div>
        )
    },
    {
        accessorKey: "department",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70"
                >
                    Department
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium text-sm text-foreground/80">{row.getValue("department")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70"
                >
                    Email ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-3 w-3" />
                {row.getValue("email")}
            </div>
        )
    },
    {
        accessorKey: "mobile",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70"
                >
                    Mobile Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <Phone className="h-3 w-3" />
                {row.getValue("mobile")}
            </div>
        )
    },
    {
        accessorKey: "avgScore",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70"
                >
                    Average %
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const score = row.getValue("avgScore") as number
            let colorClass = "bg-primary/10 text-primary"
            if (score >= 90) colorClass = "bg-emerald-500/10 text-emerald-600 border-emerald-200"
            else if (score >= 75) colorClass = "bg-amber-500/10 text-amber-600 border-amber-200"
            else colorClass = "bg-destructive/10 text-destructive border-destructive/20"

            return (
                <div className="flex justify-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
                        {score >= 90 && <Award className="h-3 w-3" />}
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
            const teacher = row.original

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
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/leadership">Leadership Pulse</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/evaluations">Teacher Pulse</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/teachers/${teacher.id}`}>View Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

export const studentColumns: ColumnDef<Student>[] = [
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
        cell: ({ row }) => (
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
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/students">Vidya Pulse</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/students/${row.original.id}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>Academic Record</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
]

export const parentColumns: ColumnDef<Parent>[] = [
    {
        id: "serialNumber",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                S.No.
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center font-mono font-medium text-muted-foreground">{row.index + 1}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70">
                Parent Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const initials = row.original.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-primary/10 shadow-sm hover:scale-105 transition-transform">
                        <AvatarFallback className="bg-purple-50 text-purple-600 font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <Link href={`/dashboard/parents/${row.original.id}`} className="font-semibold text-foreground hover:underline hover:text-primary transition-colors">
                        {row.getValue("name")}
                    </Link>
                </div>
            )
        },
    },
    {
        accessorKey: "studentName",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal text-left font-bold text-muted-foreground/70">
                Student Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium text-muted-foreground">{row.getValue("studentName")}</div>,
    },
    {
        accessorKey: "class",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                Class
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("class")}</div>,
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
                Parent Gender
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center capitalize text-muted-foreground">{row.getValue("gender")}</div>,
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
        accessorKey: "parentPulseScore",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-auto whitespace-normal w-full justify-center text-center font-bold text-muted-foreground/70">
                Parent Pulse %
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const score = row.getValue("parentPulseScore") as number
            let colorClass = "bg-primary/10 text-primary"
            if (score >= 90) colorClass = "bg-purple-500/10 text-purple-600 border-purple-200"
            else if (score >= 75) colorClass = "bg-indigo-500/10 text-indigo-600 border-indigo-200"
            else colorClass = "bg-pink-500/10 text-pink-600 border-pink-200"

            return (
                <div className="flex justify-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
                        {score >= 90 && <Baby className="h-3 w-3" />}
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
        cell: ({ row }) => (
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
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/parent-pulse">Parent Pulse</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/parents/${row.original.id}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>Contact</DropdownMenuItem>
                        <DropdownMenuItem>Feedback History</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
]
