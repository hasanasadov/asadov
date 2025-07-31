"use client";

import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProjectGetItems } from "@/actions/project";
import ProjectCard from "@/app/(client)/portfolio/_components/ProjectCard";

export default function ProjectDashboard() {
  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.PROJECT_DASHBOARD],
    queryFn: () => ProjectGetItems(),
  });

  console.log("ProjectDashboard data", data);
  if (!data && isError) {
    toast.error("Failed to load project data. Displaying default projects.");
  }

  //   const [newItem, setNewItem] = useState<Project | null>(null);

  return (
    <div className="md:px-8 pt-4">
      <div className="text-4xl my-12 flex items-center gap-2 justify-between">
        <h1>Projects</h1>
        {/* <AddDashboardItem type={CardTypeDashboard.Project} /> */}
      </div>
      <div className="flex flex-col gap-4">
        {/* {(!data || isError ? projects : data)?.map((item) => (
          <CardDashboardProject
            key={item.id}
            item={item as Project}
            type={CardTypeDashboard.Project}
          />
        ))} */}
        {data?.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
