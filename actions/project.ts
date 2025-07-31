import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

// Get all projects
export const ProjectGetItems = async () => {
  return await prisma.project.findMany();
};

// Add new project
export const ProjectAddItem = async (
  data: Partial<Project>
): Promise<Project> => {
  return await prisma.project.create({
    data: {
      title: data.title!,
      image: data.image!,
      href: data.href ?? "",
      category: data.category!,
      description: data.description!,
      detailedDescription: data.detailedDescription ?? "",
      technologies: data.technologies ?? [],
      liveUrl: data.liveUrl ?? "",
      repoUrl: data.repoUrl ?? "",
    },
  });
};

// Update existing project
export const ProjectUpdateItem = async (
  id: string,
  data: Partial<Project>
): Promise<Project> => {
  return await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      image: data.image,
      href: data.href,
      category: data.category,
      description: data.description,
      detailedDescription: data.detailedDescription,
      technologies: data.technologies,
      liveUrl: data.liveUrl,
      repoUrl: data.repoUrl,
    },
  });
};

// Delete project
export const ProjectDeleteItem = async (id: string): Promise<Project> => {
  return await prisma.project.delete({
    where: { id },
  });
};
