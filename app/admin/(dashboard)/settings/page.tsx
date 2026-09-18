import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/content";
import { EntityForm, Input, Textarea } from "../_components/form";
import { PageHeader } from "../_components/ui";
import { saveSettings } from "./actions";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <legend className="px-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</legend>
      {children}
    </fieldset>
  );
}

export default async function SettingsPage() {
  await requireAdmin();
  const s = await getSettings();

  return (
    <div>
      <PageHeader title="Site settings" description="Branding, home page hero, about copy and contact details." />
      <div className="mt-6">
        <EntityForm action={saveSettings} submitLabel="Save settings" successMessage="Settings saved.">
          <Section title="Brand">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input name="siteName" label="Site name" required defaultValue={s.siteName} />
              <Input name="tagline" label="Tagline" required defaultValue={s.tagline} hint="Shown in the hero eyebrow and footer." />
            </div>
          </Section>

          <Section title="Home hero">
            <Input name="heroTitle" label="Headline" required defaultValue={s.heroTitle} />
            <Textarea name="heroSubtitle" label="Sub-headline" rows={2} required defaultValue={s.heroSubtitle} />
            <Input name="heroImage" label="Hero image URL" type="url" required defaultValue={s.heroImage} />
          </Section>

          <Section title="Home intro statement">
            <Textarea name="introStatement" label="Statement" rows={3} defaultValue={s.introStatement} hint="Large serif statement under the hero. Reveals word by word. Leave blank to hide." />
          </Section>

          <Section title="About">
            <Input name="aboutTitle" label="About headline" required defaultValue={s.aboutTitle} />
            <Textarea name="aboutBody" label="About text" rows={8} required defaultValue={s.aboutBody} hint="Separate paragraphs with a blank line." />
            <Input name="aboutImage" label="About image URL" type="url" required defaultValue={s.aboutImage} />
          </Section>

          <Section title="Impact page">
            <Input name="impactTitle" label="Headline" defaultValue={s.impactTitle} placeholder="Travel that leaves the ground better" />
            <Textarea name="impactBody" label="Intro text" rows={6} defaultValue={s.impactBody} hint="Separate paragraphs with a blank line." />
            <Input name="impactImage" label="Impact image URL" type="url" defaultValue={s.impactImage} hint="Falls back to the about image." />
          </Section>

          <Section title="Contact">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input name="email" label="Email" type="email" required defaultValue={s.email} />
              <Input name="phone" label="Phone" required defaultValue={s.phone} />
            </div>
            <Textarea name="address" label="Address" rows={2} required defaultValue={s.address} />
            <Input name="instagram" label="Instagram URL" type="url" defaultValue={s.instagram ?? ""} hint="Optional." />
          </Section>
        </EntityForm>
      </div>
    </div>
  );
}
