import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge, EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteCategory } from "./actions";

export default async function CollectionsAdminPage() {
  await requireAdmin();
  const rows = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { destinations: true } } },
  });

  return (
    <div>
      <PageHeader
        title="Collections"
        description="Groupings of journeys (e.g. Forest, Mountain, Coast). Assign them on each destination."
        action={{ href: "/admin/collections/new", label: "New collection" }}
      />
      <Table headers={["Name", "Journeys", "Order", "Status", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={5} text="No collections yet." />}
        {rows.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3">
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-zinc-500">/collections/{c.slug}</p>
            </td>
            <td className="px-4 py-3">{c._count.destinations}</td>
            <td className="px-4 py-3">{c.sortOrder}</td>
            <td className="px-4 py-3"><Badge on={c.published} /></td>
            <td className="px-4 py-3">
              <RowActions editHref={`/admin/collections/${c.id}`} deleteAction={deleteCategory} id={c.id} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
