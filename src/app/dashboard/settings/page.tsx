"use client"

import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Moon, Sun, Monitor } from "lucide-react"

const themes = [
    // Dark Collection
    { id: "royal", name: "Royal (Dark)", colors: ["bg-[#1E293B]", "bg-[#FFD700]", "bg-[#0F172A]"] },
    { id: "obsidian", name: "Obsidian (Dark)", colors: ["bg-black", "bg-white", "bg-neutral-900"] },
    { id: "amethyst", name: "Amethyst (Dark)", colors: ["bg-[#4C1D95]", "bg-[#A78BFA]", "bg-[#2E1065]"] },
    { id: "ruby", name: "Ruby (Dark)", colors: ["bg-[#7F1D1D]", "bg-[#F87171]", "bg-[#450A0A]"] },
    { id: "ocean", name: "Ocean (Dark)", colors: ["bg-[#0F766E]", "bg-[#2DD4BF]", "bg-[#134E4A]"] },

    // Light Collection
    { id: "sage", name: "Sage (Light)", colors: ["bg-[#ECFDF5]", "bg-[#059669]", "bg-white"] },
    { id: "porcelain", name: "Porcelain (Light)", colors: ["bg-[#F8FAFC]", "bg-[#1E40AF]", "bg-white"] },
    { id: "latte", name: "Latte (Light)", colors: ["bg-[#FFFBEB]", "bg-[#B45309]", "bg-white"] },
    { id: "platinum", name: "Platinum (Light)", colors: ["bg-[#F1F5F9]", "bg-[#475569]", "bg-white"] },
    { id: "blush", name: "Blush (Light)", colors: ["bg-[#FDF2F8]", "bg-[#DB2777]", "bg-white"] },
]

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-heading text-gradient-gold">Settings</h1>
                <p className="text-muted-foreground">Customize your interface experience.</p>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Theory of Design</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {themes.map((t) => (
                        <div
                            key={t.id}
                            className={`cursor-pointer group relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${theme === t.id ? "border-primary ring-2 ring-primary/20 scale-[1.02]" : "border-transparent hover:border-primary/50"
                                }`}
                            onClick={() => setTheme(t.id)}
                        >
                            <div className="aspect-[3/2] w-full flex">
                                <div className={`h-full w-1/3 ${t.colors[0]}`} />
                                <div className={`h-full w-1/3 ${t.colors[1]}`} />
                                <div className={`h-full w-1/3 ${t.colors[2]}`} />
                            </div>
                            <div className="p-3 bg-card/90 backdrop-blur-sm border-t">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm">{t.name}</span>
                                    {theme === t.id && <Check className="h-4 w-4 text-primary" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
