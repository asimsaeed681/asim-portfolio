import Reveal from "@/components/Reveal";
import RailTrace from "@/components/RailTrace";
import IOPanel from "@/components/IOPanel";
import {
  person,
  heroIO,
  projects,
  moreWork,
  recognition,
  skills,
  experience,
  education,
} from "@/lib/content";

const railSections = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Toolkit" },
  { id: "path", label: "Path" },
  { id: "contact", label: "Contact" },
];

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-t border-line pt-4">
      <span className="eyebrow shrink-0">{index}</span>
      <h2 className="display text-[1.6rem] leading-none sm:text-[1.95rem]">{title}</h2>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <a href="#intro" className="skip-link">
        Skip to content
      </a>
      <RailTrace sections={railSections} />

      <main className="mx-auto w-full max-w-[42rem] px-6 pb-28 sm:px-8">
        {/* ---------- Hero ---------- */}
        <section id="intro" className="pt-16 sm:pt-24">
          <p className="eyebrow">AI-orchestration systems</p>
          <h1 className="display mt-4 text-[clamp(2.7rem,10vw,4.25rem)]">
            {person.name}
          </h1>
          <p className="port mt-3 text-muted">{person.role}</p>

          <p className="mt-7 max-w-[33rem] text-[1.22rem] leading-[1.5] text-paper">
            {person.positioning}
          </p>
          <p className="mt-4 max-w-[33rem] text-body">{person.sub}</p>

          {/* personal I/O — the thesis object */}
          <div className="module mt-10 max-w-lg">
            <div className="module__bar">
              <span className="port text-muted-2">SYS</span>
              <span className="port text-muted">what goes in / what comes out</span>
            </div>
            <div className="module__body flex gap-4">
              <div className="flex flex-col items-center pt-[0.3rem]" aria-hidden>
                <span className="jack jack--in" />
                <svg
                  className="my-1 w-2 flex-1"
                  width="8"
                  viewBox="0 0 8 60"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M4 0 V60"
                    className="cable-path"
                    stroke="var(--color-signal)"
                    strokeWidth="1.5"
                    pathLength={1}
                  />
                </svg>
                <span className="jack jack--out mb-[0.3rem]" />
              </div>
              <div className="min-w-0 flex-1 space-y-4">
                <div>
                  <p className="port text-muted-2">IN</p>
                  <p className="port mt-1 text-muted">{heroIO.in.join("  ·  ")}</p>
                </div>
                <div>
                  <p className="port text-live">OUT</p>
                  <p className="port mt-1 text-body">{heroIO.out.join("  ·  ")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="border border-signal bg-signal/12 px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal/20"
            >
              View the work ↓
            </a>
            <a
              href={`mailto:${person.email}`}
              className="border border-line bg-panel px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-paper/40"
            >
              Email me
            </a>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="pt-20 sm:pt-28">
          <SectionLabel index="01 / work" title="Selected work" />
          <div className="space-y-6">
            {projects.map((p) => (
              <Reveal as="article" key={p.tag} className="module">
                <div className="module__bar">
                  <span className="port text-muted-2">{p.tag}</span>
                  <h3 className="text-[1.05rem] font-semibold leading-tight tracking-[-0.01em]">
                    {p.title}
                  </h3>
                </div>
                <div className="module__body">
                  <p className="text-body">{p.blurb}</p>

                  <IOPanel inputs={p.io.in} output={p.io.out} />

                  <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">
                    {p.detail.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] block h-px w-3 shrink-0 bg-line" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                    {p.link && (
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="port text-signal-soft underline-offset-4 hover:underline"
                      >
                        {p.link.label} ↗
                      </a>
                    )}
                    {p.note && <span className="port text-muted-2">{p.note}</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 border-t border-line pt-4 text-[0.95rem] text-muted">
            {moreWork.text}{" "}
            <a
              href={moreWork.href}
              target="_blank"
              rel="noopener noreferrer"
              className="port text-signal-soft underline-offset-4 hover:underline"
            >
              {moreWork.label} ↗
            </a>
          </Reveal>
        </section>

        {/* ---------- Research ---------- */}
        <section id="research" className="pt-20 sm:pt-28">
          <SectionLabel index="02 / research" title="Research & recognition" />
          <ul className="space-y-9">
            {recognition.map((r) => (
              <Reveal as="li" key={r.tag} className="grid gap-x-4 gap-y-1 sm:grid-cols-[2.5rem_1fr]">
                <span className="eyebrow pt-1">{r.tag}</span>
                <div>
                  <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.01em]">
                    {r.title}
                  </h3>
                  <p className="port mt-1 text-muted-2">
                    {r.org}
                    {r.since && (
                      <>
                        <span aria-hidden className="text-muted-3"> · </span>
                        since {r.since}
                      </>
                    )}
                  </p>
                  <p className="mt-2.5 text-body">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---------- Skills ---------- */}
        <section id="skills" className="pt-20 sm:pt-28">
          <SectionLabel index="03 / toolkit" title="Toolkit" />
          <dl className="space-y-6">
            {skills.map((g) => (
              <Reveal key={g.label} className="grid gap-1.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1">{g.label}</dt>
                <dd className="port flex flex-wrap gap-x-1.5 gap-y-1.5 text-body">
                  {g.items.map((it, i) => (
                    <span key={it}>
                      {it}
                      {i < g.items.length - 1 && (
                        <span aria-hidden className="pl-1.5 text-muted-3">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* ---------- Path (experience + education) ---------- */}
        <section id="path" className="pt-20 sm:pt-28">
          <SectionLabel index="04 / path" title="Experience & education" />

          <div className="space-y-8">
            {experience.map((role) => (
              <Reveal key={role.title} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="port pt-1 text-muted-2">{role.period || "—"}</p>
                <div>
                  <h3 className="font-semibold tracking-[-0.01em]">
                    {role.title}
                    <span className="font-normal text-muted-2"> · {role.org}</span>
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{role.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 space-y-5 border-t border-line pt-8">
            {education.map((e) => (
              <Reveal key={e.title} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="port pt-1 text-muted-2">{e.period}</p>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold tracking-[-0.01em]">
                    {e.title}
                    <span className="font-normal text-muted-2"> · {e.org}</span>
                  </h3>
                  {e.note && <span className="port text-muted">{e.note}</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="pt-20 sm:pt-28">
          <SectionLabel index="05 / contact" title="Get in touch" />
          <Reveal>
            <p className="max-w-[32rem] text-[1.08rem] text-paper">
              Open to software and AI internships, and to contract work on
              automation or tooling. The fastest way to reach me is email.
            </p>
            <div className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-[7rem_1fr]">
              <span className="eyebrow pt-1">Email</span>
              <a
                href={`mailto:${person.email}`}
                className="port text-signal-soft underline-offset-4 hover:underline"
              >
                {person.email}
              </a>

              <span className="eyebrow pt-1">Phone</span>
              <a href={`tel:${person.phoneHref}`} className="port text-body hover:text-paper">
                {person.phone}
              </a>

              <span className="eyebrow pt-1">GitHub</span>
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="port text-signal-soft underline-offset-4 hover:underline"
              >
                {person.githubHandle} ↗
              </a>

              <span className="eyebrow pt-1">LinkedIn</span>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="port text-signal-soft underline-offset-4 hover:underline"
              >
                {person.linkedinHandle} ↗
              </a>

              <span className="eyebrow pt-1">Based in</span>
              <span className="port text-body">{person.location}</span>
            </div>
          </Reveal>
        </section>

        <footer className="mt-28 border-t border-line pt-6">
          <p className="port text-muted-2">
            {person.fullName} · built with Next.js · 2026
          </p>
        </footer>
      </main>
    </>
  );
}
