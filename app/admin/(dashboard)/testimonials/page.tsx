import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge, EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteTestimonial } from "./actions";

export default async function TestimonialsAdminPage() {
  await requireAdmin();
  const rows = await prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Traveller quotes shown on the home and about pages."
        action={{ href: "/admin/testimonials/new", label: "New testimonial" }}
      />
      <Table headers={["Quote", "Name", "Status", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={4} text="No testimonials yet." />}
        {rows.map((t) => (
          <tr key={t.id}>
            <td className="max-w-md px-4 py-3"><p className="line-clamp-2 italic">“{t.quote}”</p></td>
            <td className="px-4 py-3">
              <p className="font-medium">{t.name}</p>
              <p className="text-xs text-zinc-500">{t.detail}</p>
            </td>
            <td className="px-4 py-3"><Badge on={t.published} /></td>
            <td className="px-4 py-3">
              <RowActions editHref={`/admin/testimonials/${t.id}`} deleteAction={deleteTestimonial} id={t.id} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
