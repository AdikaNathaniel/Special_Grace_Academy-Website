import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { getHeroPhotos } from "@/lib/pixieset";
import { headmasterMessage, leaderByRole, programs } from "@/lib/site";

const headmaster = leaderByRole("Headmaster");

export const metadata: Metadata = {
  title: "Academics",
  description: "Preschool, Primary and Junior High School programmes, plus cadets, music, entrepreneurship and STEM.",
};

const heroPhrases = [
  "A rigorous, faith-based education at every stage.",
  "From play-based preschool to BECE success.",
  "Strong foundations from the very first day.",
  "Confident readers and writers in Lower Primary.",
  "Critical thinkers in Upper Primary.",
  "Preparing JHS students for the BECE and beyond.",
  "Hands-on learning in STEM and robotics.",
  "Music, cadets and entrepreneurship too.",
  "Teachers who nurture every learner.",
  "Developing minds and character together.",
];

export default async function AcademicsPage() {
  const heroPhotos = await getHeroPhotos("academics");
  const levels = programs.filter((p) => p.kind === "level");
  const enrichment = programs.filter((p) => p.kind === "enrichment");

  return (
    <>
      <PageHero
        phrases={heroPhrases}
        image="/images/primary-computer.jpg"
        images={heroPhotos}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Headmaster's message" title="Welcome to our departments" />
          {/* The message sits beside the photo, vertically centred against it, on wide screens. */}
          <div className="mt-8 grid gap-10 lg:grid-cols-[20rem_1fr] lg:items-center lg:gap-14">
            <div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-3xl">
              <Image
                src={headmaster.photo}
                alt={`${headmaster.name}, ${headmaster.role}`}
                fill
                sizes="320px"
                className="object-cover"
                style={{ objectPosition: headmaster.focus }}
              />
            </div>
            <div>
              {headmasterMessage.map((p, i) => (
                <p key={i} className="mb-5 text-lg leading-relaxed text-grace-950/75">{p}</p>
              ))}
              <p className="font-display font-bold text-grace-900">{headmaster.name}</p>
              <p className="text-sm text-gold-600">{headmaster.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-grace-50 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Departments" title="Our school levels" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {levels.map((p) => (
              <Link
                key={p.slug}
                href={`/academics/${p.slug}`}
                className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-grace-100 transition hover:shadow-lg sm:grid-cols-2"
              >
                <div className="relative aspect-[4/3] sm:aspect-auto">
                  <Image src={p.image!} alt="" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold text-grace-900">{p.title}</h3>
                  <p className="mt-3 text-grace-950/70">{p.summary}</p>
                  <span className="mt-6 inline-block text-sm font-bold text-grace-500">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Beyond the classroom" title="Enrichment programmes" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {enrichment.map((p) => (
              <Link
                key={p.slug}
                href={`/academics/${p.slug}`}
                className="group rounded-2xl bg-grace-900 p-8 text-white transition hover:-translate-y-1 hover:bg-grace-700"
              >
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-3 text-sm text-grace-100">{p.summary}</p>
                <span className="mt-6 inline-block text-sm font-bold text-gold-500">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
