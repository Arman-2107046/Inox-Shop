import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createPage } from "../actions";
import { PageFields } from "../page-fields";

export default async function NewCmsPage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New page" />
      <div className="mt-6">
        <EntityForm action={createPage} submitLabel="Create page" cancelHref="/admin/pages">
          <PageFields />
        </EntityForm>
      </div>
    </div>
  );
}
