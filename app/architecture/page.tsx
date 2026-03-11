"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
} from "reactflow"
import "reactflow/dist/style.css"
import { TechnologyNode } from "@/components/architecture/TechnologyNode"
import { architectureData } from "@/lib/architectureData"
import { Navbar } from "@/components/Navbar"

const nodeTypes = {
  technology: TechnologyNode,
}

// Define the architecture type based on the data structure
interface Architecture {
  id: string
  type: string
  typeLabel: string
  title: string
  description: string
  experience: string
  metrics: Array<{
    icon: string
    value: string
    label: string
  }>
  techStack: Record<string, Array<{
    name: string
    icon: string
    purpose: string
  }>>
  challenges: string[]
  solutions: string[]
  learnings: string[]
  diagram: {
    nodes: Node[]
    edges: Edge[]
  }
}

export default function ArchitecturePage() {
  const [isDark, setIsDark] = useState(true)
  const [selectedArchitecture, setSelectedArchitecture] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [isDark])

  const architectureTypes = [
    { key: "all", label: "All Systems", icon: "🏗️", count: architectureData.length },
    { key: "microservices", label: "Microservices", icon: "🔧", count: 1 },
    { key: "ml-pipeline", label: "AI/ML Pipelines", icon: "🧬", count: 1 },
    { key: "full-stack", label: "Full-Stack", icon: "🌐", count: 2 },
    { key: "real-time", label: "Real-time Systems", icon: "⚡", count: 1 },
  ]

  const filteredArchitectures =
    selectedArchitecture === "all"
      ? architectureData
      : architectureData.filter((arch) => arch.type === selectedArchitecture)

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
              className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 rounded-full"
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
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Loading Architecture
            </h2>
            <p className="text-muted-foreground font-mono">Preparing system diagrams...</p>
          </motion.div>
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
        {/* Header */}
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

        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          >
            Technical System Designs
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Interactive system architecture diagrams from real projects, showcasing distributed systems, ML pipelines,
            and full-stack applications.
          </motion.p>
        </div>

        {/* Filter System */}
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/50 backdrop-blur-sm">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex gap-2 flex-wrap">
              {architectureTypes.map((type, index) => (
                <motion.div
                  key={type.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedArchitecture === type.key ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm font-mono hover:scale-105 transition-transform rounded-full"
                    onClick={() => setSelectedArchitecture(type.key)}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                    <span className="ml-2 text-xs opacity-70">({type.count})</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Architecture Systems */}
        <AnimatePresence mode="wait">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredArchitectures.map((architecture, index) => (
              <motion.div
                key={architecture.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  bounce: 0.2,
                }}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                layout
              >
                <Card
                  className={`overflow-hidden rounded-3xl ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}
                  style={{
                    boxShadow: isDark ? "0 0 40px rgba(255, 255, 255, 0.1)" : "0 0 40px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={`text-sm font-mono rounded-full ${getTypeColor(architecture.type)}`}>
                            {architecture.typeLabel}
                          </Badge>
                          <Badge variant="outline" className="text-sm font-mono rounded-full">
                            {architecture.experience}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2 font-mono">{architecture.title}</CardTitle>
                        <p className="text-muted-foreground font-mono leading-relaxed">{architecture.description}</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {architecture.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          className="text-center p-4 rounded-2xl bg-muted/30"
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-2xl mb-1">{metric.icon}</div>
                          <div className="text-lg font-bold text-primary">{metric.value}</div>
                          <div className="text-xs text-muted-foreground font-mono">{metric.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardHeader>

                  <CardContent>
                    <Tabs defaultValue="diagram" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 rounded-2xl">
                        <TabsTrigger value="diagram" className="rounded-xl">
                          System Design
                        </TabsTrigger>
                        <TabsTrigger value="technologies" className="rounded-xl">
                          Tech Stack
                        </TabsTrigger>
                        <TabsTrigger value="challenges" className="rounded-xl">
                          Implementation
                        </TabsTrigger>
                        <TabsTrigger value="learnings" className="rounded-xl">
                          Outcomes
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="diagram" className="mt-6">
                        <motion.div
                          className="h-96 border rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ArchitectureDiagram architecture={architecture} isDark={isDark} />
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="technologies" className="mt-6">
                        <motion.div
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {Object.entries(architecture.techStack).map(([category, techs], categoryIndex) => (
                            <motion.div
                              key={category}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                            >
                              <h4 className="text-sm font-semibold mb-3 text-primary capitalize">
                                {category.replace(/([A-Z])/g, " $1").trim()}
                              </h4>
                              <div className="space-y-2">
                                {techs.map((tech, techIndex) => (
                                  <motion.div
                                    key={tech.name}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + techIndex * 0.05 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                  >
                                    <div className="text-lg">{tech.icon}</div>
                                    <div>
                                      <div className="font-mono text-sm">{tech.name}</div>
                                      <div className="text-xs text-muted-foreground">{tech.purpose}</div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="challenges" className="mt-6">
                        <motion.div
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <h4 className="text-lg font-semibold mb-4 text-orange-400">Technical Challenges</h4>
                            <ul className="space-y-3">
                              {architecture.challenges.map((challenge, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                  <span className="text-orange-400 mt-1">▸</span>
                                  <span className="font-mono text-sm leading-relaxed">{challenge}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <h4 className="text-lg font-semibold mb-4 text-green-400">Solutions Applied</h4>
                            <ul className="space-y-3">
                              {architecture.solutions.map((solution, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                  <span className="text-green-400 mt-1">▸</span>
                                  <span className="font-mono text-sm leading-relaxed">{solution}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="learnings" className="mt-6">
                        <motion.div
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h4 className="text-lg font-semibold text-blue-400">Technical Insights</h4>
                          <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {architecture.learnings.map((learning, idx) => (
                              <motion.div
                                key={idx}
                                className="p-4 rounded-xl bg-muted/30 border-l-4 border-primary"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                              >
                                <div className="font-mono text-sm leading-relaxed">{learning}</div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function ArchitectureDiagram({ architecture, isDark }: { architecture: Architecture; isDark: boolean }) {
  const [nodes, , onNodesChange] = useNodesState(architecture.diagram.nodes)
  const [edges, , onEdgesChange] = useEdgesState(architecture.diagram.edges)

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log("Node clicked:", node.data)
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.5}
      maxZoom={1.5}
      className={isDark ? "dark" : "light"}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    >
      <Background color={isDark ? "#333" : "#ccc"} gap={20} />
      <Controls showInteractive={false} />
      <Panel position="top-right">
        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 text-xs font-mono">
          Scroll to zoom • Fixed layout
        </div>
      </Panel>
    </ReactFlow>
  )
}

function getTypeColor(type: string) {
  switch (type) {
    case "microservices":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "ml-pipeline":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "full-stack":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "real-time":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}
