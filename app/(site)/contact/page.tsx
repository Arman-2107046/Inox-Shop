import { Reveal } from "@/components/motion/primitives";
import { PageHero } from "@/components/site/cards";
import { getPublishedDestinations, getSettings } from "@/lib/content";
import { ContactForm } from "./contact-form";

export const metadata = { title: "Contact" };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const [s, destinations, { destination }] = await Promise.all([getSettings(), getPublishedDestinations(), searchParams]);
  const preselectedName = destinations.find((d) => d.slug === destination)?.name;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan something quiet"
        intro={
          preselectedName
            ? `You're asking about ${preselectedName}. Tell us a little about yourself and we'll take it from there.`
            : "Tell us a little about yourself and the kind of wild you're drawn to. We'll take it from there."
        }
        image={s.heroImage}
        height="min-h-[60vh]"
      />

      <section className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-24 lg:px-12 lg:py-28">
        <aside className="space-y-10">
          {[
            { label: "Email", value: s.email, href: `mailto:${s.email}` },
            { label: "Phone", value: s.phone, href: `tel:${s.phone.replace(/\s+/g, "")}` },
            { label: "Studio", value: s.address },
          ].map((row, i) => (
            <Reveal key={row.label} delay={i * 0.1}>
              <p className="eyebrow rule text-moss-500">{row.label}</p>
              {row.href ? (
                <a href={row.href} className="link-draw mt-3 inline-block font-display text-2xl font-light text-forest-900 md:text-3xl">
                  {row.value}
                </a>
              ) : (
                <p className="mt-3 whitespace-pre-line font-display text-2xl font-light leading-snug text-forest-900 md:text-3xl">{row.value}</p>
              )}
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <p className="max-w-xs text-sm leading-relaxed text-forest-700/70">
              We reply within two working days. No deposit until we have spoken and you are certain.
            </p>
          </Reveal>
        </aside>

        <Reveal delay={0.2}>
          <div className="rounded-[1.25rem] border border-forest-900/10 bg-cream-100 p-8 md:p-14">
            <ContactForm destinations={destinations.map((d) => ({ slug: d.slug, name: d.name }))} preselected={destination} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
