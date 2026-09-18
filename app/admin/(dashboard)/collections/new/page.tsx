import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createCategory } from "../actions";
import { CategoryFields } from "../category-fields";

export default async function NewCollectionPage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New collection" />
      <div className="mt-6">
        <EntityForm action={createCategory} submitLabel="Create collection" cancelHref="/admin/collections">
          <CategoryFields />
        </EntityForm>
      </div>
    </div>
  );
}
