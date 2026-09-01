/**
 * The signature motif in compact form: an IN / OUT patch panel at the foot of
 * every project module. Real stack in, one concrete result out — connected by a
 * short cable so the panel reads as a signal path, not a table. The OUT jack is
 * lit: it is the thing that shipped.
 */
export default function IOPanel({
  inputs,
  output,
}: {
  inputs: string[];
  output: string;
}) {
  return (
    <div className="mt-5 flex gap-4 border-y border-line py-4">
      <div className="flex flex-col items-center pt-[0.3rem]" aria-hidden>
        <span className="jack jack--in" />
        <span className="my-1 w-px flex-1 bg-line" />
        <span className="jack jack--out mb-[0.3rem]" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div>
          <p className="port text-muted-2">IN</p>
          <p className="port mt-1 text-muted">{inputs.join("  ·  ")}</p>
        </div>
        <div>
          <p className="port text-live">OUT</p>
          <p className="port mt-1 text-body">{output}</p>
        </div>
      </div>
    </div>
  );
}
