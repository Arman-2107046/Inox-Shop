import { itineraryToText, parseItinerary } from "@/lib/content";
import { Checkbox, Input, Select, Textarea } from "../_components/form";
import { DIFFICULTIES } from "./constants";

export type DestinationInitial = {
  name: string;
  slug: string;
  region: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: unknown;
  duration: string;
  difficulty: string;
  bestSeason: string;
  groupSize: string;
  priceFrom: number | null;
  sortOrder: number;
  featured: boolean;
  published: boolean;
  categories: { id: string }[];
};

type CategoryOption = { id: string; name: string };

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <legend className="px-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</legend>
      {children}
    </fieldset>
  );
}

/** Field markup shared by the create and edit pages. */
export function DestinationFields({ d, categories }: { d?: DestinationInitial; categories: CategoryOption[] }) {
  const selected = new Set(d?.categories.map((c) => c.id) ?? []);

  return (
    <>
      <Group title="Basics">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input name="name" label="Name" required defaultValue={d?.name} placeholder="Torres del Paine" />
          <Input name="slug" label="Slug" defaultValue={d?.slug} hint="Leave blank to generate from the name." placeholder="torres-del-paine" />
        </div>
        <Input name="region" label="Region" required defaultValue={d?.region} placeholder="Patagonia, Chile" />
        <Input name="tagline" label="Tagline" required defaultValue={d?.tagline} placeholder="One sentence shown on cards and the hero." />
        <Textarea name="description" label="Description" rows={8} required defaultValue={d?.description} hint="Separate paragraphs with a blank line. The first sentence becomes the section heading." />
        {categories.length > 0 && (
          <div>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Collections</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              {categories.map((c) => (
                <label key={c.id} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input type="checkbox" name="categoryIds" value={c.id} defaultChecked={selected.has(c.id)} className="h-4 w-4 rounded border-zinc-300" />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
        )}
      </Group>

      <Group title="Images">
        <Input name="heroImage" label="Hero image URL" type="url" required defaultValue={d?.heroImage} placeholder="https://…" />
        <Textarea name="gallery" label="Gallery image URLs" rows={4} defaultValue={d?.gallery.join("\n")} hint="One https:// URL per line. The first is shown largest." />
      </Group>

      <Group title="Details">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Input name="duration" label="Duration" required defaultValue={d?.duration} placeholder="8 days" />
          <Select name="difficulty" label="Difficulty" options={DIFFICULTIES} defaultValue={d?.difficulty ?? DIFFICULTIES[1]} />
          <Input name="bestSeason" label="Best season" required defaultValue={d?.bestSeason} placeholder="Oct – Mar" />
          <Input name="groupSize" label="Group size" defaultValue={d?.groupSize ?? "Max 10"} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input name="priceFrom" label="Price from (USD)" type="number" min={0} step={1} defaultValue={d?.priceFrom ?? ""} hint="Leave blank for 'On request'." />
          <Input name="sortOrder" label="Sort order" type="number" step={1} defaultValue={d?.sortOrder ?? 0} hint="Lower numbers appear first." />
        </div>
        <Textarea name="highlights" label="Highlights" rows={5} defaultValue={d?.highlights.join("\n")} hint="One highlight per line." />
      </Group>

      <Group title="Itinerary">
        <Textarea
          name="itinerary"
          label="Day by day"
          rows={14}
          defaultValue={itineraryToText(parseItinerary(d?.itinerary))}
          hint={"First line of each block is the day's title, the rest is its description. Separate days with a line containing only ---"}
          placeholder={"Arrive in Puerto Natales\nSettle in, meet your guide, a slow dinner by the fjord.\n---\nInto the park\nThe first walk along Lago Nordenskjöld…"}
        />
      </Group>

      <Group title="Inclusions">
        <div className="grid gap-5 sm:grid-cols-2">
          <Textarea name="inclusions" label="What's included" rows={6} defaultValue={d?.inclusions.join("\n")} hint="One per line." />
          <Textarea name="exclusions" label="Not included" rows={6} defaultValue={d?.exclusions.join("\n")} hint="One per line." />
        </div>
      </Group>

      <Group title="Visibility">
        <div className="flex flex-col gap-3">
          <Checkbox name="featured" label="Featured on home page" defaultChecked={d?.featured ?? false} />
          <Checkbox name="published" label="Published" hint="Unpublished destinations are hidden from the site." defaultChecked={d?.published ?? true} />
        </div>
      </Group>
    </>
  );
}
