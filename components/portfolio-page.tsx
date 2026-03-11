"use client"
import { Navbar } from "@/components/Navbar" //navbar is line 1 to test the deployment build
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Profile } from "@/components/Profile"
import { EnhancedExperience } from "@/components/EnhancedExperience"
import { Projects } from "@/components/Projects"
import { GitHubWidget } from "@/components/widgets/GitHubWidget"
import { LinkedInWidget } from "@/components/widgets/LinkedInWidget"
import { InstagramWidget } from "@/components/widgets/InstagramWidget"
import { MapWidget } from "@/components/widgets/MapWidget"
import { ChatGPTWidget } from "@/components/widgets/ChatGPTWidget"
import { FeedbackWidget } from "@/components/widgets/FeedbackWidget"
import { SpotlightWrapper } from "@/components/SpotlightWrapper"
import { ParticleBackground } from "@/components/ParticleBackground"
import { ScrollProgress } from "@/components/ScrollProgress"
import { CustomCursor } from "@/components/CustomCursor"
import { Footer } from "@/components/Footer"
import { TechStackOrbit } from "@/components/TechStackOrbit"

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 600)
  }, [isDark])

  const neonColors = {
    github: { dark: "rgba(34, 197, 94, 0.4)", light: "rgba(22, 163, 74, 0.3)" },
    linkedin: { dark: "rgba(59, 130, 246, 0.4)", light: "rgba(37, 99, 235, 0.3)" },
    instagram: { dark: "rgba(236, 72, 153, 0.4)", light: "rgba(219, 39, 119, 0.3)" },
    map: { dark: "rgba(34, 197, 94, 0.4)", light: "rgba(22, 163, 74, 0.3)" },
    chatgpt: { dark: "rgba(20, 184, 166, 0.4)", light: "rgba(13, 148, 136, 0.3)" },
    feedback: { dark: "rgba(251, 191, 36, 0.4)", light: "rgba(245, 158, 11, 0.3)" },
  }

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-blue-500 border-b-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-transparent border-t-pink-500 border-r-blue-500 border-b-purple-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Welcome to hardik-cs.com
            </h2>
            <p className="text-muted-foreground font-mono">Loading portfolio...</p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 relative ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{ fontFamily: "IBM Plex Mono, monospace", cursor: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Effects */}
      <ParticleBackground isDark={isDark} />
      <CustomCursor />
      <ScrollProgress />
      
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="max-w-7xl mx-auto px-4 pt-24 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left + Middle Columns (spanning 2) */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
              {/* Left Column - Profile + GitHub */}
              <div className="space-y-8 h-full">
                <Profile />
              </div>

              {/* Middle Column - LinkedIn + AI Assistant */}
              <div className="flex flex-col h-full space-y-8">
                <SpotlightWrapper
                  isDark={isDark}
                  neonColor={neonColors.linkedin[isDark ? "dark" : "light"]}
                >
                  <LinkedInWidget isDark={isDark} />
                </SpotlightWrapper>

                <div className="w-[calc(100%-3rem)] flex-1 min-h-0">
                  <div className="h-full">
                    <SpotlightWrapper
                      isDark={isDark}
                      neonColor={neonColors.chatgpt[isDark ? "dark" : "light"]}
                    >
                      <div className="h-full overflow-hidden">
                        <ChatGPTWidget isDark={isDark} />
                      </div>
                    </SpotlightWrapper>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Projects spanning both columns */}
            <div className="w-[calc(100%-3rem)]">
              <Projects isDark={isDark} />
            </div>

            {/* GitHub + Tech Orbit below Featured Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <SpotlightWrapper
                  isDark={isDark}
                  neonColor={neonColors.github[isDark ? "dark" : "light"]}
                >
                  <GitHubWidget isDark={isDark} />
                </SpotlightWrapper>

                <TechStackOrbit isDark={isDark} />
              </div>
              <div className="hidden md:block" />
            </div>
          </motion.div>

          {/* Right Column - Experience + remaining widgets */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <EnhancedExperience isDark={isDark} />

            {/* Widgets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
              {/* Map Widget - 4 columns */}
              <motion.div
                className="sm:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.map[isDark ? "dark" : "light"]}>
                  <MapWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>

              {/* Feedback Widget - 3 columns */}
              <motion.div
                className="sm:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.feedback[isDark ? "dark" : "light"]}>
                  <FeedbackWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>

              {/* Instagram Widget - Full width */}
              <motion.div
                className="sm:col-span-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.instagram[isDark ? "dark" : "light"]}>
                  <InstagramWidget isDark={isDark} />
                </SpotlightWrapper>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer isDark={isDark} />
    </motion.div>
  )
}
