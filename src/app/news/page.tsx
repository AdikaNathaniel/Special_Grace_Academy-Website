import type { Metadata } from "next";
import { NewsCard, PageHero } from "@/components/ui";
import { getHeroPhotos } from "@/lib/pixieset";
import { news } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Updates, events and announcements from Special Grace Academy.",
};

const heroPhrases = [
  "Updates from our school community.",
  "Celebrating our students' achievements.",
  "Events, visits and special days.",
  "Stories from our classrooms.",
  "Proud moments worth sharing.",
  "What's happening at Special Grace.",
  "Announcements for parents and families.",
  "Highlights from across the school year.",
  "Our community in the spotlight.",
  "Every milestone, every success.",
];

export default async function NewsPage() {
  const heroPhotos = await getHeroPhotos("news");
  return (
    <>
      <PageHero
        phrases={heroPhrases}
        image="/images/police-visit-group.png"
        images={heroPhotos}
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
