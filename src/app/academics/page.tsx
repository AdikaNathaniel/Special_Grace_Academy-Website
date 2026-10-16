import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { headmasterMessage, leaderByRole, programs } from "@/lib/site";

const headmaster = leaderByRole("Headmaster");

export const metadata: Metadata = {
  title: "Academics",
  description: "Preschool, Primary and Junior High School programmes, plus cadets, music, entrepreneurship and STEM.",
};

export default function AcademicsPage() {
  const levels = programs.filter((p) => p.kind === "level");
  const enrichment = programs.filter((p) => p.kind === "enrichment");

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="A rigorous, faith-based education at every stage."
        intro="From play-based preschool to BECE preparation in JHS, our departments work together to develop minds and character."
        image="/images/primary-computer.jpg"
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading eyebrow="Headmaster's message" title="Welcome to our departments" />
            <div className="relative mt-8 aspect-[4/5] max-w-xs overflow-hidden rounded-3xl">
              <Image
                src={headmaster.photo}
                alt={`${headmaster.name}, ${headmaster.role}`}
                fill
                sizes="320px"
                className="object-cover"
                style={{ objectPosition: headmaster.focus }}
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            {headmasterMessage.map((p, i) => (
              <p key={i} className="mb-5 text-lg leading-relaxed text-grace-950/75">{p}</p>
            ))}
            <p className="font-display font-bold text-grace-900">{headmaster.name}</p>
            <p className="text-sm text-gold-600">{headmaster.role}</p>
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
