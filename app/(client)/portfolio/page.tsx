import Footer from "@/components/shared/Footer";
import ProjectCard from "@/components/shared/ProjectCard";
import React from "react";

export const metadata = {
  title: "Portfolio - Hasanali Asadov",
  description: "Portfolio səhifəsi - Hasanali Asadov.",
};

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

export default PortfolioPage;
