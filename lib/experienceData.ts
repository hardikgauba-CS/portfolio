export interface Experience {
  id: string
  year: string
  title: string
  company: string
  location: string
  type: "Research" | "Internship" | "Academic" | "Full-time" | "Part-time"
  description: string
  achievements: string[]
  skills: string[]
  companyUrl?: string
  companyLogo?: string
}

export const experiences: Experience[] = [
  {
    id: "1",
    year: "May 2024 – Aug 2024",
    title: "Software Automation Engineering Intern",
    company: "UL Solutions",
    location: "Fremont, CA, USA",
    type: "Internship",
    description:
      "Built automation frameworks for large-scale system validation workflows using Python and Bash while improving CI/CD reliability and monitoring infrastructure.",
    achievements: [
      "Engineered automation frameworks using Python and Bash reducing manual execution time by 40%",
      "Integrated validation pipelines with Git and Jenkins CI/CD to automate system validation",
      "Instrumented automation runs with structured logging and Linux monitoring reducing failure rates by 25%",
      "Improved execution stability using retry mechanisms, timeout management, and parallelized processing",
    ],
    skills: [
      "Python",
      "Bash",
      "Linux",
      "CI/CD",
      "Git",
      "Jenkins",
      "Automation",
      "System Validation",
    ],
    companyUrl: "https://www.ul.com",
  },
  {
    id: "2",
    year: "May 2023 – Aug 2023",
    title: "Software Development Intern",
    company: "Infosys",
    location: "Delhi, India",
    type: "Internship",
    description:
      "Developed scalable backend systems and marketing analytics tools using Java, React, and AWS cloud infrastructure.",
    achievements: [
      "Built scalable Java backend services integrated with React for marketing analytics platform",
      "Designed REST APIs integrated with DynamoDB improving query performance",
      "Deployed application components using AWS ECS and S3",
      "Automated API and UI validation workflows using Nightwatch",
    ],
    skills: [
      "Java",
      "React",
      "REST APIs",
      "AWS",
      "DynamoDB",
      "Nightwatch",
      "Cloud Deployment",
    ],
    companyUrl: "https://www.infosys.com",
  },
  {
    id: "3",
    year: "Jan 2024 – Present",
    title: "Teaching Assistant",
    company: "San José State University",
    location: "San Jose, CA",
    type: "Academic",
    description:
      "Assist professor in the Advanced Data Structures course by supporting students and grading coursework.",
    achievements: [
      "Graded homework, assignments, and exams for Advanced Data Structures",
      "Mentored students on algorithms and complex data structure concepts",
      "Supported academic rigor by reviewing student submissions and providing feedback",
    ],
    skills: [
      "Java",
      "Data Structures",
      "Algorithms",
      "Teaching",
      "Mentoring",
    ],
    companyUrl: "https://www.sjsu.edu",
  },

  /* KEEPING YOUR EXISTING FLIPKART EXPERIENCE */
  {
    id: "4",
    year: "May 2022 – Jul 2022",
    title: "Software Engineering Intern",
    company: "Flipkart",
    location: "New Delhi, India",
    type: "Internship",
    description:
      "Designed and implemented enterprise fintech applications supporting one of India's largest e-commerce platforms.",
    achievements: [
      "Built enterprise fintech applications supporting $2B monthly revenue",
      "Designed transaction analytics dashboard for leadership using Google Charts",
      "Owned engineering workflow for cancel, return, and exchange systems",
    ],
    skills: [
      "C#",
      ".NET",
      "Node.js",
      "React",
      "Redux",
      "MSSQL",
      "jQuery",
    ],
    companyUrl: "https://www.flipkart.com",
  },

  /* KEEPING YOUR EXISTING UNIVERSITY POLICE ROLE */
  {
    id: "5",
    year: "Dec 2022 – May 2026",
    title: "Student Assistant",
    company: "University Police Department — SJSU",
    location: "San Jose, CA",
    type: "Part-time",
    description:
      "Assist students and faculty with campus parking operations and help enforce university parking policies.",
    achievements: [
      ],
    skills: [
      "Customer Service",
      "Campus Operations",
      "Communication",
    ],
    companyUrl: "https://www.sjsu.edu/police",
  },
]