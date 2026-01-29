"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Profile } from "@/types"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
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
        accessorKey: "avatar_url",
        header: "",
        cell: ({ row }) => {
            const initials = row.original.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            return (
                <Avatar>
                    <AvatarImage src={row.getValue("avatar_url")} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            )
        }
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
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <span className="capitalize">{row.getValue("role")}</span>
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
