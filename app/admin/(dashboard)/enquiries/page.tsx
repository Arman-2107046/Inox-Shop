import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EmptyRow, PageHeader, Table } from "../_components/ui";
import { deleteEnquiry, toggleEnquiryRead } from "./actions";

export default async function EnquiriesPage() {
  await requireAdmin();
  const rows = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { destination: { select: { name: true } } },
  });

  return (
    <div>
      <PageHeader title="Enquiries" description="Messages sent through the contact form." />
      <Table headers={["From", "Journey", "Message", "Received", "Actions"]}>
        {rows.length === 0 && <EmptyRow colSpan={5} text="No enquiries yet." />}
        {rows.map((e) => (
          <tr key={e.id} className={e.read ? "text-zinc-500" : ""}>
            <td className="px-4 py-3 align-top">
              <p className={`font-medium ${e.read ? "" : "text-zinc-900 dark:text-zinc-50"}`}>{e.name}</p>
              <a href={`mailto:${e.email}`} className="text-xs underline">{e.email}</a>
            </td>
            <td className="px-4 py-3 align-top">{e.destination?.name ?? "—"}</td>
            <td className="max-w-md whitespace-pre-line px-4 py-3 align-top text-sm">{e.message}</td>
            <td className="whitespace-nowrap px-4 py-3 align-top text-xs">{e.createdAt.toLocaleString()}</td>
            <td className="px-4 py-3 align-top">
              <div className="flex justify-end gap-3 whitespace-nowrap">
                <form action={toggleEnquiryRead}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="read" value={e.read ? "false" : "true"} />
                  <button type="submit" className="underline">{e.read ? "Mark unread" : "Mark read"}</button>
                </form>
                <form action={deleteEnquiry}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" className="text-red-600 underline dark:text-red-400">Delete</button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
