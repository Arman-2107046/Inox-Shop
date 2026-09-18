import type { Metadata } from "next";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { getPublishedPages, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: { default: s.siteName, template: `%s · ${s.siteName}` },
    description: s.tagline,
    openGraph: { siteName: s.siteName, images: [s.heroImage] },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [s, pages] = await Promise.all([getSettings(), getPublishedPages()]);
  return (
    <SmoothScroll>
      <SiteHeader siteName={s.siteName} email={s.email} />
      <div className="flex-1">{children}</div>
      <SiteFooter
        siteName={s.siteName}
        tagline={s.tagline}
        email={s.email}
        phone={s.phone}
        address={s.address}
        instagram={s.instagram}
        pages={pages}
      />
    </SmoothScroll>
  );
}
