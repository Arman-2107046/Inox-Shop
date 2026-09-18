import { Checkbox, Input, Textarea } from "../_components/form";

export type FaqInitial = { question: string; answer: string; sortOrder: number; published: boolean };

export function FaqFields({ f }: { f?: FaqInitial }) {
  return (
    <>
      <Input name="question" label="Question" required defaultValue={f?.question} />
      <Textarea name="answer" label="Answer" rows={6} required defaultValue={f?.answer} hint="Separate paragraphs with a blank line." />
      <Input name="sortOrder" label="Sort order" type="number" step={1} defaultValue={f?.sortOrder ?? 0} className="sm:w-48" />
      <Checkbox name="published" label="Published" defaultChecked={f?.published ?? true} />
    </>
  );
}
