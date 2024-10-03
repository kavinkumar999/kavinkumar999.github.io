"use client";

import Image from 'next/image';
import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

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
  <motion.div 
    className="flex items-start mb-14 relative"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Image src={logo.url} alt="Logo" width={logo.width} height={logo.height} priority className='mr-6' />
    </motion.div>
    <div className="max-w-2xl">
      <motion.h3 
        className="text-lg font-semibold"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {company}
      </motion.h3>
      <motion.h4 
        className="text-md font-medium text-gray-300"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {position}
      </motion.h4>
      <motion.p 
        className="text-sm text-gray-400 mb-4 flex items-center mt-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Calendar size={14} className="mr-1" />
        {start} - <span className={end === 'PRESENT' ? 'text-primary' : ''}>{end}</span>
      </motion.p>
      <motion.p 
        className="text-sm text-gray-300 mt-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {description}
      </motion.p>
    </div>
  </motion.div>
);

const WorkExperienceTimeline = () => {
  return (
    <>
      <motion.h2 
        className="text-3xl mt-40 mb-16 font-semibold"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Work Experience(<span className="text-primary">#</span>)
      </motion.h2>
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