import type { Metadata } from "next";
import { NewsCard, PageHero } from "@/components/ui";
import { news } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Updates, events and announcements from Special Grace Academy.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & events"
        title="Updates from our school community."
        intro="Events, achievements and announcements from Special Grace Academy."
        image="/images/police-visit-group.png"
      />
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
