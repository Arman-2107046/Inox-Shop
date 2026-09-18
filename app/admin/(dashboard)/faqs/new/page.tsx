import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createFaq } from "../actions";
import { FaqFields } from "../faq-fields";

export default async function NewFaqPage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New question" />
      <div className="mt-6">
        <EntityForm action={createFaq} submitLabel="Create question" cancelHref="/admin/faqs">
          <FaqFields />
        </EntityForm>
      </div>
    </div>
  );
}
