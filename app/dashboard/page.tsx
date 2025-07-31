import React from "react";
import { EduExperienceDashboard } from "./_components/EducationDashboard";
import { InternExperienceDashboard } from "./_components/InternshipDashboard";
import { MarqueeText } from "@/components/shared/MarqueeText";

const DashboardPage = () => {
  return (
    <>
      <EduExperienceDashboard />
      <MarqueeText
        className="scale-105"
        text1="Welcome to the Dashboard   Welcome to the Dashboard   Welcome to the Dashboard"
      />
      <InternExperienceDashboard />
    </>
  );
};

export default DashboardPage;
