"use client";

// import { educationExperience } from "@/constants/experience";
import { EducationGetItems } from "@/actions/education";
import { CardTypeDashboard } from "@/types";
import { AddDashboardItem } from "../_components/AddDashboardItem";
import { CardDashboard } from "../_components/CardDashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Education } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function EduExperienceDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.EDUCATION_DASHBOARD],
    queryFn: () => EducationGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load education data. Displaying default experience."
    );
  }

  const [newItem, setNewItem] = useState<Education | null>(null);
  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-center ">
        <h1 className="text-3xl font-semibold  animate-ping">Loading</h1>
      </div>
    );
  }
  return (
    <div className="md:px-8 pt-4 min-h-[90vh]">
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
        {/* {(!data?.length || isError ? educationExperience : data)?.map( */}
        {data?.map((item) => (
          <CardDashboard
            key={item.id}
            item={item as Education}
            type={CardTypeDashboard.Education}
          />
        ))}
      </div>
    </div>
  );
}
