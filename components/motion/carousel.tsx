"use client";

import { motion, useMotionValue, useReducedMotion, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal drag carousel with prev/next buttons. Children are the slides;
 * give each a fixed width (e.g. `w-[80vw] md:w-[420px]`).
 */
export function Carousel({ children, className, label }: { children: ReactNode[]; className?: string; label?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState(0);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;
      setBounds(Math.max(0, track.scrollWidth - vp.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [children]);

  const slideWidth = () => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(trackRef.current!).columnGap || "0");
    return first.offsetWidth + gap;
  };

  const go = (dir: 1 | -1) => {
    const w = slideWidth();
    if (!w) return;
    const next = Math.min(Math.max(index + dir, 0), Math.floor(bounds / w) + 1);
    setIndex(next);
    animate(x, -Math.min(next * w, bounds), { type: "spring", stiffness: 120, damping: 24 });
  };

  return (
    <div className={className}>
      <div ref={viewportRef} className="overflow-hidden" role="region" aria-label={label}>
        <motion.div
          ref={trackRef}
          drag={reduce ? false : "x"}
          dragConstraints={{ left: -bounds, right: 0 }}
          dragElastic={0.08}
          style={{ x }}
          onDragEnd={() => {
            const w = slideWidth();
            if (w) setIndex(Math.round(-x.get() / w));
          }}
          className="flex cursor-grab gap-6 active:cursor-grabbing"
        >
          {children}
        </motion.div>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <CarouselButton onClick={() => go(-1)} disabled={index <= 0} label="Previous">
          ←
        </CarouselButton>
        <CarouselButton onClick={() => go(1)} disabled={bounds === 0 || -x.get() >= bounds - 1} label="Next">
          →
        </CarouselButton>
        <span className="ml-3 hidden text-xs uppercase tracking-[0.2em] text-current/50 sm:inline">Drag to explore</span>
      </div>
    </div>
  );
}

function CarouselButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-current/25 text-current transition hover:bg-current/10 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
