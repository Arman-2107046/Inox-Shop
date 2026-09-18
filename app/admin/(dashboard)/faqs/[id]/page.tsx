import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updateFaq } from "../actions";
import { FaqFields } from "../faq-fields";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const f = await prisma.faq.findUnique({ where: { id } });
  if (!f) notFound();

  return (
    <div>
      <PageHeader title="Edit question" />
      <div className="mt-6">
        <EntityForm action={updateFaq.bind(null, f.id)} submitLabel="Save changes" cancelHref="/admin/faqs">
          <FaqFields f={f} />
        </EntityForm>
      </div>
    </div>
  );
}
