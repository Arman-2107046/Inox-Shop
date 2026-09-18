import { Checkbox, Input, Textarea } from "../_components/form";

export type GuideInitial = { name: string; role: string; location: string; bio: string; image: string; sortOrder: number; published: boolean };

export function GuideFields({ g }: { g?: GuideInitial }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-3">
        <Input name="name" label="Name" required defaultValue={g?.name} />
        <Input name="role" label="Role" required defaultValue={g?.role} placeholder="Lead guide, naturalist" />
        <Input name="location" label="Location" required defaultValue={g?.location} placeholder="Puerto Natales, Chile" />
      </div>
      <Textarea name="bio" label="Bio" rows={5} required defaultValue={g?.bio} />
      <Input name="image" label="Portrait URL" type="url" required defaultValue={g?.image} placeholder="https://…" hint="Portrait orientation works best (3:4)." />
      <Input name="sortOrder" label="Sort order" type="number" step={1} defaultValue={g?.sortOrder ?? 0} className="sm:w-48" />
      <Checkbox name="published" label="Published" defaultChecked={g?.published ?? true} />
    </>
  );
}
