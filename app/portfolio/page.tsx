import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <Link
        href={
          "https://drive.google.com/file/d/1QqD_kx8rJI33IPNtGgwlBQE8FL3KdEui/view?usp=sharing"
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>
      </Link>
    </div>
  );
};

export default AboutPage;
