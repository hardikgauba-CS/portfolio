'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    year: "May 2024 – Aug 2024",
    title: "Software Automation Engineering Intern",
    company: "UL Solutions",
    description:
      "Engineered automation frameworks using Python and Bash to orchestrate system validation workflows, reducing manual execution time by 40%. Integrated validation pipelines with Git and Jenkins CI/CD to improve execution reliability and added structured logging with Linux monitoring to reduce failure rates by 25%.",
  },
  {
    year: "May 2023 – Aug 2023",
    title: "Software Development Intern",
    company: "Infosys",
    description:
      "Developed scalable Java backend services integrated with React for a marketing analytics platform. Designed REST APIs connected to DynamoDB and deployed application components using AWS ECS and S3. Automated API and UI validation using Nightwatch to improve release stability.",
  },
  {
    year: "Jan 2024 – Present",
    title: "Teaching Assistant",
    company: "San José State University",
    description:
      "Assist professor in the Advanced Data Structures course by grading assignments and exams while mentoring students in problem-solving and algorithm design.",
  },
  {
    year: "May 2022 – Jul 2022",
    title: "Software Engineering Intern",
    company: "Flipkart",
  },
  {
    year: "Dec 2022 – Present",
    title: "Student Assistant",
    company: "University Police Department – San José State University",
  },
]

interface ExperienceProps {
  isDark: boolean
}

export function Experience({ isDark }: ExperienceProps) {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <Timeline position="left">
        {experiences.map((experience, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot 
                className={`transition-all duration-300 cursor-pointer ${isDark ? 'bg-primary hover:bg-primary-light' : 'bg-primary-foreground hover:bg-primary-dark'}`}
                onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
              />
              {index < experiences.length - 1 && (
                <TimelineConnector className={isDark ? 'bg-white/10' : 'bg-black/10'} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`w-full transition-colors duration-300 ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'
                  }`}
                  style={{
                    boxShadow: isDark ? '0 0 10px rgba(255, 255, 255, 0.1)' : '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}>
                    <CardContent className="p-4">
                      <div className="text-sm text-primary font-medium font-mono">
                        {experience.year}
                      </div>
                      <h3 className="text-lg font-semibold mt-1 font-mono">
                        {experience.title}
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1 font-mono">
                        {experience.company}
                      </div>
                      <AnimatePresence>
                        {expandedExperience === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm mt-2 leading-relaxed font-mono"
                          >
                            {experience.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}