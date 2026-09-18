import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updateDestination } from "../actions";
import { DestinationFields } from "../destination-fields";

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const [d, categories] = await Promise.all([
    prisma.destination.findUnique({ where: { id }, include: { categories: { select: { id: true } } } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!d) notFound();

  return (
    <div>
      <PageHeader title={`Edit: ${d.name}`} description={`/destinations/${d.slug}`} />
      <div className="mt-6">
        <EntityForm action={updateDestination.bind(null, d.id)} submitLabel="Save changes" cancelHref="/admin/destinations">
          <DestinationFields d={d} categories={categories} />
        </EntityForm>
      </div>
    </div>
  );
}
