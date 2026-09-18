import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createTestimonial } from "../actions";
import { TestimonialFields } from "../testimonial-fields";

export default async function NewTestimonialPage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New testimonial" />
      <div className="mt-6">
        <EntityForm action={createTestimonial} submitLabel="Create testimonial" cancelHref="/admin/testimonials">
          <TestimonialFields />
        </EntityForm>
      </div>
    </div>
  );
}
