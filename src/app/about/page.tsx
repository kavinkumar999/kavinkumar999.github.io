import Image from 'next/image'
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaJava } from 'react-icons/fa'
import Transition from '../components/animations/transition'
import { SiTypescript, SiJavascript, SiMongodb, SiPostgresql, SiDocker, SiJenkins, SiSpringboot, SiNextdotjs, SiTailwindcss, SiApachekafka } from 'react-icons/si'

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
      <h2 className="text-3xl font-bold mb-12">About Me</h2>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Transition delay={0} xInitail={-50}>
          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              Hello! I'm John Doe, a passionate developer with a love for creating
              innovative solutions. With 5 years of experience in the field, I've had
              the opportunity to work on a wide range of projects, from web applications
              to mobile apps and everything in between.
            </p>
            <p className="text-lg mb-4">
              When I'm not coding, you can find me hiking in nature, reading sci-fi
              novels, or experimenting with new recipes in the kitchen. I believe
              in continuous learning and always strive to stay up-to-date with the
              latest technologies and best practices in the ever-evolving world of
              software development.
            </p>
            <p className="text-lg mb-4">
              I'm always excited to take on new challenges and collaborate on
              interesting projects. Feel free to reach out if you'd like to work
              together or just have a chat about technology!
            </p>
          </div>
        </Transition>
        <Transition delay={0.2} xInitail={50}>
          <Image
            src="/placeholder.svg"
            alt="John Doe"
            width={400}
            height={400}
            className="rounded-lg shadow-lg w-full"
          />
        </Transition>
      </div>
      <div className="mt-8 mb-32">
        <h2 className="text-2xl font-semibold mb-12">Tech Stack</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {techStack.map((tech, index) => {
            const TechIcon = tech.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <div>
                  <TechIcon className={`text-3xl mb-2 ${tech.color}`} />
                </div>
                <span className="text-sm">{tech.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
