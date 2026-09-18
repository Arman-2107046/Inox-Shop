import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KenBurns, Reveal, ScrollProgress, SplitWords, Stagger, StaggerItem } from "@/components/motion/primitives";
import { StoryCard } from "@/components/site/cards";
import { getPublishedStories, getStoryBySlug } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const s = await getStoryBySlug((await params).slug);
  return s ? { title: s.title, description: s.excerpt, openGraph: { images: [s.coverImage] } } : {};
}

export default async function StoryPage({ params }: Params) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const more = (await getPublishedStories(4)).filter((s) => s.id !== story.id).slice(0, 3);
  const date = story.publishedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <>
      <ScrollProgress />
      <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-forest-950">
        <KenBurns>
          <Image src={story.coverImage} alt={story.title} fill priority sizes="100vw" className="object-cover" />
        </KenBurns>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/20" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-20 pt-44 lg:px-12">
          <Reveal>
            <Link href="/journal" className="link-draw eyebrow pb-1 text-gold-400">
              ← Journal
            </Link>
          </Reveal>
          <SplitWords as="h1" text={story.title} delay={0.1} className="mt-6 font-display text-4xl font-light leading-[1.05] text-cream-50 md:text-6xl lg:text-7xl" />
          <Reveal delay={0.5}>
            <p className="mt-7 text-[0.7rem] uppercase tracking-[0.22em] text-sage-300">
              {story.author} · {date} · {story.readMinutes} min read
            </p>
          </Reveal>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-24 lg:px-12">
        <Reveal>
          <p className="font-display text-2xl font-light italic leading-relaxed text-forest-700 md:text-3xl">{story.excerpt}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="prose-story mt-14 text-lg text-forest-800">
            {story.body.split(/\n\s*\n/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal className="mt-16 flex items-center justify-between border-t border-forest-900/10 pt-8">
          <p className="text-sm text-forest-700/70">Written by <span className="text-forest-900">{story.author}</span></p>
          <Link href="/contact" className="link-draw eyebrow pb-1 text-forest-700">
            Plan a journey →
          </Link>
        </Reveal>
      </article>

      {more.length > 0 && (
        <section className="bg-cream-100">
          <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12">
            <Reveal>
              <p className="eyebrow rule text-moss-500">Keep reading</p>
            </Reveal>
            <Stagger className="mt-12 grid gap-10 md:grid-cols-3" stagger={0.12}>
              {more.map((s) => (
                <StaggerItem key={s.id}>
                  <StoryCard s={s} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
