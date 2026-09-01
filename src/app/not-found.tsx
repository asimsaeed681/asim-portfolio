import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[42rem] flex-col justify-center px-6 sm:px-8">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-4 text-[clamp(2.4rem,9vw,3.5rem)]">
        No signal on that path.
      </h1>
      <p className="mt-5 max-w-md text-body">
        That page doesn&apos;t exist. Everything worth seeing is on the home
        page.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit border border-signal bg-signal/12 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal/20"
      >
        ← Back to start
      </Link>
    </main>
  );
}
