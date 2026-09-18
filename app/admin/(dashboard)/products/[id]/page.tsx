import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../actions";
import { ProductForm } from "../product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Edit product</h1>
      <div className="mt-6">
        <ProductForm
          action={action}
          submitLabel="Save changes"
          initial={{
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock,
          }}
        />
      </div>
    </div>
  );
}
