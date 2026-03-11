"use client"

import { useState, useEffect } from "react"
import { EntranceAnimationComponent } from "@/components/entrance-animation"
import PortfolioPage from "@/components/portfolio-page"

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("hasSeenAnimation")

    if (hasSeenAnimation) {
      setShowPortfolio(true)
    }

    setIsLoading(false)
  }, [])

  const handleAnimationComplete = () => {
    sessionStorage.setItem("hasSeenAnimation", "true")
    setShowPortfolio(true)
  }

  // Prevent rendering until the session check is complete
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-transparent border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {!showPortfolio ? <EntranceAnimationComponent onComplete={handleAnimationComplete} /> : <PortfolioPage />}
    </div>
  )
}
