"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from "motion/react";
import { C, useStepper } from "./useStepper";

type Pt = { x: number; y: number };

// Textbook example frequencies (illustration only, not project data).
const LEAVES: Record<string, Pt & { f: number }> = {
  f: { x: 28, y: 150, f: 45 },
  c: { x: 100, y: 150, f: 12 },
  d: { x: 148, y: 150, f: 13 },
  a: { x: 212, y: 150, f: 5 },
  b: { x: 260, y: 150, f: 9 },
  e: { x: 320, y: 150, f: 16 },
};

// Each merge takes the two lowest-frequency nodes still standing.
const MERGES = [
  { id: "n14", x: 236, y: 118, f: 14, kids: ["a", "b"] },
  { id: "n25", x: 124, y: 118, f: 25, kids: ["c", "d"] },
  { id: "n30", x: 278, y: 84, f: 30, kids: ["n14", "e"] },
  { id: "n55", x: 201, y: 50, f: 55, kids: ["n25", "n30"] },
  { id: "n100", x: 114, y: 16, f: 100, kids: ["f", "n55"] },
];

const pos = (id: string): Pt => LEAVES[id] ?? MERGES.find((n) => n.id === id)!;

/** Builds the tree step by step: merge the two lowest, draw edges 0/1, repeat. */
export default function HuffmanViz() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduced = !!useReducedMotion();
  const step = useStepper(MERGES.length, inView, reduced, 900, 2400);
  const current = MERGES[step - 1]?.kids ?? [];
  const dur = reduced ? 0 : 0.35;

  return (
    <LazyMotion features={domAnimation}>
      <svg
        ref={ref}
        viewBox="0 0 360 178"
        role="img"
        aria-label="Huffman tree building: the two lowest-frequency nodes merge at each step until one root remains"
        className="block h-auto w-full"
      >
        {MERGES.map((mg, k) =>
          mg.kids.map((kid, side) => {
            const a = pos(kid);
            return (
              <g key={mg.id + kid}>
                <m.line
                  x1={mg.x}
                  y1={mg.y}
                  x2={a.x}
                  y2={a.y}
                  stroke={C.signal}
                  strokeWidth={1.5}
                  initial={false}
                  animate={{ pathLength: step > k ? 1 : 0, opacity: step > k ? 1 : 0 }}
                  transition={{ duration: dur }}
                />
                <m.text
                  x={(mg.x + a.x) / 2 + (side ? 6 : -6)}
                  y={(mg.y + a.y) / 2}
                  textAnchor="middle"
                  fontSize={8}
                  fill={C.muted}
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  initial={false}
                  animate={{ opacity: step > k ? 1 : 0 }}
                  transition={{ duration: dur, delay: reduced ? 0 : 0.15 }}
                >
                  {side}
                </m.text>
              </g>
            );
          }),
        )}

        {Object.entries(LEAVES).map(([id, l]) => (
          <g key={id}>
            <m.rect
              x={l.x - 10}
              y={l.y - 10}
              width={20}
              height={20}
              strokeWidth={1.5}
              initial={false}
              animate={{
                stroke: current.includes(id) ? C.signal : C.line,
                fill: current.includes(id) ? C.signalFill : C.panel,
              }}
              transition={{ duration: dur }}
            />
            <text
              x={l.x}
              y={l.y + 3.5}
              textAnchor="middle"
              fontSize={10}
              fill={C.body}
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {id}
            </text>
            <text
              x={l.x}
              y={l.y + 24}
              textAnchor="middle"
              fontSize={8.5}
              fill={C.muted}
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {l.f}
            </text>
          </g>
        ))}

        {MERGES.map((mg, k) => {
          const root = k === MERGES.length - 1;
          const on = step > k;
          return (
            <m.g
              key={mg.id}
              initial={false}
              animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
              transition={{ duration: dur, delay: reduced ? 0 : 0.18 }}
              style={{ transformOrigin: `${mg.x}px ${mg.y}px`, transformBox: "view-box" }}
            >
              <circle
                cx={mg.x}
                cy={mg.y}
                r={11}
                fill={root ? C.liveFill : C.panel}
                stroke={root ? C.live : current.length && MERGES[step - 1].id === mg.id ? C.signal : C.line}
                strokeWidth={1.5}
              />
              <text
                x={mg.x}
                y={mg.y + 3.2}
                textAnchor="middle"
                fontSize={9}
                fill={C.body}
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {mg.f}
              </text>
            </m.g>
          );
        })}
      </svg>
    </LazyMotion>
  );
}
