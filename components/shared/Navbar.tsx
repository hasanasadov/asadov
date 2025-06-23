"use client";
import React, { useEffect, useRef, useState } from "react";
import TimeZone from "./TimeZone";
import Switch from "./Toggle";
import { usePathname } from "next/navigation";
import RenderIf from "@/utils/RenderIf";
import ArrowLeft from "../ui/ArrowLeft";

const Navbar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        backdrop-blur-[3px]
        sticky top-0 left-0 w-full z-50 transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        ${!isHomePage ? "md:px-8" : ""}
        flex items-center justify-between h-[60px] bg-transparent
      `}
      style={{ willChange: "transform", transition: "all 0.5s ease-in-out" }}
    >
      <div className="flex items-center gap-8 md:gap-12 lg:gap-[100px] text-[14px] md:text-[16px] ">
        <div
          onClick={() => {
            if (!isHomePage) {
              window.location.href = "/";
            }
          }}
          className="whitespace-nowrap flex items-center gap-2 cursor-pointer"
        >
          <RenderIf condition={!!isHomePage}>Hasanali Asadov</RenderIf>
          <RenderIf condition={!isHomePage}>
            <ArrowLeft /> Home
          </RenderIf>
        </div>
        <div className="whitespace-nowrap">Full-Stack Developer</div>
      </div>
      <div className="flex items-center gap-[100px]">
        <TimeZone className="hidden md:flex" />
        <Switch />
      </div>
    </div>
  );
};

export default Navbar;
