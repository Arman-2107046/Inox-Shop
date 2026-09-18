"use server";

import { prisma } from "@/lib/prisma";

export type EnquiryState = { ok?: boolean; error?: string };

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("website")) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const destinationSlug = String(formData.get("destination") ?? "").trim();

  if (!name || !email || !message) return { error: "Please fill in your name, email and message." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "That email address doesn't look right." };
  if (message.length > 5000) return { error: "Message is too long." };

  const destination = destinationSlug
    ? await prisma.destination.findUnique({ where: { slug: destinationSlug }, select: { id: true } })
    : null;

  await prisma.enquiry.create({
    data: { name, email, message, destinationId: destination?.id ?? null },
  });

  return { ok: true };
}
