"use client";

import { internshipExperience } from "@/constants/experience";
import { InternshipGetItems } from "@/actions/internship";
import { CardTypeDashboard } from "@/types";
import { CardDashboard } from "./CardDashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Internship } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const InternExperienceDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.INTERNSHIP_DASHBOARD],
    queryFn: () => InternshipGetItems(),
  });

  if (isLoading) {
    toast.loading("Loading internship data...");
  }

  if (!data || isError) {
    toast.error(
      "Failed to load education data. Displaying default experience."
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {(!data || isError ? internshipExperience : data)?.map((item) => (
        <CardDashboard
          key={item.id}
          item={item as Internship}
          type={CardTypeDashboard.Internship}
        />
      ))}
    </div>
  );
};
