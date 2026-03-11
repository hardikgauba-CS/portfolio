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
    title: "AI Product Review System",
    description: "Emotion-Aware Product Feedback System using AI-driven real-time analysis",
    longDescription:
      "An innovative AI-powered product review system initiated at Cal Hacks to streamline product testing and emotional feedback. Features real-time chat application with WebSocket integration, emotional sentiment analysis, and optimized ML inference achieving sub-500ms latency.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: [
      "React.js",
      "WebSocket",
      "Apache Kafka",
      "Hume EVI2 API",
      "Llama 3.1-8B",
      "LoRA",
      "SSH",
      "JavaScript",
    ],
    githubUrl: "https://github.com/Atishay8192261/ai-product-reviewer",
    featured: true,
    category: "ai/ml",
    status: "in-progress",
    startDate: "2024-10",
    highlights: [
      "Achieved sub-500ms latency through optimized token-per-second inference",
      "Integrated Hume EVI2 API for emotional sentiment analysis",
      "Fine-tuned Llama 3.1-8B with LoRA for domain-specific optimization",
      "Built with Agile methodology and real-time WebSocket communication",
    ],
  },
  {
    id: "2",
    title: "SevRidy – AI-Powered B2B & B2C Service Platform",
    description: "Unified platform for B2B/B2C service procurement with responsive, accessible UX",
    longDescription:
      "A comprehensive service platform designed for both B2B and B2C markets, featuring AI-powered service discovery, responsive design, and seamless user experience. Built with modern web technologies and optimized for performance and accessibility.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "MongoDB", "Elastic Search", "TypeScript"],
    githubUrl: "https://github.com/Atishay8192261/SevRidy",
    liveUrl: "https://sevridy.vercel.app/",
    featured: true,
    category: "web",
    status: "completed",
    startDate: "2025-01",
    endDate: "2025-03",
    highlights: [
      "Reduced user friction by 30% through testing and UX optimization",
      "Implemented Elastic Search for improved service discovery",
      "Built responsive, accessible UI with modern design principles",
      "Developed reusable components with clear hierarchy and real-time validation",
    ],
  },
  {
    id: "3",
    title: "Personal Finance Tracker",
    description: "Feature-rich expense tracking website with smart categorization and real-time sync",
    longDescription:
      "A comprehensive personal finance management application built with Next.js and Supabase. Features smart transaction tracking, automated budget notifications, and real-time bank data synchronization through Plaid APIs.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "Supabase", "Plaid API", "TypeScript", "PostgreSQL", "Real-time Sync"],
    githubUrl: "https://github.com/Atishay8192261/PersonalFinanceTracker",
    liveUrl: "",
    featured: true,
    category: "web",
    status: "completed",
    startDate: "2024-09",
    endDate: "2024-12",
    highlights: [
      "Instant UI updates with <200ms latency for expense tracking",
      "Automated budget notifications using database triggers",
      "Real-time bank data sync through Plaid APIs",
      "Smart transaction categorization and spending alerts",
    ],
  },
  {
    id: "4",
    title: "Plutus",
    description: "Credit/debit card discount discovery platform with automated builds and performance optimization",
    longDescription:
      "A web application helping users discover credit and debit card-linked discounts and perks across vendors. Built with Spring Boot and Dockerized services, featuring automated CI/CD, performance optimization, and high-reliability monitoring.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Spring Boot", "Docker", "Maven", "MySQL", "Redis", "GitHub Actions", "Java"],
    githubUrl: "https://github.com/Atishay8192261/plutus",
    featured: false,
    category: "web",
    status: "completed",
    startDate: "2024-05",
    endDate: "2024-07",
    highlights: [
      "Reduced deployment time by 40% through automated Maven builds",
      "Enhanced MySQL performance with indexing and query optimization",
      "Increased reliability by 35% during high-load tests",
      "Implemented comprehensive logging and failover monitoring",
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
