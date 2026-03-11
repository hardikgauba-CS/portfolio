"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>()

  useEffect(() => {
    // Only show custom cursor on desktop with fine pointer
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true)
    } else {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // Update dot position immediately (no lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovering(true)
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${mousePos.current.x - 24}px, ${mousePos.current.y - 24}px) scale(1.5)`
          ringRef.current.style.opacity = "0.5"
        }
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${mousePos.current.x - 20}px, ${mousePos.current.y - 20}px) scale(1)`
        ringRef.current.style.opacity = "0.3"
      }
    }

    const handleMouseDown = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(0.8)`
      }
    }

    const handleMouseUp = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(1)`
      }
    }

    // Smooth ring follow animation using RAF
    const animateRing = () => {
      if (ringRef.current && !isHovering) {
        // Lerp (linear interpolation) for smooth following
        const ease = 0.15
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease
        
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(1)`
      }
      rafId.current = requestAnimationFrame(animateRing)
    }

    // Initialize positions
    ringPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseout", handleMouseOut, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })
    
    rafId.current = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isHovering])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot - follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>

      {/* Cursor ring - smooth follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference will-change-transform transition-[transform,opacity] duration-150 ease-out"
        style={{ 
          transform: "translate(-100px, -100px)",
          opacity: 0.3
        }}
      >
        <div className="w-10 h-10 border border-white rounded-full" />
      </div>
    </>
  )
}
