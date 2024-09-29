import Image from 'next/image';
import React from 'react';
import { Calendar } from 'lucide-react';
import { Span } from 'next/dist/trace';

const experiences: Array<ExperienceItem> = [
  {
    logo: "/png/zoho-dark.svg",
    company: "Zoho Corporation",
    position: "Software Engineer",
    start: "SEP 11, 2024",
    end: "PRESENT",
    description: "Working with a cross-functional team in a fast-paced environment to build, maintain and test a user-centric fintech solution using modern technologies",
  },
  {
    logo: "/png/aerele.png",
    company: "Aerele Technologies",
    position: "Software Developer Intern",
    start: "SEP 11, 2024",
    end: "SEP 11, 2024",
    description: "Volunteer writer for freeCodeCamp, producing technical articles around topics like nextjs, react, and JavaScript.",
  }
];
interface ExperienceItem {
  logo: string,
  company: string,
  position: string,
  start: string,
  end: string,
  description: string,
}

const ExperienceItem = ({ logo, company, position, start, end, description }: ExperienceItem) => (
  <div className="flex items-start mb-14 relative">
    <Image src={logo} alt="Logo" width={120} height={120} priority className='mr-6' />
    <div className="max-w-2xl">
      <h3 className="text-lg font-semibold text-white">{company}</h3>
      <h4 className="text-md font-medium text-gray-300">{position}</h4>
      <p className="text-sm text-gray-400 mb-4 flex items-center mt-2">
        <Calendar size={14} className="mr-1" />
        {start} - <span className={end === 'PRESENT' ? 'text-green-300' : ''}>{end}</span>
      </p>
      <p className="text-sm text-gray-300 mt-2">{description}</p>
    </div>
  </div>
);

const WorkExperienceTimeline = () => {
  
  return (
    <>
      <h2 className="text-3xl mt-40 mb-16 font-semibold">Work Experience(<span className="text-green-300">#</span>)</h2>
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