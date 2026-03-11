"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      {
        name: "Java",
        level: 95,
        projects: 4,
        linkedProjects: ["Plutus", "Teaching Assistant Tools"],
        linkedExperience: ["Software Engineering Intern", "Teaching Assistant"],
      },
      {
        name: "Python",
        level: 90,
        projects: 2,
        linkedProjects: ["Genomic Classification"],
        linkedExperience: ["Research Assistant"],
      },
      {
        name: "JavaScript",
        level: 88,
        projects: 3,
        linkedProjects: ["AI Product Review System", "SevRidy", "Personal Finance Tracker"],
        linkedExperience: [],
      },
      {
        name: "TypeScript",
        level: 85,
        projects: 3,
        linkedProjects: ["SevRidy", "Personal Finance Tracker"],
        linkedExperience: [],
      },
      {
        name: "SQL",
        level: 80,
        projects: 3,
        linkedProjects: ["Plutus", "Personal Finance Tracker"],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "C++",
        level: 75,
        projects: 1,
        linkedProjects: [],
        linkedExperience: [],
      },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      {
        name: "Spring Boot",
        level: 90,
        projects: 2,
        linkedProjects: ["Plutus"],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "React.js",
        level: 88,
        projects: 2,
        linkedProjects: ["AI Product Review System"],
        linkedExperience: [],
      },
      {
        name: "Next.js",
        level: 85,
        projects: 2,
        linkedProjects: ["SevRidy", "Personal Finance Tracker"],
        linkedExperience: [],
      },
      {
        name: "PyTorch",
        level: 82,
        projects: 1,
        linkedProjects: ["Genomic Classification"],
        linkedExperience: ["Research Assistant"],
      },
      {
        name: "Fastai",
        level: 80,
        projects: 1,
        linkedProjects: ["Genomic Classification"],
        linkedExperience: ["Research Assistant"],
      },
      {
        name: "REST APIs",
        level: 85,
        projects: 3,
        linkedProjects: ["Plutus", "Personal Finance Tracker"],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "gRPC",
        level: 75,
        projects: 1,
        linkedProjects: [],
        linkedExperience: ["Software Engineering Intern"],
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      {
        name: "Docker",
        level: 85,
        projects: 2,
        linkedProjects: ["Plutus"],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "Kubernetes",
        level: 80,
        projects: 1,
        linkedProjects: [],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "AWS",
        level: 78,
        projects: 2,
        linkedProjects: ["SevRidy"],
        linkedExperience: [],
      },
      {
        name: "GitHub Actions",
        level: 82,
        projects: 2,
        linkedProjects: ["Plutus"],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "Apache Kafka",
        level: 75,
        projects: 2,
        linkedProjects: ["AI Product Review System"],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "Terraform",
        level: 70,
        projects: 1,
        linkedProjects: [],
        linkedExperience: ["Software Engineering Intern"],
      },
    ],
  },
  {
    category: "Databases & Tools",
    skills: [
      {
        name: "PostgreSQL",
        level: 80,
        projects: 2,
        linkedProjects: ["Personal Finance Tracker"],
        linkedExperience: ["Software Engineering Intern"],
      },
      {
        name: "MongoDB",
        level: 78,
        projects: 1,
        linkedProjects: ["SevRidy"],
        linkedExperience: [],
      },
      {
        name: "Redis",
        level: 75,
        projects: 1,
        linkedProjects: ["Plutus"],
        linkedExperience: [],
      },
      {
        name: "MySQL",
        level: 82,
        projects: 1,
        linkedProjects: ["Plutus"],
        linkedExperience: [],
      },
      {
        name: "Git",
        level: 95,
        projects: 5,
        linkedProjects: ["All Projects"],
        linkedExperience: ["All Experience"],
      },
      {
        name: "Linux",
        level: 85,
        projects: 2,
        linkedProjects: ["Genomic Classification"],
        linkedExperience: ["Research Assistant", "Software Engineering Intern"],
      },
    ],
  },
]

interface SkillsProps {
  isDark: boolean
}

export function Skills({ isDark }: SkillsProps) {
  const getSkillColor = (level: number) => {
    if (level >= 90) return "bg-green-500"
    if (level >= 80) return "bg-blue-500"
    if (level >= 70) return "bg-yellow-500"
    return "bg-gray-500"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card className={`h-full ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 font-mono">{category.category}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium font-mono">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {skill.projects} projects
                          </Badge>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.8 }}
                        />
                      </div>

                      {/* Linked Projects/Experience */}
                      {(skill.linkedProjects?.length || skill.linkedExperience?.length) && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {skill.linkedProjects?.slice(0, 2).map((project) => (
                              <Badge
                                key={project}
                                variant="secondary"
                                className="text-xs cursor-pointer hover:bg-primary/20"
                                title={`Used in ${project}`}
                              >
                                {project.length > 15 ? `${project.substring(0, 15)}...` : project}
                              </Badge>
                            ))}
                            {skill.linkedExperience?.slice(0, 1).map((experience) => (
                              <Badge
                                key={experience}
                                variant="outline"
                                className="text-xs cursor-pointer hover:bg-primary/20"
                                title={`Used in ${experience}`}
                              >
                                <ExternalLink className="w-2 h-2 mr-1" />
                                {experience.length > 10 ? `${experience.substring(0, 10)}...` : experience}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
