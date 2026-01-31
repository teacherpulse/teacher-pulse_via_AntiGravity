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
            title: "Stakeholders Directory",
            url: "/dashboard/stakeholders",
            icon: Users,
        },
        {
            title: "Leadership Pulse",
            url: "/dashboard/leadership",
            icon: BookOpen,
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
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
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
        router.push('/login')
    }

    const navItems = [...data.navMain]

    return (
        <Sidebar collapsible="icon" className="border-r-0 bg-background/20 backdrop-blur-2xl shadow-xl" {...props}>
            <SidebarContent className="px-2">
                <SidebarMenu className="gap-2">
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} className="rounded-lg px-3 py-2.5 hover:bg-primary/10 hover:text-primary transition-all duration-300 group">
                                <a href={item.url} className="flex items-center gap-3 font-medium">
                                    <item.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out" className="hover:bg-destructive/10 hover:text-destructive transition-colors">
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
