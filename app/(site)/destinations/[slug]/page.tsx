import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/motion/accordion";
import { KenBurns, Parallax, Reveal, SplitWords, Stagger, StaggerItem } from "@/components/motion/primitives";
import { DestinationCard } from "@/components/site/cards";
import { getDestinationDetail, getFaqs, getPublishedDestinations, parseItinerary } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const d = await getDestinationDetail((await params).slug);
  return d ? { title: d.name, description: d.tagline, openGraph: { images: [d.heroImage] } } : {};
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  const d = await getDestinationDetail(slug);
  if (!d) notFound();

  const [all, faqs] = await Promise.all([getPublishedDestinations(), getFaqs()]);
  const others = all.filter((x) => x.id !== d.id).slice(0, 3);
  const itinerary = parseItinerary(d.itinerary);
  const paragraphs = d.description.split(/\n\s*\n/);

  const facts = [
    { label: "Duration", value: d.duration },
    { label: "Difficulty", value: d.difficulty },
    { label: "Best season", value: d.bestSeason },
    { label: "Group size", value: d.groupSize },
    { label: "From", value: d.priceFrom != null ? `$${d.priceFrom.toLocaleString()} pp` : "On request" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-forest-950">
        <KenBurns>
          <Image src={d.heroImage} alt={d.name} fill priority sizes="100vw" className="object-cover" />
        </KenBurns>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-forest-950/20" />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-44 lg:px-12">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow rule text-gold-400">{d.region}</p>
              {d.categories.map((c) => (
                <Link key={c.slug} href={`/collections/${c.slug}`} className="rounded-full border border-cream-50/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream-50/80 hover:border-cream-50">
                  {c.name}
                </Link>
              ))}
            </div>
          </Reveal>
          <SplitWords as="h1" text={d.name} delay={0.1} className="mt-5 font-display text-6xl font-light leading-[0.98] text-cream-50 md:text-8xl lg:text-[7.5rem]" />
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-xl text-lg text-sage-200">{d.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* Facts bar */}
      <section className="border-b border-forest-900/10 bg-cream-100">
        <Stagger as="div" className="mx-auto grid max-w-[1440px] grid-cols-2 px-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-forest-900/10 lg:px-12" stagger={0.08}>
          {facts.map((f) => (
            <StaggerItem key={f.label} className="py-8 lg:px-8 lg:first:pl-0">
              <p className="eyebrow text-moss-500">{f.label}</p>
              <p className="mt-2 font-display text-2xl text-forest-900 md:text-3xl">{f.value}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-[1440px] gap-16 px-6 py-28 lg:grid-cols-[1.4fr_1fr] lg:gap-24 lg:px-12 lg:py-36">
        <div>
          <Reveal>
            <p className="eyebrow rule text-moss-500">The journey</p>
          </Reveal>
          <SplitWords as="h2" text={paragraphs[0].split(". ")[0] + "."} className="mt-6 font-display text-3xl font-light leading-[1.2] text-forest-900 md:text-5xl" />
          <Reveal delay={0.2}>
            <div className="prose-story mt-10 text-lg text-forest-800">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <aside className="h-fit rounded-[1.25rem] bg-forest-900 p-8 text-cream-50 lg:sticky lg:top-28 lg:p-10">
            <p className="eyebrow text-gold-400">Highlights</p>
            <ul className="mt-6 space-y-4">
              {d.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-sage-200">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  {h}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?destination=${d.slug}`}
              className="group mt-10 flex items-center justify-between rounded-full bg-gold-400 py-4 pl-7 pr-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-forest-950 transition duration-300 hover:bg-cream-50"
            >
              Enquire about this journey
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950 text-cream-50 transition duration-500 group-hover:rotate-[-45deg]">→</span>
            </Link>
            <p className="mt-4 text-center text-xs text-sage-300/70">No deposit until we&rsquo;ve spoken.</p>
          </aside>
        </Reveal>
      </section>

      {/* Gallery */}
      {d.gallery.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 pb-28 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3">
            {d.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
                <Parallax speed={0.08} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sage-200">
                  <div className="relative h-[115%] w-full -translate-y-[7%]">
                    <Image src={src} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
                  </div>
                </Parallax>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Itinerary */}
      {itinerary.length > 0 && (
        <section className="bg-forest-950 text-cream-50">
          <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <p className="eyebrow rule text-gold-400">Day by day</p>
                </Reveal>
                <SplitWords as="h2" text="How the days unfold" className="mt-5 font-display text-4xl font-light leading-tight md:text-6xl" />
                <Reveal delay={0.3}>
                  <p className="mt-6 max-w-sm text-sage-300">
                    A guide, not a timetable. Weather, wildlife and whim all get a vote.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <Accordion
                  tone="dark"
                  items={itinerary.map((day, i) => ({ id: `day-${i}`, meta: `Day ${String(i + 1).padStart(2, "0")}`, title: day.title, body: day.body }))}
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Inclusions */}
      {(d.inclusions.length > 0 || d.exclusions.length > 0) && (
        <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-28 lg:grid-cols-2 lg:gap-24 lg:px-12">
          <Reveal>
            <p className="eyebrow rule text-moss-500">What&rsquo;s included</p>
            <ul className="mt-8 divide-y divide-forest-900/10">
              {d.inclusions.map((x) => (
                <li key={x} className="flex gap-4 py-4 text-forest-800">
                  <span className="text-moss-500">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow rule text-moss-500">Not included</p>
            <ul className="mt-8 divide-y divide-forest-900/10">
              {d.exclusions.map((x) => (
                <li key={x} className="flex gap-4 py-4 text-forest-700/70">
                  <span>—</span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="border-t border-forest-900/10 bg-cream-100">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-28 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:px-12">
            <div>
              <Reveal>
                <p className="eyebrow rule text-moss-500">Good to know</p>
              </Reveal>
              <SplitWords as="h2" text="Questions, answered" className="mt-5 font-display text-4xl font-light text-forest-900 md:text-5xl" />
              <Reveal delay={0.3}>
                <Link href="/faq" className="link-draw eyebrow mt-6 inline-block pb-1 text-forest-700">
                  All questions →
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Accordion defaultOpen={null} items={faqs.slice(0, 4).map((f) => ({ id: f.id, title: f.question, body: f.answer }))} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Related */}
      {others.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
          <Reveal>
            <p className="eyebrow rule text-moss-500">Keep exploring</p>
          </Reveal>
          <SplitWords as="h2" text="Other journeys" className="mt-5 font-display text-4xl font-light text-forest-900 md:text-6xl" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {others.map((o, i) => (
              <StaggerItem key={o.id}>
                <DestinationCard d={o} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </>
  );
}
