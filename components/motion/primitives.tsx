"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise into view. Wrap any block. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "p";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Staggers direct children `Reveal`-style. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = motion[as];
  return (
    <Tag
      variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Reveals a heading word by word, each rising from behind a clipping mask. */
export function SplitWords({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.045 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/** Moves children slower/faster than scroll for depth. `speed` in [-1, 1]. */
export function Parallax({ children, speed = 0.2, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** Counts from 0 to `value` when scrolled into view. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = value.toLocaleString() + suffix;
      return;
    }
    return spring.on("change", (v) => {
      el.textContent = Math.round(v).toLocaleString() + suffix;
    });
  }, [spring, suffix, value, reduce]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/** Thin bar at the top of the viewport tracking read progress of `targetRef`'s page. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className={`fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold-400 ${className ?? ""}`} />;
}

/** Simple looping marquee; pass items twice internally for a seamless loop. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`} aria-hidden="true">
      <div className="inline-flex animate-marquee gap-12 pr-12 will-change-transform motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12 font-display text-3xl font-light italic text-cream-50/70 md:text-5xl">
            {t}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Image that scales down gently on load — the classic cinematic hero opener. */
export function KenBurns({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`absolute inset-0 animate-kenburns will-change-transform motion-reduce:animate-none ${className ?? ""}`}>{children}</div>;
}

/** Vertical line that grows and shrinks — the hero's "scroll" cue. */
export function ScrollCue({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className ?? ""}`} aria-hidden="true">
      <span className="eyebrow text-cream-50/60">Scroll</span>
      <span className="block h-14 w-px overflow-hidden bg-cream-50/20">
        <span className="block h-full w-full animate-scroll-cue bg-gold-400" />
      </span>
    </div>
  );
}
