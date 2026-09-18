"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

// Slugs that belong to real routes and must not be shadowed by a CMS page.
const RESERVED = new Set(["destinations", "collections", "journal", "about", "guides", "impact", "faq", "contact", "admin", "api"]);

function parse(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "").trim() || title);
  const body = String(formData.get("body") ?? "").trim();
  const published = formData.get("published") === "on";
  if (!title || !body) return { error: "Title and body are required." } as const;
  if (!slug) return { error: "Slug could not be generated — enter one manually." } as const;
  if (RESERVED.has(slug)) return { error: `"${slug}" is reserved for a built-in page.` } as const;
  return { data: { title, slug, body, published } } as const;
}

function revalidate(slug?: string) {
  revalidatePath("/", "layout"); // footer links
  if (slug) revalidatePath(`/${slug}`);
  revalidatePath("/admin/pages");
}

export async function createPage(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  if (await prisma.page.findUnique({ where: { slug: parsed.data.slug } })) {
    return { error: `Slug "${parsed.data.slug}" is already in use.` };
  }
  await prisma.page.create({ data: parsed.data });
  revalidate(parsed.data.slug);
  redirect("/admin/pages");
}

export async function updatePage(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  const clash = await prisma.page.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) return { error: `Slug "${parsed.data.slug}" is already in use.` };
  const before = await prisma.page.update({ where: { id }, data: parsed.data });
  revalidate(before.slug);
  revalidate(parsed.data.slug);
  redirect("/admin/pages");
}

export async function deletePage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const p = await prisma.page.delete({ where: { id } });
  revalidate(p.slug);
}
