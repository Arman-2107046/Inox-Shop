import Image from "next/image";
import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${light ? "text-gold-400" : "text-moss-500"}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-4xl font-medium leading-tight md:text-5xl ${
          light ? "text-cream-50" : "text-forest-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-sage-300" : "text-forest-700/80"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export type DestinationCardData = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  heroImage: string;
  duration: string;
  priceFrom: number | null;
};

export function DestinationCard({ d, large = false }: { d: DestinationCardData; large?: boolean }) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-forest-900 ${large ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/5]"}`}
    >
      <Image
        src={d.heroImage}
        alt={d.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="eyebrow text-gold-400">{d.region}</p>
        <h3 className="mt-2 font-display text-3xl font-medium text-cream-50">{d.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-cream-50/80">{d.tagline}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-sage-300">
          <span>{d.duration}</span>
          {d.priceFrom != null && (
            <>
              <span className="h-px w-6 bg-sage-300/40" />
              <span>From ${d.priceFrom.toLocaleString()}</span>
            </>
          )}
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
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-sage-200">
        <Image
          src={s.coverImage}
          alt={s.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <p className="mt-5 text-xs uppercase tracking-[0.2em] text-moss-500">
        {s.publishedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {s.readMinutes} min read
      </p>
      <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-forest-900 group-hover:text-forest-600">
        {s.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-forest-700/80">{s.excerpt}</p>
    </Link>
  );
}

export function CtaBand({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return (
    <section className="bg-forest-800">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl font-medium text-cream-50 md:text-5xl">{title}</h2>
          <p className="mt-4 text-sage-300">{body}</p>
        </div>
        <Link
          href={href}
          className="rounded-full bg-gold-400 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-forest-950 transition hover:bg-gold-500"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
