import Footer from "@/components/shared/Footer";
import { ScrollText } from "@/components/shared/ScrollText";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "About - Hasanali Asadov",
  description: "Haqqımda səhifəsi - Hasanali Asadov portfolio.",
};

const AboutPage = () => {
  return (
    <>
      <div className="md:px-8 pt-4">
        <ScrollText
          className="text-[26px] md:text-[36px] lg:text-[48px] font-bold mb-8 mt-8 !text-red-700"
          text="I am a 21-year-old young programming developer. Alongside my personal skills, I am eager to learn about the major
innovations required by the modern world. Therefore, I am constantly learning and developing software. I also have
skills in web services, database management, and process automation. I am currently studying at Baku Higher Oil School."
        />
        <div className="relative">
          <MarqueeText className1="w-[200vw] absolute top-1/4 -left-1/4 rotate-[-10deg] hidden md:block z-[99]" />
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

      <MarqueeText />
      <div className="md:px-8 pt-4">
        <ScrollText className="text-4xl my-10" text="Internships" />
        <InternExperience />
        <Footer />
      </div>
    </>
  );
};

const EduExperience = () => {
  return (
    <div className="flex flex-col gap-12">
      <Card
        start="2025/1"
        end="2025/7"
        title1="Angel Khanchev University"
        title2="Bulgaria"
        text="As a Erasmus+ student at Angel Kanchev University in Bulgaria, I had the opportunity to immerse myself in a diverse academic environment. This experience enriched my understanding of international perspectives in software engineering and allowed me to collaborate with peers from various backgrounds. I engaged in advanced coursework and projects that enhanced my technical skills and cultural awareness."
      />

      <Card
        start="2021"
        end="Present"
        title1="Baku Higher "
        title2="Oil School"
        text="As a student at Baku Higher Oil School, Process Automation Engineering, I have developed a strong foundation in programming and software development. My coursework has included advanced topics in automation, control systems, and data analysis, equipping me with the skills to tackle complex engineering challenges. I am actively involved in various projects that enhance my practical knowledge and prepare me for a successful career in technology."
      />
      <Card
        start="2024/7"
        end="2025/4"
        title1="Code Academy"
        title2="Azerbaijan"
        text="Full-Stack (Front-end) program at Code Academy, where I focused on mastering front-end technologies and frameworks. The program provided a comprehensive understanding of web development, including HTML, CSS, JavaScript, and modern libraries. Through practical projects and collaborative exercises, I developed the skills necessary to create responsive and user-friendly web applications."
      />
      <Card
        start="2024/2"
        end="2024/11"
        title1="Holberton School"
        title2="Azerbaijan"
        text="Full-Stack Developmet program at Holberton School, where I honed my skills in software engineering, web development, and system design. The curriculum emphasized hands-on projects and collaborative learning, allowing me to apply theoretical knowledge to real-world scenarios. I gained proficiency in multiple programming languages, frameworks, and tools, preparing me for a dynamic career in technology."
      />
    </div>
  );
};

const InternExperience = () => {
  return (
    <div className="flex flex-col gap-12">
      <Card
        start="2024/6"
        end="2024/7"
        title1="SOCAR Azerbaijan"
        title2="ITRI Full-Stack Development"
        text="Participated in a structured internship program focusing on full-stack
development.
• Gained hands-on experience with modern web technologies, including front-end
frameworks, back-end systems, and database management.
• Collaborated on projects, building scalable and user-friendly applications."
      />
      <Card
        start="2023/6"
        end="2023/7"
        title1="ATENAU LTD"
        title2="Smart Home"
        text="Smart Home Application Services • Participated in a one-month internship focusing on smart home application
services.
• Gained hands-on experience with IoT technologies and smart home systems.
• Assisted in the development, testing, and deployment of smart home solutions.
• Enhanced knowledge of automation, system integration, and user-centric design
principles."
      />
      <Card
        start="2023/6"
        end="2023/7"
        title1="ATENAU LTD"
        title2="Smart Home"
        text="Participated in a one-month internship focusing on smart home application
services.
• Gained hands-on experience with IoT technologies and smart home systems.
• Assisted in the development, testing, and deployment of smart home solutions.
• Enhanced knowledge of automation, system integration, and user-centric design
principles."
      />
      <Card
        start="2023/6"
        end="2023/7"
        title1="EMERSON"
        title2="Oil and Gas Valves and Pumps"
        text="Completed a one-month internship program focusing on oil and gas equipment,
specifically valves and pumps.
• Acquired knowledge about the design, functionality, and maintenance of industrial
valves and pumps used in the oil and gas sector.
• Gained practical exposure to operational processes and technical aspects of
equipment management."
      />
      <Card
        start="2024/6"
        end="2024/7"
        title1="AZERSU JEYRANBATAN"
        title2="Process Automation"
        text="• Completed a one-month internship focusing on process automation in water
treatment and distribution systems.
• Gained experience with automation technologies and control systems used in
water management.
• Assisted in monitoring, maintaining, and optimizing automated processes for
efficiency and reliability."
      />
      <Card
        start="2024/6"
        end="2024/7"
        title1="SENTRA QSC"
        title2="Oil and Gas sector"
        text="• Gained extensive knowledge of industry operations, including equipment
management and project workflows.
• Contributed to technical documentation and quality assurance processes."
      />
    </div>
  );
};

const Card = ({
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
      <div className="md:w-1/2 dark:text-white/80 text-black/80 text-left text-[14px] md:text-[16px]">
        <p>{text}</p>
        {/* <ScrollTextSmaller text={text} /> */}
      </div>
    </div>
  );
};

const MarqueeText = ({
  className1,
  className2,
  className3,
}: {
  className1?: string;
  className2?: string;
  className3?: string;
}) => {
  return (
    <div
      className={`marquee-wrapper  my-8 lg:text-[80px] md:text-[60px] text-[40px] ${className1}`}
    >
      <div className={`marquee-inner ${className2}`}>
        <div className={`marquee-content ${className3}`}>
          <span className="mx-4">
            NEXT.JS ⋅ REACT ⋅ TYPESCRIPT ⋅ NODE.JS ⋅ EXPRESS ⋅ MONGODB ⋅
            POSTGRESQL ⋅ GRAPHQL ⋅ REDUX ⋅ TAILWIND CSS ⋅ PASSPORT.JS ⋅ CLERK ⋅
            AUTH0 ⋅ NODEMAILER ⋅ MONGOOSE ⋅
          </span>
        </div>
        <div className={`marquee-content ${className3}`}>
          <span className="mx-4">
            NEXT.JS ⋅ REACT ⋅ TYPESCRIPT ⋅ NODE.JS ⋅ EXPRESS ⋅ MONGODB ⋅
            POSTGRESQL ⋅ GRAPHQL ⋅ REDUX ⋅ TAILWIND CSS ⋅ PASSPORT.JS ⋅ CLERK ⋅
            AUTH0 ⋅ NODEMAILER ⋅ MONGOOSE
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
