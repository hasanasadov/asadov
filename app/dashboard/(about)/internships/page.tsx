"use client";

// import { internshipExperience } from "@/constants/experience";
import { InternshipGetItems } from "@/actions/internship";
import { CardTypeDashboard } from "@/types";
import { AddDashboardItem } from "../_components/AddDashboardItem";
import { CardDashboard } from "../_components/CardDashboard";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Internship } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function InternExperienceDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.INTERNSHIP_DASHBOARD],
    queryFn: () => InternshipGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load internship data. Displaying default experience."
    );
  }

  const [newItem, setNewItem] = useState<Internship | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-center ">
        <h1 className="text-3xl font-semibold  animate-ping">Loading</h1>
      </div>
    );
  }
  return (
    <div className="md:px-8 pt-4">
      <div className="text-4xl mb-10 flex items-center gap-2 justify-between">
        <h1>Internships</h1>
        <AddDashboardItem
          type={CardTypeDashboard.Internship}
          newItem={newItem}
          setNewItem={setNewItem}
        />
      </div>
      <div className="flex flex-col gap-4">
        {newItem && (
          <CardDashboard
            item={newItem}
            type={CardTypeDashboard.Internship}
            setNewItem={setNewItem}
          />
        )}
        {/* {(!data?.length || isError ? internshipExperience : data)?.map( */}
        {data?.map((item) => (
          <CardDashboard
            key={item.id}
            item={item as Internship}
            type={CardTypeDashboard.Internship}
          />
        ))}
      </div>
    </div>
  );
}
