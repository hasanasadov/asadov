"use client";

import { InternExperience } from "./_components/Internship";
import { EduExperience } from "./_components/Education";
import { MarqueeText } from "@/components/shared/MarqueeText";
import { ScrollText } from "@/components/shared/ScrollText";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import React from "react";
import { ParallaxImage } from "@/components/shared/ParallaxImage";

const SectionTitle = ({ title }: { title: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-6 border-l-2 border-red-700/50 my-16"
  >
    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
      {title}
    </h2>
  </motion.div>
);

const AboutPage = () => {
  const AboutPageHeroText =
    "I am a 22-year-old young programming developer. Alongside my personal skills, I am eager to learn about the major innovations required by the modern world. Therefore, I am constantly learning and developing software. I also have skills in web services, database management, and process automation. I am currently studying at Baku Higher Oil School.";
  const marqueeText1 =
    "NEXT.JS ⋅ REACT ⋅ TYPESCRIPT ⋅ NODE.JS ⋅ EXPRESS ⋅ MONGODB ⋅ POSTGRESQL ⋅ GRAPHQL ⋅ REDUX ⋅ TAILWIND CSS ⋅ PASSPORT.JS ⋅ CLERK ⋅ AUTH0 ⋅ NODEMAILER ⋅ MONGOOSE ⋅ ".repeat(
      10
    );

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
            className="w-[200vw] absolute top-1/4 -left-1/4 rotate-[-10deg] hidden md:block"
            text1={marqueeText1}
          />
          <div className="flex md:justify-end my-8 justify-center !z-[99999999]">
            <ParallaxImage src="/myPhotos/barca.jpg" />
          </div>
        </div>

        <section className="  ">
          <SectionTitle title="Education" />
          <div className="md:pl-6 md:border-l border-neutral-300 dark:border-neutral-800 space-y-12 pb-12">
            <EduExperience />
          </div>
        </section>
      </div>

      <MarqueeText
        className="md:scale-[1.03] scale-[1.1]"
        text1={marqueeText1}
      />
      <div className="md:px-8 pt-4">
        <section>
          <SectionTitle title="Internships" />
          <div className="md:pl-6 md:border-l border-neutral-300 dark:border-neutral-800 space-y-12 pb-12">
            <InternExperience />
          </div>
        </section>
        <Footer />
      </div>
    </motion.div>
  );
};

export default AboutPage;
