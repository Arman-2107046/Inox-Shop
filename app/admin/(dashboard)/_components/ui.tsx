import Link from "next/link";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
        {description && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          <tr>
            {headers.map((h, i) => (
              <th key={h} className={`px-4 py-3 ${i === headers.length - 1 ? "text-right" : ""}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 text-zinc-800 dark:divide-zinc-800 dark:text-zinc-200">{children}</tbody>
      </table>
    </div>
  );
}

export function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">{text}</td>
    </tr>
  );
}

export function Badge({ on, yes = "Published", no = "Draft" }: { on: boolean; yes?: string; no?: string }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        on
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
      }`}
    >
      {on ? yes : no}
    </span>
  );
}

/** Edit link + delete form, right-aligned in a table row. */
export function RowActions({
  editHref,
  deleteAction,
  id,
}: {
  editHref?: string;
  deleteAction: (formData: FormData) => Promise<void>;
  id: string | number;
}) {
  return (
    <div className="flex justify-end gap-3">
      {editHref && (
        <Link href={editHref} className="text-zinc-700 underline dark:text-zinc-300">Edit</Link>
      )}
      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="text-red-600 underline dark:text-red-400">Delete</button>
      </form>
    </div>
  );
}
