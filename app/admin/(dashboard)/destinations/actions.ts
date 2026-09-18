"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { itineraryFromText, linesToArray, slugify } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

function parse(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "").trim() || name);
  const region = String(formData.get("region") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const heroImage = String(formData.get("heroImage") ?? "").trim();
  const gallery = linesToArray(String(formData.get("gallery") ?? ""));
  const highlights = linesToArray(String(formData.get("highlights") ?? ""));
  const inclusions = linesToArray(String(formData.get("inclusions") ?? ""));
  const exclusions = linesToArray(String(formData.get("exclusions") ?? ""));
  const itinerary = itineraryFromText(String(formData.get("itinerary") ?? ""));
  const duration = String(formData.get("duration") ?? "").trim();
  const difficulty = String(formData.get("difficulty") ?? "").trim();
  const bestSeason = String(formData.get("bestSeason") ?? "").trim();
  const groupSize = String(formData.get("groupSize") ?? "").trim() || "Max 10";
  const priceRaw = String(formData.get("priceFrom") ?? "").trim();
  const priceFrom = priceRaw ? Number(priceRaw) : null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const categoryIds = formData.getAll("categoryIds").map(String).filter(Boolean);

  if (!name || !region || !tagline || !description) return { error: "Name, region, tagline and description are required." } as const;
  if (!slug) return { error: "Slug could not be generated — enter one manually." } as const;
  if (!heroImage.startsWith("https://")) return { error: "Hero image must be an https:// URL." } as const;
  if (!duration || !difficulty || !bestSeason) return { error: "Duration, difficulty and best season are required." } as const;
  if (priceFrom !== null && (!Number.isInteger(priceFrom) || priceFrom < 0)) return { error: "Price must be a whole number." } as const;
  if (itinerary.some((d) => !d.title)) return { error: "Every itinerary day needs a title on its first line." } as const;

  return {
    data: {
      name, slug, region, tagline, description, heroImage, gallery, highlights, inclusions, exclusions,
      itinerary, duration, difficulty, bestSeason, groupSize, priceFrom, sortOrder, featured, published,
    },
    categoryIds,
  } as const;
}

function revalidate(slug?: string) {
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath("/collections", "layout");
  revalidatePath("/contact");
  if (slug) revalidatePath(`/destinations/${slug}`);
  revalidatePath("/admin/destinations");
}

export async function createDestination(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  if (await prisma.destination.findUnique({ where: { slug: parsed.data.slug } })) {
    return { error: `Slug "${parsed.data.slug}" is already in use.` };
  }
  await prisma.destination.create({
    data: { ...parsed.data, categories: { connect: parsed.categoryIds.map((id) => ({ id })) } },
  });
  revalidate(parsed.data.slug);
  redirect("/admin/destinations");
}

export async function updateDestination(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };

  const clash = await prisma.destination.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) return { error: `Slug "${parsed.data.slug}" is already in use.` };

  const before = await prisma.destination.update({
    where: { id },
    data: { ...parsed.data, categories: { set: parsed.categoryIds.map((cid) => ({ id: cid })) } },
  });
  revalidate(before.slug);
  revalidate(parsed.data.slug);
  redirect("/admin/destinations");
}

export async function deleteDestination(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const d = await prisma.destination.delete({ where: { id } });
  revalidate(d.slug);
}
