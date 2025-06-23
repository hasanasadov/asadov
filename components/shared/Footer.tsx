import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full h-px bg-white/30 rounded-2xl my-8"></div>
      <div className="flex flex-col md:flex-row text-[18px] md:text-[24px]">
        <Link
          href="mailto:hasanaliasadov@gmail.com"
          className="w-full md:w-1/2"
        >
          hasanaliasadov@gmail.com
        </Link>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Link href={"https://www.instagram.com/hasan.asadd/"}>Instagram</Link>
          <Link href={"https://www.linkedin.com/in/hasanali-asadov/"}>
            LinkedIn
          </Link>
          <Link href="https://www.github.com/hasanasadov">Github</Link>
          <Link href={"https://www.x.com/HesenEsedov6/"}>Twitter (X)</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
