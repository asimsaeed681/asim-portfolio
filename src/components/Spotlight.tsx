"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to whichever .module card is under the cursor, as
 * two CSS variables. One delegated listener, rAF-throttled. Does nothing on
 * touch devices or for visitors who prefer reduced motion.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches)
      return;

    let raf = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      const card = (last?.target as Element | null)?.closest<HTMLElement>(".module");
      if (!card || !last) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${last.clientX - r.left}px`);
      card.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
