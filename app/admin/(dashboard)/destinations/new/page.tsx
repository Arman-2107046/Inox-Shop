import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createDestination } from "../actions";
import { DestinationFields } from "../destination-fields";

export default async function NewDestinationPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } });
  return (
    <div>
      <PageHeader title="New destination" />
      <div className="mt-6">
        <EntityForm action={createDestination} submitLabel="Create destination" cancelHref="/admin/destinations">
          <DestinationFields categories={categories} />
        </EntityForm>
      </div>
    </div>
  );
}
