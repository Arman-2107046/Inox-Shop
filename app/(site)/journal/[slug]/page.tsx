import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/site/cards";
import { getPublishedStories, getStoryBySlug } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const s = await getStoryBySlug((await params).slug);
  return s ? { title: s.title, description: s.excerpt } : {};
}

export default async function StoryPage({ params }: Params) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const more = (await getPublishedStories(4)).filter((s) => s.id !== story.id).slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end bg-forest-950">
        <Image src={story.coverImage} alt={story.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-20 pt-40 lg:px-10">
          <Link href="/journal" className="eyebrow text-gold-400 hover:underline">
            ← Journal
          </Link>
          <h1 className="mt-6 font-display text-4xl font-medium leading-tight text-cream-50 md:text-6xl">{story.title}</h1>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-sage-300">
            {story.author} ·{" "}
            {story.publishedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} ·{" "}
            {story.readMinutes} min read
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <p className="font-display text-2xl italic leading-relaxed text-forest-700">{story.excerpt}</p>
        <div className="prose-story mt-12 text-lg text-forest-800">
          {story.body.split(/\n\s*\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-sage-100">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <p className="eyebrow text-moss-500">Keep reading</p>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {more.map((s) => (
                <StoryCard key={s.id} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
