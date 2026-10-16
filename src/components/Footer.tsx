import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import { navLinks, school } from "@/lib/site";

// Cached so the page stays static; the year refreshes on each deploy.
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="bg-grace-950 text-grace-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <Image src="/images/crest.png" alt="" width={52} height={57} />
            <div>
              <p className="font-display text-lg font-extrabold tracking-wide text-white">SPECIAL GRACE ACADEMY</p>
              <p className="text-xs font-semibold tracking-[0.18em] text-gold-500 uppercase">
                {school.levels.join(" · ")}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-grace-200">{school.summary}</p>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-widest text-gold-500 uppercase">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-400">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-widest text-gold-500 uppercase">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>{school.address}</li>
            <li><a href={school.phoneHref} className="hover:text-gold-400">{school.phone}</a></li>
            <li><a href={`mailto:${school.email}`} className="break-all hover:text-gold-400">{school.email}</a></li>
          </ul>
          <SocialLinks className="mt-5" />
        </div>
      </div>
      <div className="border-t border-grace-900">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-grace-200 sm:flex-row sm:justify-between">
          <p>© <CurrentYear /> {school.name}. All rights reserved.</p>
          <p>{school.motto} · Est. {school.founded}</p>
        </div>
      </div>
    </footer>
  );
}
