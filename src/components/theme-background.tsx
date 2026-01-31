"use client"

import React from 'react'

const ThemeBackground: React.FC = () => {
    return (
        <div
            className="fixed inset-0 w-full h-full bg-background"
            style={{ zIndex: -10 }}
            aria-hidden="true"
        />
    )
}

export default ThemeBackground
