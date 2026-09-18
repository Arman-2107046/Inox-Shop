import { Checkbox, Input, Textarea } from "../_components/form";

export type PageInitial = { title: string; slug: string; body: string; published: boolean };

export function PageFields({ p }: { p?: PageInitial }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="title" label="Title" required defaultValue={p?.title} placeholder="Privacy policy" />
        <Input name="slug" label="Slug" defaultValue={p?.slug} hint="Page lives at /<slug>. Leave blank to generate from the title." />
      </div>
      <Textarea name="body" label="Body" rows={18} required defaultValue={p?.body} hint="Separate paragraphs with a blank line." />
      <Checkbox name="published" label="Published" hint="Unpublished pages return 404 and are hidden from the footer." defaultChecked={p?.published ?? true} />
    </>
  );
}
