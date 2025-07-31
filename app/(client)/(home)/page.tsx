"use client";

import BlurryBG from "@/components/shared/BlurryBG";
import HoverText from "@/components/shared/HoverText";
import ArrorUpRight from "@/components/ui/ArrorUpRight";
import RenderIf from "@/utils/RenderIf";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [heroText, setHeroText] = useState("Hasanali");
  return (
    <div className="relative">
      <Hero
        heroText={heroText}
        className="md:top-[20px] top-[40px] text-[50px] md:text-[100px] lg:text-[130px] transition-all transform-3d duration-500 ease-in-out"
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
          <div className="flex items-center justify-center gap-5">
            <div>
              <HoverText text={heroText || "Hasanali"} />
            </div>
            <RenderIf condition={!heroText}>
              <div className="md:block hidden">
                <HoverText text="Asadov" />
              </div>
            </RenderIf>
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
          title="About"
        />
        <Card
          setHeroText={setHeroText}
          className="md:w-1/2 lg:w-3/4 w-full"
          title="Portfolio"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 w-full">
        <div className="flex w-full  lg:w-3/4 gap-3 md:gap-4">
          <Card
            setHeroText={setHeroText}
            className="w-1/2 md:w-2/3"
            title="Contact"
          />
          <ImageCard setHeroText={setHeroText} />
        </div>
        <div className="flex w-full lg:w-1/4 flex-row lg:flex-col gap-3 md:gap-4">
          <Stack
            setHeroText={setHeroText}
            className="mini lg:!h-1/2 w-1/2 md:w-full"
          />
          <Card
            setHeroText={setHeroText}
            className="mini lg:!h-1/2 w-1/2 md:w-full"
            title="Resume"
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
  const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK || "#";
  return (
    <Link
      href={title == "Resume" ? resumeLink : title?.toLowerCase() || "#"}
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

const Stack = ({
  className,
  setHeroText,
}: {
  className?: string;
  setHeroText: (text: string) => void;
}) => {
  const images = [
    "/stack/A.webp",
    "/stack/apps.webp",
    "/stack/flower.webp",
    "/stack/gpt.avif",
    "/stack/notion.webp",
    "/stack/stack.webp",
    "/stack/o.avif",
  ];
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const el = scrollContainer;
    const speed = 1; // px per tick
    const intervalTime = 20; // ms

    const intervalId = setInterval(() => {
      if (!el) return;

      el.scrollBy({ left: speed, behavior: "auto" });

      // Reset when reaching the end
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (clickCount >= 7) {
      router.push("/dashboard");
      setClickCount(0); // Reset click count after redirect
    }
  }, [clickCount, router]);
  return (
    <div
      onMouseEnter={() => setHeroText("Stack")}
      onMouseLeave={() => setHeroText("")}
      onClick={() => setClickCount((prev) => prev + 1)}
      className={`card relative flex !items-center !justify-center !p-0 duration-300 transition-all ${className}`}
    >
      <BlurryBG className="w-full h-full rounded-lg" />
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r dark:from-black from-[#f0f0f0] via-white/40 dark:via-black/40 to-transparent z-10 pointer-events-none duration-500 transition-colors" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l dark:from-black from-[#f0f0f0] via-white/40 dark:via-black/40 to-transparent z-10 pointer-events-none duration-500 transition-colors" />

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 items-center h-full overflow-hidden no-scrollbar whitespace-nowrap"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {images.concat(images).map((src, index) => (
          <div
            key={index}
            className="md:min-w-[80px] md:min-h-[80px] min-w-[60px] min-h-[60px] rounded-2xl p-3 md:p-4 dark:bg-white/10 bg-black/5 duration-500 transition-colors flex items-center justify-center"
          >
            <Image
              className="object-contain rounded-lg"
              width={80}
              height={80}
              src={src}
              alt={`stack-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
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
          src={src || "/myPhotos/porto.jpg"}
          layout="fill"
          priority
          alt="me"
        />
      </div>
    </div>
  );
};
