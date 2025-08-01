"use client";

import { educationExperience } from "@/constants/experience";
import { EducationGetItems } from "@/actions/education";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./Card";

export const EduExperience = () => {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.EDUCATION],
    queryFn: () => EducationGetItems(),
  });

  return (
    <div className="flex flex-col gap-12">
      {(!data?.length || isError ? educationExperience : data)?.map((item) => (
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
