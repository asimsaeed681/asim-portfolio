"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A tile that opens into a full detail panel. The summary and the detail are
 * both real markup; the detail lives in a <dialog>-like overlay only while
 * open, and Escape or the backdrop closes it. Focus returns to the tile.
 */
export default function ExpandTile({
  className,
  label,
  title,
  summary,
  children,
}: {
  className: string;
  label: string;
  title: string;
  summary: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    btnRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      {/* Without JavaScript the tile cannot open, so the same detail is also
          rendered inline; .js hides that copy and the overlay takes over. */}
      <section className={`tile ${className} nojs-detail`}>
        <p className="lbl">{label}</p>
        <h2 className="dsp mt-1.5 text-[1.08rem]">{title}</h2>
        <div className="mt-3">{children}</div>
      </section>

      <button
        ref={btnRef}
        type="button"
        className={`tile ${className}`}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <p className="lbl">{label}</p>
        <h2 className="dsp mt-1.5 text-[1.08rem] font-600">{title}</h2>
        <div className="mt-auto pt-3">{summary}</div>
        <p className="lbl mt-2 text-cobalt">Open detail</p>
      </button>

      {open && (
        <div
          className="scrim"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={panelRef}
            className="expanded"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="lbl">{label}</p>
                <h2 className="dsp mt-1 text-[1.5rem] font-700">{title}</h2>
              </div>
              <button
                type="button"
                className="pill shrink-0 px-3 py-1.5"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
