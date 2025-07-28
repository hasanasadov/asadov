"use client";

import { EducationGetItems } from "@/actions/education";
import { Card } from "./Card";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { educationExperience } from "@/constants/experience";
// import { EducationModel } from "@/types";
export const EduExperience = () => {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.EDUCATION],
    queryFn: () => EducationGetItems(),
  });

  console.log("Education Data:", data);

  return (
    <div className="flex flex-col gap-12">
      {(!data || isError ? educationExperience : data)?.map((item) => (
        <Card
          key={item.id}
          start={
            typeof item.start === "string" ? new Date(item.start) : item.start
          }
          end={typeof item.end === "string" ? new Date(item.end) : item.end}
          title1={item.title1}
          title2={item.title2}
          description={item.description}
          // loading={isLoading}
        />
      ))}
    </div>
  );
};
