import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          New product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                  No products yet.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="text-zinc-800 dark:text-zinc-200">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.price.toString()}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{p.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/products/${p.id}`} className="text-zinc-700 underline dark:text-zinc-300">
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="text-red-600 underline dark:text-red-400">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
