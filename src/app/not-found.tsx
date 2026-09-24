import Link from "next/link";

export default function NotFound() {
  return (
    <main className="desk">
      <section className="win">
        <header className="win__bar">
          <span className="win__dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="pixel text-[0.68rem]">error</span>
        </header>
        <div className="win__body space-y-3">
          <h1 className="h text-[1rem]">404: no such file</h1>
          <p className="dim">That path is not on this disk.</p>
          <Link href="/">Return to the desktop</Link>
        </div>
      </section>
    </main>
  );
}
