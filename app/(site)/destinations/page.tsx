import { Suspense } from "react";
import { CtaBand, PageHero } from "@/components/site/cards";
import { DestinationGrid } from "@/components/site/destination-grid";
import { getPublishedCategories, getPublishedDestinationsWithCategories, getSettings } from "@/lib/content";

export const metadata = { title: "Destinations" };

export default async function DestinationsPage() {
  const [destinations, categories, s] = await Promise.all([
    getPublishedDestinationsWithCategories(),
    getPublishedCategories(),
    getSettings(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Wild places, walked slowly"
        intro="Every journey below is small-group, locally guided and built around the seasons of the landscape."
        image={destinations[0]?.heroImage ?? s.heroImage}
        height="min-h-[75vh]"
      />

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <Suspense fallback={null}>
          <DestinationGrid items={destinations} filters={categories.map((c) => ({ slug: c.slug, name: c.name }))} />
        </Suspense>
      </section>

      <CtaBand
        title="Can't find the right one?"
        body="Most of our journeys began as a conversation. Tell us what you're looking for."
        href="/contact"
        label="Talk to us"
        image={s.aboutImage}
      />
    </>
  );
}
