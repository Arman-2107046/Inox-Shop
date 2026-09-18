"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function toggleEnquiryRead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const read = formData.get("read") === "true";
  if (!id) return;
  await prisma.enquiry.update({ where: { id }, data: { read } });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteEnquiry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.enquiry.delete({ where: { id } });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
