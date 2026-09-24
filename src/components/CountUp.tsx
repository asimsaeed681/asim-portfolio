"use client";

import { useEffect, useRef, useState } from "react";

const ordinal = (n: number) => {
  const r = n % 100;
  if (r >= 11 && r <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10] ?? "th";
};

/**
 * Counts a real figure up once when it scrolls into view ("150+", "34th"). The
 * server-rendered text is the final value, so crawlers and no-JS visitors see it.
 */
export default function CountUp({ value, duration = 1000 }: { value: string; duration?: number }) {
  const parts = /^(\d+)(.*)$/.exec(value);
  const target = parts ? parseInt(parts[1], 10) : 0;
  const suffix = parts ? parts[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null); // null = show the real value

  useEffect(() => {
    const el = ref.current;
    if (!el || !parts || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setN(null);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {n === null ? value : `${n}${suffix === "th" ? ordinal(n) : suffix}`}
    </span>
  );
}
