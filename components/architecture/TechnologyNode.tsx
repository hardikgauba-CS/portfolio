"use client"

import { memo } from "react"
import { Handle, Position } from "reactflow"
import type { LucideIcon } from "lucide-react"
import {
  Database,
  Server,
  Globe,
  Zap,
  Brain,
  MessageSquare,
  Shield,
  BarChart3,
  Container,
  Cloud,
  Search,
  Palette,
  Code,
  Cpu,
} from "lucide-react"

interface TechnologyNodeProps {
  data: {
    label: string
    icon: string
    category: string
    description: string
    metrics?: string
    color: string
  }
  selected?: boolean
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: LucideIcon } = {
    database: Database,
    server: Server,
    globe: Globe,
    zap: Zap,
    brain: Brain,
    message: MessageSquare,
    shield: Shield,
    chart: BarChart3,
    container: Container,
    cloud: Cloud,
    search: Search,
    palette: Palette,
    code: Code,
    cpu: Cpu,
  }

  const IconComponent = iconMap[iconName] || Server
  return <IconComponent className="w-5 h-5" />
}

export const TechnologyNode = memo(({ data, selected }: TechnologyNodeProps) => {
  return (
    <div className={`relative group transition-all duration-300 ${selected ? "scale-110" : ""}`}>
      {/* Glowing border effect */}
      <div
        className={`absolute inset-0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300`}
        style={{ background: data.color }}
      />

      {/* Main node content - Compact design */}
      <div className="relative bg-background/95 border border-border rounded-lg p-3 backdrop-blur-sm w-32 h-20">
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Technology icon */}
          <div className="mb-1">{getIconComponent(data.icon)}</div>

          {/* Technology name - smaller text */}
          <h3 className="font-semibold text-xs font-mono leading-tight">{data.label}</h3>

          {/* Metrics - very small */}
          {data.metrics && <div className="text-xs font-mono text-primary mt-1 truncate w-full">{data.metrics}</div>}
        </div>
      </div>

      {/* Connection handles - smaller */}
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-primary border border-background" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-primary border border-background" />
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-primary border border-background" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-primary border border-background" />
    </div>
  )
})

TechnologyNode.displayName = "TechnologyNode"
