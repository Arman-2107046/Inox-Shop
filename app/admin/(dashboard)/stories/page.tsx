import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge, EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteStory } from "./actions";

export default async function StoriesAdminPage() {
  await requireAdmin();
  const rows = await prisma.story.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <PageHeader
        title="Journal"
        description="Stories and field notes shown under /journal."
        action={{ href: "/admin/stories/new", label: "New story" }}
      />
      <Table headers={["Title", "Author", "Date", "Status", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={5} text="No stories yet." />}
        {rows.map((s) => (
          <tr key={s.id}>
            <td className="px-4 py-3">
              <p className="font-medium">{s.title}</p>
              <p className="text-xs text-zinc-500">/journal/{s.slug}</p>
            </td>
            <td className="px-4 py-3">{s.author}</td>
            <td className="px-4 py-3 text-zinc-500">{s.publishedAt.toLocaleDateString()}</td>
            <td className="px-4 py-3"><Badge on={s.published} /></td>
            <td className="px-4 py-3">
              <RowActions editHref={`/admin/stories/${s.id}`} deleteAction={deleteStory} id={s.id} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
