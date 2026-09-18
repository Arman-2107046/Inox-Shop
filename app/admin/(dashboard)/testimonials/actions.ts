"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

function parse(formData: FormData) {
  const quote = String(formData.get("quote") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!quote || !name) return { error: "Quote and name are required." } as const;
  return { data: { quote, name, detail, sortOrder, published } } as const;
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonial(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.testimonial.create({ data: parsed.data });
  revalidate();
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.testimonial.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidate();
}
