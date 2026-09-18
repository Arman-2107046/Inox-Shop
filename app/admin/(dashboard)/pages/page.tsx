import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge, EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deletePage } from "./actions";

export default async function PagesAdminPage() {
  await requireAdmin();
  const rows = await prisma.page.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <PageHeader title="Pages" description="Free-form pages such as privacy or terms. Published ones are linked in the footer." action={{ href: "/admin/pages/new", label: "New page" }} />
      <Table headers={["Title", "URL", "Updated", "Status", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={5} text="No pages yet." />}
        {rows.map((p) => (
          <tr key={p.id}>
            <td className="px-4 py-3 font-medium">{p.title}</td>
            <td className="px-4 py-3 text-zinc-500">/{p.slug}</td>
            <td className="px-4 py-3 text-zinc-500">{p.updatedAt.toLocaleDateString()}</td>
            <td className="px-4 py-3"><Badge on={p.published} /></td>
            <td className="px-4 py-3"><RowActions editHref={`/admin/pages/${p.id}`} deleteAction={deletePage} id={p.id} /></td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
