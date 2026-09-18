import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge, EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteGuide } from "./actions";

export default async function GuidesAdminPage() {
  await requireAdmin();
  const rows = await prisma.guide.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div>
      <PageHeader title="Guides" description="The team shown on /guides and the about page." action={{ href: "/admin/guides/new", label: "New guide" }} />
      <Table headers={["Name", "Location", "Order", "Status", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={5} text="No guides yet." />}
        {rows.map((g) => (
          <tr key={g.id}>
            <td className="px-4 py-3">
              <p className="font-medium">{g.name}</p>
              <p className="text-xs text-zinc-500">{g.role}</p>
            </td>
            <td className="px-4 py-3">{g.location}</td>
            <td className="px-4 py-3">{g.sortOrder}</td>
            <td className="px-4 py-3"><Badge on={g.published} /></td>
            <td className="px-4 py-3"><RowActions editHref={`/admin/guides/${g.id}`} deleteAction={deleteGuide} id={g.id} /></td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
