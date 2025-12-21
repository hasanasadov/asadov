"use server";
import prisma from "@/lib/prisma";
import { ProjectInput, ProjectWithSnippets } from "@/types";

export const ProjectGetItems = async (): Promise<ProjectWithSnippets[]> => {
  try {
    const projects = await prisma.project.findMany({
      include: { codeSnippets: true },
      orderBy: { createdAt: "asc" },
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
export const getInfiniteProjects = async ({
  pageParam = 0,
  limit = 6,
  search = "",
}) => {
  try {
    const whereClause: { title?: { contains: string; mode: "insensitive" } } =
      {};

    if (search) {
      whereClause.title = { contains: search, mode: "insensitive" };
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        technologies: true,
        category: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: pageParam * limit,
    });

    const totalCount = await prisma.project.count({ where: whereClause });
    const hasNextPage = (pageParam + 1) * limit < totalCount;

    return {
      data: projects,
      nextCursor: hasNextPage ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error("Error fetching infinite projects:", error);
    return { data: [], nextCursor: undefined };
  }
};
export const ProjectGetItem = async (id: string) => {
  try {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        codeSnippets: true,
      },
    });
  } catch (error) {
    console.error("An error occurred : ", error);
    return null;
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
