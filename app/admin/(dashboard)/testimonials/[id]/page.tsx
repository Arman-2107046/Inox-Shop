import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updateTestimonial } from "../actions";
import { TestimonialFields } from "../testimonial-fields";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <div>
      <PageHeader title={`Edit testimonial: ${t.name}`} />
      <div className="mt-6">
        <EntityForm action={updateTestimonial.bind(null, t.id)} submitLabel="Save changes" cancelHref="/admin/testimonials">
          <TestimonialFields t={t} />
        </EntityForm>
      </div>
    </div>
  );
}
