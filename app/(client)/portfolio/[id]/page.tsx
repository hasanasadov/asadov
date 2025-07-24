"use client";

import React from "react";
import { projects } from "@/constants/projects";
import ProjectSidebar from "./_components/ProjectSidebar";
import ProjectContent from "./_components/ProjectContent";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProjectDetailPage = (props: ProjectDetailPageProps) => {
  const params = React.use(props.params);
  const projectId = Number(params.id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-semibold text-red-600 dark:text-red-400">
          Project not found
        </h1>
      </div>
    );
  }

  return (
    <main
      className="
        min-h-screen  px-6 py-4 
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
  );
};

export default ProjectDetailPage;
