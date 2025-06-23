"use client";

import BlurryBG from "@/components/shared/BlurryBG";
import HoverText from "@/components/shared/HoverText";
import ArrorUpRight from "@/components/ui/ArrorUpRight";
import RenderIf from "@/utils/RenderIf";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div>
      <Hero className="md:top-[55px] top-[40px] text-[68px] md:text-[100px] lg:text-[130px]" />
      <CardsSection className="pt-[20px]" />
    </div>
  );
}

const Hero = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute  left-0 flex items-center justify-center w-full  text-center  font-semibold ${className}`}
    >
      <div>
        <HoverText text="Hasanali" />
      </div>
      <div className="hidden lg:inline-block">
        <HoverText text="Asadov" />
      </div>
    </div>
  );
};

const CardsSection = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className=" flex flex-col md:flex-row gap-4">
        <Card className="md:w-1/2 lg:w-1/4 w-full" title="About" />
        <Card className="md:w-1/2 lg:w-3/4 w-full" title="Portfolio" />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex w-full  lg:w-3/4 gap-4">
          <Card className="w-1/2 md:w-2/3" title="Contact" />
          <ImageCard />
        </div>
        <div className="flex w-full lg:w-1/4 flex-row lg:flex-col gap-4">
          <Stack className="mini lg:!h-1/2 w-1/2 md:w-full" />
          <Card className="mini lg:!h-1/2 w-1/2 md:w-full" title="Resume" />
        </div>
      </div>
    </div>
  );
};

const Card = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
  path?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={title?.toLowerCase() || "#"}
      className={`card ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <BlurryBG className="w-full h-full rounded-lg" />
      <RenderIf condition={!!title}>
        <div className="flex items-center justify-between w-full">
          <div className="overflow-hidden">
            <HoverText text={title || "Card"} hovered={hovered} />
          </div>
          <ArrorUpRight />
        </div>
      </RenderIf>
    </Link>
  );
};

const Stack = ({ className }: { className?: string }) => {
  const images = [
    "/stack/A.webp",
    "/stack/apps.webp",
    "/stack/flower.webp",
    "/stack/gpt.avif",
    "/stack/notion.webp",
    "/stack/stack.webp",
    "/stack/o.avif",
  ];
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrame: number;

    const scroll = () => {
      if (scrollContainer) {
        (scrollContainer as HTMLElement).scrollLeft += 0.5; // Adjust speed here
        if (
          (scrollContainer as HTMLElement).scrollLeft >=
          (scrollContainer as HTMLElement).scrollWidth -
            (scrollContainer as HTMLElement).clientWidth
        ) {
          (scrollContainer as HTMLElement).scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);
  return (
    <div
      className={`card  flex !items-center !justify-center !p-0 ${className}`}
    >
      <BlurryBG className="w-full h-full rounded-lg" />
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black via-black/40 to-transparent z-10 pointer-events-none" />

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 items-center h-full overflow-hidden no-scrollbar whitespace-nowrap "
      >
        {images.concat(images).map((src, index) => (
          <div
            key={index}
            className="md:min-w-[80px] md:min-h-[80px] min-w-[60px] min-h-[60px] rounded-2xl p-3 md:p-4 bg-white/10 flex items-center justify-center"
          >
            <Image
              className="object-contain rounded-lg "
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

const ImageCard = ({ src }: { src?: string }) => {
  return (
    <div className="card  w-1/2 md:w-1/3 ">
      <div>
        <Image
          className="object-cover"
          src={src || "/hasanali.jpg"}
          alt="me"
          fill
        />
      </div>
    </div>
  );
};
