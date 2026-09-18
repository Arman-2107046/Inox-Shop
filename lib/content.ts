import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Fallback used until the settings row is seeded, so the site never crashes. */
const DEFAULT_SETTINGS = {
  id: 1,
  siteName: "Verdant Expeditions",
  tagline: "Slow journeys into wild places",
  heroTitle: "Walk gently into the wild",
  heroSubtitle: "Small-group, nature-led journeys crafted around forests, mountains and quiet coastlines.",
  heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80",
  aboutTitle: "Travel that gives more than it takes",
  aboutBody: "We design unhurried expeditions with local guides, conservation partners and a deep respect for the landscapes we walk through.",
  aboutImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  email: "hello@verdant.travel",
  phone: "+1 (000) 000-0000",
  address: "Somewhere green",
  instagram: null as string | null,
  introStatement: "",
  impactTitle: "",
  impactBody: "",
  impactImage: "",
  updatedAt: new Date(0),
};

export const getSettings = cache(async () => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return settings ?? DEFAULT_SETTINGS;
});

export const getPublishedDestinations = cache(async () =>
  prisma.destination.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  }),
);

export const getFeaturedDestinations = cache(async (take = 3) =>
  prisma.destination.findMany({
    where: { published: true, featured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take,
  }),
);

export const getDestinationBySlug = cache(async (slug: string) =>
  prisma.destination.findFirst({ where: { slug, published: true } }),
);

export const getPublishedStories = cache(async (take?: number) =>
  prisma.story.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take,
  }),
);

export const getStoryBySlug = cache(async (slug: string) =>
  prisma.story.findFirst({ where: { slug, published: true } }),
);

export const getTestimonials = cache(async () =>
  prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  }),
);

/** Turns "Torres del Paine, Chile" into "torres-del-paine-chile". */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Splits textarea input into a trimmed, non-empty line array. */
export function linesToArray(input: string) {
  return input
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// ---------- Premium content ----------

export type ItineraryDay = { title: string; body: string };

/** Parses the Json column into a typed itinerary, tolerating bad data. */
export function parseItinerary(raw: unknown): ItineraryDay[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((d): d is ItineraryDay => !!d && typeof d === "object" && typeof (d as ItineraryDay).title === "string")
    .map((d) => ({ title: d.title, body: typeof d.body === "string" ? d.body : "" }));
}

/**
 * Textarea format for itineraries in the CMS: days separated by a line
 * containing only `---`; the first line of each block is the title.
 */
export function itineraryFromText(text: string): ItineraryDay[] {
  return text
    .split(/\r?\n-{3,}\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [title, ...rest] = block.split(/\r?\n/);
      return { title: title.trim(), body: rest.join("\n").trim() };
    });
}

export function itineraryToText(days: ItineraryDay[]) {
  return days.map((d) => `${d.title}\n${d.body}`).join("\n---\n");
}

export const getPublishedCategories = cache(async () =>
  prisma.category.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { destinations: { where: { published: true } } } } },
  }),
);

export const getCategoryBySlug = cache(async (slug: string) =>
  prisma.category.findFirst({
    where: { slug, published: true },
    include: {
      destinations: { where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] },
    },
  }),
);

export const getPublishedDestinationsWithCategories = cache(async () =>
  prisma.destination.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: { categories: { select: { slug: true, name: true } } },
  }),
);

export const getDestinationDetail = cache(async (slug: string) =>
  prisma.destination.findFirst({
    where: { slug, published: true },
    include: { categories: { select: { slug: true, name: true } } },
  }),
);

export const getGuides = cache(async () =>
  prisma.guide.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
);

export const getFaqs = cache(async () =>
  prisma.faq.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
);

export const getStats = cache(async () => prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }));

export const getPublishedPages = cache(async () =>
  prisma.page.findMany({ where: { published: true }, select: { slug: true, title: true }, orderBy: { title: "asc" } }),
);

export const getPageBySlug = cache(async (slug: string) => prisma.page.findFirst({ where: { slug, published: true } }));
