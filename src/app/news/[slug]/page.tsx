import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NewsCard } from "@/components/ui";
import { formatDate, news } from "@/lib/news";

export function generateStaticParams() {
  return news.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = news.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

// The page shell renders immediately; the slug-dependent content streams inside Suspense
// so client navigations stay instant (Cache Components requirement for URL data).
export default function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <NewsPostContent params={params} />
    </Suspense>
  );
}

function HeroSkeleton() {
  return (
    <section className="py-16 sm:py-20" aria-busy>
      <div className="container-x">
        <div className="h-3 w-24 animate-pulse rounded bg-grace-100" />
        <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-grace-100" />
        <div className="mt-10 aspect-16/10 animate-pulse rounded-3xl bg-grace-50 lg:aspect-2/1" />
      </div>
    </section>
  );
}

async function NewsPostContent({ params }: { params: PageProps<"/news/[slug]">["params"] }) {
  const { slug } = await params;
  const post = news.find((p) => p.slug === slug);
  if (!post) notFound();

  const [cover, ...rest] = post.images;
  const more = news.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="py-16 sm:py-20">
        <div className="container-x">
          <Link href="/news" className="text-sm font-bold text-grace-500 hover:text-grace-900">← All news</Link>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-grace-900 sm:text-5xl">{post.title}</h1>

          {(post.date || post.time || post.venue) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              {post.date && (
                <div><dt className="inline font-bold text-grace-900">Date: </dt><dd className="inline text-grace-950/70">{formatDate(post.date)}</dd></div>
              )}
              {post.time && (
                <div><dt className="inline font-bold text-grace-900">Time: </dt><dd className="inline text-grace-950/70">{post.time}</dd></div>
              )}
              {post.venue && (
                <div><dt className="inline font-bold text-grace-900">Venue: </dt><dd className="inline text-grace-950/70">{post.venue}</dd></div>
              )}
            </dl>
          )}

          {cover && (
            <div className="relative mt-10 aspect-16/10 overflow-hidden rounded-3xl bg-grace-50 lg:aspect-2/1">
              <Image src={cover} alt="" fill preload sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
            </div>
          )}

          <div className="mt-10 space-y-5 text-lg leading-relaxed text-grace-950/80">
            {post.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {rest.length > 0 && (
            <div className={`mt-10 grid gap-4 sm:grid-cols-2 ${rest.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {rest.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </article>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl font-extrabold text-grace-900">More news</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
