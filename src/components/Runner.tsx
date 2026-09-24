"use client";

import { useEffect, useState } from "react";

/**
 * The running header. Like a magazine folio it names the section you are
 * currently reading and its page number. Driven by IntersectionObserver, so it
 * costs no scroll handler.
 */
export default function Runner({
  sections,
}: {
  sections: { id: string; label: string; page: string }[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const i = sections.findIndex((s) => s.id === top.target.id);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.35, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  const s = sections[active];

  return (
    <div className="runner sheet">
      <span>
        <b>Asim Saeed</b> &nbsp;/&nbsp; {s.label}
      </span>
      <span className="folio">{s.page}</span>
    </div>
  );
}
