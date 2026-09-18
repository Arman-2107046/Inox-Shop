import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updateGuide } from "../actions";
import { GuideFields } from "../guide-fields";

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const g = await prisma.guide.findUnique({ where: { id } });
  if (!g) notFound();

  return (
    <div>
      <PageHeader title={`Edit: ${g.name}`} />
      <div className="mt-6">
        <EntityForm action={updateGuide.bind(null, g.id)} submitLabel="Save changes" cancelHref="/admin/guides">
          <GuideFields g={g} />
        </EntityForm>
      </div>
    </div>
  );
}
