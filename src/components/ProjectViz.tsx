"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";

// Below the fold, interactive, and heavy-ish: each loads only when its card nears the
// viewport. The exact box is reserved first (width-relative height via container
// units), so nothing shifts when it arrives.
const PipelineViz = dynamic(() => import("./viz/PipelineViz"), { ssr: false });
const HuffmanViz = dynamic(() => import("./viz/HuffmanViz"), { ssr: false });
const FeedToggleViz = dynamic(() => import("./viz/FeedToggleViz"), { ssr: false });

const REGISTRY: Record<string, { Viz: ComponentType; ratio: number; extra?: string; caption: string }> = {
  W1: { Viz: PipelineViz, ratio: 96 / 480, caption: "The six pipeline stages, in order" },
  W2: { Viz: HuffmanViz, ratio: 178 / 360, caption: "Example frequencies: the two lowest merge first" },
  W3: {
    Viz: FeedToggleViz,
    ratio: 268 / 360,
    extra: "3.2rem", // the Before / After control row
    caption: "The same feed with and without Shorts",
  },
};

export default function ProjectViz({ tag }: { tag: string }) {
  const entry = REGISTRY[tag];
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!entry) return null;
  const { Viz, ratio, extra, caption } = entry;

  return (
    <figure className="mt-5 border border-line bg-ink p-3">
      <div style={{ containerType: "inline-size" }}>
        <div ref={boxRef} style={{ height: `calc(100cqw * ${ratio} + ${extra ?? "0px"})` }}>
          {near && <Viz />}
        </div>
      </div>
      <figcaption className="port mt-2 text-muted-2">{caption}</figcaption>
    </figure>
  );
}
