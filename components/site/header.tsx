"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader({ siteName, email }: { siteName: string; email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Solid background after the hero; hide when scrolling down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 160 && y > prev && !open);
  });

  // Lock page scroll while the overlay menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? "bg-forest-950/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <Link href="/" onClick={() => setOpen(false)} className="relative z-[70] font-display text-2xl font-medium tracking-wide text-cream-50">
            {siteName}
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.slice(0, 5).map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`link-draw eyebrow pb-1 transition-colors ${active ? "text-gold-400" : "text-cream-50/80 hover:text-cream-50"}`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="rounded-full border border-gold-400/70 px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold-400 transition duration-300 hover:bg-gold-400 hover:text-forest-950"
            >
              Plan a journey
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
          >
            <span className={`h-px w-7 bg-cream-50 transition duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-px w-7 bg-cream-50 transition duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-forest-950 px-6 pb-10 pt-32 text-cream-50"
          >
            <nav className="flex-1">
              <ul className="space-y-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                  >
                    <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-5xl font-light leading-tight hover:text-gold-400">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-end justify-between border-t border-white/10 pt-6 text-sm text-sage-300"
            >
              <a href={`mailto:${email}`} className="hover:text-cream-50">{email}</a>
              <span className="eyebrow">Travel lightly</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
