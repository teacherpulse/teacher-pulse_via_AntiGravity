"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface FeaturesContextType {
    neuralNetworksEnabled: boolean
    widgetsPulsingEnabled: boolean
    setNeuralNetworksEnabled: (enabled: boolean) => void
    setWidgetsPulsingEnabled: (enabled: boolean) => void
}

const FeaturesContext = createContext<FeaturesContextType | undefined>(undefined)

export const FeaturesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [neuralNetworksEnabled, setNeuralNetworksEnabled] = useState(true)
    const [widgetsPulsingEnabled, setWidgetsPulsingEnabled] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const storedNeural = localStorage.getItem("feature_neural_networks")
        const storedPulsing = localStorage.getItem("feature_widgets_pulsing")

        if (storedNeural !== null) setNeuralNetworksEnabled(storedNeural === "true")
        if (storedPulsing !== null) setWidgetsPulsingEnabled(storedPulsing === "true")

        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("feature_neural_networks", String(neuralNetworksEnabled))
        }
    }, [neuralNetworksEnabled, mounted])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("feature_widgets_pulsing", String(widgetsPulsingEnabled))
        }
    }, [widgetsPulsingEnabled, mounted])

    return (
        <FeaturesContext.Provider
            value={{
                neuralNetworksEnabled,
                widgetsPulsingEnabled,
                setNeuralNetworksEnabled,
                setWidgetsPulsingEnabled,
            }}
        >
            {children}
        </FeaturesContext.Provider>
    )
}

export const useFeatures = () => {
    const context = useContext(FeaturesContext)
    if (context === undefined) {
        throw new Error("useFeatures must be used within a FeaturesProvider")
    }
    return context
}
