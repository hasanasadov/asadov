"use server";

import prisma from "@/lib/prisma";
import { GithubSnippet } from "@prisma/client";

export const fetchGithubCode = async (
  repo: string,
  filePath: string,
  branch: string = "main"
): Promise<string> => {
  try {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.text();
    } else {
      throw new Error("Could not fetch snippet.");
    }
  } catch (error) {
    console.error(error);
    return "Error fetching code snippet.";
  }
};

export const GithubSnippetGetItems = async () => {
  return await prisma.githubSnippet.findMany();
};

export const GithubSnippetGetItem = async (id: string) => {
  return await prisma.githubSnippet.findUnique({
    where: { id },
  });
};

export const GithubSnippetDeleteItem = async (id: string) => {
  return await prisma.githubSnippet.delete({
    where: { id },
  });
};

export const GithubSnippetAddItem = async (
  data: Omit<GithubSnippet, "id" | "createdAt">
) => {
  return await prisma.githubSnippet.create({
    data,
  });
};

export const GithubSnippetUpdateItem = async (
  id: string,
  data: Partial<Omit<GithubSnippet, "id" | "createdAt">>
) => {
  return await prisma.githubSnippet.update({
    where: { id },
    data,
  });
};
