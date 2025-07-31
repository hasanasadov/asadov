"use client";

import { internshipExperience } from "@/constants/experience";
import { InternshipGetItems } from "@/actions/internship";
import { CardTypeDashboard } from "@/types";
import { CardDashboard } from "./common/CardDashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Internship } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddDashboardItem } from "./common/AddDashboardItem";
import { useState } from "react";

export const InternExperienceDashboard = () => {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.INTERNSHIP_DASHBOARD],
    queryFn: () => InternshipGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load education data. Displaying default experience."
    );
  }

  const [newItem, setNewItem] = useState<Internship | null>(null);

  return (
    <div className="md:px-8 pt-4">
      <div className="text-4xl my-12 flex items-center gap-2 justify-between">
        <h1>Internships</h1>
        <AddDashboardItem
          type={CardTypeDashboard.Internship}
          newItem={newItem}
          setNewItem={setNewItem}
        />
      </div>
      <div className="flex flex-col gap-4">
        {(!data || isError ? internshipExperience : data)?.map((item) => (
          <CardDashboard
            key={item.id}
            item={item as Internship}
            type={CardTypeDashboard.Internship}
          />
        ))}
      </div>
    </div>
  );
};
