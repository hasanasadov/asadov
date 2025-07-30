"use client";

import { educationExperience } from "@/constants/experience";
import { EducationGetItems } from "@/actions/education";
import { CardTypeDashboard } from "@/types";
import { CardDashboard } from "./CardDashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Education } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const EduExperienceDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.EDUCATION_DASHBOARD],
    queryFn: () => EducationGetItems(),
  });

  if (isLoading) {
    toast.loading("Loading education data...", {
      duration: 5000,
    });
  }

  if (!data && isError) {
    toast.error(
      "Failed to load education data. Displaying default experience."
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {(!data || isError ? educationExperience : data)?.map((item) => (
        <CardDashboard
          key={item.id}
          item={item as Education}
          type={CardTypeDashboard.Education}
        />
      ))}
    </div>
  );
};
