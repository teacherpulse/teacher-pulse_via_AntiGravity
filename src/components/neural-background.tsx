"use client"

import { useRef, useEffect, useState, useMemo } from 'react'
import { useFeatures } from './features-provider'

const NeuralBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { neuralNetworksEnabled } = useFeatures()

    useEffect(() => {
        if (!neuralNetworksEnabled) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        let width: number
        let height: number
        const dpr = window.devicePixelRatio || 1
        const mouse = { x: -1000, y: -1000 } // Initially off-screen

        const setCanvasSize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.scale(dpr, dpr)
        }

        setCanvasSize()

        const particles: Particle[] = []
        const particleCount = 140 // Slightly more
        const connectionDistance = 180 // Sharper connections
        const speedScale = 0.045 // Increased by 20% from 0.0375
        const attractionRadius = 250
        const attractionForce = 0.015 // Maintain subtle feel
        const redistributionForce = 0.00005 // Maintain free movement fluidity

        // Metallic & AI Palette
        const metalColors = [
            '#FFD700', // Gold
            '#B87333', // Copper
            '#C0C0C0', // Silver
            '#E5E4E2'  // Platinum
        ]
        const neonColors = [
            '#00f2ff', // Electric Cyan
            '#7000ff', // Vivid Purple
            '#0066ff'  // Tech Blue
        ]

        class Particle {
            x: number
            y: number
            baseX: number
            baseY: number
            vx: number
            vy: number
            size: number
            color: string
            isMetallic: boolean
            connectionSeed: number

            constructor(gridX: number, gridY: number, cellWidth: number, cellHeight: number) {
                this.baseX = gridX * cellWidth + (Math.random() * cellWidth)
                this.baseY = gridY * cellHeight + (Math.random() * cellHeight)
                this.x = this.baseX
                this.y = this.baseY

                this.vx = (Math.random() - 0.5) * speedScale
                this.vy = (Math.random() - 0.5) * speedScale

                this.isMetallic = Math.random() > 0.6
                this.size = this.isMetallic ? (Math.random() * 1.5 + 1.5) : (Math.random() * 1.2 + 0.8)
                this.color = this.isMetallic
                    ? metalColors[Math.floor(Math.random() * metalColors.length)]
                    : neonColors[Math.floor(Math.random() * neonColors.length)]
                this.connectionSeed = Math.random() * 100
            }

            update() {
                // 1. Mouse Attraction (Subtle)
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < attractionRadius) {
                    const angle = Math.atan2(dy, dx)
                    this.vx += Math.cos(angle) * 0.015 // Refined subtle attraction
                    this.vy += Math.sin(angle) * 0.015
                }

                // 2. Continuous "Wander" force to keep them moving
                this.vx += (Math.random() - 0.5) * 0.0015
                this.vy += (Math.random() - 0.5) * 0.0015

                // 3. Home Bias: Drastically reduced to let them move freely
                // Only a tiny nudge to keep them from all clumping in one corner over time
                const hx = this.baseX - this.x
                const hy = this.baseY - this.y
                this.vx += hx * redistributionForce
                this.vy += hy * redistributionForce

                // 4. Energy Maintenance: Gently push speed toward speedScale
                // This prevents them from "sticking" or stopping
                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
                if (currentSpeed > 0) {
                    const ratio = speedScale / currentSpeed
                    this.vx = this.vx * 0.92 + (this.vx * ratio) * 0.08
                    this.vy = this.vy * 0.92 + (this.vy * ratio) * 0.08
                }

                this.x += this.vx
                this.y += this.vy

                // World Bounce
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1

                this.connectionSeed += 0.03
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

                // No blur for maximum sharpness as requested
                ctx.shadowBlur = 0

                if (this.isMetallic) {
                    const grad = ctx.createRadialGradient(this.x - this.size / 2, this.y - this.size / 2, 0, this.x, this.y, this.size)
                    grad.addColorStop(0, '#FFFFFF')
                    grad.addColorStop(0.4, this.color)
                    grad.addColorStop(1, '#000000') // Darker edges for metallic depth
                    ctx.fillStyle = grad
                } else {
                    ctx.fillStyle = this.color
                }

                ctx.fill()
            }
        }

        const init = () => {
            particles.length = 0
            const columns = Math.ceil(Math.sqrt(particleCount * (width / height)))
            const rows = Math.ceil(particleCount / columns)
            const cellWidth = width / columns
            const cellHeight = height / rows

            let p = 0
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    if (p < particleCount) {
                        particles.push(new Particle(c, r, cellWidth, cellHeight))
                        p++
                    }
                }
            }
        }

        let animationFrameId: number

        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()

                let connectionCount = 0
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const shiftFactor = Math.sin(particles[i].connectionSeed + j) * 0.5 + 0.5
                        if (shiftFactor > 0.3) {
                            const alpha = (1 - (distance / connectionDistance)) * shiftFactor * 0.9
                            const color = particles[i].isMetallic || particles[j].isMetallic ? '#C0C0C0' : particles[i].color

                            // Base Pass with Glow
                            ctx.beginPath()
                            ctx.strokeStyle = color
                            ctx.globalAlpha = alpha * 0.6 // Slightly softer base
                            ctx.lineWidth = 1.2

                            // Shiny Bloom effect
                            ctx.shadowBlur = 4
                            ctx.shadowColor = color

                            ctx.moveTo(particles[i].x, particles[i].y)
                            ctx.lineTo(particles[j].x, particles[j].y)
                            ctx.stroke()

                            // Glossy Highlight Pass
                            // This draws a thinner, much brighter line on top for the "gloss"
                            ctx.beginPath()
                            ctx.shadowBlur = 0 // No blur for sharpness
                            ctx.globalAlpha = alpha * 1.0 // Full brightness for highlight
                            ctx.lineWidth = 0.5
                            ctx.strokeStyle = '#FFFFFF' // Pure white highlight for universal visibility
                            ctx.moveTo(particles[i].x, particles[i].y)
                            ctx.lineTo(particles[j].x, particles[j].y)
                            ctx.stroke()

                            // Reset for next
                            ctx.globalAlpha = 1
                            connectionCount++
                        }
                    }
                    if (connectionCount > 4) break
                }
            }
            animationFrameId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleResize = () => {
            setCanvasSize()
            init()
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)
        init()
        animate()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [neuralNetworksEnabled])

    if (!neuralNetworksEnabled) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1]"
            style={{
                background: 'transparent',
                zIndex: -5, // Stay behind UI
                animation: 'neural-pulse 12s ease-in-out infinite',
                filter: 'blur(0.5px)'
            }}
        />
    )
}

export default NeuralBackground
