"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Crossfades through images, advancing every `interval` ms over `fade` ms.
 * Only the previous (fading out), current and next (preloading) images are mounted.
 */
export default function Slideshow({
  images,
  alt,
  interval = 5000,
  fade = 1000,
  sizes,
  preload,
}: {
  images: string[];
  alt: string;
  interval?: number;
  fade?: number;
  sizes: string;
  /** Preload the first image (for slideshows above the fold). */
  preload?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const prev = (index - 1 + images.length) % images.length;
  const next = (index + 1) % images.length;

  return (
    <>
      {images.map((src, i) =>
        // The previous image stays mounted while it fades out; the next is mounted (hidden) so it is
        // already loaded when its turn comes.
        i === index || i === prev || i === next ? (
          <Image
            key={src}
            src={src}
            alt={i === index ? alt : ""}
            fill
            sizes={sizes}
            preload={preload && i === 0}
            style={{ transitionDuration: `${fade}ms` }}
            className={`object-cover transition-opacity ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ) : null,
      )}
    </>
  );
}
