"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormState } from "../_components/form";

const REQUIRED = [
  "siteName", "tagline", "heroTitle", "heroSubtitle", "heroImage",
  "aboutTitle", "aboutBody", "aboutImage", "email", "phone", "address",
] as const;
const OPTIONAL = ["introStatement", "impactTitle", "impactBody", "impactImage"] as const;

export async function saveSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const data = {} as Record<(typeof REQUIRED)[number] | (typeof OPTIONAL)[number], string> & { instagram: string | null };
  for (const key of REQUIRED) {
    const value = String(formData.get(key) ?? "").trim();
    if (!value) return { error: `${key} is required.` };
    data[key] = value;
  }
  for (const key of OPTIONAL) data[key] = String(formData.get(key) ?? "").trim();
  data.instagram = String(formData.get("instagram") ?? "").trim() || null;

  if (data.impactImage && !data.impactImage.startsWith("https://")) return { error: "Impact image must be an https:// URL." };
  if (!data.heroImage.startsWith("https://") || !data.aboutImage.startsWith("https://")) {
    return { error: "Image fields must be https:// URLs." };
  }

  await prisma.siteSettings.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } });

  // Settings feed the header/footer, so every public page changes.
  revalidatePath("/", "layout");
  return { ok: true };
}
