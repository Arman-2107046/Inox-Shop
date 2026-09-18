"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

function parse(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!name || !role || !location || !bio) return { error: "Name, role, location and bio are required." } as const;
  if (!image.startsWith("https://")) return { error: "Image must be an https:// URL." } as const;
  return { data: { name, role, location, bio, image, sortOrder, published } } as const;
}

function revalidate() {
  revalidatePath("/about");
  revalidatePath("/guides");
  revalidatePath("/admin/guides");
}

export async function createGuide(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.guide.create({ data: parsed.data });
  revalidate();
  redirect("/admin/guides");
}

export async function updateGuide(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.guide.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect("/admin/guides");
}

export async function deleteGuide(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.guide.delete({ where: { id } });
  revalidate();
}
