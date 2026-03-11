"use client"

import { motion } from "framer-motion"
import { Brain, Github, Linkedin, Mail, Coffee } from "lucide-react"

interface FooterProps {
  isDark: boolean
}

export function Footer({ isDark }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/hardikgauba-CS", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/hardik-cs", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hardikgauba9@gmail.com", label: "Email" },
  ]

  const stats = [
    { value: "6+", label: "Years Coding" },
    { value: "10+", label: "Projects Built" },
    { value: "∞", label: "Cups of Coffee" },
  ]

  return (
    <motion.footer
      className={`mt-16 border-t ${
        isDark ? "border-white/10 bg-black/50" : "border-black/10 bg-white/50"
      } backdrop-blur-sm`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground font-mono mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className={`h-px ${isDark ? "bg-white/10" : "bg-black/10"} mb-8`} />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? "hover:bg-white/10 text-white/60 hover:text-white"
                    : "hover:bg-black/10 text-black/60 hover:text-black"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
                onClick={(e) => {
                  if (link.href.startsWith("mailto:")) {
                    e.preventDefault()
                    window.open(link.href, "_self")
                  }
                }}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="text-sm text-muted-foreground font-mono text-center flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>© {currentYear} hardik-cs.com</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="flex items-center gap-1">
              Made with <Brain className="w-3 h-3 text-purple-500 fill-purple-500" /> & <Coffee className="w-3 h-3 text-amber-500" />
            </span>
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            className="flex items-center gap-2 text-sm font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-muted-foreground">Open to work</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
