// Sample site content. Called from seed.ts; safe to re-run (upserts by slug).
import type { PrismaClient } from "../app/generated/prisma/client";

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const settings = {
  siteName: "Verdant Expeditions",
  tagline: "Slow journeys into wild places",
  heroTitle: "Walk gently into the wild",
  heroSubtitle:
    "Small-group, nature-led journeys crafted around old forests, high mountains and quiet coastlines — guided by the people who call them home.",
  heroImage: img("photo-1441974231531-c6227db76b6e", 2200),
  aboutTitle: "Travel that gives more than it takes",
  aboutBody:
    "Verdant began with two friends, a borrowed tent and a week in a valley that had no name on our map. We came home slower, quieter and certain that this was the only way we wanted to travel.\n\nToday we design unhurried expeditions with local naturalists, conservation partners and family-run lodges. Groups never exceed ten. Itineraries bend to weather, wildlife and whim. And a share of every journey goes straight back into the trails, forests and rangers that make it possible.",
  aboutImage: img("photo-1469474968028-56623f02e42e"),
  email: "hello@verdant.travel",
  phone: "+1 (415) 555-0142",
  address: "12 Fern Lane, Studio 3\nPortland, Oregon",
  instagram: "https://instagram.com/verdant.expeditions",
};

export const destinations = [
  {
    slug: "torres-del-paine",
    name: "Torres del Paine",
    region: "Patagonia, Chile",
    tagline: "Granite towers, turquoise lakes and the loudest silence you will ever hear.",
    description:
      "Eight days on foot through the heart of Chilean Patagonia. We follow the classic W route at an unhurried pace, sleeping in mountain refugios and one night under canvas beside Lago Grey.\n\nMornings begin before the wind. Afternoons are for pumas (from a distance), lenga forests turning gold, and the long, slow approach to the base of the towers themselves.\n\nYour guide is a Puerto Natales native who has walked these trails for twenty seasons and knows every shortcut, every shelter and every place the guanacos gather at dusk.",
    heroImage: img("photo-1519681393784-d120267933ba", 2200),
    gallery: [img("photo-1518182170546-07661fd94144"), img("photo-1504280390367-361c6d9f38f4"), img("photo-1464822759023-fed622ff2c3b")],
    highlights: [
      "Sunrise at the base of the three towers",
      "Kayak beneath the face of Grey Glacier",
      "Guanaco and condor spotting on the eastern steppe",
      "Two nights in a family-run estancia",
    ],
    duration: "8 days",
    difficulty: "Challenging",
    bestSeason: "Nov – Mar",
    priceFrom: 4200,
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "yakushima",
    name: "Yakushima",
    region: "Kagoshima, Japan",
    tagline: "A moss-drenched island where cedars have stood for three thousand years.",
    description:
      "Yakushima is the wettest place in Japan, and it shows: every stone, root and fallen trunk wears a coat of moss. We spend six days walking its ancient cedar forests, soaking in coastal onsen and eating what the fishing villages bring in each morning.\n\nThe centrepiece is a dawn ascent to Jōmon Sugi, a tree older than most civilisations. The rest is deliberately slack: river swims, tea with a woodworker, an afternoon watching loggerhead turtles come ashore.",
    heroImage: img("photo-1440688807730-73e4e2169fb8", 2200),
    gallery: [img("photo-1448375240586-882707db888b"), img("photo-1476611317561-60117649dd94"), img("photo-1425913397330-cf8af2ff40a1")],
    highlights: [
      "Dawn walk to the 3,000-year-old Jōmon Sugi",
      "Shiratani Unsuikyo — the forest that inspired Princess Mononoke",
      "Seaside hot springs at low tide",
      "Loggerhead turtle nesting (May – July)",
    ],
    duration: "6 days",
    difficulty: "Moderate",
    bestSeason: "Apr – Jun, Oct – Nov",
    priceFrom: 3600,
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "lofoten-islands",
    name: "Lofoten Islands",
    region: "Arctic Norway",
    tagline: "Sharp peaks rising straight from the sea, and light that never quite leaves.",
    description:
      "Above the Arctic Circle, the Lofoten archipelago is all vertical: fishing villages pinned beneath mountains that rise straight out of the Norwegian Sea. In midsummer the sun barely dips; in September the aurora returns.\n\nWe hike ridgelines by day, paddle sheltered fjords in the evening and sleep in restored rorbuer — the red fishermen's cabins that line every harbour. Expect long light, cold swims and cod cooked every way imaginable.",
    heroImage: img("photo-1506905925346-21bda4d32df4", 2200),
    gallery: [img("photo-1520769945061-0a448c463865"), img("photo-1531366936337-7c912a4589a7"), img("photo-1516726817505-f5ed825624d8")],
    highlights: [
      "Reinebringen ridge at midnight sun",
      "Sea kayaking in Trollfjord",
      "Nights in a traditional rorbu cabin",
      "Aurora season departures (Sep – Oct)",
    ],
    duration: "7 days",
    difficulty: "Moderate",
    bestSeason: "Jun – Sep",
    priceFrom: 3900,
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "azores-sao-miguel",
    name: "São Miguel, Azores",
    region: "Atlantic Portugal",
    tagline: "Crater lakes, steaming valleys and hydrangea-lined roads in the middle of the ocean.",
    description:
      "Green in every direction. São Miguel is a volcanic island of crater lakes, tea plantations and hot springs where locals cook stew in the ground. We circle the island slowly over five days, walking the crater rims at Sete Cidades and Lagoa do Fogo and finishing each afternoon in a thermal pool.\n\nOne day is spent at sea with a marine biologist, watching sperm whales and dolphins in some of the richest waters in the Atlantic.",
    heroImage: img("photo-1500530855697-b586d89ba3ee", 2200),
    gallery: [img("photo-1470770903676-69b98201ea1c"), img("photo-1433086966358-54859d0ed716")],
    highlights: [
      "Twin crater lakes of Sete Cidades",
      "Whale watching with a resident biologist",
      "Cozido stew cooked in volcanic steam",
      "Europe's only tea plantation",
    ],
    duration: "5 days",
    difficulty: "Gentle",
    bestSeason: "May – Oct",
    priceFrom: 2400,
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "great-bear-rainforest",
    name: "Great Bear Rainforest",
    region: "British Columbia, Canada",
    tagline: "The largest intact temperate rainforest on Earth, and the white bears that live in it.",
    description:
      "By boat and on foot through a coastline of fjords, old-growth cedar and salmon rivers. The Great Bear Rainforest is home to grizzlies, coastal wolves and the rare white-coated Spirit Bear.\n\nWe travel with Indigenous guides from the Kitasoo Xai'xais Nation, whose territory this is, sleeping aboard a small expedition vessel and in a community-owned lodge. September is salmon season: the bears come down to the rivers and the whole forest seems to hold its breath.",
    heroImage: img("photo-1470071459604-3b5ec3a7fe05", 2200),
    gallery: [img("photo-1447752875215-b2761acb3c5d"), img("photo-1518495973542-4542c06a5843"), img("photo-1426604966848-d7adac402bff")],
    highlights: [
      "Spirit Bear viewing during salmon run",
      "Humpback and orca encounters by boat",
      "Guided by Kitasoo Xai'xais hosts",
      "Old-growth cedar walks and estuary kayaking",
    ],
    duration: "9 days",
    difficulty: "Moderate",
    bestSeason: "Aug – Oct",
    priceFrom: 6800,
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "dolomites-alta-via",
    name: "Dolomites Alta Via",
    region: "South Tyrol, Italy",
    tagline: "Pale peaks, alpine meadows and a rifugio dinner at the end of every day.",
    description:
      "Hut to hut along the Alta Via 1, the gentlest of the Dolomites' high routes. Each day ends at a mountain rifugio with a wood-fired stove, a long table and a plate of something involving speck.\n\nSix walking days cross limestone plateaus, wildflower meadows and the First World War trenches of Lagazuoi. No technical ground — just long, beautiful days at altitude with the Marmolada glacier hanging on the horizon.",
    heroImage: img("photo-1472214103451-9374bd1c798e", 2200),
    gallery: [img("photo-1454496522488-7a8e488e8606"), img("photo-1501785888041-af3ef285b470")],
    highlights: [
      "Six nights in family-run rifugi",
      "Lagazuoi tunnels and Tre Cime views",
      "Alpine botany walk with a local guide",
      "Luggage transfer — walk with a day pack",
    ],
    duration: "7 days",
    difficulty: "Moderate",
    bestSeason: "Jun – Sep",
    priceFrom: 2900,
    featured: false,
    sortOrder: 6,
  },
];

