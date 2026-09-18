import Image from "next/image";
import { CtaBand, SectionHeading } from "@/components/site/cards";
import { getSettings, getTestimonials } from "@/lib/content";

export const metadata = { title: "About" };

const principles = [
  { n: "01", title: "Go slow", body: "Fewer places, more time. We would rather you know one valley deeply than photograph ten." },
  { n: "02", title: "Follow local knowledge", body: "Our guides are naturalists, herders, fishers and foresters. They set the pace and the path." },
  { n: "03", title: "Leave it better", body: "Every journey funds trail restoration, rewilding or ranger programmes where we travel." },
  { n: "04", title: "Stay honest", body: "No greenwash. We publish what we give back and what we still get wrong." },
];

export default async function AboutPage() {
  const [s, testimonials] = await Promise.all([getSettings(), getTestimonials()]);

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end bg-forest-950">
        <Image src={s.aboutImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10">
          <p className="eyebrow text-gold-400">About {s.siteName}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-tight text-cream-50 md:text-7xl">
            {s.aboutTitle}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Our story" title="Born on a footpath, not in a boardroom" />
          <div className="prose-story text-lg text-forest-800">
            {s.aboutBody.split(/\n\s*\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 text-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="How we travel" title="Four quiet principles" tone="light" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.n} className="bg-forest-900 p-10">
                <p className="font-display text-4xl text-gold-400">{p.n}</p>
                <h3 className="mt-4 font-display text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-sage-300">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Travellers" title="In their words" align="center" />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.id} className="rounded-2xl border border-cream-200 bg-cream-100 p-8">
                <blockquote className="font-display text-2xl italic leading-snug text-forest-900">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <p className="font-medium text-forest-900">{t.name}</p>
                  <p className="text-forest-700/70">{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <CtaBand
        title="Come walk with us"
        body="Every journey starts with a conversation about what you hope to feel, not just see."
        href="/contact"
        label="Get in touch"
      />
    </>
  );
}
