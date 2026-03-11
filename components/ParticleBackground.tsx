"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface ParticleBackgroundProps {
  isDark: boolean
}

export function ParticleBackground({ isDark }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction - subtle attraction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.02
          p.vx += dx * force * 0.01
          p.vy += dy * force * 0.01
        }

        // Apply velocity with damping
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `rgba(147, 197, 253, ${p.opacity})`
          : `rgba(139, 92, 246, ${p.opacity * 0.6})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            const lineOpacity = (1 - distance / 120) * 0.15
            ctx.strokeStyle = isDark
              ? `rgba(147, 197, 253, ${lineOpacity})`
              : `rgba(139, 92, 246, ${lineOpacity * 0.5})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    initParticles()
    drawParticles()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initParticles()
    })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDark])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
