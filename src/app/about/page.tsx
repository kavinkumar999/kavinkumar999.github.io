/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from 'next/image'
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaJava } from 'react-icons/fa'
import Transition from '../components/animations/transition'
import { SiTypescript, SiJavascript, SiMongodb, SiPostgresql, SiDocker, SiJenkins, SiSpringboot, SiNextdotjs, SiTailwindcss, SiApachekafka } from 'react-icons/si'
import { motion } from 'framer-motion'

export default function AboutSection() {
  const techStack = [
    { icon: SiNextdotjs, name: 'Next.js', color: 'text-gray-800' },
    { icon: FaReact, name: 'React', color: 'text-cyan-500' },
    { icon: FaNodeJs, name: 'Node.js', color: 'text-green-500' },
    { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-500' },
    { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-500' },
    { icon: FaPython, name: 'Python', color: 'text-blue-400' },
    { icon: FaJava, name: 'Java', color: 'text-red-500' },
    { icon: SiSpringboot, name: 'Spring Boot', color: 'text-green-600' },
    { icon: FaDatabase, name: 'SQL', color: 'text-gray-600' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-green-700' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-600' },
    { icon: SiDocker, name: 'Docker', color: 'text-blue-500' },
    { icon: SiJenkins, name: 'Jenkins', color: 'text-orange-500' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-teal-500' },
    { icon: SiApachekafka, name: 'Apache Kafka', color: 'text-primary-secondary' }
  ]

  return (
    <div className="container mx-auto px-4">
      <motion.h2 
        className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-primary-secondary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        <Transition delay={0} xInitail={-50}>
          <div className="max-w-xl space-y-6">
            <p className="text-lg leading-relaxed">
              Hello! My name is <span className='text-primary font-semibold'>Kavin Kumar</span> and I enjoy creating things that live on the internet. My web development adventure kicked off back in 2015 when I discovered the browser's the inspect option. I used it to change my Facebook name and proudly showcased my 'hacking' skills 😅 to my friends, setting me on the path to web development.
            </p>
            <p className="text-lg leading-relaxed">
              During my BE degree in college, I immersed myself in the world of competitive programming, which served as a crucial milestone in my journey. Additionally, I acquired web development skills that enabled me to actively participate in various hackathons, offering me invaluable experiences and insights along the way.
            </p>
            <p className="text-lg leading-relaxed">
              Fast-forward to today, I'm working at ZOHO Corporation as a software developer. Build & ship various features into zoho payroll app, keeping in mind paradigms of stability, security and scalability.
            </p>
          </div>
        </Transition>
        <Transition delay={0.2} xInitail={50}>
          <div className="relative group md:mt-0 mt-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-primary-secondary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/jpg/photo.jpg"
                alt="Kavin Kumar"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </Transition>
      </div>
      <motion.div 
        className="mt-24 mb-32 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-12 bg-gradient-to-r from-primary to-primary-secondary bg-clip-text text-transparent">Tech Stack</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
          {techStack.map((tech, index) => {
            const TechIcon = tech.icon;
            return (
              <motion.div 
                key={index} 
                className="flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-muted transition-colors duration-300 group-hover:border-primary/50">
                  <TechIcon className={`text-4xl ${tech.color} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <span className="text-sm mt-2 opacity-70 group-hover:opacity-100 transition-opacity">{tech.name}</span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
