"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export type Quote = { id: string; quote: string; name: string; detail: string };

/** Auto-advancing single-quote slider with crossfade and manual dots. */
export function TestimonialSlider({ quotes }: { quotes: Quote[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || quotes.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, [paused, quotes.length]);

  const q = quotes[i];
  if (!q) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative">
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-display text-[12rem] leading-none text-gold-400/15">
        “
      </span>
      <div className="relative min-h-[16rem] md:min-h-[14rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={q.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <blockquote className="font-display text-3xl font-light italic leading-snug text-cream-50 md:text-5xl">{q.quote}</blockquote>
            <figcaption className="mt-8">
              <p className="eyebrow text-gold-400">{q.name}</p>
              <p className="mt-1 text-sm text-sage-300">{q.detail}</p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      {quotes.length > 1 && (
        <div className="mt-10 flex justify-center gap-3">
          {quotes.map((x, idx) => (
            <button
              key={x.id}
              type="button"
              aria-label={`Show quote ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-px transition-all duration-500 ${idx === i ? "w-10 bg-gold-400" : "w-5 bg-cream-50/30 hover:bg-cream-50/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
