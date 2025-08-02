"use server";
import prisma from "@/lib/prisma";
import { ProjectInput, ProjectWithSnippets } from "@/types";

export const ProjectGetItems = async (): Promise<ProjectWithSnippets[]> => {
  try {
    const projects = await prisma.project.findMany({
      include: { codeSnippets: true },
    });
    return projects.map((project) => ({
      ...project,
      codeSnippets: project.codeSnippets.map((cs) => ({
        ...cs,
        branch: cs.branch ?? "",
      })),
    }));
  } catch (error) {
    console.error("An error occurred : ", error);
    return [];
  }
};

export const ProjectAddItem = async (
  data: ProjectInput
): Promise<ProjectWithSnippets | null> => {
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
        codeSnippets: {
          connect: data.codeSnippets?.map((cs) => ({ id: cs.id })) ?? [],
        },
      },
      include: { codeSnippets: true },
    });
    return {
      ...project,
      codeSnippets: project.codeSnippets.map((cs) => ({
        ...cs,
        branch: cs.branch ?? "",
      })),
    };
  } catch (error) {
    console.error("An error occurred: ", error);
    return null;
  }
};

export const ProjectUpdateItem = async (
  id: string,
  data: ProjectInput
): Promise<ProjectWithSnippets | null> => {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        codeSnippets: {
          set: data.codeSnippets?.map((cs) => ({ id: cs.id })) ?? [],
        },
      },
      include: { codeSnippets: true },
    });
    return {
      ...project,
      codeSnippets: project.codeSnippets.map((cs) => ({
        ...cs,
        branch: cs.branch ?? "",
      })),
    };
  } catch (error) {
    console.error("An error occurred: ", error);
    return null;
  }
};

export const ProjectDeleteItem = async (id: string) => {
  try {
    return await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error("An error occurred : ", error);
    return null;
  }
};
