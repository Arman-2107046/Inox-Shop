"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Header sits transparent over the hero, then gains a solid background on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-forest-950/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="font-display text-2xl font-medium tracking-wide text-cream-50">
          {siteName}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`eyebrow transition-colors ${
                  active ? "text-gold-400" : "text-cream-50/80 hover:text-cream-50"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full border border-gold-400/70 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-gold-400 transition hover:bg-gold-400 hover:text-forest-950"
          >
            Plan a journey
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-cream-50 transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-cream-50 transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-forest-950 px-6 py-6 md:hidden">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-2xl text-cream-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
