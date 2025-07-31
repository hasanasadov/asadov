// actions/education.ts
"use server";

import prisma from "@/lib/prisma";
import { EducationModel } from "@/types";
import { revalidatePath } from "next/cache";

export async function EducationGetItems() {
  try {
    return await prisma.education.findMany({ orderBy: { start: "desc" } });
  } catch (error) {
    console.error("Get Error:", error);
    return [];
  }
}

export async function EducationAddItem(data: EducationModel) {
  try {
    const newItem = await prisma.education.create({ data });
    revalidatePath("/dashboard");
    return newItem;
  } catch (error) {
    console.error("Add Error:", error);
    return null;
  }
}

export async function EducationUpdateItem(
  id: string,
  data: Partial<EducationModel>
) {
  try {
    const updated = await prisma.education.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard");
    return updated;
  } catch (error) {
    console.error("Update Error:", error);
    return null;
  }
}

export async function EducationDeleteItem(id: string) {
  try {
    await prisma.education.delete({ where: { id } });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Delete Error:", error);
  }
}
