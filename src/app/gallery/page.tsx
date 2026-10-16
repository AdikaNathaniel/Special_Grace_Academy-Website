import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Lightbox, { type Photo } from "@/components/Lightbox";
import { PageHero } from "@/components/ui";
import { getHeroPhotos } from "@/lib/pixieset";

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

const heroPhrases = [
  "Moments of learning and growth.",
  "Smiles from every classroom.",
  "Field trips captured in pictures.",
  "Celebrations we'll always remember.",
  "Creativity on full display.",
  "Little hands, big ideas.",
  "Friendship, faith and fun.",
  "Snapshots of everyday wonder.",
  "Our story, one photo at a time.",
  "Memories made at Special Grace.",
];

export default async function GalleryPage() {
  const heroPhotos = await getHeroPhotos("gallery");
  const photos = getPhotos();
  return (
    <>
      <PageHero
        phrases={heroPhrases}
        image="/images/art-week.jpg"
        images={heroPhotos}
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
