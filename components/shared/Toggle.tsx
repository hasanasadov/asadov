"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Switch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === "dark");
    }
  }, [resolvedTheme]);

  if (!mounted) return null;

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark); // Optimistically update
    console.log(`Theme changed to: ${newTheme}`);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center"
    >
      <label className="relative inline-flex items-center justify-end cursor-pointer w-10 h-5">
        <input
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className={`
            ${hovered ? "w-8 h-[18px]" : "!w-0 !h-0"} "}
            w-8 h-[18px]
            bg-gray-200 dark:bg-white/[0.16]
            rounded-full
            transition-all
            duration-400
            shadow-inner
          `}
        ></div>
        <div
          className={`
            ${!hovered ? "!right-[0px] peer-checked:!left-[24px]" : ""}
            absolute right-[2px] top-[3px]
            w-[14px] h-[14px]
            dark:bg-white bg-black
            rounded-full
            shadow
            transition-all
            duration-400
            peer-checked:left-[10px]
            pointer-events-none
          `}
        ></div>
      </label>
    </div>
  );
};

export default Switch;
