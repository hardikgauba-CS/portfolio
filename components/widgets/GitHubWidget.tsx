"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface GitHubWidgetProps {
  isDark: boolean
}

interface GitHubData {
  contributions: number[]
  totalContributions: number
  weeks: number
  startDate: string
}

function getTileColor(count: number, isDark: boolean): string {
  if (isDark) {
    if (count === 0) return "bg-gray-800/40 border-gray-700/20"
    if (count <= 2) return "bg-green-900/60 border-green-800/40"
    if (count <= 5) return "bg-green-700/70 border-green-600/50"
    if (count <= 10) return "bg-green-500/80 border-green-400/60"
    return "bg-green-400/90 border-green-300/70"
  } else {
    if (count === 0) return "bg-gray-100/80 border-gray-200/60"
    if (count <= 2) return "bg-green-100/90 border-green-200/70"
    if (count <= 5) return "bg-green-200/90 border-green-300/70"
    if (count <= 10) return "bg-green-400/90 border-green-500/70"
    return "bg-green-500/90 border-green-600/80"
  }
}

export function GitHubWidget({ isDark }: GitHubWidgetProps) {
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const loadContributions = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/github")
      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error ?? `HTTP ${response.status}`)
      }

      setGithubData(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching GitHub contributions:", err)
        setError(err.message)
      } else {
        console.error("Unknown error occurred:", err)
        setError("An unknown error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContributions()
    const interval = setInterval(loadContributions, 15 * 60 * 1000) // refresh every 15 minutes
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card
        className={`overflow-hidden backdrop-blur-sm transition-all duration-300 rounded-3xl h-[300px] border ${
          isDark ? "bg-white/5 border-white/10 hover:bg-white/8" : "bg-black/5 border-black/10 hover:bg-black/8"
        }`}
      >
        <CardContent className="p-6 h-full flex items-center justify-center">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-8 border-4 border-transparent border-t-green-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-sm text-muted-foreground font-mono">Loading contributions...</p>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card
        className={`overflow-hidden backdrop-blur-sm transition-all duration-300 rounded-3xl h-[300px] border ${
          isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
        }`}
      >
        <CardContent className="p-6 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <Github className="w-12 h-12 text-muted-foreground mx-auto" />
            <div>
              <p className="text-muted-foreground text-sm font-mono mb-3">Unable to load GitHub data</p>
              <Button variant="outline" size="sm" onClick={loadContributions} className="rounded-full">
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!githubData) return null

  // Calculate weeks properly - GitHub typically shows 53 weeks
  const totalDays = githubData.contributions.length
  const weeksToShow = Math.ceil(totalDays / 7)

  const weeks = Array.from({ length: weeksToShow }, (_, weekIndex) => {
    const startIndex = weekIndex * 7
    const endIndex = Math.min(startIndex + 7, totalDays)
    return githubData.contributions.slice(startIndex, endIndex)
  })

  return (
    <Card
      className={`overflow-hidden backdrop-blur-sm transition-all duration-500 rounded-3xl h-[300px] border group ${
        isDark
          ? "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
          : "bg-black/5 border-black/10 hover:bg-black/8 hover:border-black/20"
      }`}
    >
      <CardContent className="p-6 h-full flex flex-col">
        {/* Clean Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Github className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">GitHub Activity</h3>
                <motion.div
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
                >
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-sm font-bold text-green-500">{githubData.totalContributions}</span>
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                {githubData.totalContributions} contributions in the last year
              </p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full px-4 text-sm font-medium hover:shadow-lg transition-all duration-300"
              asChild
            >
              <a
                href="https://github.com/Atishay8192261"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Centered Contribution Grid */}
       <div className="flex-1 overflow-x-auto overflow-y-hidden px-2">
        <motion.div
          className="min-w-max"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        <div className="grid grid-flow-col gap-1 auto-cols-min">
          {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const count = week[dayIndex] || 0
                  return (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: (weekIndex * 7 + dayIndex) * 0.002,
                        duration: 0.3,
                        type: "spring",
                        bounce: 0.4,
                      }}
                      whileHover={{
                        scale: 1.2,
                        zIndex: 10,
                        transition: { duration: 0.15 },
                      }}
                      className={`w-3 h-3 rounded-sm border cursor-pointer transition-all duration-200 ${getTileColor(
                        count,
                        isDark,
                      )}`}
                      title={`${count} contributions`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>


        {/* Simple Legend */}
        <motion.div
          className="flex items-center justify-between text-sm text-muted-foreground mt-4 px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="font-mono text-xs">Less</span>
          <div className="flex gap-1">
            {[0, 2, 5, 10, 15].map((level) => (
              <motion.div
                key={level}
                className={`w-3 h-3 rounded-sm border ${getTileColor(level, isDark)} transition-all duration-200`}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>
          <span className="font-mono text-xs">More</span>
        </motion.div>
      </CardContent>
    </Card>
  )
}
