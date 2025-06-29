"use client";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React from "react";

const PortfolioPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-[26px] md:text-[36px] lg:text-[48px]  leading-tight lg:w-8/12 mb-10">
        Dive into a few projects that represent my most fulfilling design
        experiences
      </h1>

      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard title="Design System Revamp" image="/hasanali.jpg" />
          <ProjectCard title="AI Dashboard Interface" image="/hasanali.jpg" />
        </div>

        <div>
          <ProjectCard
            title="Brand Identity Project"
            image="/hasanali.jpg"
            className="w-full md:h-[500px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard title="Motion UX Toolkit" image="/hasanali.jpg" />
          <ProjectCard title="3D Product Showcase" image="/hasanali.jpg" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

type ProjectCardProps = {
  className?: string;
  title: string;
  image?: string;
  description?: string;
};

const ProjectCard = ({
  className = "",
  title,
  image = "/hasanali.jpg",
  description,
}: ProjectCardProps) => {
  return (
    <div
      className={`rounded-3xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors overflow-hidden shadow-sm ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
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

export default PortfolioPage;
