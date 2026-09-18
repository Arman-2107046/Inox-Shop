import { Input } from "../_components/form";

export type StatInitial = { value: number; suffix: string; label: string; sortOrder: number };

export function StatFields({ s }: { s?: StatInitial }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-3">
        <Input name="value" label="Value" type="number" min={0} step={1} required defaultValue={s?.value} hint="Animates up from zero on the site." />
        <Input name="suffix" label="Suffix" defaultValue={s?.suffix} placeholder="+, %, k" />
        <Input name="sortOrder" label="Sort order" type="number" step={1} defaultValue={s?.sortOrder ?? 0} />
      </div>
      <Input name="label" label="Label" required defaultValue={s?.label} placeholder="Travellers guided" />
    </>
  );
}
