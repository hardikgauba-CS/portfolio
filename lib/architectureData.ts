import type { Node, Edge } from "reactflow"

export interface ArchitectureSystem {
  id: string
  title: string
  description: string
  type: "microservices" | "ml-pipeline" | "full-stack" | "real-time"
  typeLabel: string
  experience: string
  metrics: Array<{
    icon: string
    value: string
    label: string
  }>
  techStack: {
    [category: string]: Array<{
      name: string
      icon: string
      purpose: string
    }>
  }
  challenges: string[]
  solutions: string[]
  learnings: string[]
  diagram: {
    nodes: Node[]
    edges: Edge[]
  }
}

export const architectureData: ArchitectureSystem[] = [
  {
    id: "veena-microservices",
    title: "Distributed Inventory Management System",
    description:
      "Microservices architecture handling 500K+ daily requests with 80ms p99 latency, featuring event-driven communication and monitoring.",
    type: "microservices",
    typeLabel: "Microservices",
    experience: "Veena Agencies",
    metrics: [
      { icon: "📊", value: "500K", label: "Daily Requests" },
      { icon: "⚡", value: "80ms", label: "p99 Latency" },
      { icon: "📈", value: "20%", label: "Performance Gain" },
      { icon: "🎯", value: "99.9%", label: "Uptime" },
    ],
    techStack: {
      gateway: [
        { name: "API Gateway", icon: "🌐", purpose: "Request routing & OAuth2 security" },
        { name: "OAuth2", icon: "🔐", purpose: "Authentication & authorization" },
      ],
      services: [
        { name: "Spring Boot", icon: "🍃", purpose: "Inventory microservice" },
        { name: "Java", icon: "☕", purpose: "Order service" },
        { name: "gRPC", icon: "🔗", purpose: "Inter-service communication" },
      ],
      messaging: [{ name: "Apache Kafka", icon: "📊", purpose: "Event streaming" }],
      databases: [
        { name: "PostgreSQL", icon: "🐘", purpose: "Primary database" },
        { name: "Redis", icon: "📦", purpose: "Caching layer" },
      ],
      devops: [
        { name: "Docker", icon: "🐳", purpose: "Containerization" },
        { name: "Kubernetes", icon: "⚙️", purpose: "Orchestration" },
        { name: "EKS", icon: "☁️", purpose: "Managed K8s" },
      ],
      monitoring: [
        { name: "Grafana", icon: "📈", purpose: "Metrics dashboard" },
        { name: "OpenTelemetry", icon: "🔍", purpose: "Distributed tracing" },
      ],
    },
    challenges: [
      "Handling 500K+ daily requests with consistent low latency",
      "Implementing thread-safe event processing",
      "Managing distributed transactions across services",
      "Ensuring data consistency in event-driven architecture",
    ],
    solutions: [
      "Event sourcing with Apache Kafka for reliable messaging",
      "Connection pooling and async processing",
      "CQRS pattern for read/write separation",
      "Circuit breaker pattern for fault tolerance",
    ],
    learnings: [
      "Event-driven architecture improves system scalability",
      "Monitoring is crucial for microservices debugging",
      "Container orchestration simplifies deployment",
      "Performance optimization requires infrastructure tuning",
    ],
    diagram: {
      nodes: [
        {
          id: "load-balancer",
          type: "technology",
          position: { x: 200, y: 50 },
          data: {
            label: "Load Balancer",
            icon: "globe",
            category: "Gateway",
            description: "Nginx with SSL",
            color: "linear-gradient(45deg, #3B82F6, #1D4ED8)",
          },
        },
        {
          id: "api-gateway",
          type: "technology",
          position: { x: 50, y: 150 },
          data: {
            label: "API Gateway",
            icon: "shield",
            category: "Security",
            description: "OAuth2 auth",
            metrics: "25% faster",
            color: "linear-gradient(45deg, #10B981, #059669)",
          },
        },
        {
          id: "inventory-service",
          type: "technology",
          position: { x: 200, y: 150 },
          data: {
            label: "Inventory",
            icon: "server",
            category: "Service",
            description: "Spring Boot",
            metrics: "500K req/day",
            color: "linear-gradient(45deg, #8B5CF6, #7C3AED)",
          },
        },
        {
          id: "order-service",
          type: "technology",
          position: { x: 350, y: 150 },
          data: {
            label: "Order",
            icon: "server",
            category: "Service",
            description: "Java service",
            color: "linear-gradient(45deg, #F59E0B, #D97706)",
          },
        },
        {
          id: "kafka",
          type: "technology",
          position: { x: 200, y: 250 },
          data: {
            label: "Kafka",
            icon: "chart",
            category: "Messaging",
            description: "Event streaming",
            metrics: "20% less lag",
            color: "linear-gradient(45deg, #EF4444, #DC2626)",
          },
        },
        {
          id: "postgresql",
          type: "technology",
          position: { x: 50, y: 350 },
          data: {
            label: "PostgreSQL",
            icon: "database",
            category: "Database",
            description: "Primary DB",
            color: "linear-gradient(45deg, #3B82F6, #1E40AF)",
          },
        },
        {
          id: "redis",
          type: "technology",
          position: { x: 200, y: 350 },
          data: {
            label: "Redis",
            icon: "zap",
            category: "Cache",
            description: "Memory cache",
            color: "linear-gradient(45deg, #DC2626, #B91C1C)",
          },
        },
        {
          id: "grafana",
          type: "technology",
          position: { x: 350, y: 350 },
          data: {
            label: "Grafana",
            icon: "chart",
            category: "Monitor",
            description: "Metrics",
            metrics: "40% MTTR",
            color: "linear-gradient(45deg, #F59E0B, #D97706)",
          },
        },
      ],
      edges: [
        { id: "e1", source: "load-balancer", target: "api-gateway", animated: true, style: { stroke: "#3B82F6" } },
        {
          id: "e2",
          source: "load-balancer",
          target: "inventory-service",
          animated: true,
          style: { stroke: "#3B82F6" },
        },
        { id: "e3", source: "load-balancer", target: "order-service", animated: true, style: { stroke: "#3B82F6" } },
        { id: "e4", source: "api-gateway", target: "kafka", animated: true, style: { stroke: "#10B981" } },
        { id: "e5", source: "inventory-service", target: "kafka", animated: true, style: { stroke: "#8B5CF6" } },
        { id: "e6", source: "order-service", target: "kafka", animated: true, style: { stroke: "#F59E0B" } },
        { id: "e7", source: "kafka", target: "postgresql", animated: true, style: { stroke: "#EF4444" } },
        { id: "e8", source: "kafka", target: "redis", animated: true, style: { stroke: "#EF4444" } },
        { id: "e9", source: "kafka", target: "grafana", animated: true, style: { stroke: "#EF4444" } },
      ],
    },
  },
  {
    id: "genomic-ml-pipeline",
    title: "Genomic Classification ML Pipeline",
    description:
      "Machine learning pipeline processing 100GB+ genomic datasets using ULMFiT architecture with custom preprocessing and tokenization.",
    type: "ml-pipeline",
    typeLabel: "ML Pipeline",
    experience: "SJSU Research",
    metrics: [
      { icon: "🧬", value: "100GB+", label: "Dataset Size" },
      { icon: "🎯", value: "94%", label: "Accuracy" },
      { icon: "⚡", value: "5x", label: "Speed Boost" },
      { icon: "🔬", value: "Open", label: "Source" },
    ],
    techStack: {
      dataProcessing: [
        { name: "Biopython", icon: "🧬", purpose: "Genomic data parsing" },
        { name: "Custom Tokenizer", icon: "🔤", purpose: "Sequence tokenization" },
      ],
      mlFramework: [
        { name: "PyTorch", icon: "🔥", purpose: "Deep learning framework" },
        { name: "Fastai", icon: "⚡", purpose: "ML abstractions" },
        { name: "ULMFiT", icon: "🧠", purpose: "Transfer learning" },
      ],
      infrastructure: [
        { name: "Linux", icon: "🐧", purpose: "Computing environment" },
        { name: "Remote Servers", icon: "🖥️", purpose: "Distributed computing" },
      ],
    },
    challenges: [
      "Processing 100GB+ genomic datasets efficiently",
      "Developing domain-specific tokenization",
      "Scaling ULMFiT for genomic classification",
      "Creating reproducible benchmarks",
    ],
    solutions: [
      "Streaming data processing for large datasets",
      "Custom tokenization for genomic sequences",
      "Transfer learning with domain adaptation",
      "Version-controlled reproducible pipelines",
    ],
    learnings: [
      "Transfer learning reduces training time significantly",
      "Custom tokenization is crucial for genomic data",
      "Reproducible research requires careful pipeline design",
      "Memory optimization is essential for large datasets",
    ],
    diagram: {
      nodes: [
        {
          id: "raw-data",
          type: "technology",
          position: { x: 50, y: 100 },
          data: {
            label: "Raw Data",
            icon: "database",
            category: "Input",
            description: "100GB+ genomic",
            metrics: "100GB+",
            color: "linear-gradient(45deg, #10B981, #059669)",
          },
        },
        {
          id: "preprocessing",
          type: "technology",
          position: { x: 200, y: 100 },
          data: {
            label: "Preprocessing",
            icon: "cpu",
            category: "Processing",
            description: "Biopython",
            color: "linear-gradient(45deg, #3B82F6, #1D4ED8)",
          },
        },
        {
          id: "tokenization",
          type: "technology",
          position: { x: 350, y: 100 },
          data: {
            label: "Tokenization",
            icon: "code",
            category: "Processing",
            description: "Custom tokens",
            color: "linear-gradient(45deg, #8B5CF6, #7C3AED)",
          },
        },
        {
          id: "ulmfit",
          type: "technology",
          position: { x: 200, y: 250 },
          data: {
            label: "ULMFiT",
            icon: "brain",
            category: "ML Model",
            description: "Transfer learning",
            metrics: "94% accuracy",
            color: "linear-gradient(45deg, #EF4444, #DC2626)",
          },
        },
        {
          id: "results",
          type: "technology",
          position: { x: 200, y: 350 },
          data: {
            label: "Results",
            icon: "chart",
            category: "Output",
            description: "Classification",
            color: "linear-gradient(45deg, #EC4899, #DB2777)",
          },
        },
      ],
      edges: [
        { id: "e1", source: "raw-data", target: "preprocessing", animated: true, style: { stroke: "#10B981" } },
        { id: "e2", source: "preprocessing", target: "tokenization", animated: true, style: { stroke: "#3B82F6" } },
        { id: "e3", source: "tokenization", target: "ulmfit", animated: true, style: { stroke: "#8B5CF6" } },
        { id: "e4", source: "ulmfit", target: "results", animated: true, style: { stroke: "#EF4444" } },
      ],
    },
  },
  {
    id: "ai-product-review",
    title: "Real-time Chat with Emotion Analysis",
    description:
      "Real-time chat application with emotional sentiment analysis, WebSocket communication, and AI response generation with sub-500ms latency.",
    type: "real-time",
    typeLabel: "Real-time System",
    experience: "AI Product Review",
    metrics: [
      { icon: "⚡", value: "&lt;500ms", label: "Latency" },
      { icon: "🤖", value: "Real-time", label: "AI Analysis" },
      { icon: "📊", value: "Kafka", label: "Streaming" },
      { icon: "🦙", value: "Llama 3.1", label: "AI Model" },
    ],
    techStack: {
      frontend: [
        { name: "React.js", icon: "⚛️", purpose: "Chat interface" },
        { name: "WebSocket", icon: "🔌", purpose: "Real-time communication" },
      ],
      backend: [
        { name: "Apache Kafka", icon: "📊", purpose: "Message streaming" },
        { name: "Hume EVI2", icon: "🤖", purpose: "Emotion analysis" },
        { name: "Llama 3.1-8B", icon: "🦙", purpose: "AI responses" },
      ],
    },
    challenges: [
      "Achieving sub-500ms response latency",
      "Integrating multiple AI APIs efficiently",
      "Handling concurrent WebSocket connections",
      "Optimizing token-per-second inference",
    ],
    solutions: [
      "Optimized inference pipeline",
      "Kafka for reliable message streaming",
      "LoRA fine-tuning for performance",
      "Async processing for WebSockets",
    ],
    learnings: [
      "Real-time systems need optimization at every layer",
      "Event streaming provides reliable message delivery",
      "AI API integration requires robust error handling",
      "WebSocket management is crucial for scalability",
    ],
    diagram: {
      nodes: [
        {
          id: "react-frontend",
          type: "technology",
          position: { x: 200, y: 50 },
          data: {
            label: "React",
            icon: "globe",
            category: "Frontend",
            description: "Chat interface",
            color: "linear-gradient(45deg, #61DAFB, #21D4FD)",
          },
        },
        {
          id: "websocket",
          type: "technology",
          position: { x: 200, y: 150 },
          data: {
            label: "WebSocket",
            icon: "zap",
            category: "Communication",
            description: "Real-time",
            metrics: "&lt;500ms",
            color: "linear-gradient(45deg, #10B981, #059669)",
          },
        },
        {
          id: "kafka",
          type: "technology",
          position: { x: 200, y: 250 },
          data: {
            label: "Kafka",
            icon: "chart",
            category: "Messaging",
            description: "Event streaming",
            color: "linear-gradient(45deg, #EF4444, #DC2626)",
          },
        },
        {
          id: "hume-api",
          type: "technology",
          position: { x: 100, y: 350 },
          data: {
            label: "Hume AI",
            icon: "brain",
            category: "AI Service",
            description: "Emotion analysis",
            color: "linear-gradient(45deg, #8B5CF6, #7C3AED)",
          },
        },
        {
          id: "llama",
          type: "technology",
          position: { x: 300, y: 350 },
          data: {
            label: "Llama 3.1",
            icon: "brain",
            category: "AI Model",
            description: "Text generation",
            metrics: "Optimized",
            color: "linear-gradient(45deg, #F59E0B, #D97706)",
          },
        },
      ],
      edges: [
        { id: "e1", source: "react-frontend", target: "websocket", animated: true, style: { stroke: "#61DAFB" } },
        { id: "e2", source: "websocket", target: "kafka", animated: true, style: { stroke: "#10B981" } },
        { id: "e3", source: "kafka", target: "hume-api", animated: true, style: { stroke: "#EF4444" } },
        { id: "e4", source: "kafka", target: "llama", animated: true, style: { stroke: "#EF4444" } },
      ],
    },
  },
  {
    id: "sevridy-platform",
    title: "B2B/B2C Service Discovery Platform",
    description:
      "Full-stack service platform with AI-powered discovery, responsive design, and optimized user experience achieving 30% friction reduction.",
    type: "full-stack",
    typeLabel: "Full-Stack Platform",
    experience: "SevRidy Project",
    metrics: [
      { icon: "🎯", value: "30%", label: "Less Friction" },
      { icon: "🔍", value: "AI-Powered", label: "Discovery" },
      { icon: "📱", value: "Responsive", label: "Design" },
      { icon: "⚡", value: "Real-time", label: "Validation" },
    ],
    techStack: {
      frontend: [
        { name: "Next.js", icon: "▲", purpose: "React framework with SSR" },
        { name: "Tailwind CSS", icon: "🎨", purpose: "Utility-first styling" },
        { name: "Framer Motion", icon: "🎭", purpose: "Animations" },
      ],
      backend: [
        { name: "MongoDB", icon: "🍃", purpose: "NoSQL database" },
        { name: "Elastic Search", icon: "🔍", purpose: "Advanced search" },
      ],
    },
    challenges: [
      "Implementing AI-powered service discovery",
      "Achieving 30% friction reduction through UX",
      "Building responsive design for all devices",
      "Integrating Elastic Search for complex matching",
    ],
    solutions: [
      "Advanced search algorithms with Elastic Search",
      "Extensive user testing and UX optimization",
      "Responsive design with Tailwind CSS",
      "Real-time validation with immediate feedback",
    ],
    learnings: [
      "UX optimization requires continuous testing",
      "Elastic Search provides powerful search capabilities",
      "Responsive design is crucial for modern apps",
      "Real-time validation enhances user satisfaction",
    ],
    diagram: {
      nodes: [
        {
          id: "nextjs-frontend",
          type: "technology",
          position: { x: 200, y: 50 },
          data: {
            label: "Next.js",
            icon: "globe",
            category: "Frontend",
            description: "SSR React app",
            metrics: "30% less friction",
            color: "linear-gradient(45deg, #000000, #333333)",
          },
        },
        {
          id: "tailwind",
          type: "technology",
          position: { x: 100, y: 150 },
          data: {
            label: "Tailwind",
            icon: "palette",
            category: "Styling",
            description: "CSS framework",
            color: "linear-gradient(45deg, #06B6D4, #0891B2)",
          },
        },
        {
          id: "framer-motion",
          type: "technology",
          position: { x: 300, y: 150 },
          data: {
            label: "Framer",
            icon: "zap",
            category: "Animation",
            description: "Smooth animations",
            color: "linear-gradient(45deg, #EC4899, #DB2777)",
          },
        },
        {
          id: "mongodb",
          type: "technology",
          position: { x: 100, y: 250 },
          data: {
            label: "MongoDB",
            icon: "database",
            category: "Database",
            description: "NoSQL database",
            color: "linear-gradient(45deg, #47A248, #4DB33D)",
          },
        },
        {
          id: "elasticsearch",
          type: "technology",
          position: { x: 300, y: 250 },
          data: {
            label: "Elastic",
            icon: "search",
            category: "Search",
            description: "Service discovery",
            color: "linear-gradient(45deg, #FEC514, #F39C12)",
          },
        },
      ],
      edges: [
        { id: "e1", source: "nextjs-frontend", target: "tailwind", animated: true, style: { stroke: "#000000" } },
        { id: "e2", source: "nextjs-frontend", target: "framer-motion", animated: true, style: { stroke: "#000000" } },
        { id: "e3", source: "nextjs-frontend", target: "mongodb", animated: true, style: { stroke: "#000000" } },
        { id: "e4", source: "nextjs-frontend", target: "elasticsearch", animated: true, style: { stroke: "#000000" } },
      ],
    },
  },
]
