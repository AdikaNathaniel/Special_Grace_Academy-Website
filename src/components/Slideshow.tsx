"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Crossfades through images, advancing every `interval` ms. Only the current and next images are mounted. */
export default function Slideshow({
  images,
  alt,
  interval = 5000,
  sizes,
}: {
  images: string[];
  alt: string;
  interval?: number;
  sizes: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const next = (index + 1) % images.length;

  return (
    <>
      {images.map((src, i) =>
        // Keep the next image mounted (hidden) so it is already loaded when its turn comes.
        i === index || i === next ? (
          <Image
            key={src}
            src={src}
            alt={i === index ? alt : ""}
            fill
            sizes={sizes}
            className={`object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ) : null,
      )}
    </>
  );
}
