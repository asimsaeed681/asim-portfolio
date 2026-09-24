import { Pinned, Reel } from "@/components/Film";
import {
  person,
  projects,
  recognition,
  skills,
  experience,
  education,
  moreWork,
} from "@/lib/content";

const CHAPTERS = [
  { id: "open", label: "Open" },
  ...projects.map((p) => ({ id: p.tag.toLowerCase(), label: p.title.split(" ")[0] })),
  { id: "record", label: "Record" },
  { id: "end", label: "End" },
];

export default function Page() {
  return (
    <>
      <a href="#open" className="skip-link">
        Skip to content
      </a>
      <Reel chapters={CHAPTERS} />

      <main>
        {/* ---------- opening title ---------- */}
        <section id="open" className="scene">
          <div className="wrap">
            <p className="chapno">Chapter 01</p>
            <h1 className="scene__title">
              Asim
              <br />
              Saeed
            </h1>
            <p className="meta mt-5">{person.role}</p>
            <p className="scene__lede mt-6">{person.positioning}</p>
            <p className="body-col mt-5 text-[0.95rem]">{person.sub}</p>
            <p className="mt-10">
              <a href="#w1" className="slug no-underline">
                Roll the work
              </a>
            </p>
          </div>
        </section>

        {/* ---------- one pinned scene per project ---------- */}
        {projects.map((p, i) => {
          const frames = [
            <div key="a">
              <p className="slug">Logline</p>
              <p className="scene__lede mt-4">{p.blurb}</p>
            </div>,
            <div key="b">
              <p className="slug">Built with</p>
              <ul className="mt-4 space-y-1.5">
                {p.io.in.map((x) => (
                  <li key={x} className="ttl text-[clamp(1.2rem,2.6vw,2rem)]">
                    {x}
                  </li>
                ))}
              </ul>
              <p className="body-col mt-5 text-[0.95rem]">{p.io.out}</p>
            </div>,
            <div key="c">
              <p className="slug">Notes</p>
              <ul className="mt-4 space-y-3">
                {p.detail.map((d) => (
                  <li key={d} className="body-col flex gap-3 text-[0.95rem]">
                    <span className="text-flare" aria-hidden>
                      /
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              {p.link && (
                <p className="mt-5">
                  <a href={p.link.href} target="_blank" rel="noopener noreferrer">
                    {p.link.label}
                  </a>
                </p>
              )}
              {p.note && <p className="meta mt-3">{p.note}</p>}
            </div>,
          ];

          return (
            <Pinned
              key={p.tag}
              id={p.tag.toLowerCase()}
              frames={frames}
              header={
                <div>
                  <p className="chapno">Chapter {String(i + 2).padStart(2, "0")}</p>
                  <h2 className="scene__title text-[clamp(2.2rem,6.5vw,5rem)] leading-[0.94]">{p.title}</h2>
                  <p className="meta mt-5">
                    {p.tag} · {p.io.in.length} tools
                  </p>
                </div>
              }
            />
          );
        })}

        {/* ---------- record ---------- */}
        <section id="record" className="scene scene--alt">
          <div className="wrap">
            <p className="chapno">Chapter {String(projects.length + 2).padStart(2, "0")}</p>
            <h2 className="scene__title text-[clamp(2.2rem,7vw,5.5rem)]">The record</h2>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <p className="slug">Research and recognition</p>
                <ul className="mt-5 space-y-6">
                  {recognition.map((r) => (
                    <li key={r.tag}>
                      {r.stat && (
                        <p className="ttl text-[clamp(2.4rem,7vw,4rem)] text-flare">
                          {r.stat.value}{" "}
                          <span className="meta align-middle text-bone-3">{r.stat.unit}</span>
                        </p>
                      )}
                      <p className="ttl mt-1 text-[clamp(1.05rem,2.2vw,1.4rem)]">{r.title}</p>
                      <p className="meta mt-1">
                        {r.org}
                        {r.since ? ` · since ${r.since}` : ""}
                      </p>
                      {r.detail && <p className="body-col mt-2 text-[0.92rem]">{r.detail}</p>}
                      {r.io && (
                        <p className="body-col mt-2 text-[0.92rem]">
                          {r.io.in.join(", ")} &rarr; {r.io.out}
                        </p>
                      )}
                      {r.bullets && (
                        <ul className="mt-2 space-y-1.5">
                          {r.bullets.map((b) => (
                            <li key={b} className="body-col flex gap-3 text-[0.92rem]">
                              <span className="text-flare" aria-hidden>
                                /
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="slug">Experience</p>
                  <ul className="mt-5 space-y-5">
                    {experience.map((e) => (
                      <li key={e.title}>
                        <p className="ttl text-[clamp(1.05rem,2.2vw,1.4rem)]">{e.title}</p>
                        <p className="meta mt-1">
                          {e.org} · {e.period}
                        </p>
                        <p className="body-col mt-1.5 text-[0.92rem]">{e.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="slug">Education</p>
                  <ul className="mt-4 space-y-2">
                    {education.map((e) => (
                      <li key={e.title} className="body-col text-[0.92rem]">
                        <span className="text-bone">{e.title}</span> · {e.org} · {e.period}
                        {e.note ? ` · ${e.note}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="slug">Toolkit</p>
                  <dl className="mt-4 space-y-2">
                    {skills.map((g) => (
                      <div key={g.label}>
                        <dt className="meta">{g.label}</dt>
                        <dd className="body-col text-[0.92rem]">{g.items.join(" · ")}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- end card ---------- */}
        <section id="end" className="scene scene--deep">
          <div className="wrap">
            <p className="chapno">Chapter {String(projects.length + 3).padStart(2, "0")}</p>
            <h2 className="scene__title text-[clamp(2.4rem,9vw,7rem)]">Get in touch</h2>
            <p className="scene__lede mt-6">
              Open to software and AI internships, and to contract work on automation
              or tooling. The fastest way to reach me is email.
            </p>
            <ul className="mt-9 grid gap-3 text-[1.05rem] sm:grid-cols-2">
              <li>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </li>
              <li>
                <a href={`tel:${person.phoneHref}`}>{person.phone}</a>
              </li>
              <li>
                <a href={person.github} target="_blank" rel="noopener noreferrer">
                  {person.githubHandle}
                </a>
              </li>
              <li>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                  {person.linkedinHandle}
                </a>
              </li>
            </ul>
            <p className="meta mt-8">{person.location}</p>
            <p className="body-col mt-8 text-[0.92rem]">
              {moreWork.text}{" "}
              <a href={moreWork.href} target="_blank" rel="noopener noreferrer">
                {moreWork.label}
              </a>
            </p>
            <p className="meta mt-12">{person.fullName} · 2026</p>
          </div>
        </section>
      </main>
    </>
  );
}
