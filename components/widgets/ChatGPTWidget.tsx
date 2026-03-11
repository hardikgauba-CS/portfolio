"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Send, Bot, User, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface ChatGPTWidgetProps {
  isDark: boolean
}

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
  tokens?: number
}

export function ChatGPTWidget({ isDark }: ChatGPTWidgetProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm here to answer questions about Hardik's professional background, projects, and experience. What would you like to know?",
      timestamp: Date.now(),
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<{ remaining: number; resetTime?: number } | null>(null)
  const isInitialLoadRef = useRef(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousMessageCountRef = useRef(messages.length)

  const scrollToBottom = useCallback(() => {
    // Scroll only the messages container, not the entire page
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    // Only scroll if this is not the initial load AND messages have actually been added
    if (!isInitialLoadRef.current && messages.length > previousMessageCountRef.current) {
      scrollToBottom()
    }
    
    // Update the previous message count and mark initial load as complete
    previousMessageCountRef.current = messages.length
    isInitialLoadRef.current = false
  }, [messages, scrollToBottom])

  // Prevent input from auto-focusing on load
  useEffect(() => {
    // Don't auto-focus the input to prevent scrolling
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Client-side validation
    if (input.length > 500) {
      setError("Message too long. Please keep it under 500 characters.")
      return
    }

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 503) {
          setError("AI Assistant is not set up. Add OPENAI_API_KEY to enable (OpenAI requires a paid account). The rest of your portfolio works without it.")
        } else if (response.status === 429) {
          setError("Rate limit reached. Please try again later.")
          setRateLimitInfo({
            remaining: 0,
            resetTime: Date.now() + (data.retryAfter || 3600) * 1000,
          })
        } else {
          setError(data.error || "Something went wrong. Please try again.")
        }
        return
      }

      const assistantMessage: Message = {
        role: "assistant",
        content:
          data.response || "I'm not sure how to respond to that. Could you ask about Hardik's projects or experience?",
        timestamp: Date.now(),
        tokens: data.usage?.tokens,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getRemainingTime = () => {
    if (!rateLimitInfo?.resetTime) return null
    const remaining = Math.max(0, rateLimitInfo.resetTime - Date.now())
    const minutes = Math.ceil(remaining / (1000 * 60))
    return minutes
  }

  return (
    <Card
      className={`backdrop-blur-sm h-full transition-all duration-300 rounded-3xl border hover:shadow-lg ${
        isDark
          ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
          : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20"
      }`}
    >
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-blue-600">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-base">AI Assistant</h3>
            <p className="text-xs text-muted-foreground font-mono">Ask about Hardik</p>
          </div>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-500">{error}</p>
              {getRemainingTime() && (
                <div className="ml-auto flex items-center gap-1 text-xs text-red-400">
                  <Clock className="w-3 h-3" />
                  {getRemainingTime()}m
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-0">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? `${
                          isDark ? "bg-blue-600/20 border-blue-500/30" : "bg-blue-500/20 border-blue-500/30"
                        } border rounded-tr-sm`
                      : `${isDark ? "bg-white/10 border-white/20" : "bg-black/10 border-black/20"} border rounded-tl-sm`
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{formatTime(message.timestamp)}</span>
                    {message.tokens && <span>{message.tokens} tokens</span>}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-2 justify-start"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-white/10 border border-white/20 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                  <div className="flex items-center gap-3">
                    {/* Enhanced AI thinking animation */}
                    <div className="relative flex items-center justify-center w-8 h-8">
                      {/* Outer spinning ring */}
                      <motion.div
                        className="absolute w-8 h-8 rounded-full border-2 border-transparent border-t-green-500 border-r-blue-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Inner pulsing core */}
                      <motion.div
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <motion.span 
                        className="text-sm font-medium"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        AI is thinking
                      </motion.span>
                      <span className="text-xs text-muted-foreground">Analyzing your question...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask about Hardik's experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-full px-4 flex-1"
            disabled={loading || !!rateLimitInfo?.resetTime}
            maxLength={500}
            autoFocus={false}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full w-10 h-10 p-0 bg-gradient-to-br from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            disabled={loading || !input.trim() || !!rateLimitInfo?.resetTime}
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.form>

        {/* Character count */}
        {input.length > 400 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mt-1 text-right"
          >
            {input.length}/500
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
