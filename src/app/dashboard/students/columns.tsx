"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Student } from "@/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Activity } from "lucide-react"
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
        accessorKey: "admission_number",
        header: "Adm No",
    },
    {
        accessorKey: "full_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "grade_level",
        header: "Grade",
    },
    {
        accessorKey: "section",
        header: "Section",
    },
    {
        accessorKey: "age_group",
        header: "Age Group",
        cell: ({ row }) => {
            const group = row.getValue("age_group") as string
            return (
                <span className={`px-2 py-1 rounded text-xs font-medium ${group === 'age_3_6' ? 'bg-blue-100 text-blue-800' :
                    group === 'age_6_10' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                    }`}>
                    {group === 'age_3_6' ? '3-6 Yrs' : group === 'age_6_10' ? '6-10 Yrs' : '11-16 Yrs'}
                </span>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const student = row.original

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
            )
        },
    },
]
