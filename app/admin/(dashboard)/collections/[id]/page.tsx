import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updateCategory } from "../actions";
import { CategoryFields } from "../category-fields";

export default async function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const c = await prisma.category.findUnique({ where: { id } });
  if (!c) notFound();

  return (
    <div>
      <PageHeader title={`Edit: ${c.name}`} description={`/collections/${c.slug}`} />
      <div className="mt-6">
        <EntityForm action={updateCategory.bind(null, c.id)} submitLabel="Save changes" cancelHref="/admin/collections">
          <CategoryFields c={c} />
        </EntityForm>
      </div>
    </div>
  );
}
