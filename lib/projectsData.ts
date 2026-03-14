export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: "web" | "mobile" | "ai/ml" | "research" | "open-source"
  status: "completed" | "in-progress" | "planned"
  startDate: string
  endDate?: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Wildfire Insurance Inventory System",
    description:
      "Cloud-native inventory management tool helping wildfire victims catalog and export insurance claims.",
    longDescription:
      "A scalable inventory system designed to help wildfire victims catalog and export insurance claims. Built using Java with a DAO architecture and integrated with PostgreSQL and Supabase for secure, real-time cloud data access.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Java", "PostgreSQL", "JDBC", "Supabase", "SQL", "DAO Pattern"],
    githubUrl: "https://github.com/hardikgauba-CS/Wildfire-InsuranceApplication",
    featured: true,
    category: "web",
    status: "completed",
    startDate: "2025-04",
    highlights: [
      "Developed scalable inventory tool supporting 100+ wildfire victims",
      "Architected DAO-based Java backend with PostgreSQL and Supabase",
      "Applied relational schema normalization reducing redundancy by 30%",
      "Enabled secure remote inventory management across cloud databases",
    ],
  },
  {
    id: "2",
    title: "Recipe Genius",
    description:
      "AI-powered recipe generator that creates personalized meal plans using real-time APIs.",
    longDescription:
      "An AI-powered recipe recommendation platform that generates personalized meal plans using REST APIs and nutritional datasets. Built with Java backend and modern web technologies to deliver real-time food suggestions.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Java", "React", "Node.js", "HTML", "CSS", "REST APIs"],
    githubUrl: "https://github.com/hardikgauba-CS/RecipeGenius",
    featured: true,
    category: "ai/ml",
    status: "completed",
    startDate: "2023-11",
    endDate: "2023-12",
    highlights: [
      "Built AI-driven recipe generator serving 500+ users",
      "Integrated nutrition APIs improving dietary recommendations by 30%",
      "Optimized ingredient search reducing lookup time by 40%",
      "Implemented real-time personalized meal planning",
    ],
  },
  {
    id: "3",
    title: "BudgetBuddy",
    description:
      "Cross-platform personal finance tracker with GUI and SQLAlchemy ORM database architecture.",
    longDescription:
      "A modular desktop personal finance management system designed with Python and Tkinter. Uses SQLAlchemy ORM over SQLite to maintain accurate financial transaction records and provide analytics visualizations.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Python", "Tkinter", "SQLite", "SQLAlchemy", "Matplotlib", "OOP", "Git"],
    githubUrl: "https://github.com/hardikgauba-CS/BudgetBuddy",
    featured: true,
    category: "web",
    status: "completed",
    startDate: "2023-11",
    endDate: "2023-12",
    highlights: [
      "Developed desktop finance manager used by 300+ users",
      "Built SQLAlchemy ORM data layer maintaining 99% data accuracy",
      "Implemented modular MVC architecture for maintainability",
      "Added structured logging and 85% test coverage for CI readiness",
    ],
  },
]
export const getProjectsByCategory = (category: string) => {
  if (category === "all") return projects
  return projects.filter((project) => project.category === category)
}

export const getFeaturedProjects = () => {
  return projects.filter((project) => project.featured)
}
