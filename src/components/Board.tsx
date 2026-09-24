"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { person } from "@/lib/content";

export type Node = {
  id: string;
  ref: string;
  title: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  detail: ReactNode;
};

type View = { x: number; y: number; k: number };

const HUB = { x: 1040, y: 640, w: 320 };

/** Frame every node and the hub inside the viewport, with a margin.
 *  The viewport is passed in explicitly so the first render is identical on the
 *  server and the client; the real size is applied on mount. */
function fitView(nodes: Node[], vw = 1440, vh = 900): View {
  const boxes = [
    { x: HUB.x, y: HUB.y, w: HUB.w, h: 150 },
    ...nodes.map((n) => ({ x: n.x, y: n.y, w: n.w, h: 110 })),
  ];
  const minX = Math.min(...boxes.map((b) => b.x));
  const minY = Math.min(...boxes.map((b) => b.y));
  const maxX = Math.max(...boxes.map((b) => b.x + b.w));
  const maxY = Math.max(...boxes.map((b) => b.y + b.h));
  const pad = 90;
  const k = Math.min(
    1.2,
    Math.max(0.35, Math.min((vw - pad * 2) / (maxX - minX), (vh - pad * 2) / (maxY - minY))),
  );
  return {
    k,
    x: (vw - (maxX - minX) * k) / 2 - minX * k,
    y: (vh - (maxY - minY) * k) / 2 - minY * k,
  };
}

/**
 * A pannable, zoomable drawing board. Drag the sheet to pan, wheel or the
 * buttons to zoom, click a node to fly to its detail sheet. The title block in
 * the corner is the navigation. Keyboard users get the same node buttons in DOM
 * order, and every detail sheet is real text that is always in the document.
 */
export default function Board({ nodes }: { nodes: Node[] }) {
  // deterministic first paint; measured for real in the effect below
  const [view, setView] = useState<View>(() => fitView(nodes));
  const [active, setActive] = useState<string | null>(null);
  const [anim, setAnim] = useState(false);
  const pan = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const flyTo = useCallback((n: Node | null) => {
    setAnim(true);
    if (!n) {
      setActive(null);
      setView(fitView(nodes, window.innerWidth, window.innerHeight));
      return;
    }
    setActive(n.id);
    const k = 1.15;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // centre the node a little left of middle, leaving room for its detail sheet
    setView({
      // left of centre, so the detail sheet clears the title block on the right
      x: vw * 0.2 - (n.x + n.w / 2) * k,
      y: vh * 0.45 - (n.y + 40) * k,
      k,
    });
  }, [nodes]);

  // Measure the real viewport once mounted.
  useEffect(() => {
    const t = setTimeout(
      () => setView(fitView(nodes, window.innerWidth, window.innerHeight)),
      0,
    );
    return () => clearTimeout(t);
  }, [nodes]);

  // Re-frame on resize, but never while a detail sheet is open.
  useEffect(() => {
    const onResize = () => {
      if (!active) setView(fitView(nodes, window.innerWidth, window.innerHeight));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, nodes]);

  useEffect(() => {
    if (!anim) return;
    const t = setTimeout(() => setAnim(false), 560);
    return () => clearTimeout(t);
  }, [anim, view]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") flyTo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flyTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    pan.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    stageRef.current?.classList.add("is-panning");
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const p = pan.current;
    if (!p) return;
    setView((v) => ({ ...v, x: p.vx + (e.clientX - p.x), y: p.vy + (e.clientY - p.y) }));
  };
  const endPan = () => {
    pan.current = null;
    stageRef.current?.classList.remove("is-panning");
  };

  const zoom = (dir: number) =>
    setView((v) => ({ ...v, k: Math.min(1.9, Math.max(0.45, +(v.k + dir * 0.15).toFixed(2))) }));

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && Math.abs(e.deltaY) < 4) return;
    zoom(e.deltaY > 0 ? -1 : 1);
  };

  const activeNode = nodes.find((n) => n.id === active) ?? null;

  return (
    <>
      <div
        ref={stageRef}
        className="stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onWheel={onWheel}
      >
        <div
          className={`canvas ${anim ? "canvas--anim" : ""}`}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})` }}
        >
          {/* wires: hub to every node */}
          <svg
            width={2400}
            height={1500}
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            {nodes.map((n) => {
              const x1 = HUB.x + HUB.w / 2;
              const y1 = HUB.y + 34;
              const x2 = n.x + n.w / 2;
              const y2 = n.y + 30;
              const mx = (x1 + x2) / 2;
              return (
                <g key={n.id}>
                  <path
                    d={`M ${x1} ${y1} H ${mx} V ${y2} H ${x2}`}
                    fill="none"
                    stroke={active === n.id ? "#e3a72f" : "#5a87ad"}
                    strokeWidth={active === n.id ? 1.6 : 1}
                  />
                  <circle cx={x2} cy={y2} r={3} fill={active === n.id ? "#e3a72f" : "#5a87ad"} />
                </g>
              );
            })}
          </svg>

          <div
            className="node node--hub"
            style={{ left: HUB.x, top: HUB.y, width: HUB.w }}
          >
            <p className="node__id">REF 00 · SUBJECT</p>
            <p className="node__title draft">{person.fullName}</p>
            <p className="node__sub">{person.role}</p>
            <p className="mt-2 text-[0.72rem] leading-snug text-line">{person.positioning}</p>
          </div>

          {nodes.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`node ${active === n.id ? "is-active" : ""}`}
              style={{ left: n.x, top: n.y, width: n.w }}
              aria-expanded={active === n.id}
              onClick={() => flyTo(active === n.id ? null : n)}
            >
              <span className="node__id">{n.ref}</span>
              <span className="node__title draft block">{n.title}</span>
              <span className="node__sub block">{n.sub}</span>
            </button>
          ))}

          {activeNode && (
            <div
              className="detail"
              style={{ left: activeNode.x + activeNode.w + 48, top: activeNode.y }}
            >
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <p className="sheet__id">{activeNode.ref} · DETAIL</p>
                <button
                  type="button"
                  className="draft text-[0.66rem] text-line-soft hover:text-ochre"
                  onClick={() => flyTo(null)}
                >
                  Close
                </button>
              </div>
              {activeNode.detail}
            </div>
          )}
        </div>
      </div>

      <div className="zoomctl">
        <button type="button" onClick={() => zoom(1)} aria-label="Zoom in">
          +
        </button>
        <button type="button" onClick={() => zoom(-1)} aria-label="Zoom out">
          –
        </button>
        <button type="button" onClick={() => flyTo(null)} aria-label="Fit drawing to screen">
          Fit
        </button>
      </div>

      <div className="titleblock">
        <table>
          <tbody>
            <tr>
              <td className="lbl">Drawing</td>
              <td className="draft">{person.fullName}</td>
            </tr>
            <tr>
              <td className="lbl">Title</td>
              <td>{person.role}</td>
            </tr>
            <tr>
              <td className="lbl">Scale</td>
              <td className="tabular-nums">{view.k.toFixed(2)}:1</td>
            </tr>
            <tr>
              <td className="lbl">Sheet</td>
              <td>{activeNode ? activeNode.ref : "00 · OVERVIEW"}</td>
            </tr>
          </tbody>
        </table>
        <nav className="tb-nav" aria-label="Drawing sheets">
          <button type="button" aria-current={!active} onClick={() => flyTo(null)}>
            Overview
          </button>
          {nodes.map((n) => (
            <button
              key={n.id}
              type="button"
              aria-current={active === n.id}
              onClick={() => flyTo(n)}
            >
              {n.ref.split(" ")[1] ?? n.ref}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
