import { notFound } from "next/navigation";
import { Reveal, SplitWords } from "@/components/motion/primitives";
import { getPageBySlug } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const page = await getPageBySlug((await params).slug);
  return page ? { title: page.title } : {};
}

/** Generic CMS page (privacy, terms, etc.) managed under /admin/pages. */
export default async function CmsPage({ params }: Params) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <section className="bg-forest-950 pb-16 pt-44 text-cream-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <SplitWords as="h1" text={page.title} className="font-display text-5xl font-light md:text-7xl" />
          <Reveal delay={0.3}>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-sage-300">
              Last updated {page.updatedAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </Reveal>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-6 py-20 lg:px-12">
        <Reveal>
          <div className="prose-story text-lg text-forest-800">
            {page.body.split(/\n\s*\n/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </article>
    </>
  );
}
