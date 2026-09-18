import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { CtaBand, DestinationCard, PageHero } from "@/components/site/cards";
import { getCategoryBySlug, getPublishedCategories } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const c = await getCategoryBySlug((await params).slug);
  return c ? { title: c.name, description: c.tagline } : {};
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const c = await getCategoryBySlug(slug);
  if (!c) notFound();
  const others = (await getPublishedCategories()).filter((x) => x.id !== c.id);

  return (
    <>
      <PageHero eyebrow="Collection" title={c.name} intro={c.tagline} image={c.image} />

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="eyebrow rule text-moss-500">About this collection</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="prose-story text-lg text-forest-800">
              {c.description.split(/\n\s*\n/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {c.destinations.map((d, i) => (
            <StaggerItem key={d.id}>
              <DestinationCard d={d} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
        {c.destinations.length === 0 && <p className="mt-16 text-forest-700/70">No journeys in this collection yet.</p>}

        {others.length > 0 && (
          <Reveal className="mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-forest-900/10 pt-10">
            <span className="eyebrow text-moss-500">Other collections</span>
            {others.map((o) => (
              <Link key={o.id} href={`/collections/${o.slug}`} className="link-draw font-display text-2xl font-light text-forest-900">
                {o.name}
              </Link>
            ))}
          </Reveal>
        )}
      </section>

      <CtaBand title="Shape it around you" body="Every journey can be adapted — dates, pace, private departures." href="/contact" label="Start a conversation" image={c.image} />
    </>
  );
}
