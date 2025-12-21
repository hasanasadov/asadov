"use client";

import { ProjectSidebarProps } from "@/types";
import React from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  title,
  image,
  description,
  technologies,
  liveUrl,
  repoUrl,
}) => {
  return (
    <aside className="lg:sticky lg:top-24 h-fit flex flex-col gap-8">
      {/* Image Card */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          priority
        />
      </div>

      {/* Meta Content */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech Stack */}
        {technologies && technologies.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg py-2.5 px-4 text-sm font-semibold shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg py-2.5 px-4 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-[0.98]"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
