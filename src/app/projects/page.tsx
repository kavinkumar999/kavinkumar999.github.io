"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon, ExternalLinkIcon } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubLink: string
  liveLink: string
  imageUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Ember Productivity",
    description: "A VSCode extension designed for Ember.js that simplifies switching between related files, boosting your development efficiency",
    technologies: ["TypeScript", "VSCode API"],
    githubLink: "https://github.com/kavinkumar999/ember-productivity",
    liveLink: "https://marketplace.visualstudio.com/items?itemName=kavinkumar.ember-productivity",
    imageUrl: "/png/ember-productivity.png"
  },
  {
    id: 2,
    title: "One Dark +",
    description: "A custom theme for Visual Studio Code inspired by Atom's One Dark theme",
    technologies: ["TypeScript", "CSS", "VSCode API"],
    githubLink: "https://github.com/kavinkumar999/one-dark-plus",
    liveLink: "https://marketplace.visualstudio.com/items?itemName=kavinkumar.one-dark-custom-theme",
    imageUrl: "/png/one-dark-plus.png"
  },
  {
    id: 3,
    title: "test case generator",
    description: "An addon that helps you create tests by recording user interactions in your application. This tool automatically generates test cases based on your actions, making test creation more intuitive and efficient.",
    technologies: ["ember.js", "typescript"],
    githubLink: "https://github.com/kavinkumar999/ember-test-recorder",
    liveLink: "https://extraordinary-boba-4b12bc.netlify.app/#/home",
    imageUrl: "/png/play-button.png"
  },
  {
    id: 4,
    title: "Stock Slice",
    description: "Stock Slice is a tool designed to simplify stock analysis by breaking down large lists of stocks into manageable chunks. Ideal for users of TradingView's free plan",
    technologies: ["React", "Tailwind CSS", "Typescript"],
    githubLink: "https://github.com/kavinkumar999/stock-slice",
    liveLink: "https://kavinkumar999.github.io/stock-slice/",
    imageUrl: "/png/stock-slice.png"
  },
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
  const handleLinkClick = (_url: string) => {
    window.open(_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="container mx-auto px-4">
      <motion.h2 
        className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-primary-secondary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tools & Apps
      </motion.h2>
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
        {projects.map((project) => (
          <motion.div
            key={project.id} className="hover:shadow-lg dark:hover:shadow-lg-dark group"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="h-full flex flex-col">
                <div className="relative w-full h-48 flex justify-center items-center">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill={true}
                  objectFit="contain"
                  className="rounded-t-lg"
                />
                </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary" >{project.title}</CardTitle>
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
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}