import Link from "next/link";

type Props = {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  instagram?: string | null;
};

export function SiteFooter({ siteName, tagline, email, phone, address, instagram }: Props) {
  return (
    <footer className="bg-forest-950 text-cream-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <p className="font-display text-3xl font-medium">{siteName}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-sage-300">{tagline}</p>
        </div>

        <div>
          <p className="eyebrow text-gold-400">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-cream-50/80">
            <li><Link href="/destinations" className="hover:text-cream-50">Destinations</Link></li>
            <li><Link href="/journal" className="hover:text-cream-50">Journal</Link></li>
            <li><Link href="/about" className="hover:text-cream-50">About</Link></li>
            <li><Link href="/contact" className="hover:text-cream-50">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-400">Get in touch</p>
          <ul className="mt-5 space-y-3 text-sm text-cream-50/80">
            <li><a href={`mailto:${email}`} className="hover:text-cream-50">{email}</a></li>
            <li><a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-cream-50">{phone}</a></li>
            <li className="text-sage-300">{address}</li>
            {instagram && (
              <li>
                <a href={instagram} target="_blank" rel="noreferrer" className="hover:text-cream-50">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-sage-300/70 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p>Travel lightly. Leave only footprints.</p>
        </div>
      </div>
    </footer>
  );
}
