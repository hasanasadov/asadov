"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectCardProps } from "@/types"; // Ensure this type matches your data
import { PATHS } from "@/constants/paths";

interface EnhancedProjectCardProps extends ProjectCardProps {
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: EnhancedProjectCardProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group w-full flex flex-col h-full"
    >
      <Link
        href={`${PATHS.PORTFOLIO}/${project.id}`}
        className="block w-full h-full cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
          />

          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300" />
        </div>

        {/* Content Section */}
        <div className="mt-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
              {project.title}
            </h3>

            {/* Animated Arrow Icon */}
            <span className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tags / Meta Information (Optional but Professional) */}
          {/* {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[11px] uppercase tracking-wider font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
