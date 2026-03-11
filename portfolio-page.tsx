/**"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "./Navbar"
import { Profile } from "./Profile"
import { EnhancedExperience } from "./EnhancedExperience"
import { Projects } from "./Projects"
import { Skills } from "./Skills"
import { GitHubWidget } from "./widgets/GitHubWidget"
import { LinkedInWidget } from "./widgets/LinkedInWidget"
import { InstagramWidget } from "./widgets/InstagramWidget"
import { MapWidget } from "./widgets/MapWidget"
import { ChatGPTWidget } from "./widgets/ChatGPTWidget"
import { FeedbackWidget } from "./widgets/FeedbackWidget"
import { SpotlightWrapper } from "./SpotlightWrapper"

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const neonColors = {
    github: { dark: "rgba(38, 166, 65, 0.7)", light: "rgba(64, 196, 99, 0.9)" },
    linkedin: { dark: "rgba(0, 119, 181, 0.7)", light: "rgba(0, 119, 181, 0.9)" },
    instagram: { dark: "rgba(225, 48, 108, 0.7)", light: "rgba(225, 48, 108, 0.9)" },
    map: { dark: "rgba(0, 128, 0, 0.7)", light: "rgba(0, 128, 0, 0.9)" },
    chatgpt: { dark: "rgba(16, 163, 127, 0.7)", light: "rgba(16, 163, 127, 0.9)" },
    feedback: { dark: "rgba(255, 165, 0, 0.7)", light: "rgba(255, 165, 0, 0.9)" },
  }

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{ fontFamily: "IBM Plex Mono, monospace" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="max-w-7xl mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-8">
            <Profile />
            <EnhancedExperience isDark={isDark} />
            <Projects isDark={isDark} />
          </div>

         
          <div className="lg:col-span-2 space-y-8">
           
            <Skills isDark={isDark} />

          
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
              
              <div className="sm:col-span-6">
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.github[isDark ? "dark" : "light"]}>
                  <GitHubWidget isDark={isDark} />
                </SpotlightWrapper>
              </div>

            
              <div className="sm:col-span-4">
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.map[isDark ? "dark" : "light"]}>
                  <MapWidget isDark={isDark} />
                </SpotlightWrapper>
              </div>

             
              <div className="sm:col-span-2">
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.linkedin[isDark ? "dark" : "light"]}>
                  <LinkedInWidget isDark={isDark} />
                </SpotlightWrapper>
              </div>

             
              <div className="sm:col-span-3">
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.chatgpt[isDark ? "dark" : "light"]}>
                  <ChatGPTWidget isDark={isDark} />
                </SpotlightWrapper>
              </div>

             
              <div className="sm:col-span-3">
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.feedback[isDark ? "dark" : "light"]}>
                  <FeedbackWidget isDark={isDark} />
                </SpotlightWrapper>
              </div>

              <div className="sm:col-span-6">
                <SpotlightWrapper isDark={isDark} neonColor={neonColors.instagram[isDark ? "dark" : "light"]}>
                  <InstagramWidget isDark={isDark} />
                </SpotlightWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
**/