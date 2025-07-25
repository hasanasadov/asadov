"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/constants";

type ProjectCardProps = {
  project: {
    id: number;
    title: string;
    image: string;
    href: string;
    description: string;
  };
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`${PATHS.PORTFOLIO}/${project.id}`}
      className="group border-[1px] border-black/20 relative block rounded-xl overflow-hidden shadow-sm bg-gray-50 dark:bg-white/10 transition-transform transform hover:scale-[1.03] hover:shadow-lg cursor-pointer focus:outline-none "
      aria-label={`Open project details: ${project.title}`}
      tabIndex={0}
    >
      <div className="relative h-52 md:h-48 w-full overflow-hidden ">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white bg-black/50 rounded-xl pointer-events-none">
        <h3 className="text-2xl font-semibold drop-shadow-lg">
          {project.title}
        </h3>
        <p className="mt-2 text-sm drop-shadow-md">{project.description}</p>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {project.title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
