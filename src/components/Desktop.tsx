"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Terminal from "./Terminal";
import { person } from "@/lib/content";

export type AppId = "work" | "research" | "contact" | "terminal";

const APPS: { id: AppId; file: string; glyph: string }[] = [
  { id: "work", file: "work.app", glyph: "▤" },
  { id: "research", file: "research.app", glyph: "◆" },
  { id: "contact", file: "contact.app", glyph: "✉" },
  { id: "terminal", file: "terminal", glyph: ">_" },
];

// Deterministic opening layout, so the server and the client agree.
const PLACE: Record<AppId, { x: number; y: number; w: number; h: number }> = {
  work: { x: 28, y: 46, w: 512, h: 742 },
  research: { x: 560, y: 46, w: 430, h: 352 },
  terminal: { x: 560, y: 424, w: 566, h: 364 },
  contact: { x: 1008, y: 46, w: 398, h: 330 },
};

type Pos = { x: number; y: number };

export default function Desktop({ panes }: { panes: Record<AppId, ReactNode> }) {
  const [open, setOpen] = useState<AppId[]>(["work", "research", "terminal"]);
  const [focus, setFocus] = useState<AppId>("terminal");
  const [sheet, setSheet] = useState<AppId | null>(null); // phone: one app at a time
  const [pos, setPos] = useState<Record<string, Pos>>({});
  const [clock, setClock] = useState("");
  const [phone, setPhone] = useState(false);
  const drag = useRef<{ id: AppId; dx: number; dy: number } | null>(null);

  useEffect(() => {
    const fmt = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Karachi",
        }).format(new Date()),
      );
    const mq = window.matchMedia("(max-width: 899px)");
    const sync = () => setPhone(mq.matches);
    const t = setTimeout(() => {
      fmt();
      sync();
    }, 0);
    const i = setInterval(fmt, 30_000);
    mq.addEventListener("change", sync);
    return () => {
      clearTimeout(t);
      clearInterval(i);
      mq.removeEventListener("change", sync);
    };
  }, []);

  const openApp = useCallback((id: AppId) => {
    setFocus(id);
    setSheet(id);
    setOpen((o) => (o.includes(id) ? o : [...o, id]));
  }, []);

  const closeApp = (id: AppId) => {
    setSheet(null);
    setOpen((o) => o.filter((x) => x !== id));
  };

  const fromChrome = (id: AppId) => {
    if (phone) return openApp(id);
    if (open.includes(id) && focus === id) return setOpen((o) => o.filter((x) => x !== id));
    openApp(id);
  };

  const onPointerDown = (id: AppId) => (e: React.PointerEvent) => {
    setFocus(id);
    if (phone) return;
    const el = (e.currentTarget as HTMLElement).parentElement!;
    const r = el.getBoundingClientRect();
    drag.current = { id, dx: e.clientX - r.left, dy: e.clientY - r.top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setPos((p) => ({
      ...p,
      [d.id]: {
        x: Math.max(0, Math.min(window.innerWidth - 180, e.clientX - d.dx)),
        y: Math.max(30, Math.min(window.innerHeight - 100, e.clientY - d.dy)),
      },
    }));
  };

  const endDrag = () => {
    drag.current = null;
  };

  const isVisible = (id: AppId) => (phone ? sheet === id : open.includes(id));

  return (
    <>
      <div className="bar">
        <span className="pixel text-phos">asim.os</span>
        {APPS.map((a) => (
          <button
            key={a.id}
            type="button"
            className="bar__btn pixel"
            aria-pressed={open.includes(a.id)}
            onClick={() => fromChrome(a.id)}
          >
            {a.file}
          </button>
        ))}
        <span className="dim ml-auto">{person.location}</span>
        <span className="tabular-nums text-bone">{clock || "--:--"}</span>
      </div>

      {phone && sheet === null && (
        <div className="home">
          <div className="statusbar">
            <span className="pixel text-phos">asim.os</span>
            <span className="tabular-nums">{clock || "--:--"}</span>
          </div>
          <p className="mt-6 text-[1.05rem] leading-snug text-bone">{person.fullName}</p>
          <p className="dim mt-1 text-[0.8rem]">{person.role}</p>
          <p className="mt-4 text-[0.86rem] leading-relaxed text-bone">{person.positioning}</p>
          <div className="home__grid">
            {APPS.map((a) => (
              <button key={a.id} type="button" className="home__app" onClick={() => openApp(a.id)}>
                <span className="home__ic pixel" aria-hidden>
                  {a.glyph}
                </span>
                <span>{a.file}</span>
              </button>
            ))}
          </div>

          <div className="home__foot">
            <p className="dim text-[0.78rem] leading-relaxed">{person.sub}</p>
            <a className="home__cta pixel" href={`mailto:${person.email}`}>
              Email me
            </a>
          </div>
        </div>
      )}

      {APPS.map((a) => {
        const p = pos[a.id] ?? PLACE[a.id];
        return (
          <section
            key={a.id}
            id={`app-${a.id}`}
            /* Closed windows are hidden by CSS gated on .js, not by the hidden
               attribute: without JavaScript every pane must stay readable. */
            className={`win ${focus === a.id ? "win--focus" : ""} ${
              isVisible(a.id) ? "" : "is-closed"
            }`}
            /* Desktop places windows by inline style. On a phone they are
               full-screen sheets, and an inline left/width would beat the
               stylesheet, so drop the geometry entirely there. */
            style={
              phone
                ? undefined
                : ({
                    left: p.x,
                    top: p.y,
                    width: PLACE[a.id].w,
                    // read only by the desktop rules; the linear fallback stays unclipped
                    "--wh": `${PLACE[a.id].h}px`,
                    zIndex: focus === a.id ? 30 : 20,
                  } as React.CSSProperties)
            }
            onPointerDown={() => setFocus(a.id)}
          >
            <header
              className="win__bar"
              onPointerDown={onPointerDown(a.id)}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <span className="win__dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className="pixel text-[0.68rem]">{a.file}</span>
              <button
                type="button"
                className="ml-auto px-2 py-1 text-bone-dim hover:text-amber"
                onClick={() => closeApp(a.id)}
                aria-label={`Close ${a.file}`}
              >
                ✕
              </button>
            </header>
            <div className="win__body">
              {a.id === "terminal" ? (
                <Terminal active={focus === "terminal" && isVisible("terminal")} />
              ) : (
                panes[a.id]
              )}
            </div>
          </section>
        );
      })}

      <nav className="dock" aria-label="Open an app">
        {APPS.map((a) => (
          <button
            key={a.id}
            type="button"
            className="dock__btn pixel"
            aria-pressed={open.includes(a.id)}
            onClick={() => fromChrome(a.id)}
          >
            <span className="dock__ic" aria-hidden>
              {a.glyph}
            </span>
            <span>{a.file}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
