import Link from "next/link";
import React from "react";
import HoverText from "./HoverText";

const Footer = () => {
  return (
    <div className="mb-12">
      <div className="w-full h-px dark:bg-white/30 bg-black rounded-2xl my-8"></div>
      <div className="flex flex-col md:flex-row text-[18px] md:text-[24px] gap-6">
        <Link
          href="mailto:hasanaliasadov@gmail.com"
          className="w-full md:w-1/2"
        >
          <HoverText text="hasanaliasadov@gmail.com" />
        </Link>
        <div className="w-full md:w-1/2 flex flex-col md:gap-4 gap-2">
          <Link href={"https://www.instagram.com/hasan.asadd/"}>
            <HoverText text="Instagram" />
          </Link>
          <Link href={"https://www.linkedin.com/in/hasanali-asadov/"}>
            <HoverText text="LinkedIn" />
          </Link>
          <Link href="https://www.github.com/hasanasadov">
            <HoverText text="GitHub" />
          </Link>
          <Link href={"https://www.x.com/HesenEsedov6/"}>
            <HoverText text="Twitter (X)" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
