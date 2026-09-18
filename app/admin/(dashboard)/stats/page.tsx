import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteStat } from "./actions";

export default async function StatsAdminPage() {
  await requireAdmin();
  const rows = await prisma.stat.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <PageHeader title="Stats" description="Animated numbers shown on the home, about and impact pages." action={{ href: "/admin/stats/new", label: "New stat" }} />
      <Table headers={["Value", "Label", "Order", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={4} text="No stats yet." />}
        {rows.map((s) => (
          <tr key={s.id}>
            <td className="px-4 py-3 font-medium">{s.value.toLocaleString()}{s.suffix}</td>
            <td className="px-4 py-3">{s.label}</td>
            <td className="px-4 py-3">{s.sortOrder}</td>
            <td className="px-4 py-3"><RowActions editHref={`/admin/stats/${s.id}`} deleteAction={deleteStat} id={s.id} /></td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
