"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Switch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer w-10 h-5">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          className="sr-only peer"
        />
        <div
          className={`
            w-8 h-[18px]
            bg-gray-200 dark:bg-white/[0.16]
            rounded-full
            transition-colors
            duration-300
            shadow-inner
          `}
        ></div>
        <div
          className={`
            absolute left-[2px] top-[3px]
            w-[14px] h-[14px]
            dark:bg-white bg-black
            rounded-full
            shadow
            transition-transform
            duration-300
            peer-checked:left-[16px]
            pointer-events-none
          `}
        ></div>
      </label>
    </div>
  );
};

export default Switch;
