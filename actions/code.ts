"use server";

import prisma from "@/lib/prisma";
import { CodeSnippet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CodeSnippetGetItems = async () => {
  try {
    return await prisma.codeSnippet.findMany();
  } catch (error) {
    console.error("An error accured : ", error);
    return [];
  }
};

export const CodeSnippetDeleteItem = async (id: string) => {
  try {
    return await prisma.codeSnippet.delete({
      where: { id },
    });
  } catch (error) {
    console.error("An error accured : ", error);
    return null;
  }
};

export const CodeSnippetAddItem = async (
  data: Omit<CodeSnippet, "id" | "createdAt">
) => {
  try {
    return await prisma.codeSnippet.create({
      data,
    });
  } catch (error) {
    console.error("An error accured : ", error);
    return null;
  }
};

export const CodeSnippetUpdateItem = async (
  id: string,
  data: Partial<Omit<CodeSnippet, "id" | "createdAt">>
) => {
  try {
    const updatedSnippet = await prisma.codeSnippet.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/(portfolio)/codesnippets");
    return updatedSnippet;
  } catch (error) {
    console.error("An error accured : ", error);
    return null;
  }
};
