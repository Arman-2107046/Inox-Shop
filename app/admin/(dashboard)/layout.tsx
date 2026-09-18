import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "../actions";

export const metadata = { title: "Admin" };

// Add new CMS sections here; each gets a page under app/admin/(dashboard)/.
const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/stories", label: "Journal" },
  { href: "/admin/guides", label: "Guides" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/settings", label: "Site settings" },
  { href: "/admin/products", label: "Products" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <aside className="flex w-60 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <Link href="/admin" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Verdant CMS
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">{admin.name}</p>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{admin.email}</p>
          <form action={logoutAction} className="mt-3">
            <button
              type="submit"
              className="w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
