import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { leaders, mission, proprietressMessage, school, values, vision } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Our vision, mission, values and leadership at Special Grace Academy.",
};

function initials(name: string) {
  return name
    .replace(/^(Apostle|Bishop|Mr\.|Ms\.|Mrs\.|Dr\.)\s+/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Faith, excellence and character since 2009."
        youtubeId={school.aboutVideo.id}
        videoStart={school.aboutVideo.start}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-grace-900 p-10 text-white">
            <p className="eyebrow text-gold-500">Our vision</p>
            <p className="mt-4 font-display text-2xl leading-snug font-bold">{vision}</p>
          </div>
          <div className="rounded-3xl bg-gold-100 p-10">
            <p className="eyebrow">Our mission</p>
            <ol className="mt-4 space-y-4">
              {mission.map((m, i) => (
                <li key={i} className="flex gap-4 text-lg text-grace-900">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-grace-900 font-display text-sm font-bold text-gold-500">
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow="Our values" title="What we stand for" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-8 ring-1 ring-grace-100">
                <div className="h-1.5 w-10 rounded-full bg-gold-500" />
                <h3 className="mt-5 font-display text-xl font-bold text-grace-900">{v.title}</h3>
                <p className="mt-2 text-grace-950/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-5">
          <div className="relative mx-auto aspect-square w-full max-w-sm lg:col-span-2">
            <Image src="/images/logo-full.jpg" alt="Special Grace Academy crest" fill sizes="384px" className="rounded-3xl object-contain" />
          </div>
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="Welcome message" title="From our Proprietress" />
            {proprietressMessage.map((p, i) => (
              <p key={i} className="mt-5 text-lg leading-relaxed text-grace-950/75">{p}</p>
            ))}
            <p className="mt-6 font-display font-bold text-grace-900">Apostle Hannah Etsiakoh</p>
            <p className="text-sm text-gold-600">Proprietress</p>
          </div>
        </div>
      </section>

      <section className="bg-grace-50 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow="Leadership" title="Management & academic leadership" />
          {(["management", "academics"] as const).map((group) => (
            <div key={group} className="mt-12">
              <h3 className="text-center font-display text-sm font-bold tracking-widest text-grace-500 uppercase">
                {group === "management" ? "Management" : "Academics"}
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {leaders
                  .filter((l) => l.group === group)
                  .map((l) => (
                    <div key={l.name} className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-grace-100">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-grace-900 font-display text-2xl font-extrabold text-gold-500 ring-4 ring-gold-500/40">
                        {initials(l.name)}
                      </div>
                      <p className="mt-5 font-display text-lg font-bold text-grace-900">{l.name}</p>
                      <p className="text-sm font-semibold text-gold-600">{l.role}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
