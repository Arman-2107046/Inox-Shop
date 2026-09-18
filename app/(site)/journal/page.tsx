import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { PageHero, StoryCard } from "@/components/site/cards";
import { getPublishedStories, getSettings } from "@/lib/content";

export const metadata = { title: "Journal" };

export default async function JournalPage() {
  const [stories, s] = await Promise.all([getPublishedStories(), getSettings()]);
  const [lead, ...rest] = stories;

  return (
    <>
      <PageHero
        eyebrow="Field journal"
        title="Notes from the trail"
        intro="Stories, field notes and slow observations from our guides and travellers."
        image={lead?.coverImage ?? s.aboutImage}
        height="min-h-[65vh]"
      />

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        {!lead ? (
          <p className="text-forest-700/70">No stories published yet.</p>
        ) : (
          <>
            <Reveal>
              <Link href={`/journal/${lead.slug}`} className="group grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sage-200">
                  <Image
                    src={lead.coverImage}
                    alt={lead.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div>
                  <p className="eyebrow rule text-moss-500">Latest</p>
                  <h2 className="mt-5 font-display text-4xl font-light leading-[1.1] text-forest-900 transition group-hover:text-forest-600 md:text-6xl">
                    {lead.title}
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-forest-700/80">{lead.excerpt}</p>
                  <p className="mt-8 text-[0.7rem] uppercase tracking-[0.22em] text-moss-500">
                    {lead.author} · {lead.readMinutes} min read
                  </p>
                </div>
              </Link>
            </Reveal>

            {rest.length > 0 && (
              <Stagger className="mt-28 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
                {rest.map((st) => (
                  <StaggerItem key={st.id}>
                    <StoryCard s={st} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </>
        )}
      </section>
    </>
  );
}
