"use client";

import { internshipExperience } from "@/constants/experience";
import { InternshipGetItems } from "@/actions/internship";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./Card";

export const InternExperience = () => {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.INTERNSHIPS],
    queryFn: () => InternshipGetItems(),
  });

  console.log("Internships Data:", data);

  return (
    <div className="flex flex-col gap-12">
      {(!data?.length || isError ? internshipExperience : data)?.map((item) => (
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
