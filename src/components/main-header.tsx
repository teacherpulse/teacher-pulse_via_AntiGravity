"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SearchCommand } from "./search-command"
import { UserNav } from "./user-nav"
import { AcademicYearSelector } from "./academic-year-selector"
import { School } from "lucide-react"

export function MainHeader() {
    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-[width,height] ease-linear">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-lg">
                        <School className="h-5 w-5 text-primary" />
                    </div>
                    <div className="hidden md:flex flex-row items-baseline gap-2">
                        <span className="text-base font-bold leading-none tracking-tight">Teacher Pulse</span>
                        <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider opacity-70">•</span>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">Nalanda High School</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <AcademicYearSelector />
                <div className="flex items-center gap-1 md:gap-2">
                    <SearchCommand />
                    <UserNav />
                </div>
            </div>
        </header>
    )
}
