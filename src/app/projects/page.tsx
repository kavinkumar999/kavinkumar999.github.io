import React from 'react';

export default function Projects() {
  const projects = [
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
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p>{project.description}</p>
            <div className="flex flex-wrap gap-2 my-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}