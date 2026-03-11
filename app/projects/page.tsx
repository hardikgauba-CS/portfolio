"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Filter, Search, ExternalLink, Github, Calendar, Award, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { projects, getProjectsByCategory } from "@/lib/projectsData"
import { Navbar } from "@/components/Navbar"

export default function ProjectsPage() {
  const [isDark, setIsDark] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800)
  }, [isDark])

  useEffect(() => {
    let filtered = getProjectsByCategory(filter)

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [filter, searchTerm])

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "ai/ml", label: "AI/ML" },
    { key: "web", label: "Web" },
    { key: "research", label: "Research" },
    { key: "open-source", label: "Open Source" },
  ]

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
      case "open-source":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.p
            className="text-muted-foreground font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Loading projects...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{ fontFamily: "IBM Plex Mono, monospace" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive collection of my work spanning AI/ML research, web development, and open-source
            contributions.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5" />
            <div className="flex gap-2 flex-wrap">
              {filters.map((filterOption, index) => (
                <motion.div
                  key={filterOption.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={filter === filterOption.key ? "default" : "outline"}
                    className="cursor-pointer rounded-full"
                    onClick={() => setFilter(filterOption.key)}
                  >
                    {filterOption.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.3,
                }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                layout
              >
                <Card
                  className={`h-full overflow-hidden transition-all duration-300 rounded-2xl ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-black/5 border-black/10 hover:bg-black/10"
                  }`}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`text-xs rounded-full ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </Badge>
                      <Badge className={`text-xs rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace("-", " ")}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 font-mono">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 font-mono text-sm leading-relaxed flex-grow">
                      {project.longDescription}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{project.startDate}</span>
                        {project.endDate && <span> - {project.endDate}</span>}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-primary" />
                          <h4 className="text-sm font-semibold">Highlights</h4>
                        </div>
                        <ul className="space-y-1">
                          {project.highlights.slice(0, 2).map((highlight, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
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
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs font-mono rounded-full">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs font-mono rounded-full">
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {project.githubUrl && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" variant="outline" asChild className="flex-1 rounded-full">
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          </motion.div>
                        )}
                        {project.liveUrl && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" variant="outline" asChild className="flex-1 rounded-full">
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Demo
                              </a>
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
