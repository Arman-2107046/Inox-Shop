import { Checkbox, Input, Textarea } from "../_components/form";

export type TestimonialInitial = { quote: string; name: string; detail: string; sortOrder: number; published: boolean };

export function TestimonialFields({ t }: { t?: TestimonialInitial }) {
  return (
    <>
      <Textarea name="quote" label="Quote" rows={4} required defaultValue={t?.quote} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="name" label="Name" required defaultValue={t?.name} />
        <Input name="detail" label="Detail" defaultValue={t?.detail} placeholder="Patagonia, 2025" hint="Shown under the name." />
      </div>
      <Input name="sortOrder" label="Sort order" type="number" step={1} defaultValue={t?.sortOrder ?? 0} className="sm:w-48" />
      <Checkbox name="published" label="Published" defaultChecked={t?.published ?? true} />
    </>
  );
}
