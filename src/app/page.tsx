import Reveal from "@/components/Reveal";
import RailTrace from "@/components/RailTrace";
import IOPanel from "@/components/IOPanel";
import {
  person,
  heroIO,
  projects,
  recognition,
  skills,
  experience,
  education,
} from "@/lib/content";

const railSections = [
  { id: "intro", label: "00 / intro" },
  { id: "work", label: "01 / work" },
  { id: "research", label: "02 / research" },
  { id: "skills", label: "03 / skills" },
  { id: "path", label: "04 / path" },
  { id: "contact", label: "05 / contact" },
];

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-t border-line pt-4">
      <span className="eyebrow shrink-0">{index}</span>
      <h2 className="display text-[1.7rem] leading-none sm:text-[2.1rem]">{title}</h2>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <RailTrace sections={railSections} />

      <main className="mx-auto w-full max-w-[42rem] px-6 pb-28 sm:px-8">
        {/* ---------- Hero ---------- */}
        <section id="intro" className="pt-20 sm:pt-28">
          <p className="eyebrow">AI-orchestration systems</p>
          <h1 className="display mt-5 text-[clamp(2.9rem,11vw,4.75rem)]">
            {person.name}
          </h1>
          <p className="port mt-4 text-muted">{person.role}</p>

          <p className="mt-8 max-w-[34rem] text-[1.28rem] leading-[1.5] text-paper">
            {person.positioning}
          </p>
          <p className="mt-5 max-w-[34rem] text-muted">{person.sub}</p>

          {/* personal I/O — the thesis object */}
          <div className="mt-11 border-t border-line pt-7">
            <div className="grid gap-x-6 gap-y-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div>
                <p className="port mb-2 text-muted-2">IN</p>
                <ul className="port space-y-1 text-muted">
                  {heroIO.in.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>

              <svg
                className="my-1 h-10 w-full sm:h-24 sm:w-16"
                viewBox="0 0 64 96"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <circle cx="4" cy="12" r="3" className="fill-signal" />
                <circle cx="60" cy="84" r="3" className="fill-live" />
                <path
                  d="M4 12 C 4 60, 60 36, 60 84"
                  className="cable-path"
                  stroke="var(--color-signal)"
                  strokeWidth="1.5"
                  pathLength={1}
                />
              </svg>

              <div className="sm:text-right">
                <p className="port mb-2 text-live">OUT</p>
                <ul className="port space-y-1 text-paper/80">
                  {heroIO.out.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-3 gap-y-3">
            <a
              href="#work"
              className="border border-signal bg-signal/10 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal/20"
            >
              View the work ↓
            </a>
            <a
              href={`mailto:${person.email}`}
              className="border border-line px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-paper/40"
            >
              Email me
            </a>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="pt-24 sm:pt-32">
          <SectionLabel index="01 / work" title="Selected work" />
          <div className="space-y-16">
            {projects.map((p) => (
              <Reveal as="article" key={p.tag} className="group">
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow shrink-0">{p.tag}</span>
                  <h3 className="text-[1.32rem] font-semibold leading-tight tracking-[-0.01em]">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-3 pl-[calc(2.5rem+1rem)] text-muted max-[520px]:pl-0">
                  {p.blurb}
                </p>
                <div className="pl-[calc(2.5rem+1rem)] max-[520px]:pl-0">
                  <IOPanel inputs={p.io.in} output={p.io.out} />
                  <ul className="mt-5 space-y-2 text-[0.95rem] text-muted">
                    {p.detail.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden className="mt-[0.55em] block h-px w-3 shrink-0 bg-line" />
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
        </section>

        {/* ---------- Research ---------- */}
        <section id="research" className="pt-24 sm:pt-32">
          <SectionLabel index="02 / research" title="Research & recognition" />
          <ul className="space-y-10">
            {recognition.map((r) => (
              <Reveal as="li" key={r.tag}>
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow shrink-0">{r.tag}</span>
                  <div>
                    <h3 className="text-[1.12rem] font-semibold leading-snug tracking-[-0.01em]">
                      {r.title}
                    </h3>
                    <p className="port mt-1 text-muted-2">{r.org}</p>
                    <p className="mt-3 text-muted">{r.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---------- Skills ---------- */}
        <section id="skills" className="pt-24 sm:pt-32">
          <SectionLabel index="03 / skills" title="Toolkit" />
          <dl className="space-y-7">
            {skills.map((g) => (
              <Reveal key={g.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1">{g.label}</dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-2">
                  {g.items.map((it, i) => (
                    <span key={it} className="port text-paper/85">
                      {it}
                      {i < g.items.length - 1 && (
                        <span aria-hidden className="pl-2 text-muted-2">
                          /
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
        <section id="path" className="pt-24 sm:pt-32">
          <SectionLabel index="04 / path" title="Experience & education" />

          <div className="space-y-9">
            {experience.map((role) => (
              <Reveal key={role.title} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="port pt-1 text-muted-2">{role.period || "—"}</p>
                <div>
                  <h3 className="font-semibold tracking-[-0.01em]">
                    {role.title}
                    <span className="font-normal text-muted-2"> · {role.org}</span>
                  </h3>
                  <p className="mt-2 text-[0.95rem] text-muted">{role.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 space-y-6 border-t border-line pt-8">
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
        <section id="contact" className="pt-24 sm:pt-32">
          <SectionLabel index="05 / contact" title="Get in touch" />
          <Reveal>
            <p className="max-w-[32rem] text-[1.1rem] text-paper">
              Open to software and AI internships, and to contract work on
              automation or tooling. The fastest way to reach me is email.
            </p>
            <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-[9rem_1fr]">
              <span className="eyebrow pt-1">Email</span>
              <a
                href={`mailto:${person.email}`}
                className="port text-signal-soft underline-offset-4 hover:underline"
              >
                {person.email}
              </a>

              <span className="eyebrow pt-1">Phone</span>
              <a href={`tel:${person.phoneHref}`} className="port text-paper/85 hover:text-paper">
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
              <span className="port text-paper/85">{person.location}</span>
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
