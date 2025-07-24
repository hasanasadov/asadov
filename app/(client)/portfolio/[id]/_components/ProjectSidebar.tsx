"use client";

import React from "react";
import Image from "next/image";

type ProjectSidebarProps = {
  title: string;
  image: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  repoUrl?: string;
};

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  title,
  image,
  description,
  technologies,
  liveUrl,
  repoUrl,
}) => {
  return (
    <aside
      className="
        md:sticky md:top-8 md:self-start flex flex-col gap-6 max-h-[calc(100vh-5rem)] md:overflow-auto md:pr-4
        scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-thumb-rounded
        hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600
      "
    >
      <div className="relative w-full h-64 md:h-[300px] rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white leading-tight">
        {title}
      </h1>

      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-sm md:text-base">
        {description}
      </p>

      {technologies && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-xs md:text-sm font-medium select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 mt-4 md:mt-6">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center border border-indigo-500 text-indigo-500 rounded-md py-2 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
          >
            Live Demo
          </a>
        )}
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md py-2 text-sm font-semibold hover:border-indigo-500 hover:text-indigo-500 transition"
          >
            View Code
          </a>
        )}
      </div>
    </aside>
  );
};

export default ProjectSidebar;
