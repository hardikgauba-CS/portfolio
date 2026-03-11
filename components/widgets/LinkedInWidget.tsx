'use client'

import { Linkedin, MapPin, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LinkedInWidgetProps {
  isDark: boolean
}

export function LinkedInWidget({ isDark }: LinkedInWidgetProps) {
  return (
    <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-[#0077B5]" />
            <span className="font-medium text-base">LinkedIn</span>
          </div>
          <Button variant="secondary" size="sm" className="rounded-full text-xs py-1 px-3 h-auto" asChild>
            <a href="https://www.linkedin.com/in/hardik-cs" target="_blank" rel="noopener noreferrer">
              Connect
            </a>
          </Button>
        </div>
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Hardik Gauba</h3>
            <p className="text-sm text-muted-foreground">Teaching $ Research Assistant @ SJSU</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full text-xs py-1 px-3">Software Engineering</Badge>
            <Badge variant="secondary" className="rounded-full text-xs py-1 px-3">GenAI</Badge>
            <Badge variant="secondary" className="rounded-full text-xs py-1 px-3">Cloud</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>San Jose, CA</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>500+ connections</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}