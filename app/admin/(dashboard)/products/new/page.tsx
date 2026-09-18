import { requireAdmin } from "@/lib/auth";
import { createProduct } from "../actions";
import { ProductForm } from "../product-form";

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">New product</h1>
      <div className="mt-6">
        <ProductForm action={createProduct} submitLabel="Create product" />
      </div>
    </div>
  );
}
