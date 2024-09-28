import React from 'react';

export default function Projects() {
  const projects = [
    { id: 1, name: 'Project 1', description: 'Description of Project 1' },
    { id: 2, name: 'Project 2', description: 'Description of Project 2' },
    { id: 3, name: 'Project 3', description: 'Description of Project 3' },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}