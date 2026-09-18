"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

function parse(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "").trim() || name);
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!name || !tagline || !description) return { error: "Name, tagline and description are required." } as const;
  if (!slug) return { error: "Slug could not be generated — enter one manually." } as const;
  if (!image.startsWith("https://")) return { error: "Image must be an https:// URL." } as const;
  return { data: { name, slug, tagline, description, image, sortOrder, published } } as const;
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath("/collections", "layout");
  revalidatePath("/admin/collections");
}

export async function createCategory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  if (await prisma.category.findUnique({ where: { slug: parsed.data.slug } })) {
    return { error: `Slug "${parsed.data.slug}" is already in use.` };
  }
  await prisma.category.create({ data: parsed.data });
  revalidate();
  redirect("/admin/collections");
}

export async function updateCategory(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  const clash = await prisma.category.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) return { error: `Slug "${parsed.data.slug}" is already in use.` };
  await prisma.category.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect("/admin/collections");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.category.delete({ where: { id } });
  revalidate();
}
