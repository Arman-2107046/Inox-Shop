import { Accordion } from "@/components/motion/accordion";
import { Reveal } from "@/components/motion/primitives";
import { CtaBand, PageHero } from "@/components/site/cards";
import { getFaqs, getSettings } from "@/lib/content";

export const metadata = { title: "FAQ" };

export default async function FaqPage() {
  const [faqs, s] = await Promise.all([getFaqs(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Good to know"
        title="Questions, answered"
        intro="Everything people usually ask before they book. If yours is not here, just write to us."
        image={s.aboutImage}
        height="min-h-[60vh]"
      />
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-12 lg:py-28">
        {faqs.length === 0 ? (
          <p className="text-forest-700/70">No questions published yet.</p>
        ) : (
          <Reveal>
            <Accordion items={faqs.map((f) => ({ id: f.id, title: f.question, body: f.answer }))} />
          </Reveal>
        )}
      </section>
      <CtaBand title="Still wondering?" body="A real person reads every message, usually within a day." href="/contact" label="Ask us anything" image={s.heroImage} />
    </>
  );
}
