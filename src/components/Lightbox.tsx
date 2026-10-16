"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type Photo = { src: string; alt: string; width?: number; height?: number };

export default function Lightbox({ photos, pageSize }: { photos: Photo[]; pageSize?: number }) {
  const [index, setIndex] = useState<number | null>(null);
  const [shown, setShown] = useState(pageSize ?? photos.length);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {photos.slice(0, shown).map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group mb-4 block w-full overflow-hidden rounded-2xl focus-visible:outline-3 focus-visible:outline-gold-500"
            aria-label={`Open photo ${i + 1}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width ?? 800}
              height={p.height ?? 600}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="h-auto w-full transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {shown < photos.length && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setShown((n) => n + (pageSize ?? photos.length))} className="btn-purple">
            Show more photos ({photos.length - shown} more)
          </button>
        </div>
      )}

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-grace-950/95 p-4"
          onClick={close}
        >
          <div className="relative h-full max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[index].src} alt={photos[index].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button type="button" onClick={close} aria-label="Close" className="absolute top-4 right-4 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20">
            ✕
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-4 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20">
            ‹
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-4 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20">
            ›
          </button>
          <p className="absolute bottom-4 text-sm text-grace-200">{index + 1} / {photos.length}</p>
        </div>
      )}
    </>
  );
}
