"use client"

import * as React from "react"
import {
    BookOpen,
    LayoutDashboard,
    LineChart,
    Settings,
    Users,
    LogOut,
    GraduationCap
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const data = {
    navMain: [
        {
            title: "Main Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Staff Directory",
            url: "/dashboard/staff",
            icon: Users,
        },
        {
            title: "Teacher Pulse",
            url: "/dashboard/evaluations",
            icon: BookOpen,
        },
        {
            title: "Vidya Pulse",
            url: "/dashboard/students",
            icon: GraduationCap,
        },
        {
            title: "Parent Pulse",
            url: "/dashboard/parent-pulse",
            icon: Users,
        },
        {
            title: "Reports",
            url: "/dashboard/reports",
            icon: LineChart,
        },
    ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    userRole?: string
}

export function AppSidebar({ userRole = 'teacher', ...props }: AppSidebarProps) {
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    // Insert Leadership Pulse for Admins
    const navItems = [...data.navMain]
    if (userRole === 'admin') {
        navItems.splice(2, 0, {
            title: "Leadership Pulse",
            url: "/dashboard/leadership",
            icon: BookOpen,
        })
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <GraduationCap className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Teacher Pulse</span>
                                <span className="truncate text-xs">Nalanda High School</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                            <LogOut />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
