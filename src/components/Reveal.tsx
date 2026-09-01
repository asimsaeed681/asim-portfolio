"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children up once, when they scroll into view. Fails open: the hidden
 * state is CSS-gated on `.js` (see globals.css), `prefers-reduced-motion` shows
 * everything immediately, and a failsafe timer reveals the content even if the
 * observer never fires (headless capture, odd browsers).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "article";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const failsafe = window.setTimeout(() => setShown(true), 2500);
    if (!("IntersectionObserver" in window)) {
      return () => window.clearTimeout(failsafe);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            window.clearTimeout(failsafe);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const Component = Tag as "div";
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
