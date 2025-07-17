"use client";

import Image from "next/image";
import React from "react";

type ProjectCardProps = {
  className?: string;
  title: string;
  image?: string;
  href?: string;
  description?: string;
};

const ProjectCard = ({
  className = "",
  title,
  href,
  image = "/paris.jpg",
  description,
}: ProjectCardProps) => {
  return (
    <div
      onClick={() => {
        if (href) {
          window.open(`https://${href}`, "_blank");
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open project: ${title}`}
      className={`rounded-3xl cursor-pointer bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30 transition-colors overflow-hidden shadow-sm ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
        <div className="px-4 py-5">
          <h2 className="text-xl md:text-2xl font-medium mb-2">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
