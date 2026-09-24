"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The IN / OUT patch panel. When it scrolls into view the connector draws IN to OUT
 * in signal blue, then a small pulse travels down it on a loop. Without JS or with
 * reduced motion the plain connector is shown (see .io-line in globals.css).
 */
export default function IOPanel({ inputs, output }: { inputs: string[]; output: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`io mt-5 flex gap-4 border-y border-line py-4 ${on ? "io--on" : ""}`}>
      <div className="flex flex-col items-center pt-[0.3rem]" aria-hidden>
        <span className="jack jack--in" />
        <span className="io-line my-1 w-px flex-1" />
        <span className="jack jack--out mb-[0.3rem]" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div>
          <p className="port text-muted-2">IN</p>
          <p className="port mt-1 text-muted">{inputs.join("  ·  ")}</p>
        </div>
        <div>
          <p className="port text-live">OUT</p>
          <p className="port mt-1 text-body">{output}</p>
        </div>
      </div>
    </div>
  );
}
