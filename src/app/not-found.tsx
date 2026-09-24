import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="scene">
        <div className="wrap">
          <p className="chapno">Error 404</p>
          <h1 className="scene__title">Cut</h1>
          <p className="scene__lede mt-6">That scene is not in this film.</p>
          <p className="mt-8">
            <Link href="/" className="slug no-underline">
              Back to the opening
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
