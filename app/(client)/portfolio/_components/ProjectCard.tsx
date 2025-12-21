"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectCardProps } from "@/types";
import { PATHS } from "@/constants/paths";

interface EnhancedProjectCardProps extends ProjectCardProps {
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: EnhancedProjectCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full flex flex-col gap-4"
    >
      <Link
        href={`${PATHS.PORTFOLIO}/${project.id}`}
        className="block w-full cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
          {/* Hover Overlay */}
          <div className="absolute inset-0 z-10 bg-zinc-900/0 group-hover:bg-zinc-900/10 dark:group-hover:bg-white/5 transition-colors duration-500" />
          
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Action Button (Appears on Hover) */}
          <div className="absolute top-4 right-4 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="p-2 bg-white dark:bg-black text-black dark:text-white rounded-full shadow-lg">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Typography & Meta */}
        <div className="flex flex-col gap-1 pt-2">
          <div className="flex justify-between items-baseline">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:underline decoration-zinc-300 underline-offset-4 decoration-1">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
               2024 {/* You can map project.year here if available */}
            </span>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 font-light">
            {project.description}
          </p>

          {/* Tech Stack Mini-Badges (Optional) */}
          {project.technologies && (
             <div className="flex gap-2 mt-2">
                {project.technologies.slice(0, 3).map((tech: string) => (
                  <span key={tech} className="text-[10px] text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
             </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;