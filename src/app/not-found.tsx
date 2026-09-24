import Link from "next/link";

export default function NotFound() {
  return (
    <main className="dept sheet">
      <p className="feature__kicker">Correction</p>
      <h1 className="dept__hed">This page was never set</h1>
      <p className="feature__dek mt-3">
        The folio you asked for is not in this issue.
      </p>
      <p className="mt-5">
        <Link href="/">Return to the cover</Link>
      </p>
    </main>
  );
}
