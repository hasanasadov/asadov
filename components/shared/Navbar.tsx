"use client";
import React from "react";
import TimeZone from "./TimeZone";
import Switch from "./Toggle";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  console.log(pathName);
  const isHomePage = pathName == "/";
  return (
    <div
      className={`${
        !isHomePage ? "md:px-8" : ""
      } flex items-center justify-between w-full h-[60px] bg-transparent`}
    >
      <div className="flex items-center gap-8 md:gap-12 lg:gap-[100px] text-[14px] md:text-[16px] ">
        <div className="whitespace-nowrap">Hasanali Asadov</div>
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
