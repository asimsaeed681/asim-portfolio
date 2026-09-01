"use client";

import { useEffect, useState } from "react";

/**
 * A quiet fixed section index on the left margin (desktop only). One tick per
 * section; the tick for the section currently in view lights up and extends.
 * Driven by IntersectionObserver — no scroll math, no layout coupling.
 */
export default function RailTrace({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Sections"
      className="fixed left-[max(1.25rem,calc(50%-31rem))] top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-4">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3 py-1"
                aria-current={on ? "true" : undefined}
              >
                <span
                  className={`block h-px transition-all duration-300 ${
                    on ? "w-7 bg-signal" : "w-3.5 bg-muted-3 group-hover:w-5 group-hover:bg-muted"
                  }`}
                />
                <span
                  className={`port text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    on ? "text-paper" : "text-muted-2 group-hover:text-paper"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
