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
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Transition delay={0} xInitail={-50}>
          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              Hello! My name is <span className='text-primary'>Kavin Kumar</span> and I enjoy creating things that live on the internet. My web development adventure kicked off back in 2015 when I discovered the browser's the inspect option. I used it to change my Facebook name and proudly showcased my 'hacking' skills 😅 to my friends, setting me on the path to web development
            </p>
            <p className="text-lg mb-4">
            During my BE degree in college, I immersed myself in the world of competitive programming, which served as a crucial milestone in my journey. Additionally, I acquired web development skills that enabled me to actively participate in various hackathons, offering me invaluable experiences and insights along the way.
            </p>
            <p className="text-lg mb-4">
            Fast-forward to today, I've working at ZOHO Corporation as a sofware developer. Build & ship various features into zoho payroll app. Keeping in mind paradigms of stability, security and scalability
            </p>
          </div>
        </Transition>
        <Transition delay={0.2} xInitail={50}>
          <Image
            src="/jpg/photo.jpg"
            alt="image"
            width={300}
            height={300}
            className="rounded-lg shadow-lg dark:shadow-lg-dark w-full"
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
