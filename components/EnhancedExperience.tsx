"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, ExternalLink, Calendar, Award, Code, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { experiences } from "@/lib/experienceData"

interface EnhancedExperienceProps {
  isDark: boolean
}

export function EnhancedExperience({ isDark }: EnhancedExperienceProps) {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Research":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Internship":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Academic":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Full-time":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getImpactMetrics = (achievements: string[]) => {
    const metrics = achievements.filter(
      (achievement) =>
        achievement.includes("%") ||
        achievement.includes("ms") ||
        achievement.includes("K") ||
        achievement.includes("GB"),
    )
    return metrics.slice(0, 3)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Experience</h2>
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`transition-all duration-300 cursor-pointer ${
                isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-black/5 border-black/10 hover:bg-black/10"
              } ${expandedExperience === experience.id ? "ring-2 ring-primary/50" : ""}`}
              style={{
                boxShadow: isDark ? "0 0 20px rgba(255, 255, 255, 0.05)" : "0 0 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardContent className="p-6">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => setExpandedExperience(expandedExperience === experience.id ? null : experience.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`text-xs font-mono ${getTypeColor(experience.type)}`}>{experience.type}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{experience.year}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold font-mono mb-1">{experience.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                      <span className="font-medium">{experience.company}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    {/* Quick Impact Metrics */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {getImpactMetrics(experience.achievements).map((metric, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs font-mono">
                          <TrendingUp className="w-2 h-2 mr-1" />
                          {metric.length > 30 ? `${metric.substring(0, 30)}...` : metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedExperience === experience.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedExperience === experience.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <p className="text-sm leading-relaxed font-mono mb-4">{experience.description}</p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="w-4 h-4 text-primary" />
                            <h4 className="text-sm font-semibold">Key Achievements & Impact</h4>
                          </div>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1 text-xs">▸</span>
                                <span className="font-mono leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Code className="w-4 h-4 text-primary" />
                            <h4 className="text-sm font-semibold">Technologies & Skills</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs font-mono hover:bg-primary/20 transition-colors"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {experience.companyUrl && (
                          <Button variant="ghost" size="sm" asChild className="mt-2">
                            <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Visit Company
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
