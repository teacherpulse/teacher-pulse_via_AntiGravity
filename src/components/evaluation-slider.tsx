"use client"

import { useFormContext } from "react-hook-form"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface EvaluationSliderProps {
    name: string
    label: string
    description?: string
    max: number
}

export function EvaluationSlider({ name, label, description, max }: EvaluationSliderProps) {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <FormItem className="rounded-lg border p-4 shadow-sm">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base font-semibold">{label}</FormLabel>
                            {description && <FormDescription>{description}</FormDescription>}
                        </div>
                        <div className="flex items-center gap-4 min-w-[200px]">
                            <span className="font-mono text-xl font-bold text-primary w-8 text-center">{value?.[0] || 0}</span>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={max}
                                    step={1}
                                    defaultValue={[0]}
                                    value={Array.isArray(value) ? value : [value]}
                                    onValueChange={onChange}
                                    className="flex-1"
                                />
                            </FormControl>
                        </div>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
