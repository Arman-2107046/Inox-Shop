import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteSubscriber } from "./actions";

export default async function SubscribersPage() {
  await requireAdmin();
  const rows = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
  const csv = rows.map((r) => r.email).join("\n");

  return (
    <div>
      <PageHeader title="Newsletter subscribers" description={`${rows.length} ${rows.length === 1 ? "address" : "addresses"} collected from the footer form.`} />
      {rows.length > 0 && (
        <details className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <summary className="cursor-pointer text-sm font-medium">Copy all addresses</summary>
          <textarea readOnly rows={Math.min(rows.length, 10)} value={csv} className="mt-3 w-full rounded-md border border-zinc-300 bg-zinc-50 p-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-950" />
        </details>
      )}
      <Table headers={["Email", "Subscribed", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={3} text="No subscribers yet." />}
        {rows.map((r) => (
          <tr key={r.id}>
            <td className="px-4 py-3 font-medium">{r.email}</td>
            <td className="px-4 py-3 text-zinc-500">{r.createdAt.toLocaleString()}</td>
            <td className="px-4 py-3"><RowActions deleteAction={deleteSubscriber} id={r.id} /></td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
