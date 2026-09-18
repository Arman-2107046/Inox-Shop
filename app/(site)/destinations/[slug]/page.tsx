import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DestinationCard } from "@/components/site/cards";
import { getDestinationBySlug, getPublishedDestinations } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const d = await getDestinationBySlug((await params).slug);
  return d ? { title: d.name, description: d.tagline } : {};
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) notFound();

  const others = (await getPublishedDestinations()).filter((x) => x.id !== d.id).slice(0, 3);
  const facts = [
    { label: "Duration", value: d.duration },
    { label: "Difficulty", value: d.difficulty },
    { label: "Best season", value: d.bestSeason },
    { label: "From", value: d.priceFrom != null ? `$${d.priceFrom.toLocaleString()} pp` : "On request" },
  ];

  return (
    <>
      <section className="relative flex min-h-[80vh] items-end bg-forest-950">
        <Image src={d.heroImage} alt={d.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10">
          <p className="eyebrow text-gold-400">{d.region}</p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-tight text-cream-50 md:text-7xl">{d.name}</h1>
          <p className="mt-5 max-w-xl text-lg text-sage-200">{d.tagline}</p>
        </div>
      </section>

      <section className="border-b border-cream-200 bg-cream-100">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-cream-200 px-6 md:grid-cols-4 md:divide-x lg:px-10">
          {facts.map((f) => (
            <div key={f.label} className="py-8 md:px-8 md:first:pl-0">
              <dt className="eyebrow text-moss-500">{f.label}</dt>
              <dd className="mt-2 font-display text-2xl text-forest-900">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <p className="eyebrow text-moss-500">The journey</p>
          <div className="prose-story mt-6 text-lg text-forest-800">
            {d.description.split(/\n\s*\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-2xl bg-forest-900 p-8 text-cream-50 lg:sticky lg:top-28">
          <p className="eyebrow text-gold-400">Highlights</p>
          <ul className="mt-6 space-y-4">
            {d.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-sage-200">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                {h}
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?destination=${d.slug}`}
            className="mt-10 block rounded-full bg-gold-400 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-forest-950 transition hover:bg-gold-500"
          >
            Enquire about this journey
          </Link>
        </aside>
      </section>

      {d.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {d.gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-2xl bg-sage-200 ${i === 0 ? "aspect-[4/3] md:col-span-2" : "aspect-[4/3]"}`}
              >
                <Image src={src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="bg-sage-100">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <p className="eyebrow text-moss-500">Keep exploring</p>
            <h2 className="mt-4 font-display text-4xl text-forest-900">Other journeys</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {others.map((o) => (
                <DestinationCard key={o.id} d={o} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
