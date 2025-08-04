"use client";
import ProjectDashboardCard from "./_components/ProjectDashboardCard";
import { CardTypeDashboard, ProjectWithSnippets } from "@/types";
import { ProjectGetItems } from "@/actions/project";
import { AddProjectItem } from "./_components/AddProjectItem";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
// import { projects } from "@/constants/projects";

export default function DashboardProjectPage() {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.PROJECT_DASHBOARD],
    queryFn: () => ProjectGetItems(),
  });

  if (!data && isError) {
    toast.error("Failed to load projects. Displaying default experience.");
  }

  const [newItem, setNewItem] = useState<ProjectWithSnippets | null>(null);

  return (
    <div className="md:px-8 pt-4 min-h-[90vh]">
      <div className="text-4xl mb-10 flex items-center gap-2 justify-between">
        <h1>Projects</h1>
        <AddProjectItem newItem={newItem} setNewItem={setNewItem} />
      </div>
      <div className="flex flex-col gap-4">
        {newItem && (
          <ProjectDashboardCard
            item={newItem}
            type={CardTypeDashboard.Project}
            setNewItem={setNewItem}
          />
        )}
        {/* {(!data?.length || isError ? projects : data)?.map( */}
        {data?.map((item) => (
          <ProjectDashboardCard
            key={item.id}
            item={item as ProjectWithSnippets}
            type={CardTypeDashboard.Project}
          />
        ))}
      </div>
    </div>
  );
}
