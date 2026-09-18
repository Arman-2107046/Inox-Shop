import Image from "next/image";
import Link from "next/link";
import { CtaBand, DestinationCard, SectionHeading, StoryCard } from "@/components/site/cards";
import { getFeaturedDestinations, getPublishedStories, getSettings, getTestimonials } from "@/lib/content";

const values = [
  {
    title: "Small groups, slow pace",
    body: "Never more than ten travellers. Days built around light, weather and the rhythm of the place — not a checklist.",
  },
  {
    title: "Guided by locals",
    body: "Naturalists, trackers and hosts who grew up in these landscapes and know them by season and by scent.",
  },
  {
    title: "Regenerative by design",
    body: "A share of every journey funds the conservation partners protecting the ground you walk on.",
  },
];

export default async function HomePage() {
  const [s, featured, stories, testimonials] = await Promise.all([
    getSettings(),
    getFeaturedDestinations(3),
    getPublishedStories(3),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-forest-950">
        <Image src={s.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
          <p className="eyebrow text-gold-400">{s.tagline}</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-cream-50 sm:text-6xl md:text-7xl">
            {s.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sage-200 md:text-lg">{s.heroSubtitle}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/destinations"
              className="rounded-full bg-gold-400 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-forest-950 transition hover:bg-gold-500"
            >
              Explore destinations
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-cream-50/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 transition hover:border-cream-50"
            >
              Our philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* Featured destinations */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured journeys"
            title="Places that change the way you breathe"
            intro="A handful of expeditions we return to again and again, each one shaped by the land and the people who care for it."
          />
          <Link href="/destinations" className="eyebrow shrink-0 text-forest-700 underline-offset-8 hover:underline">
            All destinations →
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((d) => (
            <DestinationCard key={d.id} d={d} />
          ))}
          {featured.length === 0 && (
            <p className="text-forest-700/70">No featured destinations yet — mark some as featured in the CMS.</p>
          )}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-forest-900 text-cream-50">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div>
            <SectionHeading eyebrow="Why Verdant" title={s.aboutTitle} tone="light" />
            <p className="mt-8 max-w-lg leading-relaxed text-sage-300">{s.aboutBody}</p>
            <div className="mt-12 space-y-8">
              {values.map((v) => (
                <div key={v.title} className="border-l border-gold-400/60 pl-6">
                  <h3 className="font-display text-2xl text-cream-50">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sage-300">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl lg:min-h-full">
            <Image src={s.aboutImage} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-sage-100">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <SectionHeading eyebrow="From our travellers" title="Words carried home" align="center" />
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t) => (
                <figure key={t.id} className="rounded-2xl bg-cream-50 p-8">
                  <blockquote className="font-display text-2xl italic leading-snug text-forest-900">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <p className="font-medium text-forest-900">{t.name}</p>
                    <p className="text-forest-700/70">{t.detail}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Journal */}
      {stories.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Field journal" title="Notes from the trail" />
            <Link href="/journal" className="eyebrow shrink-0 text-forest-700 underline-offset-8 hover:underline">
              Read the journal →
            </Link>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {stories.map((st) => (
              <StoryCard key={st.id} s={st} />
            ))}
          </div>
        </section>
      )}

      <CtaBand
        title="Ready to go quietly?"
        body="Tell us where your mind wanders and we will shape a journey around it."
        href="/contact"
        label="Start planning"
      />
    </>
  );
}
