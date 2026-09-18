import Image from "next/image";
import Link from "next/link";
import { Counter, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { CtaBand, PageHero, SectionHeading } from "@/components/site/cards";
import { getGuides, getSettings, getStats } from "@/lib/content";

export const metadata = { title: "About" };

const principles = [
  { n: "01", title: "Go slow", body: "Fewer places, more time. We would rather you know one valley deeply than photograph ten." },
  { n: "02", title: "Follow local knowledge", body: "Our guides are naturalists, herders, fishers and foresters. They set the pace and the path." },
  { n: "03", title: "Leave it better", body: "Every journey funds trail restoration, rewilding or ranger programmes where we travel." },
  { n: "04", title: "Stay honest", body: "No greenwash. We publish what we give back and what we still get wrong." },
];

const timeline = [
  { year: "2016", text: "Two friends, a borrowed tent, a valley with no name on the map." },
  { year: "2018", text: "First guided departure: eight travellers to Torres del Paine." },
  { year: "2021", text: "Conservation contribution written into every booking." },
  { year: "2024", text: "Partnership with the Kitasoo Xai'xais Nation in the Great Bear Rainforest." },
  { year: "Today", text: "Small groups, local guides, and a growing list of places we'd rather keep quiet about." },
];

export default async function AboutPage() {
  const [s, guides, stats] = await Promise.all([getSettings(), getGuides(), getStats()]);
  const paragraphs = s.aboutBody.split(/\n\s*\n/);

  return (
    <>
      <PageHero eyebrow={`About ${s.siteName}`} title={s.aboutTitle} image={s.aboutImage} height="min-h-[80vh]" />

      {/* Story */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <SectionHeading eyebrow="Our story" title="Born on a footpath, not in a boardroom" />
          <Reveal delay={0.2}>
            <div className="prose-story text-lg text-forest-800">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-forest-900/10 bg-cream-100">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12">
          <Reveal>
            <p className="eyebrow rule text-moss-500">The road so far</p>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-10 md:grid-cols-5" stagger={0.12}>
            {timeline.map((t) => (
              <StaggerItem key={t.year} as="li" className="border-t border-forest-900/20 pt-6">
                <p className="font-display text-4xl font-light text-forest-900">{t.year}</p>
                <p className="mt-3 text-sm leading-relaxed text-forest-700/80">{t.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-forest-900 text-cream-50">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
          <SectionHeading eyebrow="How we travel" title="Four quiet principles" tone="light" />
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/10 md:grid-cols-2" stagger={0.1}>
            {principles.map((p) => (
              <StaggerItem key={p.n} className="group bg-forest-900 p-10 transition duration-500 hover:bg-forest-800 lg:p-14">
                <p className="font-display text-5xl font-light text-gold-400">{p.n}</p>
                <h3 className="mt-6 font-display text-3xl font-light md:text-4xl">{p.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-sage-300">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-12 px-6 py-24 md:grid-cols-4 lg:px-12">
          {stats.map((st, i) => (
            <Reveal key={st.id} delay={i * 0.1} className="text-center md:text-left">
              <p className="font-display text-6xl font-light text-forest-900">
                <Counter value={st.value} suffix={st.suffix} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-moss-500">{st.label}</p>
            </Reveal>
          ))}
        </section>
      )}

      {/* Guides preview */}
      {guides.length > 0 && (
        <section className="bg-cream-100">
          <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow="The people" title="Guided by those who belong there" />
              <Reveal delay={0.3}>
                <Link href="/guides" className="link-draw eyebrow shrink-0 pb-1 text-forest-700">
                  Meet all guides →
                </Link>
              </Reveal>
            </div>
            <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
              {guides.slice(0, 4).map((g) => (
                <StaggerItem key={g.id}>
                  <Parallax speed={0.06} className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-sage-200">
                    <div className="relative h-[112%] w-full -translate-y-[6%]">
                      <Image src={g.image} alt={g.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                    </div>
                  </Parallax>
                  <p className="mt-5 font-display text-2xl text-forest-900">{g.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-moss-500">{g.role} · {g.location}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CtaBand title="Come walk with us" body="Every journey starts with a conversation about what you hope to feel, not just see." href="/contact" label="Get in touch" image={s.heroImage} />
    </>
  );
}
