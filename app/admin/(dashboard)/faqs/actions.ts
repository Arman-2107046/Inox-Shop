"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

function parse(formData: FormData) {
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";
  if (!question || !answer) return { error: "Question and answer are required." } as const;
  return { data: { question, answer, sortOrder, published } } as const;
}

function revalidate() {
  revalidatePath("/faq");
  revalidatePath("/destinations", "layout");
  revalidatePath("/admin/faqs");
}

export async function createFaq(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.faq.create({ data: parsed.data });
  revalidate();
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.faq.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect("/admin/faqs");
}

export async function deleteFaq(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.faq.delete({ where: { id } });
  revalidate();
}
