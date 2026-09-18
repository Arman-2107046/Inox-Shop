import Image from "next/image";
import Link from "next/link";
import { Counter, Parallax, Reveal, SplitWords, Stagger, StaggerItem } from "@/components/motion/primitives";
import { CtaBand, PageHero, SectionHeading } from "@/components/site/cards";
import { getPublishedStories, getSettings, getStats } from "@/lib/content";

export const metadata = { title: "Impact" };

const commitments = [
  { title: "5% of every journey", body: "Goes directly to the conservation partner on the ground where you travel — trail crews, rangers, rewilding projects." },
  { title: "Ten travellers, never more", body: "Small enough to stay in family-run places, to walk single file, to leave no trace of having been there." },
  { title: "Local first, always", body: "Guides, drivers, cooks, lodges. If it can be sourced from the community, it is." },
  { title: "Published, not promised", body: "Every year we release what we gave, where it went, and where we fell short." },
];

const FALLBACK_BODY =
  "We believe travel can be a net good for the landscapes it depends on — but only if that is designed in from the start, not bolted on afterwards.";

export default async function ImpactPage() {
  const [s, stats, stories] = await Promise.all([getSettings(), getStats(), getPublishedStories(10)]);
  const report = stories.find((st) => st.slug.includes("give-back")) ?? stories[0];
  const image = s.impactImage || s.aboutImage;

  return (
    <>
      <PageHero eyebrow="Impact" title={s.impactTitle || "Travel that leaves the ground better"} image={image} height="min-h-[80vh]" />

      <section className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <SectionHeading eyebrow="Why it matters" title="Wild places do not need visitors. They need allies." />
          <Reveal delay={0.2}>
            <div className="prose-story text-lg text-forest-800">
              {(s.impactBody || FALLBACK_BODY).split(/\n\s*\n/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="bg-forest-950 text-cream-50">
          <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12">
            <Reveal>
              <p className="eyebrow rule text-gold-400">By the numbers</p>
            </Reveal>
            <Stagger className="mt-14 grid grid-cols-2 gap-y-14 md:grid-cols-4" stagger={0.12}>
              {stats.map((st) => (
                <StaggerItem key={st.id}>
                  <p className="font-display text-6xl font-light md:text-7xl">
                    <Counter value={st.value} suffix={st.suffix} />
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sage-300">{st.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-[1440px] gap-16 px-6 py-28 lg:grid-cols-2 lg:gap-24 lg:px-12 lg:py-36">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Parallax speed={0.1} className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Parallax>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow rule text-moss-500">Our commitments</p>
          </Reveal>
          <SplitWords as="h2" text="Four things we will always do" className="mt-5 font-display text-4xl font-light leading-tight text-forest-900 md:text-6xl" />
          <Stagger className="mt-14 divide-y divide-forest-900/10" stagger={0.12}>
            {commitments.map((c, i) => (
              <StaggerItem key={c.title} className="grid grid-cols-[3rem_1fr] gap-4 py-8">
                <span className="font-display text-xl text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-3xl font-light text-forest-900">{c.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-forest-700/85">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          {report && (
            <Reveal className="mt-12">
              <Link href={`/journal/${report.slug}`} className="link-draw eyebrow pb-1 text-forest-700">
                Read the latest honesty report →
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand title="Travel as an ally" body="Choose a journey and a share of it goes straight back into the ground." href="/destinations" label="Choose a journey" image={s.heroImage} />
    </>
  );
}