export const stories = [
  {
    slug: "the-art-of-walking-slowly",
    title: "The art of walking slowly",
    excerpt: "Why our guides ask you to take the longest route, and what happens to your attention when you do.",
    body:
      "There is a moment, usually around the third day, when a group stops looking at the trail and starts looking at everything else. The pace drops. Someone crouches to look at a beetle. Nobody minds.\n\nWe design for that moment. It is why our daily distances look short on paper, why we build in a rest day that has nothing scheduled, and why the guides walk at the back rather than the front.\n\nSlowness is not laziness. It is the only speed at which a landscape can be noticed. Move fast and a forest is a green wall; move slowly and it becomes ten thousand separate things, each doing something.\n\nSo take the longest route. Sit down when the light is good. We will still get there.",
    coverImage: img("photo-1448375240586-882707db888b"),
    author: "Mara Ellison",
    readMinutes: 4,
    publishedAt: new Date("2026-08-14"),
  },
  {
    slug: "a-night-with-the-spirit-bears",
    title: "A night with the spirit bears",
    excerpt: "Field notes from the salmon run in the Great Bear Rainforest, where a white bear stepped out of a black forest.",
    body:
      "The river was so full of salmon it sounded like applause. We had been sitting on the same log for three hours, cold, quiet, watching a black bear fish with the resignation of someone doing a job they were good at.\n\nThen the forest opened and a white bear walked out. Not albino — a Kermode, a black bear carrying a recessive gene that turns its coat the colour of old cream. The Kitasoo call them moksgm'ol. Our guide, Doug, whispered that in twenty years he had seen perhaps thirty.\n\nIt fished for eleven minutes. Nobody breathed. Then it walked back into the trees and the forest closed behind it, and we sat in the applause of the river for a long time before anyone said anything.",
    coverImage: img("photo-1470071459604-3b5ec3a7fe05"),
    author: "Tomás Reyes",
    readMinutes: 6,
    publishedAt: new Date("2026-07-02"),
  },
  {
    slug: "what-we-give-back",
    title: "What we give back — and what we still get wrong",
    excerpt: "Our annual honesty report: where the conservation contributions went this year, and where we fell short.",
    body:
      "Every journey carries a conservation contribution. This year that came to a little over $84,000, split between trail restoration in Torres del Paine, the Spirit Bear Research Foundation and a ranger training programme in the Azores.\n\nWe also got things wrong. Our flights still account for the overwhelming majority of each trip's footprint, and offsetting is not a solution. We flew a photographer to Norway for a shoot that could have used local talent. Two lodges we work with are not yet paying the living wage we ask of them.\n\nWe publish this because a company that only tells you the good news is not telling you the news. Next year's targets are below.",
    coverImage: img("photo-1441974231531-c6227db76b6e"),
    author: "Verdant Team",
    readMinutes: 5,
    publishedAt: new Date("2026-05-20"),
  },
  {
    slug: "packing-for-rain",
    title: "Packing for rain, and other Yakushima lessons",
    excerpt: "It rains 35 days a month on Yakushima, the locals say. Here is how to enjoy every one of them.",
    body:
      "The islanders have a joke: it rains thirty-five days a month on Yakushima. It is not much of a joke. The rain is the point — it is what grows the moss, feeds the rivers and keeps the cedars alive for three millennia.\n\nSo pack for it. A proper shell, not a fashion one. Trail shoes that drain. A dry bag for the camera and a second for the book you will read in the onsen. Then stop worrying about it.\n\nThe forest in rain is the forest at its best: greener, louder, emptier. The crowds stay in the ryokan. You will have the cedars to yourself.",
    coverImage: img("photo-1476611317561-60117649dd94"),
    author: "Mara Ellison",
    readMinutes: 3,
    publishedAt: new Date("2026-03-11"),
  },
];

