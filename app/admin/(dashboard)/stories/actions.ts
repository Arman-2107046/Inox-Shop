"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

function parse(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "").trim() || title);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const readMinutes = Number(formData.get("readMinutes") ?? 5) || 5;
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim();
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : new Date();
  const published = formData.get("published") === "on";

  if (!title || !excerpt || !body || !author) return { error: "Title, excerpt, body and author are required." } as const;
  if (!slug) return { error: "Slug could not be generated — enter one manually." } as const;
  if (!coverImage.startsWith("https://")) return { error: "Cover image must be an https:// URL." } as const;
  if (Number.isNaN(publishedAt.getTime())) return { error: "Publish date is invalid." } as const;

  return { data: { title, slug, excerpt, body, coverImage, author, readMinutes, publishedAt, published } } as const;
}

function revalidate(slug?: string) {
  revalidatePath("/");
  revalidatePath("/journal");
  if (slug) revalidatePath(`/journal/${slug}`);
  revalidatePath("/admin/stories");
}

export async function createStory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  if (await prisma.story.findUnique({ where: { slug: parsed.data.slug } })) {
    return { error: `Slug "${parsed.data.slug}" is already in use.` };
  }
  await prisma.story.create({ data: parsed.data });
  revalidate(parsed.data.slug);
  redirect("/admin/stories");
}

export async function updateStory(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  const clash = await prisma.story.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) return { error: `Slug "${parsed.data.slug}" is already in use.` };

  const before = await prisma.story.update({ where: { id }, data: parsed.data });
  revalidate(before.slug);
  revalidate(parsed.data.slug);
  redirect("/admin/stories");
}

export async function deleteStory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const s = await prisma.story.delete({ where: { id } });
  revalidate(s.slug);
}
