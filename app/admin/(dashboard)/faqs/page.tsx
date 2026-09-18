import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge, EmptyRow, PageHeader, RowActions, Table } from "../_components/ui";
import { deleteFaq } from "./actions";

export default async function FaqsAdminPage() {
  await requireAdmin();
  const rows = await prisma.faq.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div>
      <PageHeader title="FAQs" description="Shown on /faq and (first four) on every destination page." action={{ href: "/admin/faqs/new", label: "New question" }} />
      <Table headers={["Question", "Order", "Status", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={4} text="No questions yet." />}
        {rows.map((f) => (
          <tr key={f.id}>
            <td className="max-w-lg px-4 py-3 font-medium">{f.question}</td>
            <td className="px-4 py-3">{f.sortOrder}</td>
            <td className="px-4 py-3"><Badge on={f.published} /></td>
            <td className="px-4 py-3"><RowActions editHref={`/admin/faqs/${f.id}`} deleteAction={deleteFaq} id={f.id} /></td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
