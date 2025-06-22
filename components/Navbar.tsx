import React from "react";
import CapitalTime from "./TimeZone";
import Switch from "./Toggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full h-[60px] bg-transparent text-black">
      <div className="flex items-center gap-8 md:gap-12 lg:gap-[100px] text-[14px] md:text-[16px] ">
        <div className="whitespace-nowrap">Hasanali Asadov</div>
        <div>Full-Stack Developer</div>
      </div>
      <div className="flex items-center gap-[100px]">
        <CapitalTime className="hidden md:flex" />
        <Switch />
      </div>
    </div>
  );
};

export default Navbar;
