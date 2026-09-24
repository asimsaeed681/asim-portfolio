import Link from "next/link";

export default function NotFound() {
  return (
    <main className="board">
      <section className="sheet">
        <header className="sheet__head">
          <span className="sheet__id">REF 404</span>
          <h1 className="sheet__title">Sheet not issued</h1>
        </header>
        <div className="sheet__body space-y-3">
          <p>No drawing exists at that reference.</p>
          <p>
            <Link href="/">Return to the overview</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
