"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface TechItem {
  name: string
  icon: string
  color: string
  category: string
}

interface TechStackOrbitProps {
  isDark: boolean
}

export function TechStackOrbit({ isDark }: TechStackOrbitProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const techStack: TechItem[] = [
    // Inner orbit - Core languages
    { name: "Java", icon: "☕", color: "#f89820", category: "Language" },
    { name: "Python", icon: "🐍", color: "#3776ab", category: "Language" },
    { name: "TypeScript", icon: "📘", color: "#3178c6", category: "Language" },
    
    // Middle orbit - Frameworks
    { name: "Spring Boot", icon: "🍃", color: "#6db33f", category: "Framework" },
    { name: "React", icon: "⚛️", color: "#61dafb", category: "Framework" },
    { name: "Next.js", icon: "▲", color: "#ffffff", category: "Framework" },
    { name: "PyTorch", icon: "🔥", color: "#ee4c2c", category: "Framework" },
    
    // Outer orbit - Tools & Infrastructure
    { name: "Docker", icon: "🐳", color: "#2496ed", category: "DevOps" },
    { name: "Kubernetes", icon: "☸️", color: "#326ce5", category: "DevOps" },
    { name: "Kafka", icon: "📊", color: "#231f20", category: "Infrastructure" },
    { name: "PostgreSQL", icon: "🐘", color: "#4169e1", category: "Database" },
    { name: "Redis", icon: "📦", color: "#dc382d", category: "Database" },
  ]

  const innerOrbit = techStack.slice(0, 3)
  const middleOrbit = techStack.slice(3, 7)
  const outerOrbit = techStack.slice(7)

  const OrbitRing = ({ 
    items, 
    radius, 
    duration, 
    reverse = false,
  }: { 
    items: TechItem[]
    radius: number
    duration: number
    reverse?: boolean
  }) => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration: isPaused ? duration * 100 : duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Orbit path */}
      <div
        className={`absolute rounded-full border ${
          isDark ? "border-white/10" : "border-black/10"
        }`}
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
      />
      
      {/* Tech items */}
      {items.map((tech, index) => {
        const angle = (360 / items.length) * index
        const radian = (angle * Math.PI) / 180
        const x = Math.cos(radian) * radius
        const y = Math.sin(radian) * radius

        return (
          <motion.div
            key={tech.name}
            className="absolute cursor-pointer"
            style={{
              left: `calc(50% + ${x}px - 20px)`,
              top: `calc(50% + ${y}px - 20px)`,
            }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{
              duration: isPaused ? duration * 100 : duration,
              repeat: Infinity,
              ease: "linear",
            }}
            onHoverStart={() => {
              setHoveredTech(tech.name)
              setIsPaused(true)
            }}
            onHoverEnd={() => {
              setHoveredTech(null)
              setIsPaused(false)
            }}
            whileHover={{ scale: 1.3, zIndex: 50 }}
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg backdrop-blur-sm border ${
                isDark
                  ? "bg-white/10 border-white/20 hover:bg-white/20"
                  : "bg-black/5 border-black/10 hover:bg-black/10"
              } ${hoveredTech === tech.name ? "ring-2 ring-primary" : ""}`}
              style={{
                boxShadow: hoveredTech === tech.name
                  ? `0 0 20px ${tech.color}40`
                  : "none",
              }}
            >
              <span>{tech.icon}</span>
            </motion.div>
            
            {/* Tooltip */}
            {hoveredTech === tech.name && (
              <motion.div
                className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap z-50 ${
                  isDark
                    ? "bg-white/10 border border-white/20 backdrop-blur-md"
                    : "bg-black/5 border border-black/10 backdrop-blur-md"
                }`}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="font-semibold">{tech.name}</div>
                <div className="text-muted-foreground text-[10px]">{tech.category}</div>
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-3xl overflow-hidden ${
        isDark
          ? "bg-white/5 border border-white/10"
          : "bg-black/5 border border-black/10"
      }`}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold font-mono mb-2 text-center">Tech Stack</h3>
        <p className="text-xs text-muted-foreground text-center mb-4 font-mono">
          Hover to explore
        </p>
        
        <div className="relative w-full aspect-square max-w-[280px] mx-auto">
          {/* Center core */}
          <motion.div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10 ${
              isDark
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20"
                : "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-black/20"
            }`}
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.3)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-2xl">💻</span>
          </motion.div>

          {/* Orbit rings */}
          <OrbitRing items={innerOrbit} radius={55} duration={20} />
          <OrbitRing items={middleOrbit} radius={90} duration={30} reverse />
          <OrbitRing items={outerOrbit} radius={125} duration={40} />
        </div>
      </div>
    </motion.div>
  )
}
