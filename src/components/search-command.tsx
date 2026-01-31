"use client"

import * as React from "react"
import { Search } from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export function SearchCommand() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 xl:h-10 xl:w-10 rounded-full"
                onClick={() => setOpen(true)}
            >
                <Search className="h-4 w-4 xl:h-5 xl:w-5" />
                <span className="sr-only">Search</span>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a name to search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Students">
                        <div className="px-2 py-1.5 text-xs text-muted-foreground">Recent searches...</div>
                        {/* Mock Data */}
                        <CommandItem>Aarav Patel (Class 10A)</CommandItem>
                        <CommandItem>Ishaan Kumar (Class 9B)</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Teachers">
                        <CommandItem>Priya Sharma (Mathematics)</CommandItem>
                        <CommandItem>Rahul Singh (Physics)</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
