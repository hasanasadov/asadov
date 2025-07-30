import React from "react";
import { EduExperienceDashboard } from "./_components/EducationDashboard";
import { InternExperienceDashboard } from "./_components/InternshipDashboard";
import { MarqueeText } from "@/components/shared/MarqueeText";

const DashboardPage = () => {
  return (
    <>
      <div className="md:px-8 pt-4">
        <div className="text-4xl mb-10">
          <h1>Education</h1>
        </div>
        <EduExperienceDashboard />
      </div>
      <MarqueeText
        className=" scale-105"
        text1="Welcome to the Dashboard   Welcome to the Dashboard   Welcome to the Dashboard"
      />
      <div className="md:px-8 pt-4">
        <div className="text-4xl my-12">
          <h1>Internships</h1>
        </div>
        <InternExperienceDashboard />
      </div>
    </>
  );
};

export default DashboardPage;
