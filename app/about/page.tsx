import Footer from "@/components/shared/Footer";
import { ScrollText } from "@/components/shared/ScrollColor";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="md:px-8">
      <ScrollText
        className="text-[26px] md:text-[36px] lg:text-[48px] font-bold mb-8 mt-8"
        text="I’m Hasanali Asadov, a multi-disciplinary designer specializing in creating immersive and engaging product experiences. My work is characterized by a commitment to clarity, consistency, and attention to detail, ensuring that every project resonates authentically with its audience. 
      I have a deep appreciation for typography and its powerful role in design. Additionally, I’m an aspiring entrepreneur, driven by the desire to innovate and push creative boundaries in the industry."
      />
      <div className="flex justify-end my-8">
        <Image
          src="/hasanali.jpg"
          alt="Hasanali Asadov"
          width={450}
          height={450}
        />
      </div>

      <WorkExperience />
      <Footer /> 
    </div>
  );
};

const WorkExperience = () => {
  return (
    <div className="flex flex-col gap-12">
      <WorkCard
        start="2025"
        end="Present"
        title1="Design Director"
        title2="Incase"
        text="Led the creative vision and design strategy across digital and physical
        touchpoints, overseeing a team of multidisciplinary designers.
        Spearheaded the launch of multiple product lines and brand campaigns,
        resulting in a 30% increase in customer engagement. Championed
        user-centered design processes, aligning product innovation with
        business goals and lifestyle trends."
      />
      <WorkCard
        start="2023"
        end="2024"
        title1="Design Lead"
        title2="Grey"
        text="Directed creative execution for global campaigns, collaborating with cross-functional teams to deliver compelling digital experiences for top-tier clients. Guided a team of designers through fast-paced projects, elevating the agency’s digital presence and winning multiple industry awards. Focused on storytelling, usability, and brand consistency across channels."
      />
      <WorkCard
        start="2020"
        end="2022"
        title1="Senior Designer"
        title2="Shopify"
        text="Played a key role in crafting scalable design systems and improving the user experience for merchants across the platform. Partnered with product managers and engineers to launch features that enhanced onboarding and retention. Advocated for accessibility and design inclusivity, influencing platform-wide standards."
      />
      <WorkCard
        start="2018"
        end="2020"
        title1="UX/UI Designer"
        title2="Shrink"
        text="Designed and optimized the core product experience for a mental health startup, contributing to a 40% increase in user retention. Conducted user research and usability testing to inform product decisions, translating insights into thoughtful interfaces. Collaborated closely with the founding team to define the brand’s visual and interaction language."
      />
    </div>
  );
};

const WorkCard = ({
  start,
  end,
  title1,
  title2,
  text,
}: {
  start: string;
  end?: string;
  title1: string;
  title2: string;
  text: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 ">
      <div className="md:w-1/2 flex  w-full gap-8">
        <div className="w-1/2 text-[14px] md:text-[16px]">
          {start} - {end ? end : "Present"}
        </div>
        <div className="w-1/2 text-[16px] md:text-[20px] text-left">
          <p>{title1}</p>
          <p>{title2}</p>
        </div>
      </div>
      <div className="md:w-1/2 text-white/50 text-left text-[14px] md:text-[16px]">
        {text}
      </div>
    </div>
  );
};

export default AboutPage;
