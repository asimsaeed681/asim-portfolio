"use client";

import { useEffect, useState } from "react";

/**
 * Counts 0..total, holds on `total`, then loops. Runs only while `active`
 * (scrolled into view) and never for reduced-motion visitors, who get the
 * finished state instead.
 */
export function useStepper(total: number, active: boolean, reduced: boolean, stepMs = 650, holdMs = 2200) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    let i = 0;
    let timer = 0;
    const next = () => {
      i = i >= total ? 0 : i + 1;
      setStep(i);
      timer = window.setTimeout(next, i === total ? holdMs : stepMs);
    };
    timer = window.setTimeout(next, 500);
    return () => window.clearTimeout(timer);
  }, [active, reduced, total, stepMs, holdMs]);

  return reduced ? total : step;
}

// Theme colours as literals: motion can interpolate hex, not CSS variables.
export const C = {
  line: "#3d4150",
  panel: "#282b37",
  ink: "#0e0f14",
  muted: "#a3a5b3",
  body: "#c8c9d2",
  signal: "#3b5bff",
  signalFill: "rgba(59,91,255,0.16)",
  live: "#5fe3c7",
  liveFill: "rgba(95,227,199,0.16)",
};
