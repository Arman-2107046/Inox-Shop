import { Checkbox, Input, Textarea } from "../_components/form";

export type CategoryInitial = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  sortOrder: number;
  published: boolean;
};

export function CategoryFields({ c }: { c?: CategoryInitial }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="name" label="Name" required defaultValue={c?.name} placeholder="Forest" />
        <Input name="slug" label="Slug" defaultValue={c?.slug} hint="Leave blank to generate from the name." />
      </div>
      <Input name="tagline" label="Tagline" required defaultValue={c?.tagline} placeholder="One line shown on the card and hero." />
      <Textarea name="description" label="Description" rows={6} required defaultValue={c?.description} hint="Separate paragraphs with a blank line." />
      <Input name="image" label="Image URL" type="url" required defaultValue={c?.image} placeholder="https://…" />
      <Input name="sortOrder" label="Sort order" type="number" step={1} defaultValue={c?.sortOrder ?? 0} className="sm:w-48" />
      <Checkbox name="published" label="Published" defaultChecked={c?.published ?? true} />
    </>
  );
}
