import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/motion/carousel";
import { Counter, KenBurns, Marquee, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { TestimonialSlider } from "@/components/motion/testimonial-slider";
import { CategoryCard, CtaBand, DestinationCard, ScrollCue, SectionHeading, StoryCard } from "@/components/site/cards";
import {
  getFeaturedDestinations,
  getPublishedCategories,
  getPublishedStories,
  getSettings,
  getStats,
  getTestimonials,
} from "@/lib/content";

export default async function HomePage() {
  const [s, featured, categories, stories, testimonials, stats] = await Promise.all([
    getSettings(),
    getFeaturedDestinations(6),
    getPublishedCategories(),
    getPublishedStories(3),
    getTestimonials(),
    getStats(),
  ]);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-forest-950">
        <KenBurns>
          <Image src={s.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        </KenBurns>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-forest-950/30" />
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 pb-16 pt-44 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div className="max-w-4xl">
            <Reveal delay={0.2}>
              <p className="eyebrow rule text-gold-400">{s.tagline}</p>
            </Reveal>
            <h1 className="mt-6 font-display text-6xl font-light leading-[0.98] text-cream-50 sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              {s.heroTitle.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                  <span className="inline-block animate-fade-in" style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
                    {w}
                  </span>
                  {" "}
                </span>
              ))}
            </h1>
            <Reveal delay={0.9}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-sage-200 md:text-lg">{s.heroSubtitle}</p>
            </Reveal>
            <Reveal delay={1.05}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/destinations"
                  className="group inline-flex items-center gap-4 rounded-full bg-gold-400 py-4 pl-8 pr-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-forest-950 transition duration-300 hover:bg-cream-50"
                >
                  Explore journeys
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-950 text-cream-50 transition duration-500 group-hover:rotate-[-45deg]">→</span>
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-cream-50/40 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream-50 transition duration-300 hover:border-cream-50 hover:bg-cream-50/10"
                >
                  Our philosophy
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={1.3} className="hidden lg:block">
            <ScrollCue />
          </Reveal>
        </div>
      </section>

      {/* ---------- Marquee ---------- */}
      <div className="border-y border-white/10 bg-forest-950 py-8">
        <Marquee items={["Old forests", "High mountains", "Quiet coastlines", "Ten travellers, never more", "Guided by locals", "Leave only footprints"]} />
      </div>

      {/* ---------- Intro statement ---------- */}
      {s.introStatement && (
        <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <p className="eyebrow rule text-moss-500">A different pace</p>
            </Reveal>
            <Stagger as="div" stagger={0.02}>
              <p className="font-display text-3xl font-light leading-[1.3] text-forest-900 md:text-5xl md:leading-[1.25]">
                {s.introStatement.split(" ").map((w, i) => (
                  <StaggerItem key={i} as="div" className="inline-block">
                    {w}&nbsp;
                  </StaggerItem>
                ))}
              </p>
            </Stagger>
          </div>
        </section>
      )}

      {/* ---------- Featured journeys (carousel) ---------- */}
      <section className="overflow-hidden bg-cream-100 py-28 text-forest-900 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Featured journeys"
              title="Places that change the way you breathe"
              intro="A handful of expeditions we return to again and again, each one shaped by the land and the people who care for it."
            />
            <Reveal delay={0.3}>
              <Link href="/destinations" className="link-draw eyebrow shrink-0 pb-1 text-forest-700">
                All destinations →
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="mt-16">
            <Carousel label="Featured journeys">
              {featured.map((d, i) => (
                <div key={d.id} className="w-[82vw] shrink-0 sm:w-[420px]">
                  <DestinationCard d={d} index={i} />
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ---------- Philosophy: sticky image + scrolling copy ---------- */}
      <section className="bg-forest-900 text-cream-50">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-28 lg:grid-cols-2 lg:gap-24 lg:px-12 lg:py-40">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Parallax speed={0.12} className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
              <Image src={s.aboutImage} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </Parallax>
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading eyebrow="Why Verdant" title={s.aboutTitle} tone="light" />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-sage-300">{s.aboutBody.split(/\n\s*\n/)[0]}</p>
            </Reveal>
            <Stagger className="mt-14 space-y-10" stagger={0.15}>
              {[
                { n: "01", t: "Small groups, slow pace", b: "Never more than ten travellers. Days built around light, weather and the rhythm of the place — not a checklist." },
                { n: "02", t: "Guided by locals", b: "Naturalists, trackers and hosts who grew up in these landscapes and know them by season and by scent." },
                { n: "03", t: "Regenerative by design", b: "A share of every journey funds the conservation partners protecting the ground you walk on." },
              ].map((v) => (
                <StaggerItem key={v.n} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 pt-8">
                  <span className="font-display text-xl text-gold-400">{v.n}</span>
                  <div>
                    <h3 className="font-display text-3xl font-light">{v.t}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-sage-300">{v.b}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-12">
              <Link href="/about" className="link-draw eyebrow pb-1 text-gold-400">
                Read our story →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      {stats.length > 0 && (
        <section className="border-b border-forest-900/10 bg-cream-50">
          <Stagger as="div" className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-12 px-6 py-20 md:grid-cols-4 lg:px-12" stagger={0.12}>
            {stats.map((st) => (
              <StaggerItem key={st.id} className="text-center md:text-left">
                <p className="font-display text-6xl font-light text-forest-900 md:text-7xl">
                  <Counter value={st.value} suffix={st.suffix} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-moss-500">{st.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* ---------- Collections ---------- */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Collections" title="Choose your kind of wild" />
            <Reveal delay={0.3}>
              <Link href="/collections" className="link-draw eyebrow shrink-0 pb-1 text-forest-700">
                All collections →
              </Link>
            </Reveal>
          </div>
          <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {categories.map((c) => (
              <StaggerItem key={c.id}>
                <CategoryCard c={{ ...c, count: c._count.destinations }} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* ---------- Testimonials ---------- */}
      {testimonials.length > 0 && (
        <section className="relative overflow-hidden bg-forest-950 py-32 lg:py-44">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(77,124,91,0.25),transparent_60%)]" />
          <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
            <Reveal>
              <p className="eyebrow text-center text-gold-400">From our travellers</p>
            </Reveal>
            <div className="mt-16">
              <TestimonialSlider quotes={testimonials} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- Journal ---------- */}
      {stories.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Field journal" title="Notes from the trail" />
            <Reveal delay={0.3}>
              <Link href="/journal" className="link-draw eyebrow shrink-0 pb-1 text-forest-700">
                Read the journal →
              </Link>
            </Reveal>
          </div>
          <Stagger className="mt-16 grid gap-10 md:grid-cols-3" stagger={0.12}>
            {stories.map((st) => (
              <StaggerItem key={st.id}>
                <StoryCard s={st} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <CtaBand
        title="Ready to go quietly?"
        body="Tell us where your mind wanders and we will shape a journey around it."
        href="/contact"
        label="Start planning"
        image={featured[0]?.heroImage}
      />
    </>
  );
}
