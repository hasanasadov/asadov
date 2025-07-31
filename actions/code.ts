"use server";

import prisma from "@/lib/prisma";
import { CodeSnippet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CodeSnippetGetItems = async () => {
  return await prisma.codeSnippet.findMany();
};

export const CodeSnippetDeleteItem = async (id: string) => {
  return await prisma.codeSnippet.delete({
    where: { id },
  });
};

export const CodeSnippetAddItem = async (
  data: Omit<CodeSnippet, "id" | "createdAt">
) => {
  return await prisma.codeSnippet.create({
    data,
  });
};

export const CodeSnippetUpdateItem = async (
  id: string,
  data: Partial<Omit<CodeSnippet, "id" | "createdAt">>
) => {
  const updatedSnippet = await prisma.codeSnippet.update({
    where: { id },
    data,
  });
  revalidatePath("/dashboard/(portfolio)/codesnippets");
  return updatedSnippet;
};
