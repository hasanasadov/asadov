"use client";

import { educationExperience } from "@/constants/experience";
import { EducationGetItems } from "@/actions/education";
import { CardTypeDashboard } from "@/types";
import { CardDashboard } from "./common/CardDashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Education } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddDashboardItem } from "./common/AddDashboardItem";
import { useState } from "react";

export const EduExperienceDashboard = () => {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.EDUCATION_DASHBOARD],
    queryFn: () => EducationGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load education data. Displaying default experience."
    );
  }

  const [newItem, setNewItem] = useState<Education | null>(null);

  return (
    <div className="md:px-8 pt-4">
      <div className="text-4xl mb-10 flex items-center gap-2 justify-between">
        <h1>Education</h1>
        <AddDashboardItem
          type={CardTypeDashboard.Education}
          newItem={newItem}
          setNewItem={setNewItem}
        />
      </div>
      <div className="flex flex-col gap-4">
        {newItem && (
          <CardDashboard
            item={newItem}
            type={CardTypeDashboard.Education}
            setNewItem={setNewItem}
          />
        )}
        {(!data || isError ? educationExperience : data)?.map((item) => (
          <CardDashboard
            key={item.id}
            item={item as Education}
            type={CardTypeDashboard.Education}
          />
        ))}
      </div>
    </div>
  );
};
