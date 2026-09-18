"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

function parse(formData: FormData) {
  const value = Number(formData.get("value"));
  const suffix = String(formData.get("suffix") ?? "").trim();
  const label = String(formData.get("label") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  if (!label) return { error: "Label is required." } as const;
  if (!Number.isFinite(value) || value < 0) return { error: "Value must be a positive number." } as const;
  return { data: { value: Math.round(value), suffix, label, sortOrder } } as const;
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/impact");
  revalidatePath("/admin/stats");
}

export async function createStat(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.stat.create({ data: parsed.data });
  revalidate();
  redirect("/admin/stats");
}

export async function updateStat(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if ("error" in parsed) return { error: parsed.error };
  await prisma.stat.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect("/admin/stats");
}

export async function deleteStat(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.stat.delete({ where: { id } });
  revalidate();
}
