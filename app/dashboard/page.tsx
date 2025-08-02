"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ArrorUpRight from "@/components/ui/ArrorUpRight";
import HoverText from "@/components/shared/HoverText";
import BlurryBG from "@/components/shared/BlurryBG";
import RenderIf from "@/utils/RenderIf";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [heroText, setHeroText] = useState("Dashboard");
  return (
    <div className="relative">
      <Hero
        heroText={heroText}
        className="md:top-[0px] -top-[20px] text-[50px] md:text-[100px] lg:text-[130px] transition-all transform-3d duration-500 ease-in-out"
      />
      <CardsSection setHeroText={setHeroText} className="pt-[20px] mt-8" />
    </div>
  );
}

const Hero = ({
  className,
  heroText,
}: {
  className?: string;
  heroText?: string;
}) => {
  return (
    <div
      className={`absolute left-0 !bg-black flex items-center justify-center w-full text-center font-semibold ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={heroText}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute w-full "
        >
          <div className="flex items-center !cursor-default justify-center gap-5">
            <div>{heroText || "Dashboard"}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CardsSection = ({
  className,
  setHeroText,
}: {
  className?: string;
  setHeroText: (text: string) => void;
}) => {
  return (
    <div className={`flex flex-col gap-3 md:gap-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <Card
          setHeroText={setHeroText}
          className="md:w-1/2 lg:w-1/4 w-full"
          title="Educations"
        />
        <Card
          setHeroText={setHeroText}
          className="md:w-1/2 lg:w-3/4 w-full"
          title="Internships"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 w-full">
        <div className="flex w-full  lg:w-3/4 gap-3 md:gap-4">
          <Card
            setHeroText={setHeroText}
            className="w-1/2 md:w-2/3"
            title="Portfolio"
          />
          <ImageCard setHeroText={setHeroText} />
        </div>
        <div className="flex w-full lg:w-1/4 flex-row lg:flex-col gap-3 md:gap-4">
          <Card
            setHeroText={setHeroText}
            className="mini lg:!h-1/2 w-1/2 md:w-full"
            title="Error Logs"
          />
          <Card
            setHeroText={setHeroText}
            className="mini lg:!h-1/2 w-1/2 md:w-full"
            title="CodeSnippets"
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({
  className,
  title,
  setHeroText,
}: {
  className?: string;
  title?: string;
  path?: string;
  setHeroText: (text: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`dashboard/${title?.toLowerCase() || "#"}`}
      className={`card  ${className}`}
      onMouseEnter={() => {
        setHovered(true);
        setHeroText(title!);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setHeroText("");
      }}
      {...(title === "Resume"
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <BlurryBG className="w-full h-full rounded-lg " />
      <RenderIf condition={!!title}>
        <div className="flex items-center justify-between w-full">
          <div className="overflow-hidden md:text-xl text-md">
            <HoverText text={title || "Card"} hovered={hovered} />
          </div>
          <ArrorUpRight
            className={`transform duration-500 ${hovered ? "rotate-45" : ""} `}
          />
        </div>
      </RenderIf>
    </Link>
  );
};

const ImageCard = ({
  src,
  setHeroText,
}: {
  src?: string;
  setHeroText: (text: string) => void;
}) => {
  return (
    <div
      onMouseEnter={() => {
        setHeroText("Heey!");
      }}
      onMouseLeave={() => setHeroText("")}
      className="card  w-1/2 md:w-1/3 "
    >
      <div>
        <Image
          className="object-cover"
          objectFit="cover"
          src={src || "/myPhotos/barca.jpg"}
          layout="fill"
          priority
          alt="me"
        />
      </div>
    </div>
  );
};
