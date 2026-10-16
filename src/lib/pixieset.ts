import { cacheLife } from "next/cache";
import type { Photo } from "@/components/Lightbox";

// Photos live in the school's Pixieset account:
// https://specialgraceacademy.pixieset.com/<collection>/<gallery>/
const SITE = "https://specialgraceacademy.pixieset.com";

// Collections and their numeric ids (found in the collection page's source).
const collections = {
  studentexperience: 88905730,
} as const;

export type PixiesetGallery = { collection: keyof typeof collections; gallery: string };

type RawPhoto = {
  id: number;
  name: string;
  width: number;
  height: number;
  pathLarge: string;
  pathXlarge: string;
};

const MAX_PAGES = 50; // Pixieset returns ~8 photos per page.

/** All photos in a Pixieset gallery, refreshed every few hours so new uploads appear automatically. */
export async function getPixiesetPhotos({ collection, gallery }: PixiesetGallery, alt: string): Promise<Photo[]> {
  "use cache";
  cacheLife("hours");

  const photos: Photo[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `${SITE}/client/loadphotos/?cuk=${collection}&cid=${collections[collection]}&gs=${gallery}&page=${page}`;
    let data: { status: string; content: string; isLastPage: boolean };
    try {
      const res = await fetch(url, { headers: { "X-Requested-With": "XMLHttpRequest" } });
      if (!res.ok) break;
      data = await res.json();
    } catch {
      break; // Show whatever loaded rather than failing the page.
    }
    if (data.status !== "success") break;

    for (const p of JSON.parse(data.content) as RawPhoto[]) {
      // Pixieset caps "xlarge" at 1600px on the long edge; keep the original aspect ratio.
      const scale = 1600 / Math.max(p.width, p.height);
      photos.push({
        src: `https:${p.pathXlarge}`,
        alt,
        width: Math.round(p.width * scale),
        height: Math.round(p.height * scale),
      });
    }
    if (data.isLastPage) break;
  }
  return photos;
}
