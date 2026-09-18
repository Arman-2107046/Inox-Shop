import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

type Props = {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  instagram?: string | null;
  pages: { slug: string; title: string }[];
};

const explore = [
  { href: "/destinations", label: "Destinations" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/guides", label: "Guides" },
];
const company = [
  { href: "/about", label: "About" },
  { href: "/impact", label: "Impact" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter({ siteName, tagline, email, phone, address, instagram, pages }: Props) {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-50">
      {/* Oversized watermark */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 w-max -translate-x-1/2 select-none whitespace-nowrap font-display text-[18vw] font-light leading-none text-white/[0.03]"
      >
        {siteName}
      </p>

      <div className="relative mx-auto max-w-[1440px] px-6 pt-24 lg:px-12">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow text-gold-400">Field notes, four times a year</p>
            <h2 className="mt-4 max-w-md font-display text-4xl font-light leading-tight md:text-5xl">
              Slow stories from the places we love.
            </h2>
          </div>
          <div className="flex items-end">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-3xl font-medium">{siteName}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-sage-300">{tagline}</p>
          </div>
          <FooterCol title="Explore" items={explore} />
          <FooterCol title="Company" items={company} />
          <div>
            <p className="eyebrow text-gold-400">Get in touch</p>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/80">
              <li><a href={`mailto:${email}`} className="link-draw hover:text-cream-50">{email}</a></li>
              <li><a href={`tel:${phone.replace(/\s+/g, "")}`} className="link-draw hover:text-cream-50">{phone}</a></li>
              <li className="whitespace-pre-line text-sage-300">{address}</li>
              {instagram && (
                <li>
                  <a href={instagram} target="_blank" rel="noreferrer" className="link-draw hover:text-cream-50">Instagram ↗</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-sage-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {pages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="hover:text-cream-50">{p.title}</Link>
            ))}
            <span>Travel lightly. Leave only footprints.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow text-gold-400">{title}</p>
      <ul className="mt-5 space-y-3 text-sm text-cream-50/80">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="link-draw hover:text-cream-50">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
