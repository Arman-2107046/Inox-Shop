"use server";

import { prisma } from "@/lib/prisma";

export type NewsletterState = { ok?: boolean; error?: string };

export async function subscribe(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  if (formData.get("website")) return { ok: true }; // honeypot
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };

  await prisma.subscriber.upsert({ where: { email }, update: {}, create: { email } });
  return { ok: true };
}
