"use client";

import { InternExperience } from "./_components/Internship";
import { EduExperience } from "./_components/Education";
import { MarqueeText } from "@/components/shared/MarqueeText";
import { ScrollText } from "@/components/shared/ScrollText";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React from "react";

// export const metadata = {
//   title: "About - Hasanali Asadov",
//   description: "Haqqımda səhifəsi - Hasanali Asadov portfolio.",
// };

const AboutPage = () => {
  const AboutPageHeroText =
    "I am a 21-year-old young programming developer. Alongside my personal skills, I am eager to learn about the major innovations required by the modern world. Therefore, I am constantly learning and developing software. I also have skills in web services, database management, and process automation. I am currently studying at Baku Higher Oil School.";
  const marqueeText1 =
    "NEXT.JS ⋅ REACT ⋅ TYPESCRIPT ⋅ NODE.JS ⋅ EXPRESS ⋅ MONGODB ⋅ POSTGRESQL ⋅ GRAPHQL ⋅ REDUX ⋅ TAILWIND CSS ⋅ PASSPORT.JS ⋅ CLERK ⋅ AUTH0 ⋅ NODEMAILER ⋅ MONGOOSE ⋅ NEXT.JS ⋅ REACT ⋅ TYPESCRIPT ⋅ NODE.JS ⋅ EXPRESS ⋅ MONGODB ⋅ POSTGRESQL ⋅ GRAPHQL ⋅ REDUX ⋅ TAILWIND CSS ⋅ PASSPORT.JS ⋅ CLERK ⋅ AUTH0 ⋅ NODEMAILER ⋅ MONGOOSE ⋅ ";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="md:px-8 pt-4">
        <ScrollText
          className="text-[26px] md:text-[36px] lg:text-[48px] font-bold mb-8 !text-red-700"
          text={AboutPageHeroText}
        />
        <div className="relative">
          <MarqueeText
            className="w-[200vw] absolute top-1/4 -left-1/4 rotate-[-10deg] hidden md:block z-[99]"
            text1={marqueeText1}
          />
          <div className="flex md:justify-end my-8 justify-center z-[9999]">
            <Image
              className="z-[9999]"
              src="/myPhotos/barca.jpg"
              alt="Hasanali Asadov"
              width={450}
              height={450}
            />
          </div>
        </div>

        <ScrollText className="text-4xl my-10" text="Education" />
        <EduExperience />
      </div>

      <MarqueeText
        className="md:scale-[1.03] scale-[1.1]"
        text1={marqueeText1}
      />
      <div className="md:px-8 pt-4">
        <ScrollText className="text-4xl my-10" text="Internships" />
        <InternExperience />
        <Footer />
      </div>
    </motion.div>
  );
};

export default AboutPage;
