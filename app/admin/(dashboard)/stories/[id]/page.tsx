import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntityForm } from "../../_components/form";
import { PageHeader } from "../../_components/ui";
import { updateStory } from "../actions";
import { StoryFields } from "../story-fields";

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const s = await prisma.story.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <div>
      <PageHeader title={`Edit: ${s.title}`} description={`/journal/${s.slug}`} />
      <div className="mt-6">
        <EntityForm action={updateStory.bind(null, s.id)} submitLabel="Save changes" cancelHref="/admin/stories">
          <StoryFields s={s} />
        </EntityForm>
      </div>
    </div>
  );
}
