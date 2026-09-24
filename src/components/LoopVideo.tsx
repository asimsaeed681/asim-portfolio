"use client";

import { useEffect, useRef } from "react";
import type { MediaSlot } from "@/lib/content";

/** Muted looping clip: plays only while on screen, and never autoplays for reduced motion. */
export default function LoopVideo({ slot }: { slot: MediaSlot }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.controls = true; // let the visitor start it
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) void v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={slot.poster}
      aria-label={slot.alt}
      className="block h-full w-full object-cover"
      style={{ aspectRatio: slot.aspect }}
    >
      {slot.sources?.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
