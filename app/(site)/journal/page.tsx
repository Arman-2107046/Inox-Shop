import Image from "next/image";
import Link from "next/link";
import { SectionHeading, StoryCard } from "@/components/site/cards";
import { getPublishedStories } from "@/lib/content";

export const metadata = { title: "Journal" };

export default async function JournalPage() {
  const stories = await getPublishedStories();
  const [lead, ...rest] = stories;

  return (
    <>
      <section className="bg-forest-950 pb-20 pt-40 text-cream-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Field journal"
            title="Notes from the trail"
            intro="Stories, field notes and slow observations from our guides and travellers."
            tone="light"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {!lead ? (
          <p className="text-forest-700/70">No stories published yet.</p>
        ) : (
          <>
            <Link href={`/journal/${lead.slug}`} className="group grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage-200">
                <Image
                  src={lead.coverImage}
                  alt={lead.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="eyebrow text-moss-500">Latest</p>
                <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-forest-900 group-hover:text-forest-600 md:text-5xl">
                  {lead.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-forest-700/80">{lead.excerpt}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-moss-500">
                  {lead.author} · {lead.readMinutes} min read
                </p>
              </div>
            </Link>

            {rest.length > 0 && (
              <div className="mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((s) => (
                  <StoryCard key={s.id} s={s} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
