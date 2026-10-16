"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const TYPE_MS = 70; // per character typed
const ERASE_MS = 35; // per character erased
const HOLD_MS = 2500; // pause once a phrase is fully typed
const GAP_MS = 400; // pause before typing the next phrase

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Types each phrase out, holds it, erases it, then moves on to the next, looping forever.
 * Screen readers get the first phrase as plain text; visitors who prefer reduced motion see whole phrases swap.
 */
export default function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [erasing, setErasing] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  const phrase = phrases[index];

  useEffect(() => {
    if (reduced) {
      const id = setTimeout(() => setIndex((i) => (i + 1) % phrases.length), HOLD_MS + 1500);
      return () => clearTimeout(id);
    }

    let id: ReturnType<typeof setTimeout>;
    if (!erasing && length < phrase.length) {
      id = setTimeout(() => setLength((l) => l + 1), TYPE_MS);
    } else if (!erasing) {
      id = setTimeout(() => setErasing(true), HOLD_MS);
    } else if (length > 0) {
      id = setTimeout(() => setLength((l) => l - 1), ERASE_MS);
    } else {
      id = setTimeout(() => {
        setErasing(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, GAP_MS);
    }
    return () => clearTimeout(id);
  }, [reduced, erasing, length, phrase, phrases.length]);

  return (
    <>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden>
        {reduced ? phrase : phrase.slice(0, length)}
        <span className="ml-1 inline-block w-[0.08em] animate-pulse bg-gold-500 align-[-0.1em]">&nbsp;</span>
      </span>
    </>
  );
}
