import type { MediaSlot } from "@/lib/content";
import LoopVideo from "./LoopVideo";

function Placeholder({ slot }: { slot: MediaSlot }) {
  return (
    <div
      data-media-slot={slot.id}
      aria-hidden="true"
      title={slot.spec}
      className="media-slot"
      style={{ aspectRatio: slot.aspect }}
    >
      <span className="eyebrow">Media slot</span>
      <span className="port text-muted">{slot.id}</span>
      <span className="port break-all text-[0.68rem] text-muted-2">{slot.file}</span>
    </div>
  );
}

function Filled({ slot }: { slot: MediaSlot }) {
  if (slot.kind === "video") return <LoopVideo slot={slot} />;
  const src = "/" + slot.file.replace(/^public\//, "");
  return (
    <div className="overflow-hidden border border-line" style={{ aspectRatio: slot.aspect }}>
      {/* Plain <img>: the slots are small and pre-sized (640x400), and next/image would ship
          its client runtime to every visitor before any media exists. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={slot.alt ?? ""}
        width={640}
        height={400}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function ProjectMedia({ slots }: { slots: MediaSlot[] }) {
  const videos = slots.filter((s) => s.kind === "video");
  const images = slots.filter((s) => s.kind === "image");
  const render = (s: MediaSlot) => (s.ready ? <Filled slot={s} /> : <Placeholder slot={s} />);

  return (
    <div className="mt-5 space-y-3">
      {videos.length > 0 && (
        <div className="flex gap-3">
          {videos.map((s) => (
            <div key={s.id} className="w-36 shrink-0">
              {render(s)}
            </div>
          ))}
        </div>
      )}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((s) => (
            <div key={s.id}>{render(s)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
