/**
 * The signature motif: an IN ─→ OUT patch panel. Every project states its real
 * stack going in and one concrete result coming out. Used compact on project
 * cards; the hero renders its own larger, animated version.
 */
export default function IOPanel({
  inputs,
  output,
}: {
  inputs: string[];
  output: string;
}) {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-1">
        <span className="port text-muted-2">IN</span>
        <p className="port text-muted">{inputs.join("  ·  ")}</p>
        <span aria-hidden className="relative">
          <span className="absolute left-[3px] top-1 block h-[calc(100%+0.25rem)] w-px bg-line" />
          <span className="absolute left-[3px] top-1 block h-3 w-px bg-signal" />
        </span>
        <span />
        <span className="port text-live">OUT</span>
        <p className="port text-paper/80">{output}</p>
      </div>
    </div>
  );
}
