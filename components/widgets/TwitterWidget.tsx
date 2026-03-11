'use client'

import { Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TwitterWidgetProps {
  isDark: boolean
}

export function TwitterWidget({ isDark }: TwitterWidgetProps) {
  return (
    <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
            <span className="font-medium">Twitter</span>
          </div>
          <Button variant="secondary" size="sm" className="rounded-full">
            Follow
          </Button>
        </div>
        <p className="text-sm mt-4">Check out my latest tweets!</p>
      </CardContent>
    </Card>
  )
}