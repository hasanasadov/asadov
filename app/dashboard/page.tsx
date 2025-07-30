import { ScrollText } from "@/components/shared/ScrollText";
import React from "react";
import { EduExperienceDashboard } from "./_components/EducationDashboard";
import { InternExperienceDashboard } from "./_components/InternshipDashboard";

const DashboardPage = () => {
  return (
    <>
      <div className="md:px-8 pt-4">
        <ScrollText className="text-4xl my-10" text="Education" />
        <EduExperienceDashboard />
      </div>

      <div className="md:px-8 pt-4">
        <ScrollText className="text-4xl my-10" text="Internships" />
        <InternExperienceDashboard />
      </div>
    </>
  );
};

export default DashboardPage;
