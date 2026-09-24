"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { C } from "./useStepper";

// Generic video-feed mock (rectangles only, no real branding or imagery).
const ROW_Y = { A: 8, SHORTS: 100, B: 176, C: 252 };
const AFTER_Y = { B: 96, C: 184 };

function Row({ y }: { y: number }) {
  return (
    <g transform={`translate(0 ${y})`}>
      {[8, 126, 244].map((x) => (
        <g key={x}>
          <rect x={x} y={0} width={108} height={60} fill={C.panel} stroke={C.line} />
          <rect x={x} y={68} width={84} height={5} fill={C.line} />
          <rect x={x} y={78} width={56} height={4} fill={C.line} opacity={0.6} />
        </g>
      ))}
    </g>
  );
}

/** Before / after: the same feed with and without the Shorts shelf. */
export default function FeedToggleViz() {
  const [after, setAfter] = useState(false);
  const reduced = !!useReducedMotion();
  const t = { duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <LazyMotion features={domAnimation}>
      <svg
        viewBox="0 0 360 268"
        role="img"
        aria-label={
          after
            ? "Video feed with the Shorts shelf removed"
            : "Video feed with a Shorts shelf between two rows of videos"
        }
        className="block h-auto w-full"
      >
        <clipPath id="feed-clip">
          <rect width={360} height={268} />
        </clipPath>
        <g clipPath="url(#feed-clip)">
          <Row y={ROW_Y.A} />

          <m.g
            initial={false}
            animate={{ opacity: after ? 0 : 1, y: after ? -14 : 0 }}
            transition={t}
          >
            <text
              x={8}
              y={ROW_Y.SHORTS + 4}
              fontSize={9}
              fill={C.muted}
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              Shorts
            </text>
            {Array.from({ length: 7 }, (_, i) => (
              <rect
                key={i}
                x={8 + i * 48}
                y={ROW_Y.SHORTS + 14}
                width={40}
                height={52}
                fill={C.signalFill}
                stroke={C.signal}
                strokeOpacity={0.6}
              />
            ))}
          </m.g>

          <m.g initial={false} animate={{ y: after ? AFTER_Y.B - ROW_Y.B : 0 }} transition={t}>
            <Row y={ROW_Y.B} />
          </m.g>
          <m.g
            initial={false}
            animate={{ y: after ? AFTER_Y.C - ROW_Y.C : 0, opacity: after ? 1 : 0 }}
            transition={t}
          >
            <Row y={ROW_Y.C} />
          </m.g>
        </g>
      </svg>

      <div role="group" aria-label="Feed view" className="mt-3 flex items-center gap-3">
        {(["Before", "After"] as const).map((label) => {
          const on = (label === "After") === after;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => setAfter(label === "After")}
              className={`port border px-3 py-2 transition-colors ${
                on
                  ? "border-signal bg-signal/15 text-paper"
                  : "border-line bg-panel text-muted hover:text-paper"
              }`}
            >
              {label}
            </button>
          );
        })}
        <span className="port text-muted-2" aria-live="polite">
          {after ? "Shorts removed" : "Shorts shelf visible"}
        </span>
      </div>
    </LazyMotion>
  );
}
