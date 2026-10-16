import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Lightbox from "@/components/Lightbox";
import Slideshow from "@/components/Slideshow";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { getPixiesetPhotos, type PixiesetGallery } from "@/lib/pixieset";
import { programs } from "@/lib/site";

async function ProgramPhotos({ gallery, title }: { gallery: PixiesetGallery; title: string }) {
  const photos = await getPixiesetPhotos(gallery, `${title} at Special Grace Academy`);
  if (photos.length === 0) return null;
  return (
    <section className="bg-grace-50 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          // Phones: normal heading size, wrapping. Wider screens: one line, scaling with the screen.
          title={<span className="block sm:text-[clamp(1rem,3.2vw,2.25rem)] sm:whitespace-nowrap">{title} in action</span>}
        />
        <div className="mt-12">
          <Lightbox photos={photos} pageSize={24} />
        </div>
      </div>
    </section>
  );
}

function PhotosSkeleton() {
  return (
    <section className="bg-grace-50 py-20 sm:py-28" aria-busy>
      <div className="container-x grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-grace-100" />
        ))}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/academics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  return program ? { title: program.title, description: program.summary } : {};
}

// The page shell renders immediately; the slug-dependent content streams inside Suspense
// so client navigations stay instant (Cache Components requirement for URL data).
export default function ProgramPage({ params }: PageProps<"/academics/[slug]">) {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <ProgramContent params={params} />
    </Suspense>
  );
}

function HeroSkeleton() {
  return (
    <section className="bg-grace-900" aria-busy>
      <div className="container-x py-16 sm:py-24">
        <div className="h-3 w-32 animate-pulse rounded bg-white/20" />
        <div className="mt-5 h-10 w-2/3 max-w-xl animate-pulse rounded bg-white/20" />
        <div className="mt-5 h-4 w-1/2 max-w-md animate-pulse rounded bg-white/10" />
      </div>
    </section>
  );
}

async function ProgramContent({ params }: { params: PageProps<"/academics/[slug]">["params"] }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const others = programs.filter((p) => p.slug !== slug && p.kind === program.kind);

  // Programmes without their own photo rotate through the landscape shots in their Pixieset gallery.
  let featured: string[] = program.image ? [program.image] : [];
  if (featured.length === 0 && program.pixieset) {
    const photos = await getPixiesetPhotos(program.pixieset, `${program.title} at Special Grace Academy`);
    const landscape = photos.filter((p) => (p.width ?? 0) > (p.height ?? 0));
    featured = (landscape.length ? landscape : photos).map((p) => p.src);
  }

  return (
    <>
      <PageHero
        eyebrow={program.kind === "level" ? "Department" : "Enrichment programme"}
        title={program.title}
        intro={program.summary}
        image={program.image}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {program.body.map((p, i) => (
              <p key={i} className="mb-5 text-lg leading-relaxed text-grace-950/75">{p}</p>
            ))}
            {featured.length > 0 && (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-grace-50">
                <Slideshow images={featured} alt={`${program.title} at Special Grace Academy`} sizes="(min-width: 1024px) 66vw, 100vw" />
              </div>
            )}
          </div>
          <aside className="space-y-6">
            <div className="rounded-3xl bg-grace-50 p-8">
              <h2 className="font-display text-lg font-bold text-grace-900">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-grace-950/80">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-grace-900 p-8 text-white">
              <h2 className="font-display text-lg font-bold">Interested?</h2>
              <p className="mt-2 text-sm text-grace-100">Apply online or get in touch to arrange a visit.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/admissions#apply" className="btn-gold">Apply Now</Link>
                <Link href="/contact" className="btn-outline-light">Contact Us</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {program.pixieset && (
        <Suspense fallback={<PhotosSkeleton />}>
          <ProgramPhotos gallery={program.pixieset} title={program.title} />
        </Suspense>
      )}

      <section className="bg-cream py-16">
        <div className="container-x">
          <h2 className="font-display text-xl font-bold text-grace-900">
            {program.kind === "level" ? "Other departments" : "Other programmes"}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((p) => (
              <Link key={p.slug} href={`/academics/${p.slug}`} className="rounded-full bg-white px-5 py-2.5 font-display text-sm font-semibold text-grace-900 ring-1 ring-grace-200 hover:ring-gold-500">
                {p.title}
              </Link>
            ))}
            <Link href="/academics" className="rounded-full px-5 py-2.5 font-display text-sm font-bold text-grace-500">
              All academics →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
