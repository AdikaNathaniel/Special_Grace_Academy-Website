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
    if (data.status !== "success" || !data.content) break;

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

// Page banners each show their own hand-picked photos (real photos of different activities, not flyers or
// STEM sessions), so no two pages ever show the same shot. They come from these galleries on
// https://specialgraceacademy.pixieset.com/studentexperience/ and play in the order listed.
// Each entry is the hash in the photo's Pixieset URL.
const heroGalleries: PixiesetGallery[] = [
  { collection: "studentexperience", gallery: "eventsexcursions" },
  { collection: "studentexperience", gallery: "carolservice" },
  { collection: "studentexperience", gallery: "successstoriestestimonials" },
];

const heroPicks = {
  "student-life": [
    "26b9b99a67216835d0052ffef462511d", // Cultural day in traditional attire
    "0eedca84ad5b1d98048dc5247b205ac0", // Cadet band
    "2ebb67e1925ab2c40bcad730d10e7bef", // Trip to Black Star Gate
    "5bf50a261862fe688601536320594d12", // Traditional ceremony
    "bd51d66f4c31ef5216964948b1ac4a36", // Marching band in red
    "317bbebbbc0cb1511534dbd199a3f709", // Dancing in kente
    "f944e59271872ca8a3e536daec0057cd", // Face painting
    "adf34a6df5ed208ce6a79bfabe035b44", // Lunch together
    "a43ae29faffe1116b3fc21cf04e9b121", // Cooking
    "28dd63ad6b2bd08eff90cf8e33b8900e", // Carol service
    "1ec6a097dadaddde4bb5dfa534c14f27", // Dance performance
    "9936cd75d5a31d6bf57658c2c14ead6a", // Kwame Nkrumah Memorial Park trip
    "da2855c01b95962165409576df0772b7", // Cadets
  ],
  "news": [
    "c8bf50f0e207b564c3d3790edbb7479a", // Graduation
    "883ac6a9ff02083b38d81799a19f31e3", // Ghana Library Authority visit
    "908c830e552f3ba62679a770d83dc9d3", // Friends in the courtyard
    "bb5548d21cfe496230a8eaf109c54c91", // Osagyefo statue trip
    "d58702671aa9131bbe9a715bb9c45454", // Maths quiz
    "33fd9b317db0be24a99538daf3e18908", // Library certificates
    "91fef142dae82a167d1c7ea5dddf299b", // Reading at the carol service
    "b97b6fe13b9f379cab6d42f9ab9ee3cc", // Exhibition day
    "2fbd35dd55a016413ecceee7fdbcab75", // Parade on the field
    "fd15489fd432ab1929d6b355648618af", // Proud readers
    "33dea705ec9e02ddf7dd610201fd71f3", // Drawing together
    "3709b22272541aa774d54f6901db4899", // Trumpet at the carol service
    "7d3581171318d8c64c7aaff7524eab25", // Cultural day with a teacher
    "56c545423c00189f4e8fc83c0111a387", // Presenting a project
  ],
  "gallery": [
    "c6e5febb6a3e52c93654eddd92a1ec50", // Friends in uniform
    "3ef1e57c43926b69ecb9f02e0a14ba45", // Big smile
    "e11374fabcb448a5f24d0f2b9f375e44", // Happy pupil
    "1736ff3d926eb2054d227da350a67ab0", // Girl in kente
    "43c4755b877a0c0cc9d71017d0031264", // Little royal in a crown
    "a69b1d9c447eaefc6a7bfd361f170191", // Cultural day portrait
    "e92d7272624f0d35cbf9c8a31b6ebbe2", // Best friends
    "66b445da7279fcba81a9a666866554d0", // Fun with sunglasses
    "eebb5c5b6e5a011235dfdd2b52c3afa0", // Art week drawing
    "51812a91a66d3dbc3e46576660a99183", // Kente at the carol service
    "9fc5fc163499bf936c9fbd0f552de330", // Carol singers
    "a9a06ad49de552cf520ae2919785b1a9", // Cultural dress
    "9d44a314a4415750561073269148b25a", // Dressed up for the day
  ],
  "contact": [
    "dcac2cb75ca6d466bff644c2f756ae7e", // In front of the school
    "bb57338769c320b68312de53f47cfea8", // Class photo
    "3f11478d6b1c72771ee36703048422c5", // Group photo
    "73e1cb9ebc73ae78ca953d3443702b5c", // Cultural day in the yard
    "46713159723de3a98dc94c634ab4c0df", // Lined up for an event
    "84eb08d8b5e04907b87afdf1ad2f034f", // Cultural day group
    "6a6bd660eb25a65e0dc89a4adde92294", // Independence Square trip
    "d63a25cbef12759adef4d0bcbee4b4ea", // Sports field
    "cc99d81ed991d835fb78b5c626d74864", // Classwork
    "48ae0cc9d2e59b106c869b6f4b6e548a", // Treats for the little ones
    "666239b0f4af586529f86e85ea0c6132", // Families at the carol service
    "26248345ebfb1497eb45f088058a4645", // Carol service audience
    "66102b3d3b5e0f5b8bd082ac6c8db33b", // Young carollers
    "79586c83d580ec41b0cac822bff38756", // Nativity reading
    "11ec35c52bed9a878511d8e0845ade9e", // Carol service performance
  ],
} satisfies Record<string, string[]>;

export type HeroPage = keyof typeof heroPicks;

/** A page's banner photos; empty if Pixieset is unreachable (the page then shows its fallback image). */
export async function getHeroPhotos(page: HeroPage): Promise<string[]> {
  const photos = (await Promise.all(heroGalleries.map((g) => getPixiesetPhotos(g, "")))).flat();
  return heroPicks[page].flatMap((hash) => photos.find((p) => p.src.includes(hash))?.src ?? []);
}
