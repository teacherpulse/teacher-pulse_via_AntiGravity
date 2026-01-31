"use client"

import { useEffect } from "react"
import { useFeatures } from "./features-provider"

export const FeaturesEffect: React.FC = () => {
    const { widgetsPulsingEnabled } = useFeatures()

    useEffect(() => {
        if (!widgetsPulsingEnabled) {
            document.documentElement.classList.add("no-pulsing")
        } else {
            document.documentElement.classList.remove("no-pulsing")
        }
    }, [widgetsPulsingEnabled])

    return null
}
