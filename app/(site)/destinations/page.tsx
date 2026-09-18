import { CtaBand, DestinationCard, SectionHeading } from "@/components/site/cards";
import { getPublishedDestinations } from "@/lib/content";

export const metadata = { title: "Destinations" };

export default async function DestinationsPage() {
  const destinations = await getPublishedDestinations();

  return (
    <>
      <section className="bg-forest-950 pb-20 pt-40 text-cream-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Destinations"
            title="Wild places, walked slowly"
            intro="Every journey below is small-group, locally guided and built around the seasons of the landscape."
            tone="light"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {destinations.length === 0 ? (
          <p className="text-forest-700/70">No destinations published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.id} d={d} />
            ))}
          </div>
        )}
      </section>

      <CtaBand
        title="Can't find the right one?"
        body="Most of our journeys began as a conversation. Tell us what you're looking for."
        href="/contact"
        label="Talk to us"
      />
    </>
  );
}
