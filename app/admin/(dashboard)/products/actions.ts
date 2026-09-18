"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ProductFormState = { error?: string };

function parseProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock") ?? 0);

  if (!name) return { error: "Name is required." } as const;
  if (!Number.isFinite(price) || price < 0) return { error: "Price must be a positive number." } as const;
  if (!Number.isInteger(stock) || stock < 0) return { error: "Stock must be a whole number." } as const;

  return { data: { name, description, price, stock } } as const;
}

export async function createProduct(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseProduct(formData);
  if ("error" in parsed) return { error: parsed.error };

  await prisma.product.create({ data: parsed.data });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: number,
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseProduct(formData);
  if ("error" in parsed) return { error: parsed.error };

  await prisma.product.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}
