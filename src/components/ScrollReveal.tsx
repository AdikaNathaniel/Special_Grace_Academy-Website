"use client";

import { useEffect } from "react";

// Photos, videos and cards anywhere in <main> drop in from above as they scroll into view.
// Cards are matched by their rounded-corner classes; a photo or video counts as its wrapper unless a card already
// contains it. Page banners (marked data-no-reveal), the photo viewer and small icons are left alone.
const CANDIDATES = "a.group, figure, .rounded-2xl, .rounded-3xl, img, iframe";
const SKIP = "[data-reveal], [data-no-reveal], [role=dialog]";
const STAGGER_MS = 90; // delay between items that come into view together
const MAX_STAGGER_MS = 450;
const DURATION_MS = 900;

function reveal(el: HTMLElement, delay: number) {
  el.style.transition = `opacity 700ms ease-out ${delay}ms, transform ${DURATION_MS}ms cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}ms`;
  el.dataset.reveal = "shown";
  // Hand transitions back to the element's own classes (e.g. hover effects) once it has landed.
  setTimeout(() => el.style.removeProperty("transition"), DURATION_MS + delay + 50);
}

/** Mounted once in the root layout; it keeps watching <main> as pages change. */
export default function ScrollReveal() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        arriving.forEach((el, i) => {
          io.unobserve(el);
          reveal(el, Math.min(i * STAGGER_MS, MAX_STAGGER_MS));
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    // `animateVisible`: whether items already on screen should drop in too (true for content added after load).
    const scan = (animateVisible: boolean) => {
      for (const el of main.querySelectorAll<HTMLElement>(CANDIDATES)) {
        const target = el.matches("img, iframe") ? el.parentElement : el;
        if (!target || target === main || target.closest(SKIP)) continue;
        if (target.offsetWidth < 80 && target.offsetHeight < 80) continue;
        // Only hide what is still to come. Anything already scrolled past (e.g. photos that a "Show more" reflow
        // moved higher up) shows at once, since it would never scroll into view from below.
        const { top, bottom } = target.getBoundingClientRect();
        const below = top >= window.innerHeight;
        const onScreen = !below && bottom > 0;
        if (below || (onScreen && animateVisible)) {
          target.dataset.reveal = "pending";
          io.observe(target);
        } else {
          target.dataset.reveal = "shown";
        }
      }
    };

    scan(false);
    // Catch content that appears later: streamed sections, "Show more photos", each new page after navigating.
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        scan(true);
      });
    });
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
