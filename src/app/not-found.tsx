import Link from "next/link";

export default function NotFound() {
  return (
    <main className="board">
      <section className="tile tile--dark" style={{ gridColumn: "span 6", gridRow: "span 4" }}>
        <p className="lbl">Error 404</p>
        <h1 className="dsp mt-2 text-[clamp(1.8rem,4vw,2.6rem)] font-700">
          No tile at that address
        </h1>
        <p className="sub mt-3">That page does not exist.</p>
        <p className="mt-auto pt-4">
          <Link href="/">Back to the dashboard</Link>
        </p>
      </section>
    </main>
  );
}
