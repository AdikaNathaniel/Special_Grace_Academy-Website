import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import BackgroundVideo from "@/components/BackgroundVideo";
import Slideshow from "@/components/Slideshow";
import Typewriter from "@/components/Typewriter";
import type { NewsPost } from "@/lib/news";
import { formatDate } from "@/lib/news";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  images,
  phrases,
  youtubeId,
  videoStart,
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
  image?: string;
  /** Background photos that slowly crossfade every 10 seconds; `image` is used when this is empty. */
  images?: string[];
  /** Full-height banner with these phrases typed out in turn, centred near the bottom, in place of `title`. */
  phrases?: string[];
  /** Full-strength, muted, looping YouTube video behind the title, which sits centred near the bottom. */
  youtubeId?: string;
  /** Seconds into the video to begin playing. */
  videoStart?: number;
}) {
  // `dim` fades the photos into the violet background for banners with text over the left side.
  const background = (dim: boolean) =>
    images && images.length > 0 ? (
      <div className={`absolute inset-0 -z-10 ${dim ? "opacity-30" : ""}`}>
        <Slideshow images={images} alt="" interval={10_000} fade={2500} sizes="100vw" preload />
      </div>
    ) : (
      image && (
        <Image src={image} alt="" fill preload sizes="100vw" className={`-z-10 object-cover ${dim ? "opacity-30" : ""}`} />
      )
    );

  if (youtubeId || phrases) {
    return (
      <section data-no-reveal className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden bg-grace-900">
        {youtubeId ? (
          <BackgroundVideo youtubeId={youtubeId} start={videoStart} />
        ) : (
          // Full-strength photos, like the video banners; the title's shadow keeps it readable.
          background(false)
        )}
        <div className="container-x pb-12 text-center sm:pb-16">
          {/* Phones: a readable size, wrapping onto two lines. Wider screens: one line, scaling with the screen. */}
          <h1 className="font-display text-2xl leading-tight font-extrabold text-balance text-white [text-shadow:0_2px_16px_rgb(0_0_0/0.6)] sm:text-[clamp(1rem,3vw,2.5rem)] sm:whitespace-nowrap">
            {phrases ? <Typewriter phrases={phrases} /> : title}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section data-no-reveal className="relative isolate overflow-hidden bg-grace-900">
      {background(true)}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-grace-950/90 via-grace-900/70 to-grace-900/30" />
      <div className="container-x py-16 sm:py-24">
        {eyebrow && <p className="eyebrow text-gold-500">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-grace-100">{intro}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  light,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl font-extrabold sm:text-4xl ${light ? "text-white" : "text-grace-900"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-grace-100" : "text-grace-950/70"}`}>{intro}</p>}
    </div>
  );
}

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-grace-100 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] bg-grace-900">
        {post.images[0] ? (
          <Image
            src={post.images[0]}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Image src="/images/crest.png" alt="" width={72} height={79} className="opacity-90" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {post.date && <p className="text-xs font-bold tracking-wider text-gold-600 uppercase">{formatDate(post.date)}</p>}
        <h3 className="mt-2 font-display text-lg font-bold text-grace-900 group-hover:text-grace-500">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-grace-950/70">{post.excerpt}</p>
        <span className="mt-auto pt-4 text-sm font-bold text-grace-500">Read more →</span>
      </div>
    </Link>
  );
}

export function CtaBand() {
  return (
    <section className="bg-gold-500">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-grace-900 sm:text-3xl">
            Give your child a foundation for life.
          </h2>
          <p className="mt-2 text-grace-900/80">Admissions are open for Preschool, Primary and JHS.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admissions#apply" className="btn-purple">Apply Now</Link>
          <Link href="/contact" className="btn border-2 border-grace-900 text-grace-900 hover:bg-grace-900 hover:text-white">
            Book a Visit
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Slanted speech-bubble testimonial card with a large quote mark breaking out of the top-right corner. */
export function QuoteBubble({
  quote,
  by,
  tone = "gold",
  ring = "var(--color-grace-900)",
}: {
  quote: string;
  by: string;
  tone?: "gold" | "light";
  /** Colour of the section behind the card, used for the cut-out around the quote mark. */
  ring?: string;
}) {
  const fill = tone === "gold" ? "var(--color-gold-500)" : "var(--color-grace-100)";
  return (
    <figure className="relative pt-10">
      {/* Bubble shape: rising top edge, slanted right side, tail bottom-left. Stretches to fit the text. */}
      <svg viewBox="0 0 600 400" preserveAspectRatio="none" className="absolute inset-x-0 top-10 bottom-0 h-[calc(100%-2.5rem)] w-full" aria-hidden>
        <path
          d="M40,42 L555,8 Q596,6 592,48 L542,328 Q534,362 496,362 L132,358 L102,398 L106,357 L58,355 Q14,353 13,312 L8,84 Q6,46 40,42 Z"
          fill={fill}
        />
      </svg>
      <span
        aria-hidden
        className="absolute top-0 right-[14%] flex h-24 w-24 items-center justify-center rounded-full font-display text-[7rem] leading-none font-extrabold"
        style={{ background: ring, color: fill }}
      >
        <span className="translate-y-6">“</span>
      </span>
      <div className="relative pt-16 pr-14 pb-24 pl-8 text-center text-grace-900 sm:px-16">
        <blockquote className="font-display text-2xl leading-snug font-bold sm:text-3xl">{quote}</blockquote>
        <figcaption className="mt-6 flex items-center justify-center gap-3 text-grace-900/80">
          <span className="h-0.5 w-8 bg-grace-900/60" aria-hidden />
          {by}
        </figcaption>
      </div>
    </figure>
  );
}

/** A YouTube video that plays in place. It loads only when scrolled near, and suggests no other channels' videos. */
export function YouTubeEmbed({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-3xl bg-grace-900 shadow-xl ring-1 ring-grace-100 ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
