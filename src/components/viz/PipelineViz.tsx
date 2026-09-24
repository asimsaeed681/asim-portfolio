"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from "motion/react";
import { C, useStepper } from "./useStepper";

const STAGES = ["research", "verify", "narrate", "render", "gate", "stage"];
const W = 58;
const GAP = (480 - 16 - STAGES.length * W) / (STAGES.length - 1);
const X = STAGES.map((_, i) => 8 + i * (W + GAP));

/** The six real pipeline stages, lighting up in order; the last one is the shipped output. */
export default function PipelineViz() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduced = !!useReducedMotion();
  const step = useStepper(STAGES.length, inView, reduced);

  return (
    <LazyMotion features={domAnimation}>
      <svg
        ref={ref}
        viewBox="0 0 480 96"
        role="img"
        aria-label="Pipeline stages in order: research, verify, narrate, render, gate, stage"
        className="block h-auto w-full"
      >
        {STAGES.slice(0, -1).map((_, i) => (
          <g key={i}>
            <line x1={X[i] + W} y1={35} x2={X[i + 1]} y2={35} stroke={C.line} strokeWidth={1.5} />
            <m.line
              x1={X[i] + W}
              y1={35}
              x2={X[i + 1]}
              y2={35}
              stroke={C.signal}
              strokeWidth={1.5}
              initial={false}
              animate={{ pathLength: step > i + 1 ? 1 : 0, opacity: step > i + 1 ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: "easeInOut" }}
            />
          </g>
        ))}
        {STAGES.map((s, i) => {
          const lit = step > i;
          const last = i === STAGES.length - 1;
          const on = last ? C.live : C.signal;
          return (
            <g key={s}>
              <m.rect
                x={X[i]}
                y={18}
                width={W}
                height={34}
                initial={false}
                animate={{
                  stroke: lit ? on : C.line,
                  fill: lit ? (last ? C.liveFill : C.signalFill) : C.panel,
                }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                strokeWidth={1.5}
              />
              <m.circle
                cx={X[i] + W / 2}
                cy={35}
                r={3}
                initial={false}
                animate={{ fill: lit ? on : C.line }}
                transition={{ duration: reduced ? 0 : 0.25 }}
              />
              <text
                x={X[i] + W / 2}
                y={72}
                textAnchor="middle"
                fontSize={9.5}
                fill={lit ? C.body : C.muted}
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {s}
              </text>
            </g>
          );
        })}
      </svg>
    </LazyMotion>
  );
}
