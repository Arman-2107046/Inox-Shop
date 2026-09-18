// Premium content: collections, itineraries, guides, FAQs, stats, pages.
// Called from seed-content.ts after the base content; safe to re-run.
import type { PrismaClient } from "../app/generated/prisma/client";

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const settingsExtra = {
  introStatement:
    "We take ten people at a time to places that reward patience — and we walk slowly enough for the landscape to introduce itself.",
  impactTitle: "Travel that leaves the ground better",
  impactBody:
    "Every wild place we visit is under some kind of pressure: grazing, logging, drought, or simply too many footprints. We don't pretend our journeys are neutral. We design them to be net positive, and we measure whether they are.\n\nFive percent of every booking goes to the conservation partner where you travel. We hire locally, stay in family-run places, cap groups at ten and publish an honesty report each year — including what we got wrong.",
  impactImage: img("photo-1470071459604-3b5ec3a7fe05", 2000),
};

export const categories = [
  { slug: "forest", name: "Forest", tagline: "Moss, cedar and the hush of old growth.", description: "Journeys built around ancient woodland — temperate rainforest, alpine larch, three-thousand-year-old cedars. Slow walks, long silences, and the particular calm of being under a canopy.", image: img("photo-1448375240586-882707db888b"), sortOrder: 1 },
  { slug: "mountain", name: "Mountain", tagline: "Granite, glacier and thin, clean air.", description: "Hut-to-hut and refugio journeys through the world's great ranges. Honest days on foot, rewarded by ridgelines, glaciers and the kind of view that resets your sense of scale.", image: img("photo-1519681393784-d120267933ba"), sortOrder: 2 },
  { slug: "coast", name: "Coast", tagline: "Fjords, islands and the edge of things.", description: "Where land runs out. Sea kayaks, small boats, fishing villages and cliff paths — journeys shaped by tides and weather rather than a clock.", image: img("photo-1506905925346-21bda4d32df4"), sortOrder: 3 },
  { slug: "wildlife", name: "Wildlife", tagline: "Bears, whales and the patience to wait.", description: "Journeys where the animals set the schedule. Long hours in hides and on quiet water, with guides who read the land like a newspaper.", image: img("photo-1470071459604-3b5ec3a7fe05"), sortOrder: 4 },
];

