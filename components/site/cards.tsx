import Image from "next/image";
import Link from "next/link";
import { KenBurns, Reveal, ScrollCue, SplitWords } from "@/components/motion/primitives";

/* ---------- Headings ---------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className={`eyebrow ${centered ? "" : "rule"} ${light ? "text-gold-400" : "text-moss-500"}`}>{eyebrow}</p>
      </Reveal>
      <SplitWords
        as={as}
        text={title}
        className={`mt-5 font-display text-4xl font-light leading-[1.08] md:text-6xl ${light ? "text-cream-50" : "text-forest-900"}`}
      />
      {intro && (
        <Reveal delay={0.25}>
          <p className={`mt-6 text-base leading-relaxed md:text-lg ${light ? "text-sage-300" : "text-forest-700/80"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Page hero (inner pages) ---------- */

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  height = "min-h-[70vh]",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  height?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative flex ${height} items-end overflow-hidden bg-forest-950`}>
      <KenBurns>
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      </KenBurns>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/20" />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-44 lg:px-12">
        <Reveal>
          <p className="eyebrow rule text-gold-400">{eyebrow}</p>
        </Reveal>
        <SplitWords as="h1" text={title} delay={0.1} className="mt-5 max-w-4xl font-display text-5xl font-light leading-[1.02] text-cream-50 md:text-7xl lg:text-8xl" />
        {intro && (
          <Reveal delay={0.4}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-sage-200 md:text-lg">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------- Cards ---------- */

export type DestinationCardData = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  heroImage: string;
  duration: string;
  priceFrom: number | null;
};

export function DestinationCard({ d, index, ratio = "aspect-[4/5]" }: { d: DestinationCardData; index?: number; ratio?: string }) {
  return (
    <Link href={`/destinations/${d.slug}`} className={`group relative block overflow-hidden rounded-[1.25rem] bg-forest-900 ${ratio}`}>
      <Image
        src={d.heroImage}
        alt={d.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/25 to-transparent transition duration-700 group-hover:via-forest-950/40" />
      {index != null && (
        <span className="absolute left-6 top-6 font-display text-sm text-cream-50/60">{String(index + 1).padStart(2, "0")}</span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="eyebrow text-gold-400">{d.region}</p>
        <h3 className="mt-2 font-display text-3xl font-light text-cream-50 md:text-4xl">{d.name}</h3>
        <p className="mt-2 line-clamp-2 max-w-sm text-sm text-cream-50/75">{d.tagline}</p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-sage-300">
            <span>{d.duration}</span>
            {d.priceFrom != null && (
              <>
                <span className="h-px w-6 bg-sage-300/40" />
                <span>From ${d.priceFrom.toLocaleString()}</span>
              </>
            )}
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition duration-500 group-hover:bg-gold-400 group-hover:border-gold-400 group-hover:text-forest-950">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export type StoryCardData = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  readMinutes: number;
  publishedAt: Date;
};

export function StoryCard({ s }: { s: StoryCardData }) {
  return (
    <Link href={`/journal/${s.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-sage-200">
        <Image
          src={s.coverImage}
          alt={s.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
      </div>
      <p className="mt-6 text-[0.7rem] uppercase tracking-[0.22em] text-moss-500">
        {s.publishedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {s.readMinutes} min read
      </p>
      <h3 className="mt-3 font-display text-2xl font-light leading-snug text-forest-900 transition group-hover:text-forest-600 md:text-3xl">
        {s.title}
      </h3>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-forest-700/80">{s.excerpt}</p>
    </Link>
  );
}

export type CategoryCardData = { slug: string; name: string; tagline: string; image: string; count?: number };

export function CategoryCard({ c }: { c: CategoryCardData }) {
  return (
    <Link href={`/collections/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-forest-900 sm:aspect-[4/5]">
      <Image
        src={c.image}
        alt={c.name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-forest-950/35 transition duration-700 group-hover:bg-forest-950/50" />
      <div className="absolute inset-0 flex flex-col justify-between p-7">
        <span className="eyebrow text-cream-50/70">{c.count != null ? `${c.count} ${c.count === 1 ? "journey" : "journeys"}` : ""}</span>
        <div>
          <h3 className="font-display text-3xl font-light text-cream-50 md:text-4xl">{c.name}</h3>
          <p className="mt-2 max-w-xs text-sm text-cream-50/75 opacity-0 transition duration-700 group-hover:opacity-100">{c.tagline}</p>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Bands ---------- */

export function CtaBand({ title, body, href, label, image }: { title: string; body: string; href: string; label: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-800">
      {image && (
        <>
          <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 to-forest-900/50" />
        </>
      )}
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-10 px-6 py-28 md:flex-row md:items-end md:justify-between lg:px-12">
        <div className="max-w-2xl">
          <SplitWords as="h2" text={title} className="font-display text-4xl font-light leading-tight text-cream-50 md:text-6xl" />
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-lg text-sage-300 md:text-lg">{body}</p>
          </Reveal>
        </div>
        <Reveal delay={0.4}>
          <Link
            href={href}
            className="group inline-flex items-center gap-4 rounded-full bg-gold-400 py-4 pl-8 pr-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-forest-950 transition duration-300 hover:bg-cream-50"
          >
            {label}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950 text-cream-50 transition duration-500 group-hover:rotate-[-45deg]">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export { ScrollCue };
