import Image from 'next/image';
import React from 'react';
import { Calendar } from 'lucide-react';

const experiences: Array<ExperienceItem> = [
  {
    logo: {
      url: "/png/zoho-dark.svg",
      width: 100,
      height: 60
    },
    company: "Zoho Corporation",
    position: "Software Engineer",
    start: "SEP 11, 2024",
    end: "PRESENT",
    description: "Working with a cross-functional team in a fast-paced environment to build, maintain and test a user-centric fintech solution using modern technologies",
  },
  {
    logo: {
      url: "/png/aerele.png",
      width: 100,
      height: 50
    },
    company: "Aerele Technologies",
    position: "Software Developer Intern",
    start: "SEP 11, 2024",
    end: "SEP 11, 2024",
    description: "Volunteer writer for freeCodeCamp, producing technical articles around topics like nextjs, react, and JavaScript.",
  }
];
interface Logo {
  url: string,
  width: number,
  height: number
}
interface ExperienceItem {
  logo: Logo,
  company: string,
  position: string,
  start: string,
  end: string,
  description: string,
}

const ExperienceItem = ({ logo, company, position, start, end, description }: ExperienceItem) => (
  <div className="flex items-start mb-14 relative">
    <Image src={logo.url} alt="Logo" width={logo.width} height={logo.height} priority className='mr-6' />
    <div className="max-w-2xl">
      <h3 className="text-lg font-semibold text-white">{company}</h3>
      <h4 className="text-md font-medium text-gray-300">{position}</h4>
      <p className="text-sm text-gray-400 mb-4 flex items-center mt-2">
        <Calendar size={14} className="mr-1" />
        {start} - <span className={end === 'PRESENT' ? 'text-primary' : ''}>{end}</span>
      </p>
      <p className="text-sm text-gray-300 mt-2">{description}</p>
    </div>
  </div>
);

const WorkExperienceTimeline = () => {
  
  return (
    <>
      <h2 className="text-3xl mt-40 mb-16 font-semibold">Work Experience(<span className="text-primary">#</span>)</h2>
      {experiences.map((exp, index) => (
        <ExperienceItem
          key={index}
          {...exp}
        />
      ))}
    </>
  );
};

export default WorkExperienceTimeline;