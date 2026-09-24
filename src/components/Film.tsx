"use client";

import { useEffect, useRef, useState } from "react";

/** Top progress bar plus the chapter rail. One rAF-throttled scroll handler. */
export function Reel({ chapters }: { chapters: { id: string; label: string }[] }) {
  const [p, setP] = useState(0);
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 1] },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [chapters]);

  return (
    <>
      <div className="progress" aria-hidden>
        <i style={{ ["--p" as string]: `${(p * 100).toFixed(1)}%` }} />
      </div>
      <nav className="rail" aria-label="Chapters">
        <ol>
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={active === c.id}>
                <span>
                  {String(i + 1).padStart(2, "0")} {c.label}
                </span>
                <span aria-hidden />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * A pinned scene: the still stays while the text cuts frame by frame. Purely an
 * enhancement, so on a phone, without JS, or with reduced motion every frame is
 * just stacked and readable.
 */
export function Pinned({
  id,
  header,
  frames,
}: {
  id: string;
  header: React.ReactNode;
  /* Rendered on the server and handed over as elements: a render prop would be
     a function, which cannot cross the server/client boundary. */
  frames: React.ReactNode[];
}) {
  const count = frames.length;
  const ref = useRef<HTMLElement>(null);
  const [frame, setFrame] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 899px)").matches) return;

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const r = el.getBoundingClientRect();
        const span = r.height - window.innerHeight;
        if (span <= 0) return;
        const t = Math.min(1, Math.max(0, -r.top / span));
        setFrame(Math.min(count - 1, Math.floor(t * count)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [count]);

  return (
    <section ref={ref} id={id} className="scene pin">
      <div className="pin__sticky wrap">
        {header}
        <div className="cut">
          {frames.map((f, i) => (
            <div key={i} className="cut__frame" data-on={i === frame}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