// Extra destination fields keyed by slug (base fields live in seed-content.ts).
export const destinationExtras: Record<string, { categories: string[]; groupSize: string; itinerary: { title: string; body: string }[]; inclusions: string[]; exclusions: string[] }> = {
  "torres-del-paine": {
    categories: ["mountain", "wildlife"],
    groupSize: "Max 8",
    itinerary: [
      { title: "Arrive in Puerto Natales", body: "Meet your guide over dinner by the fjord. A gear check, a weather briefing, and an early night." },
      { title: "Into the park", body: "Catamaran across Lago Pehoé and the first walk to Refugio Grey, the glacier appearing and disappearing through the lenga forest." },
      { title: "Grey Glacier", body: "A morning kayak beneath the ice face, then a slow return along the lake with time for the condors." },
      { title: "Valle Francés", body: "The long day: up the French Valley to the Británico lookout, walls of granite on every side." },
      { title: "Los Cuernos to Las Torres", body: "Rolling trail under the Horns, guanaco herds on the steppe, and the first sight of the towers at dusk." },
      { title: "The Towers at dawn", body: "A 4am start for the base of the three towers. If the sky is clear, the granite turns red for eleven minutes. Then breakfast." },
      { title: "Estancia day", body: "A night at a working estancia. Horses, lamb over the fire, and a puma tracker who has stories for every scar." },
      { title: "Return", body: "A slow drive back to Puerto Natales, with a final stop at the Milodón cave." },
    ],
    inclusions: ["Expert local guide throughout", "All refugio and estancia accommodation", "All meals from dinner on day 1 to breakfast on day 8", "Park fees and catamaran", "Kayak session at Grey Glacier", "Conservation contribution"],
    exclusions: ["International and domestic flights", "Travel insurance", "Personal equipment and gratuities"],
  },
  yakushima: {
    categories: ["forest", "coast"],
    groupSize: "Max 10",
    itinerary: [
      { title: "Arrive by ferry", body: "The island rises out of the sea like a green tooth. Check in at a seaside minshuku, dinner of flying fish and shochu." },
      { title: "Shiratani Unsuikyo", body: "A gentle first walk into the moss forest that inspired Princess Mononoke. Every surface is green." },
      { title: "Jōmon Sugi", body: "A dawn start on the old logging railway, then up through the ancient cedars to the 3,000-year-old Jōmon Sugi. Long, quiet, unforgettable." },
      { title: "River and onsen", body: "A rest day: river swimming, a woodworker's studio, and the seaside hot spring that only appears at low tide." },
      { title: "Coastal walk", body: "The western coast road, monkeys and deer on the tarmac, and a beach where loggerheads nest in summer." },
      { title: "Departure", body: "A last breakfast, a slow ferry back to Kagoshima." },
    ],
    inclusions: ["Guide and naturalist throughout", "Minshuku and ryokan accommodation", "All breakfasts and dinners", "Ferries and island transport", "Conservation contribution"],
    exclusions: ["Flights to Kagoshima", "Lunches on walking days", "Travel insurance"],
  },
  "lofoten-islands": {
    categories: ["coast", "mountain"],
    groupSize: "Max 10",
    itinerary: [
      { title: "Arrive in Svolvær", body: "Transfer to your rorbu cabin in a harbour village. The light does not really leave." },
      { title: "Reinebringen", body: "The famous ridge above Reine — short, steep, and worth every step. We go late, when the crowds are gone and the sun is low." },
      { title: "Sea kayaking", body: "A full day paddling the sheltered waters of Trollfjord, with eagles overhead." },
      { title: "Beaches of the north", body: "Kvalvika and Ryten: white sand, turquoise water, and a swim that will take your breath away." },
      { title: "Fishing village day", body: "Time in Nusfjord, one of the oldest fishing villages in Norway. Cod every way, and a boat out with a local skipper." },
      { title: "Free day", body: "Sleep, walk, read. Or climb Munken with the guide if the legs are willing." },
      { title: "Departure", body: "Transfer back to Svolvær or Leknes." },
    ],
    inclusions: ["Guide throughout", "Rorbu cabin accommodation", "Breakfasts and five dinners", "Sea kayak day with equipment", "Boat trip", "Conservation contribution"],
    exclusions: ["Flights", "Lunches", "Travel insurance"],
  },
  "azores-sao-miguel": {
    categories: ["coast", "wildlife"],
    groupSize: "Max 10",
    itinerary: [
      { title: "Arrive in Ponta Delgada", body: "Settle into a quinta on the north coast. Dinner is whatever the fishermen brought in." },
      { title: "Sete Cidades", body: "The crater rim walk above the twin lakes, one green, one blue." },
      { title: "At sea", body: "A day with a marine biologist looking for sperm whales and dolphins." },
      { title: "Furnas", body: "Cozido stew cooked in volcanic steam, then an afternoon in the thermal gardens." },
      { title: "Departure", body: "A slow breakfast and a transfer to the airport." },
    ],
    inclusions: ["Guide throughout", "Quinta accommodation", "Breakfasts and three dinners", "Whale watching with biologist", "Conservation contribution"],
    exclusions: ["Flights", "Lunches", "Travel insurance"],
  },
  "great-bear-rainforest": {
    categories: ["forest", "wildlife", "coast"],
    groupSize: "Max 8",
    itinerary: [
      { title: "Arrive in Bella Bella", body: "A floatplane in, and a welcome from your Kitasoo Xai'xais hosts." },
      { title: "Board the vessel", body: "Settle into the expedition boat that becomes home for the week. Humpbacks in the channel before dinner." },
      { title: "Estuary morning", body: "Kayaks into a river estuary at dawn. Grizzlies fishing on the far bank." },
      { title: "Spirit Bear country", body: "A full day in a river hide with a Kitasoo guide, waiting for the white bear." },
      { title: "Old growth", body: "A walk through cedars older than the country. Culturally modified trees, and stories to match." },
      { title: "Whales", body: "A day on the water with orcas and humpbacks, and a marine biologist to explain what you are seeing." },
      { title: "Lodge night", body: "A night in the community-owned lodge at Klemtu. Feast, dance and a long conversation." },
      { title: "Second hide day", body: "Back to the river. Different light, different bears." },
      { title: "Departure", body: "Floatplane out over the fjords." },
    ],
    inclusions: ["Indigenous guides throughout", "Expedition vessel and lodge accommodation", "All meals", "Floatplane transfers", "Kayaks and gear", "Conservation contribution"],
    exclusions: ["Flights to Vancouver", "Travel insurance", "Gratuities"],
  },
  "dolomites-alta-via": {
    categories: ["mountain"],
    groupSize: "Max 10",
    itinerary: [
      { title: "Arrive at Lago di Braies", body: "A night beside the emerald lake. Gear check, and a dinner of dumplings and speck." },
      { title: "Lago di Braies to Rifugio Fanes", body: "Up through the larch forest onto the Fanes plateau, the first big views." },
      { title: "Fanes to Lagazuoi", body: "Across the high meadows and past the wartime tunnels to a rifugio on the summit." },
      { title: "Lagazuoi to Cinque Torri", body: "Down past the five towers, with time for the open-air war museum." },
      { title: "Cinque Torri to Croda da Lago", body: "A quieter day, shepherds' huts and a mirror lake beneath the wall." },
      { title: "Croda da Lago to Passo Staulanza", body: "The final ridge, then down to the pass for a last long lunch." },
      { title: "Departure", body: "Transfer to Venice or Cortina." },
    ],
    inclusions: ["Guide throughout", "Six nights in rifugi", "Half board throughout", "Luggage transfers", "Conservation contribution"],
    exclusions: ["Flights", "Lunches", "Travel insurance"],
  },
};

