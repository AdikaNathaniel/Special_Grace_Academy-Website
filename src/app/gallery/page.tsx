import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Lightbox, { type Photo } from "@/components/Lightbox";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of learning, trips and celebrations at Special Grace Academy.",
};

// Every image dropped into /public/images/gallery appears here automatically.
function getPhotos(): Photo[] {
  const dir = path.join(process.cwd(), "public", "images", "gallery");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  return files
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => ({ src: `/images/gallery/${f}`, alt: "Special Grace Academy school life" }));
}

export default function GalleryPage() {
  const photos = getPhotos();
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments of learning and growth."
        intro="Classroom life, field trips, celebrations and special visits."
        image="/images/art-week.jpg"
      />
      <section className="py-16 sm:py-24">
        <div className="container-x">
          {photos.length > 0 ? (
            <Lightbox photos={photos} />
          ) : (
            <p className="text-center text-grace-950/60">Photos coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
