'use client'

import React, { useRef, useEffect, useState, ReactNode } from 'react'

interface SpotlightWrapperProps {
  children: ReactNode
  isDark: boolean
  neonColor: string
}

export function SpotlightWrapper({ children, neonColor }: SpotlightWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

  const applyOverlayMask = (e: PointerEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Calculate rotation based on mouse position (subtle effect)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5 // Max 5 degrees
    const rotateY = ((x - centerX) / centerX) * 5 // Max 5 degrees

    container.style.setProperty('--x', `${x}px`)
    container.style.setProperty('--y', `${y}px`)
    container.style.setProperty('--opacity', '1')
    setTransform({ rotateX, rotateY })
  }

  const removeOverlayMask = () => {
    const container = containerRef.current
    if (!container) return

    container.style.setProperty('--opacity', '0')
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('pointermove', applyOverlayMask)
    container.addEventListener('pointerleave', removeOverlayMask)

    return () => {
      container.removeEventListener('pointermove', applyOverlayMask)
      container.removeEventListener('pointerleave', removeOverlayMask)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative rounded-xl overflow-hidden transition-transform duration-200 ease-out"
      style={{
        '--x': '0px',
        '--y': '0px',
        '--opacity': '0',
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      } as React.CSSProperties}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--opacity, 0)",
          boxShadow: `0 0 40px 20px ${neonColor}`,
          background: `radial-gradient(600px circle at var(--x) var(--y), ${neonColor}, transparent 40%)`,
        }}
      />
    </div>
  )
}