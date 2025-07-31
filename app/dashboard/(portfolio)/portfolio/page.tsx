"use client";

import { CardTypeDashboard } from "@/types";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { ProjectGetItems } from "@/actions/project";
import { Project } from "@prisma/client";
import { AddProjectItem } from "./_components/AddProjectItem";
import ProjectDashboardCard from "./_components/ProjectDashboardCard";

export default function ProjectPage() {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.PROJECT_DASHBOARD],
    queryFn: () => ProjectGetItems(),
  });

  if (!data && isError) {
    toast.error(
      "Failed to load GitHub snippet data. Displaying default experience."
    );
  }
  console.log("Project data:", data);

  const [newItem, setNewItem] = useState<Project | null>(null);

  return (
    <div className="md:px-8 pt-4 min-h-[90vh]">
      <div className="text-4xl mb-10 flex items-center gap-2 justify-between">
        <h1>Projects</h1>
        <AddProjectItem
          type={CardTypeDashboard.Project}
          newItem={newItem}
          setNewItem={setNewItem}
        />
      </div>
      <div className="flex flex-col gap-4">
        {newItem && (
          <ProjectDashboardCard
            item={newItem}
            type={CardTypeDashboard.Project}
            setNewItem={setNewItem}
          />
        )}
        {data?.map((item) => (
          <ProjectDashboardCard
            key={item.id}
            item={item as Project}
            type={CardTypeDashboard.Project}
          />
        ))}
      </div>
    </div>
  );
}
