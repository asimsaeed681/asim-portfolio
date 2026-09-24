import Reveal from "@/components/Reveal";
import RailTrace from "@/components/RailTrace";
import IOPanel from "@/components/IOPanel";
import DeployMark from "@/components/DeployMark";
import ScrambleText from "@/components/ScrambleText";
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

// Timing for the CSS terminal typing (see .tty / .tty-lines in globals.css).
const tty = (n: number, d: string, delay: string) =>
  ({ "--n": n, "--d": d, "--delay": delay }) as React.CSSProperties;

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-t border-line pt-4">
      <span className="eyebrow shrink-0">{index}</span>
      <h2 className="display text-[1.6rem] leading-none sm:text-[1.95rem]">
        <ScrambleText text={title} />
      </h2>
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

      <main className="pb-24">
        {/* ---------- Hero ---------- */}
        <section id="intro" className="pt-16 sm:pt-24">
          <div className="wrap">
            <p aria-hidden="true" className="port mb-3 text-live">
              <span className="tty" style={tty(8, "0.4s", "0s")}>
                $ whoami
              </span>
            </p>
            <p className="eyebrow">
              <span className="tty" style={tty(24, "0.3s", "0.35s")}>
                AI-orchestration systems
              </span>
            </p>
            <h1 className="display mt-4 text-[clamp(2.7rem,10vw,4.25rem)]">
              <span className="tty" style={tty(10, "0.45s", "0.6s")}>
                {person.name}
              </span>
            </h1>
            <p className="port mt-3 text-muted">
              <span className="tty" style={tty(50, "0.35s", "1s")}>
                {person.role}
              </span>
            </p>

            <p
              className="tty-lines mt-7 max-w-[33rem] text-[1.22rem] leading-[1.5] text-paper"
              style={tty(3, "0.4s", "1.3s")}
            >
              {person.positioning}
            </p>
            <p className="tty-lines mt-4 max-w-[33rem] text-body" style={tty(3, "0.4s", "1.6s")}>
              {person.sub}
            </p>

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
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="zone mt-20 py-16 sm:mt-28 sm:py-20">
          <div className="wrap">
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
          </div>
        </section>

        {/* ---------- Research ---------- */}
        <section id="research" className="zone--raised py-16 sm:py-20">
          <div className="wrap">
            <SectionLabel index="02 / research" title="Research & recognition" />
            <ul className="space-y-10">
              {recognition.map((r, i) => (
                <Reveal
                  as="li"
                  key={r.tag}
                  delay={i * 70}
                  className="grid gap-x-5 gap-y-3 sm:grid-cols-[6.5rem_1fr]"
                >
                  {r.stat ? (
                    <div className="stat self-start">
                      <div className="stat__value">{r.stat.value}</div>
                      <div className="stat__unit">{r.stat.unit}</div>
                    </div>
                  ) : (
                    <span className="eyebrow pt-1">{r.tag}</span>
                  )}
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
                    {r.detail && <p className="mt-2.5 text-body">{r.detail}</p>}
                    {r.io && <IOPanel inputs={r.io.in} output={r.io.out} />}
                    {r.bullets && (
                      <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">
                        {r.bullets.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span aria-hidden className="mt-[0.6em] block h-px w-3 shrink-0 bg-line" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Skills ---------- */}
        <section id="skills" className="py-16 sm:py-20">
          <div className="wrap">
            <SectionLabel index="03 / toolkit" title="Toolkit" />
            <dl className="space-y-7">
              {skills.map((g, i) => (
                <Reveal
                  key={g.label}
                  delay={i * 60}
                  className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="eyebrow pt-1.5">{g.label}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="chip">
                        {it}
                      </span>
                    ))}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- Path (experience + education) ---------- */}
        <section id="path" className="zone--raised py-16 sm:py-20">
          <div className="wrap">
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
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="zone py-16 sm:py-20">
          <div className="wrap">
            <SectionLabel index="05 / contact" title="Get in touch" />
            <Reveal className="grid items-start gap-10 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="max-w-[30rem] text-[1.08rem] text-paper">
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
              </div>
              <DeployMark className="mt-2 hidden w-[190px] shrink-0 opacity-95 md:block" />
            </Reveal>
          </div>
        </section>

        <footer className="wrap mt-16 border-t border-line pt-6">
          <p className="port text-muted-2">
            {person.fullName} · built with Next.js · 2026
          </p>
        </footer>
      </main>
    </>
  );
}
