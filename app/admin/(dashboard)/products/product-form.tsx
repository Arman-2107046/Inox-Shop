"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ProductFormState } from "./actions";

type Props = {
  action: (prev: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  initial?: { name: string; description: string | null; price: string; stock: number };
  submitLabel: string;
};

const inputClass =
  "mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:ring-zinc-800";
const labelClass = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

export function ProductForm({ action, initial, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<ProductFormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" name="name" required defaultValue={initial?.name} className={inputClass} />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={initial?.description ?? ""}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className={labelClass}>
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={initial?.price}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="stock" className={labelClass}>
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            step="1"
            min="0"
            required
            defaultValue={initial?.stock ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin/products"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
