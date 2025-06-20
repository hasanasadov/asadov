import React from "react";
import CapitalTime from "./TimeZone";
import Switch from "./Toggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full h-[60px] bg-transparent text-black">
      <div className="flex items-center gap-[100px]">
        <div>Hasanali Asadov</div>
        <div>Full-Stack Developer</div>
      </div>
      <div className="flex items-center gap-[100px]">
        <CapitalTime />
        <Switch />
      </div>
    </div>
  );
};

export default Navbar;
