import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge, EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteDestination } from "./actions";

export default async function DestinationsAdminPage() {
  await requireAdmin();
  const rows = await prisma.destination.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <PageHeader
        title="Destinations"
        description="Journeys shown on the site. Featured ones appear on the home page."
        action={{ href: "/admin/destinations/new", label: "New destination" }}
      />
      <Table headers={["Name", "Region", "Duration", "Status", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={5} text="No destinations yet." />}
        {rows.map((d) => (
          <tr key={d.id}>
            <td className="px-4 py-3">
              <p className="font-medium">{d.name}</p>
              <p className="text-xs text-zinc-500">/destinations/{d.slug}</p>
            </td>
            <td className="px-4 py-3">{d.region}</td>
            <td className="px-4 py-3">{d.duration}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <Badge on={d.published} />
                {d.featured && <Badge on yes="Featured" />}
              </div>
            </td>
            <td className="px-4 py-3">
              <RowActions editHref={`/admin/destinations/${d.id}`} deleteAction={deleteDestination} id={d.id} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
