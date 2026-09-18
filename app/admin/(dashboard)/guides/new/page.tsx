import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createGuide } from "../actions";
import { GuideFields } from "../guide-fields";

export default async function NewGuidePage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New guide" />
      <div className="mt-6">
        <EntityForm action={createGuide} submitLabel="Create guide" cancelHref="/admin/guides">
          <GuideFields />
        </EntityForm>
      </div>
    </div>
  );
}
