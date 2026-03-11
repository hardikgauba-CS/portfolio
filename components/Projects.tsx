"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronRight, Calendar, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/projectsData"

interface ProjectsProps {
  isDark: boolean
  showAll?: boolean
}

export function Projects({ isDark, showAll = false }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const featuredProjects = getFeaturedProjects()
  const displayProjects = showAll ? featuredProjects : featuredProjects.slice(0, 2)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "planned":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai/ml":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "web":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "research":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Featured Projects</h2>
        {!showAll && (
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="group">
              View All
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <Card
              className={`overflow-hidden transition-all duration-300 ${
                isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-black/5 border-black/10 hover:bg-black/10"
              } ${hoveredProject === project.id ? "scale-[1.02]" : ""}`}
              style={{
                boxShadow: isDark ? "0 0 20px rgba(255, 255, 255, 0.05)" : "0 0 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-xs font-mono ${getCategoryColor(project.category)}`}>
                        {project.category.toUpperCase()}
                      </Badge>
                      <Badge className={`text-xs font-mono ${getStatusColor(project.status)}`}>
                        {project.status.replace("-", " ")}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{project.startDate}</span>
                        {project.endDate && <span> - {project.endDate}</span>}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-mono">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 font-mono text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold">Key Highlights</h4>
                    </div>
                    <ul className="space-y-1">
                      {project.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1 text-xs">▸</span>
                          <span className="font-mono">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold">Tech Stack</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs font-mono hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 6 && (
                        <Badge variant="outline" className="text-xs font-mono">
                          +{project.technologies.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
