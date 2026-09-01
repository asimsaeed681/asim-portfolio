"use client";

import { useEffect, useRef, useState } from "react";

type Node = { id: string; label: string; top: number };

/**
 * The left rail: a 1px circuit trace with a node at each section. The trace
 * above the reading line fills with signal colour as you scroll — it doubles
 * as a progress indicator. Purely decorative for assistive tech (aria-hidden);
 * the real navigation is the anchor list it mirrors.
 */
export default function RailTrace({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const next: Node[] = [];
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.offsetTop;
        next.push({ id: s.id, label: s.label, top: docH > 0 ? top / (docH + window.innerHeight) : 0 });
      }
      setNodes(next);
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0);
      });
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [sections]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-[max(1.5rem,calc(50%-25rem))] top-0 z-20 hidden h-screen w-px lg:block"
    >
      <div className="relative h-full w-px bg-line">
        <div
          className="absolute left-0 top-0 w-px bg-signal transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        {nodes.map((n) => {
          const passed = progress + 0.001 >= n.top;
          return (
            <div
              key={n.id}
              className="absolute -left-[3px] flex items-center gap-2"
              style={{ top: `${n.top * 100}%` }}
            >
              <span
                className={`block h-[7px] w-[7px] rounded-full border transition-colors duration-300 ${
                  passed
                    ? "border-signal bg-signal"
                    : "border-line-soft bg-ink"
                }`}
              />
              <span
                className={`port whitespace-nowrap transition-colors duration-300 ${
                  passed ? "text-muted" : "text-muted-2"
                }`}
              >
                {n.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