export const guides = [
  { name: "Tomás Reyes", role: "Lead guide, naturalist", location: "Puerto Natales, Chile", bio: "Twenty seasons in Torres del Paine. Tomás has walked every trail in the park and a few that are not on any map. He knows where the pumas den and, more importantly, when to leave them alone.", image: img("photo-1500648767791-00dcc994a43e", 900), sortOrder: 1 },
  { name: "Mara Ellison", role: "Founder, expedition designer", location: "Portland, Oregon", bio: "Mara started Verdant after a week in a valley with no name. She designs the journeys, walks most of them, and writes the honesty report every year.", image: img("photo-1494790108377-be9c29b29330", 900), sortOrder: 2 },
  { name: "Kenji Arai", role: "Forest guide", location: "Yakushima, Japan", bio: "Born on the island, Kenji spent fifteen years as a park ranger before guiding. He can name every moss on the trail and will, if you let him.", image: img("photo-1506794778202-cad84cf45f1d", 900), sortOrder: 3 },
  { name: "Ingrid Solheim", role: "Sea kayak guide", location: "Reine, Lofoten", bio: "A fourth-generation Lofoten fisher who swapped nets for paddles. Ingrid reads the sea the way others read the news, and cooks a cod stew you will dream about.", image: img("photo-1438761681033-6461ffad8d80", 900), sortOrder: 4 },
];

export const faqs = [
  { question: "How fit do I need to be?", answer: "It depends on the journey. 'Gentle' means a few hours of easy walking a day; 'Challenging' means long days with real ascent. Every destination page lists its difficulty, and we are always happy to talk it through honestly before you book.", sortOrder: 1 },
  { question: "How big are the groups?", answer: "Never more than ten, and often fewer. Some wildlife journeys are capped at eight. Small groups let us stay in family-run places, walk quietly and leave no trace.", sortOrder: 2 },
  { question: "What is the conservation contribution?", answer: "Five percent of every booking goes directly to the conservation partner where you travel — trail crews, rangers, rewilding projects. We publish where it went every year.", sortOrder: 3 },
  { question: "Can I travel privately or on custom dates?", answer: "Yes. Most journeys can run as private departures for two or more people. Tell us your dates and we will tell you what is possible.", sortOrder: 4 },
  { question: "What about flights?", answer: "We do not book international flights, but we will tell you exactly where and when to arrive, and we can recommend routes with fewer connections.", sortOrder: 5 },
  { question: "What is your cancellation policy?", answer: "Full refund up to 60 days before departure, 50 percent up to 30 days, and non-refundable after that. We strongly recommend travel insurance.", sortOrder: 6 },
];

export const stats = [
  { value: 1240, suffix: "+", label: "Travellers guided", sortOrder: 1 },
  { value: 84, suffix: "k", label: "USD given to conservation this year", sortOrder: 2 },
  { value: 10, suffix: "", label: "Maximum group size", sortOrder: 3 },
  { value: 6, suffix: "", label: "Countries, walked slowly", sortOrder: 4 },
];

export const pages = [
  { slug: "privacy", title: "Privacy policy", body: "We collect only what we need to plan your journey: your name, email and the details you share with us. We never sell your data and we never share it with anyone outside the partners who need it to host you.\n\nYou can ask us to delete everything we hold about you at any time by writing to the email address in the footer.\n\nOur website uses no advertising trackers. We keep basic, anonymous visitor counts so we know which pages are useful." },
  { slug: "terms", title: "Booking terms", body: "A booking is confirmed once we have spoken, you have received a written itinerary, and a 25 percent deposit has been paid. The balance is due 60 days before departure.\n\nCancellation: full refund up to 60 days before departure, 50 percent up to 30 days, and non-refundable after that.\n\nWe reserve the right to alter itineraries where weather, wildlife or safety require it. Where we do, we will always offer an equivalent alternative." },
];

export async function seedPremium(prisma: PrismaClient) {
  await prisma.siteSettings.update({ where: { id: 1 }, data: settingsExtra });

  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: c, create: c });
  }

  for (const [slug, extra] of Object.entries(destinationExtras)) {
    const { categories: cats, ...fields } = extra;
    await prisma.destination.update({
      where: { slug },
      data: { ...fields, categories: { set: cats.map((s) => ({ slug: s })) } },
    });
  }

  if ((await prisma.guide.count()) === 0) await prisma.guide.createMany({ data: guides });
  if ((await prisma.faq.count()) === 0) await prisma.faq.createMany({ data: faqs });
  if ((await prisma.stat.count()) === 0) await prisma.stat.createMany({ data: stats });
  for (const p of pages) {
    await prisma.page.upsert({ where: { slug: p.slug }, update: p, create: p });
  }

  console.log(`Premium content ready: ${categories.length} collections, ${guides.length} guides, ${faqs.length} FAQs, ${stats.length} stats, ${pages.length} pages`);
}
