"use client"

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function AcademicYearSelector() {
    return (
        <Select defaultValue="2025-26">
            <SelectTrigger className="w-[140px] h-9 xl:h-10 bg-background/50 backdrop-blur-sm border-muted">
                <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2025-26">2025-26</SelectItem>
                <SelectItem value="2026-27">2026-27</SelectItem>
                <SelectItem value="2027-28">2027-28</SelectItem>
                <SelectItem value="2028-29">2028-29</SelectItem>
                <SelectItem value="2029-30">2029-30</SelectItem>
            </SelectContent>
        </Select>
    )
}
