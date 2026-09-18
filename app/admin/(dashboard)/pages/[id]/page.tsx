import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updatePage } from "../actions";
import { PageFields } from "../page-fields";

export default async function EditCmsPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const p = await prisma.page.findUnique({ where: { id } });
  if (!p) notFound();

  return (
    <div>
      <PageHeader title={`Edit: ${p.title}`} description={`/${p.slug}`} />
      <div className="mt-6">
        <EntityForm action={updatePage.bind(null, p.id)} submitLabel="Save changes" cancelHref="/admin/pages">
          <PageFields p={p} />
        </EntityForm>
      </div>
    </div>
  );
}
