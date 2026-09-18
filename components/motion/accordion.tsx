"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export type AccordionItem = { id: string; title: string; body: string; meta?: string };

/**
 * Animated accordion used for itineraries and FAQs.
 * `tone` switches between the cream (light) and forest (dark) surfaces.
 */
export function Accordion({
  items,
  tone = "light",
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  tone?: "light" | "dark";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen != null ? items[defaultOpen]?.id ?? null : null);
  const dark = tone === "dark";

  return (
    <div className={`divide-y ${dark ? "divide-white/10" : "divide-forest-900/10"}`}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-6 py-6 text-left"
            >
              {item.meta && (
                <span className={`eyebrow mt-2 w-16 shrink-0 ${dark ? "text-gold-400" : "text-moss-500"}`}>{item.meta}</span>
              )}
              <span className={`flex-1 font-display text-2xl leading-snug md:text-3xl ${dark ? "text-cream-50" : "text-forest-900"}`}>
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg ${
                  dark ? "border-white/20 text-cream-50" : "border-forest-900/20 text-forest-900"
                }`}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className={`pb-8 leading-relaxed ${item.meta ? "md:pl-22" : ""} ${dark ? "text-sage-300" : "text-forest-700/85"}`}>
                    {item.body.split(/\n\s*\n/).map((p, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
