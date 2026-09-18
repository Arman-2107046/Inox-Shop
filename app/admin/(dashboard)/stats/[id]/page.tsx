import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updateStat } from "../actions";
import { StatFields } from "../stat-fields";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const s = await prisma.stat.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <div>
      <PageHeader title={`Edit: ${s.label}`} />
      <div className="mt-6">
        <EntityForm action={updateStat.bind(null, s.id)} submitLabel="Save changes" cancelHref="/admin/stats">
          <StatFields s={s} />
        </EntityForm>
      </div>
    </div>
  );
}
