import { Stagger, StaggerItem } from "@/components/motion/primitives";
import { CategoryCard, CtaBand, PageHero } from "@/components/site/cards";
import { getPublishedCategories, getSettings } from "@/lib/content";

export const metadata = { title: "Collections" };

export default async function CollectionsPage() {
  const [categories, s] = await Promise.all([getPublishedCategories(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Choose your kind of wild"
        intro="Journeys grouped by the landscapes and rhythms they revolve around. Start with what moves you."
        image={categories[0]?.image ?? s.heroImage}
      />
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {categories.map((c) => (
            <StaggerItem key={c.id}>
              <CategoryCard c={{ ...c, count: c._count.destinations }} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <CtaBand title="Not sure where to start?" body="Tell us what you're drawn to and we'll suggest three journeys." href="/contact" label="Ask us" image={s.aboutImage} />
    </>
  );
}
