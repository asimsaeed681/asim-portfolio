"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "01<>/_-[]{}#$%&*+=?";

/**
 * Decodes a heading once, the first time it scrolls into view. The real text
 * always stays in the DOM and sizes the box (hidden only while the overlay runs),
 * so there is no layout shift and crawlers see the final copy.
 */
export default function ScrambleText({ text, duration = 650 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const settled = Math.floor(p * text.length);
          setFrame(
            Array.from(text, (ch, i) =>
              ch === " " || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            ).join(""),
          );
          if (p < 1) raf = requestAnimationFrame(tick);
          else setFrame(null);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, duration]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className={frame ? "invisible" : undefined}>{text}</span>
      {frame && (
        <span aria-hidden="true" className="absolute inset-0 overflow-hidden whitespace-nowrap">
          {frame}
        </span>
      )}
    </span>
  );
}
