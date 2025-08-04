"use client";
import React from "react";
import ProjectSidebar from "./_components/ProjectSidebar";
import ProjectContent from "./_components/ProjectContent";
import Footer from "@/components/shared/Footer";
import { ProjectDetailPageProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ProjectGetItem } from "@/actions/project";

const ProjectDetailPage = (props: ProjectDetailPageProps) => {
  const params = React.use(props.params);
  const projectId = params.id;

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, projectId],
    queryFn: () => ProjectGetItem(projectId),
  });

  const project = data;

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-center ">
        <h1 className="text-3xl font-semibold  animate-ping">Loading</h1>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-center ">
        <h1 className="text-3xl font-semibold text-red-600 dark:text-red-400">
          Project not found
        </h1>
      </div>
    );
  }

  return (
    <>
      <main
        className="
        min-h-screen  md:px-6 py-4 
        flex flex-col md:grid md:grid-cols-[320px_1fr] md:gap-x-12
      "
      >
        <ProjectSidebar
          title={project.title}
          image={project.image}
          description={project.description}
          technologies={project.technologies}
          liveUrl={project.liveUrl}
          repoUrl={project.repoUrl}
        />

        <ProjectContent
          detailedDescription={project.detailedDescription}
          codeSnippets={project.codeSnippets}
        />
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetailPage;
