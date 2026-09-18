import { Checkbox, Input, Textarea } from "../_components/form";

export type StoryInitial = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  readMinutes: number;
  publishedAt: Date;
  published: boolean;
};

export function StoryFields({ s }: { s?: StoryInitial }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="title" label="Title" required defaultValue={s?.title} />
        <Input name="slug" label="Slug" defaultValue={s?.slug} hint="Leave blank to generate from the title." />
      </div>
      <Textarea name="excerpt" label="Excerpt" rows={3} required defaultValue={s?.excerpt} hint="Shown on cards and as the article intro." />
      <Textarea name="body" label="Body" rows={16} required defaultValue={s?.body} hint="Separate paragraphs with a blank line." />
      <Input name="coverImage" label="Cover image URL" type="url" required defaultValue={s?.coverImage} placeholder="https://…" />
      <div className="grid gap-5 sm:grid-cols-3">
        <Input name="author" label="Author" required defaultValue={s?.author} />
        <Input name="readMinutes" label="Read time (minutes)" type="number" min={1} step={1} defaultValue={s?.readMinutes ?? 5} />
        <Input
          name="publishedAt"
          label="Publish date"
          type="date"
          defaultValue={(s?.publishedAt ?? new Date()).toISOString().slice(0, 10)}
        />
      </div>
      <Checkbox name="published" label="Published" hint="Unpublished stories are hidden from the site." defaultChecked={s?.published ?? true} />
    </>
  );
}
