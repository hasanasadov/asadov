"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export const ParallaxImage = ({ src }: { src: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Image moves slightly vertically as you scroll
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <div
      ref={container}
      className="relative w-full flex justify-center md:justify-end py-10 "
    >
      <motion.div
        style={{ y, rotate, scale }}
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <Image
          src={src}
          alt="Profile"
          width={450}
          height={450}
          className="object-cover"
        />
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
      </motion.div>
    </div>
  );
};
