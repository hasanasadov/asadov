"use server";

import prisma from "@/lib/prisma";
import { InternshipModel } from "@/types";
import { revalidatePath } from "next/cache";

export async function InternshipGetItems() {
  try {
    return await prisma.internship.findMany({ orderBy: { start: "desc" } });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function InternshipAddItem(data: {
  start: Date;
  end?: Date;
  title1: string;
  title2?: string;
  description: string;
}) {
  try {
    const item = await prisma.internship.create({ data });
    revalidatePath("/dashboard");
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function InternshipUpdateItem(
  id: string,
  data: Partial<InternshipModel>
) {
  try {
    const item = await prisma.internship.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard");
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function InternshipDeleteItem(id: string) {
  try {
    await prisma.internship.delete({ where: { id } });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
  }
}
