"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { DestinationCard, type DestinationCardData } from "./cards";

type Item = DestinationCardData & { id: string; categories: { slug: string; name: string }[]; difficulty: string };
type Filter = { slug: string; name: string };

/** Filterable, animated destination grid. Filter state lives in the URL (?collection=). */
export function DestinationGrid({ items, filters }: { items: Item[]; filters: Filter[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("collection") ?? "";

  const visible = useMemo(
    () => (active ? items.filter((d) => d.categories.some((c) => c.slug === active)) : items),
    [items, active],
  );

  const setFilter = (slug: string) => {
    router.replace(slug ? `/destinations?collection=${slug}` : "/destinations", { scroll: false });
  };

  return (
    <div>
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
        <FilterChip label="All journeys" active={!active} onClick={() => setFilter("")} />
        {filters.map((f) => (
          <FilterChip key={f.slug} label={f.name} active={active === f.slug} onClick={() => setFilter(f.slug)} />
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((d, i) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
              >
                <DestinationCard d={d} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-forest-700/70">No journeys in this collection yet.</p>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition duration-300 ${
        active
          ? "border-forest-900 bg-forest-900 text-cream-50"
          : "border-forest-900/20 text-forest-800 hover:border-forest-900"
      }`}
    >
      {label}
    </button>
  );
}
