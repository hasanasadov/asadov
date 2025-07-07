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
          <ProjectCard
            title="Turbo.az Clone"
            image="/turbo.png"
            href="hasturbo.vercel.app"
          />
          <ProjectCard
            title="Sixt.com Clone"
            image="/sixt.png"
            href="hassixt.site"
          />
        </div>

        <div>
          <ProjectCard
            title="Morent car"
            image="/hasrent.png"
            className="w-full md:h-[500px]"
            href="hasrent.vercel.app"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="MyEvents App"
            image="/myevents.png"
            href="myevents.az"
          />
          <ProjectCard
            title="ToDo App"
            image="/hastodo.png"
            href="hastodo.vercel.app"
          />
        </div>
        <div>
          <ProjectCard
            title="NFT Marketplace"
            image="/hasnft.png"
            className="w-full md:h-[500px]"
            href="hasnft.vercel.app"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="Instagram Clone"
            image="/hasagram.png"
            href="hasagram.vercel.app"
          />
          <ProjectCard
            title="Crypto Tracker"
            image="/hascrypto.png"
            href="hascrypto.vercel.app"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="Neowise "
            image="/hasneowise.png"
            href="hasneowise.vercel.app"
          />
          <ProjectCard
            title="Games"
            image="/hasgames.png"
            href="hasgames.vercel.app"
          />
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

export default PortfolioPage;
