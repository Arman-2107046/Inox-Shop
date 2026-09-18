import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createStat } from "../actions";
import { StatFields } from "../stat-fields";

export default async function NewStatPage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New stat" />
      <div className="mt-6">
        <EntityForm action={createStat} submitLabel="Create stat" cancelHref="/admin/stats">
          <StatFields />
        </EntityForm>
      </div>
    </div>
  );
}
