import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const [destinations, published, stories, guides, unread, subscribers, recent] = await Promise.all([
    prisma.destination.count(),
    prisma.destination.count({ where: { published: true } }),
    prisma.story.count({ where: { published: true } }),
    prisma.guide.count({ where: { published: true } }),
    prisma.enquiry.count({ where: { read: false } }),
    prisma.subscriber.count(),
    prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { destination: { select: { name: true } } } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Welcome, {admin.name}</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Overview of your site content.{" "}
        <a href="/" target="_blank" rel="noreferrer" className="underline">View live site ↗</a>
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Destinations" value={`${published} / ${destinations}`} sub="published / total" href="/admin/destinations" />
        <Stat label="Journal stories" value={stories} sub="published" href="/admin/stories" />
        <Stat label="Guides" value={guides} sub="published" href="/admin/guides" />
        <Stat label="Subscribers" value={subscribers} sub="newsletter" href="/admin/subscribers" />
        <Stat label="Unread enquiries" value={unread} sub="awaiting reply" href="/admin/enquiries" highlight={unread > 0} />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {recent.length === 0 && <p className="px-5 py-6 text-sm text-zinc-500">No enquiries yet.</p>}
          {recent.map((e) => (
            <div key={e.id} className="flex items-start justify-between gap-6 px-5 py-4">
              <div className="min-w-0">
                <p className={`text-sm ${e.read ? "text-zinc-600 dark:text-zinc-400" : "font-medium text-zinc-900 dark:text-zinc-50"}`}>
                  {e.name} <span className="font-normal text-zinc-500">· {e.email}</span>
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{e.message}</p>
              </div>
              <div className="shrink-0 text-right text-xs text-zinc-500">
                <p>{e.destination?.name ?? "General"}</p>
                <p>{e.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  href,
  highlight = false,
}: {
  label: string;
  value: number | string;
  sub: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl border bg-white p-5 hover:border-zinc-400 dark:bg-zinc-900 dark:hover:border-zinc-600 ${
        highlight ? "border-amber-400" : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
      <p className="text-xs text-zinc-500">{sub}</p>
    </Link>
  );
}