export const testimonials = [
  {
    quote: "I have travelled a lot and never once come home changed. This time I did. It was the pace — nobody was ever in a hurry, and somehow that was the whole point.",
    name: "Helena Marsh",
    detail: "Torres del Paine, 2026",
    sortOrder: 1,
  },
  {
    quote: "Our guide knew the name of every plant, every bird and every fisherman on the island. By the end of the week, so did we.",
    name: "Daniel & Priya Okafor",
    detail: "Yakushima, 2025",
    sortOrder: 2,
  },
  {
    quote: "Ten people, one boat, a white bear at dusk. I still don't have words for it, and I've stopped trying to find them.",
    name: "Jonas Lindqvist",
    detail: "Great Bear Rainforest, 2025",
    sortOrder: 3,
  },
];

export async function seedContent(prisma: PrismaClient) {
  await prisma.siteSettings.upsert({ where: { id: 1 }, update: settings, create: { id: 1, ...settings } });

  for (const d of destinations) {
    await prisma.destination.upsert({ where: { slug: d.slug }, update: d, create: d });
  }
  for (const s of stories) {
    await prisma.story.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  // Testimonials have no natural key — only seed them when the table is empty.
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({ data: testimonials });
  }

  console.log(`Content ready: ${destinations.length} destinations, ${stories.length} stories, ${testimonials.length} testimonials`);
}
