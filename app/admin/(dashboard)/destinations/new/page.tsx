import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createDestination } from "../actions";
import { DestinationFields } from "../destination-fields";

export default async function NewDestinationPage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New destination" />
      <div className="mt-6">
        <EntityForm action={createDestination} submitLabel="Create destination" cancelHref="/admin/destinations">
          <DestinationFields />
        </EntityForm>
      </div>
    </div>
  );
}
