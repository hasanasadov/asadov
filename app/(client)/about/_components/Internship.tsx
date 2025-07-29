"use client";

import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./Card";
import { InternshipGetItems } from "@/actions/internship";
import { internshipExperience } from "@/constants/experience";

export const InternExperience = () => {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.INTERNSHIPS],
    queryFn: () => InternshipGetItems(),
  });

  console.log("Internships Data:", data);

  return (
    <div className="flex flex-col gap-12">
      {(!data || isError ? internshipExperience : data)?.map(
        (item: {
          id: string;
          start: Date | string;
          end: Date | string;
          title1: string;
          title2: string;
          description: string;
        }) => (
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
        )
      )}
    </div>
  );
};
