"use client";
import { useEffect, useRef, useState } from "react";

const CircleCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX}px`;
        cursorRef.current.style.top = `${currentY}px`;
      }

      requestAnimationFrame(animate);
    };

    const checkPointerTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest(
        "a, button, [role='button'], [cursor-pointer], .cursor-pointer"
      );
      setIsPointer(Boolean(clickable));
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", checkPointerTarget);
    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkPointerTarget);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`hidden md:block fixed pointer-events-none z-[9999] w-[50px] h-[50px] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out 
        ${isPointer ? "scale-0" : "scale-100"}
        bg-black/50 dark:bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(255,255,200,0.5)_70%,rgba(0,0,0,0.5)_100%)]`}
    />
  );
};

export default CircleCursor;
