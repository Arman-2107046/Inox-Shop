import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: { default: s.siteName, template: `%s · ${s.siteName}` },
    description: s.tagline,
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <SiteHeader siteName={s.siteName} />
      <div className="flex-1">{children}</div>
      <SiteFooter
        siteName={s.siteName}
        tagline={s.tagline}
        email={s.email}
        phone={s.phone}
        address={s.address}
        instagram={s.instagram}
      />
    </>
  );
}
