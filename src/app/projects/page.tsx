"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon, ExternalLinkIcon } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubLink: string
  liveLink: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubLink: "https://github.com/yourusername/ecommerce-platform",
    liveLink: "https://ecommerce-platform-demo.vercel.app"
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather application using OpenWeatherMap API",
    technologies: ["React", "API Integration", "CSS3"],
    githubLink: "https://github.com/yourusername/weather-app",
    liveLink: "https://weather-app-demo.vercel.app"
  },
  {
    id: 3,
    title: "Task Management System",
    description: "Collaborative task manager with real-time updates",
    technologies: ["Vue.js", "Firebase", "Vuex"],
    githubLink: "https://github.com/yourusername/task-manager",
    liveLink: "https://task-manager-demo.vercel.app"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/yourusername/portfolio",
    liveLink: "https://your-portfolio.vercel.app"
  }
]


const techStackVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}
export default function ProjectList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const handleLinkClick = (_url: string) => {
    window.open(_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">My Projects</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
              <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      custom={techIndex}
                      variants={techStackVariants}
                      className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleLinkClick(project.githubLink)}
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleLinkClick(project.liveLink)}
                >
                  <ExternalLinkIcon className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </CardFooter>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}