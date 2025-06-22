import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full h-px bg-white/30 rounded-2xl my-8"></div>
      <div className="flex flex-col md:flex-row text-[18px] md:text-[24px]">
        <div className="w-full md:w-1/2">hasanaliasadov@gmail.com</div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>Instagram</div>
          <div>LinkedIn</div>
          <div>Dribble</div>
          <div>Twitter (X)</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
