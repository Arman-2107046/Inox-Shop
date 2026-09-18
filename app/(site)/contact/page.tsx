import { SectionHeading } from "@/components/site/cards";
import { getPublishedDestinations, getSettings } from "@/lib/content";
import { ContactForm } from "./contact-form";

export const metadata = { title: "Contact" };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const [s, destinations, { destination }] = await Promise.all([getSettings(), getPublishedDestinations(), searchParams]);

  return (
    <>
      <section className="bg-forest-950 pb-20 pt-40 text-cream-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Contact"
            title="Let's plan something quiet"
            intro="Tell us a little about yourself and the kind of wild you're drawn to. We'll take it from there."
            tone="light"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <aside className="space-y-10">
          <div>
            <p className="eyebrow text-moss-500">Email</p>
            <a href={`mailto:${s.email}`} className="mt-2 block font-display text-2xl text-forest-900 hover:text-forest-600">
              {s.email}
            </a>
          </div>
          <div>
            <p className="eyebrow text-moss-500">Phone</p>
            <a href={`tel:${s.phone.replace(/\s+/g, "")}`} className="mt-2 block font-display text-2xl text-forest-900 hover:text-forest-600">
              {s.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow text-moss-500">Studio</p>
            <p className="mt-2 font-display text-2xl leading-snug text-forest-900">{s.address}</p>
          </div>
        </aside>

        <div className="rounded-2xl border border-cream-200 bg-cream-100 p-8 md:p-12">
          <ContactForm destinations={destinations.map((d) => ({ slug: d.slug, name: d.name }))} preselected={destination} />
        </div>
      </section>
    </>
  );
}
