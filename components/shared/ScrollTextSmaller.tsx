"use client";
import React, { useEffect, useState } from "react";

export const ScrollTextSmaller = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  const [scrollProgress, setScrollProgress] = useState(0.18);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY - 800;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      let progress = (scrollTop / docHeight) * 2 + 0.5;
      progress = Math.min(progress, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const letters = text.split("");
  const lettersToColor = Math.floor(scrollProgress * letters.length);

  return (
    <p className={`${className} select-none`}>
      {letters.map((letter, idx) => (
        <span
          key={idx}
          className={`transition-colors duration-300 ease-in-out ${
            idx < lettersToColor
              ? "text-[#333] dark:text-white"
              : "text-[#aaa] dark:text-[#333]"
          }`}
        >
          {letter}
        </span>
      ))}
    </p>
  );
};
