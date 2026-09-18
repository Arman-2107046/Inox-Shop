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
  duration: string;
  difficulty: string;
  bestSeason: string;
  priceFrom: number | null;
  sortOrder: number;
  featured: boolean;
  published: boolean;
};

/** Field markup shared by the create and edit pages. */
export function DestinationFields({ d }: { d?: DestinationInitial }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="name" label="Name" required defaultValue={d?.name} placeholder="Torres del Paine" />
        <Input name="slug" label="Slug" defaultValue={d?.slug} hint="Leave blank to generate from the name." placeholder="torres-del-paine" />
      </div>
      <Input name="region" label="Region" required defaultValue={d?.region} placeholder="Patagonia, Chile" />
      <Input name="tagline" label="Tagline" required defaultValue={d?.tagline} placeholder="One sentence shown on cards and the hero." />
      <Textarea
        name="description"
        label="Description"
        rows={10}
        required
        defaultValue={d?.description}
        hint="Separate paragraphs with a blank line."
      />
      <Input name="heroImage" label="Hero image URL" type="url" required defaultValue={d?.heroImage} placeholder="https://…" />
      <Textarea
        name="gallery"
        label="Gallery image URLs"
        rows={4}
        defaultValue={d?.gallery.join("\n")}
        hint="One https:// URL per line. The first is shown largest."
      />
      <Textarea
        name="highlights"
        label="Highlights"
        rows={5}
        defaultValue={d?.highlights.join("\n")}
        hint="One highlight per line."
      />
      <div className="grid gap-5 sm:grid-cols-3">
        <Input name="duration" label="Duration" required defaultValue={d?.duration} placeholder="8 days" />
        <Select name="difficulty" label="Difficulty" options={DIFFICULTIES} defaultValue={d?.difficulty ?? DIFFICULTIES[1]} />
        <Input name="bestSeason" label="Best season" required defaultValue={d?.bestSeason} placeholder="Oct – Mar" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="priceFrom" label="Price from (USD)" type="number" min={0} step={1} defaultValue={d?.priceFrom ?? ""} hint="Leave blank for 'On request'." />
        <Input name="sortOrder" label="Sort order" type="number" step={1} defaultValue={d?.sortOrder ?? 0} hint="Lower numbers appear first." />
      </div>
      <div className="flex flex-col gap-3 pt-2">
        <Checkbox name="featured" label="Featured on home page" defaultChecked={d?.featured ?? false} />
        <Checkbox name="published" label="Published" hint="Unpublished destinations are hidden from the site." defaultChecked={d?.published ?? true} />
      </div>
    </>
  );
}
