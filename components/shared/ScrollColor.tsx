"use client";
import React, { useEffect, useState } from "react";

export const ScrollText = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  const [scrollProgress, setScrollProgress] = useState(0.18);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      let progress = (scrollTop / docHeight) * 2 + 0.4;
      progress = Math.min(progress, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const letters = text.split("");
  const lettersToColor = Math.floor(scrollProgress * letters.length);

  return (
    <p className={`${className} select-none `}>
      {letters.map((letter, idx) => (
        <span
          key={idx}
          style={{
            color: idx < lettersToColor ? "white" : "#333",
            transition: "color 0.3s ease",
          }}
        >
          {letter}
        </span>
      ))}
    </p>
  );
};
