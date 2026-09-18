import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { CtaBand, PageHero } from "@/components/site/cards";
import { getGuides, getSettings } from "@/lib/content";

export const metadata = { title: "Guides" };

export default async function GuidesPage() {
  const [guides, s] = await Promise.all([getGuides(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="The people"
        title="Guided by those who belong there"
        intro="Naturalists, trackers, fishers and foresters. Every one of them grew up in, or gave their life to, the place they will walk you through."
        image={guides[0]?.image ?? s.aboutImage}
      />

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        {guides.length === 0 ? (
          <p className="text-forest-700/70">No guides published yet.</p>
        ) : (
          <Stagger className="grid gap-x-8 gap-y-20 md:grid-cols-2" stagger={0.1}>
            {guides.map((g, i) => (
              <StaggerItem key={g.id} className={`grid gap-8 sm:grid-cols-[minmax(0,240px)_1fr] ${i % 2 === 1 ? "md:mt-24" : ""}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-sage-200">
                  <Image src={g.image} alt={g.name} fill sizes="(min-width: 640px) 240px, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="eyebrow rule text-moss-500">{g.location}</p>
                  <h2 className="mt-4 font-display text-4xl font-light text-forest-900">{g.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-forest-700/70">{g.role}</p>
                  <p className="mt-6 leading-relaxed text-forest-800">{g.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-28 rounded-[1.25rem] bg-cream-100 p-10 md:p-16">
          <p className="eyebrow rule text-moss-500">Guide with us</p>
          <p className="mt-5 max-w-2xl font-display text-3xl font-light leading-snug text-forest-900 md:text-4xl">
            We work with people who know a place the way you know a childhood home. If that is you, write to us.
          </p>
          <a href={`mailto:${s.email}`} className="link-draw eyebrow mt-8 inline-block pb-1 text-forest-700">
            {s.email} →
          </a>
        </Reveal>
      </section>

      <CtaBand title="Walk with them" body="Every journey is led by one of the people above." href="/destinations" label="See the journeys" image={s.heroImage} />
    </>
  );
}
