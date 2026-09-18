import { requireAdmin } from "@/lib/auth";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { createStory } from "../actions";
import { StoryFields } from "../story-fields";

export default async function NewStoryPage() {
  await requireAdmin();
  return (
    <div>
      <PageHeader title="New story" />
      <div className="mt-6">
        <EntityForm action={createStory} submitLabel="Create story" cancelHref="/admin/stories">
          <StoryFields />
        </EntityForm>
      </div>
    </div>
  );
}
