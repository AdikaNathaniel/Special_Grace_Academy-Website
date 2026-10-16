import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import { CtaBand, NewsCard, QuoteBubble, SectionHeading } from "@/components/ui";
import { news } from "@/lib/news";
import { programs, school, testimonial } from "@/lib/site";

const levels = programs.filter((p) => p.kind === "level");

const moments = [
  { src: "/images/art-week.jpg", alt: "Pupils drawing together during art week" },
  { src: "/images/trip-nkrumah-mausoleum.jpg", alt: "Students at the Kwame Nkrumah Memorial Park" },
  { src: "/images/library-award.jpg", alt: "Students receiving certificates at the Ghana Library Authority" },
  { src: "/images/face-paint.jpg", alt: "A pupil with face paint smiling at the camera" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden bg-grace-950">
        <BackgroundVideo youtubeId={school.heroVideo.id} start={school.heroVideo.start} />
        <div className="container-x pb-12 text-center sm:pb-16">
          {/* One line at every width: the font scales with the screen instead of wrapping. */}
          <h1 className="font-display text-[clamp(0.75rem,3.2vw,2.75rem)] font-extrabold whitespace-nowrap text-white [text-shadow:0_2px_16px_rgb(0_0_0/0.6)]">
            Raising brilliant, <span className="text-gold-500">God-fearing</span> children.
          </h1>
        </div>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/images/classroom-writing.jpg" alt="Pupils writing in class" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -bottom-6 rounded-2xl bg-grace-900 px-6 py-5 text-white shadow-xl sm:-right-6">
              <p className="font-display text-3xl font-extrabold text-gold-500">Est. {school.founded}</p>
              <p className="text-sm text-grace-100">{school.motto}</p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="About us"
              title="A Christian school where every child is a gift."
            />
            <p className="mt-6 text-lg leading-relaxed text-grace-950/75">
              Special Grace Academy combines faith, academic excellence and moral growth. We see every child as a gift with unique
              potential, and we develop that potential through biblically grounded teaching, rigorous academics and caring mentorship.
            </p>
            <p className="mt-4 leading-relaxed text-grace-950/75">
              We prepare our students not just for exams, but for life.
            </p>
            <Link href="/about" className="btn-purple mt-8">Learn More About Us</Link>
          </div>
        </div>
      </section>

      {/* Academics */}
      <section className="bg-grace-50 py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Academics"
              title="Learning at every stage"
              intro="From the first day of preschool to the BECE, we guide each child step by step."
            />
            <Link href="/academics" className="font-display text-sm font-bold text-grace-500 hover:text-grace-900">
              All programmes →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((p) => (
              <Link
                key={p.slug}
                href={`/academics/${p.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-grace-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={p.image!} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-grace-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-grace-950/70">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / BECE */}
      <section className="bg-grace-900 py-20 text-white sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuoteBubble quote={testimonial.quote} by={`${testimonial.by}, Special Grace Academy`} />
          </div>
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 lg:col-span-2">
            <p className="eyebrow text-gold-500">2024 BECE</p>
            <p className="mt-3 font-display text-4xl font-extrabold whitespace-nowrap text-gold-500 sm:text-5xl">Aggregate 7</p>
            <p className="mt-3 text-grace-100">
              Congratulations to Phyllisangel Frema Jingles on an outstanding result in the Basic Education Certificate Examination.
            </p>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="News & events" title="What's happening at school" />
            <Link href="/news" className="font-display text-sm font-bold text-grace-500 hover:text-grace-900">
              All news →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow="Student life" title="Moments of learning and growth" />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {moments.map((m, i) => (
              <div key={m.src} className={`relative overflow-hidden rounded-2xl ${i % 2 ? "aspect-[3/4] lg:mt-10" : "aspect-[3/4]"}`}>
                <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/gallery" className="btn-purple">View the Gallery</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
