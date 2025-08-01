"use server";

import prisma from "@/lib/prisma";
import { ProjectWithSnippets } from "@/types";
import { Project } from "@prisma/client";

export const ProjectGetItems = async () => {
  try {
    return await prisma.project.findMany({
      include: {
        codeSnippets: {
          include: {
            github: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("An error accured : ", error);
    return [];
  }
};

export async function ProjectAddItem(data: ProjectWithSnippets) {
  try {
    const newItem = await prisma.project.create({
      data: {
        ...data,
        codeSnippets: {
          connect: data.codeSnippets.map((snippet) => ({
            id: snippet.id,
          })),
        },
      },
      include: {
        codeSnippets: {
          include: {
            github: true,
          },
        },
      },
    });
    return newItem;
  } catch (error) {
    console.error("Add Error:", error);
    return null;
  }
}

export const ProjectUpdateItem = async (
  id: string,
  data: Partial<Omit<ProjectWithSnippets, "id" | "createdAt">>
) => {
  try {
    return await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        repoUrl: data.repoUrl,
        image: data.image,
        technologies: data.technologies,
        liveUrl: data.liveUrl,
        codeSnippets: {
          connect: data.codeSnippets?.map((snippetId) => ({
            id: snippetId.id,
          })),
        },
      },
      include: {
        codeSnippets: {
          include: {
            github: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("An error accured : ", error);
    return null;
  }
};

export const ProjectDeleteItem = async (
  id: string
): Promise<Project | null> => {
  try {
    return await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error("An error accured : ", error);
    return null;
  }
};
