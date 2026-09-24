import Runner from "@/components/Runner";
import {
  person,
  projects,
  recognition,
  skills,
  experience,
  education,
  moreWork,
} from "@/lib/content";

const SECTIONS = [
  { id: "cover", label: "Cover", page: "1" },
  { id: "contents", label: "Contents", page: "3" },
  ...projects.map((p, i) => ({
    id: `feature-${p.tag.toLowerCase()}`,
    label: `Feature ${i + 1}`,
    page: String(8 + i * 6),
  })),
  { id: "research", label: "Research", page: "28" },
  { id: "path", label: "Curriculum", page: "34" },
  { id: "contact", label: "Masthead", page: "40" },
];

const PAGE_OF = Object.fromEntries(SECTIONS.map((s) => [s.id, s.page]));

export default function Page() {
  return (
    <>
      <a href="#contents" className="skip-link">
        Skip to contents
      </a>
      <Runner sections={SECTIONS} />

      <main>
        {/* ---------------- cover ---------------- */}
        <header id="cover" className="cover sheet">
          <p className="cover__strap">
            <span>Issue 01</span>
            <span>{person.location}</span>
            <span>Portfolio of record</span>
          </p>
          <h1 className="cover__masthead">
            Asim
            <br />
            Saeed
          </h1>
          <div className="cover__strap mt-3">
            <span>{person.role}</span>
          </div>
          <p className="cover__lede mt-8">{person.positioning}</p>
          <p className="mt-5 max-w-[46ch] text-ink-2">{person.sub}</p>
        </header>

        {/* ---------------- contents ---------------- */}
        <section id="contents" className="dept sheet">
          <h2 className="dept__hed">Contents</h2>
          <nav className="mt-5" aria-label="Contents">
            {projects.map((p, i) => (
              <a key={p.tag} href={`#feature-${p.tag.toLowerCase()}`} className="toc__row">
                <span className="toc__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="toc__title">
                  {p.title}
                  <span className="toc__kicker">{p.io.out}</span>
                </span>
                <span className="folio">{PAGE_OF[`feature-${p.tag.toLowerCase()}`]}</span>
              </a>
            ))}
            {[
              ["research", "Research and recognition", "The track, the ranking, the hackathon"],
              ["path", "Curriculum vitae", "Experience, schooling, toolkit"],
              ["contact", "Masthead", "How to reach the desk"],
            ].map(([id, title, kicker], i) => (
              <a key={id} href={`#${id}`} className="toc__row">
                <span className="toc__num">{String(projects.length + i + 1).padStart(2, "0")}</span>
                <span className="toc__title">
                  {title}
                  <span className="toc__kicker">{kicker}</span>
                </span>
                <span className="folio">{PAGE_OF[id]}</span>
              </a>
            ))}
          </nav>
        </section>

        {/* ---------------- features ---------------- */}
        {projects.map((p, i) => {
          // Lift the shortest note as the pull quote; the rest sets as body copy,
          // so no sentence appears twice on the spread.
          const pullIdx = p.detail.reduce(
            (best, d, idx) => (d.length < p.detail[best].length ? idx : best),
            0,
          );
          const pull = p.detail[pullIdx];
          const bodyParas = p.detail.filter((_, idx) => idx !== pullIdx);
          return (
            <article key={p.tag} id={`feature-${p.tag.toLowerCase()}`} className="feature sheet">
              <p className="feature__kicker">
                Feature {String(i + 1).padStart(2, "0")} &nbsp;·&nbsp; {p.tag}
              </p>
              <h2 className="feature__hed">{p.title}</h2>
              <p className="feature__dek">{p.io.out}</p>

              <div className="feature__grid">
                <div className="feature__body">
                  <p className="dropcap">{p.blurb}</p>
                  {bodyParas.slice(0, 1).map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                  <blockquote className="pull">{pull}</blockquote>
                  {bodyParas.slice(1).map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                </div>

                <aside className="rail">
                  <dl className="note">
                    <dt>Built with</dt>
                    <dd className="mt-1">{p.io.in.join(", ")}</dd>
                  </dl>
                  {p.link && (
                    <dl className="note">
                      <dt>Source</dt>
                      <dd className="mt-1 break-words">
                        <a href={p.link.href} target="_blank" rel="noopener noreferrer">
                          {p.link.label}
                        </a>
                      </dd>
                    </dl>
                  )}
                  {p.note && (
                    <dl className="note">
                      <dt>Access</dt>
                      <dd className="mt-1">{p.note}</dd>
                    </dl>
                  )}
                </aside>
              </div>
            </article>
          );
        })}

        <p className="sheet py-6 text-ink-3">
          {moreWork.text}{" "}
          <a href={moreWork.href} target="_blank" rel="noopener noreferrer">
            {moreWork.label}
          </a>
        </p>

        {/* ---------------- research ---------------- */}
        <section id="research" className="dept sheet">
          <p className="feature__kicker">Department</p>
          <h2 className="dept__hed">Research and recognition</h2>
          <div className="mt-4">
            {recognition.map((r) => (
              <article key={r.tag} className="entry">
                <div className="two">
                  <div>
                    <h3 className="entry__hed">{r.title}</h3>
                    <p className="entry__meta">
                      {r.org}
                      {r.since ? `, since ${r.since}` : ""}
                    </p>
                    {r.stat && (
                      <p className="bignum mt-2">
                        {r.stat.value}{" "}
                        <span className="text-[0.8rem] font-normal tracking-normal text-ink-3">
                          {r.stat.unit}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-0">
                    {r.detail && <p>{r.detail}</p>}
                    {r.io && (
                      <dl className="note mt-2">
                        <dt>Built with</dt>
                        <dd className="mt-1">{r.io.in.join(", ")}</dd>
                        <dt className="mt-2">Result</dt>
                        <dd className="mt-1">{r.io.out}</dd>
                      </dl>
                    )}
                    {r.bullets && (
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {r.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- curriculum ---------------- */}
        <section id="path" className="dept sheet">
          <p className="feature__kicker">Department</p>
          <h2 className="dept__hed">Curriculum vitae</h2>

          <h3 className="mt-6 text-[0.74rem] tracking-[0.16em] text-crimson [font-variant-caps:all-small-caps]">
            Experience
          </h3>
          {experience.map((e) => (
            <article key={e.title} className="entry">
              <div className="two">
                <div>
                  <h4 className="entry__hed">{e.title}</h4>
                  <p className="entry__meta">{e.org}</p>
                </div>
                <div className="mt-1 sm:mt-0">
                  <p className="folio text-[0.85rem]">{e.period}</p>
                  <p className="mt-1">{e.detail}</p>
                </div>
              </div>
            </article>
          ))}

          <h3 className="mt-8 text-[0.74rem] tracking-[0.16em] text-crimson [font-variant-caps:all-small-caps]">
            Education
          </h3>
          {education.map((e) => (
            <article key={e.title} className="entry">
              <div className="two">
                <div>
                  <h4 className="entry__hed">{e.title}</h4>
                  <p className="entry__meta">{e.org}</p>
                </div>
                <p className="folio mt-1 text-[0.85rem] sm:mt-0">
                  {e.period}
                  {e.note ? ` · ${e.note}` : ""}
                </p>
              </div>
            </article>
          ))}

          <h3 className="mt-8 text-[0.74rem] tracking-[0.16em] text-crimson [font-variant-caps:all-small-caps]">
            Toolkit
          </h3>
          <dl className="mt-2">
            {skills.map((g) => (
              <div key={g.label} className="entry two">
                <dt className="entry__hed">{g.label}</dt>
                <dd className="mt-1 sm:mt-0">{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------- masthead ---------------- */}
        <section id="contact" className="dept sheet">
          <p className="feature__kicker">Masthead</p>
          <h2 className="dept__hed">Get in touch</h2>
          <div className="two mt-4">
            <p className="feature__dek">
              Open to software and AI internships, and to contract work on automation
              or tooling. The fastest way to reach me is email.
            </p>
            <dl className="mt-4 sm:mt-0">
              {(
                [
                  ["Email", person.email, `mailto:${person.email}`],
                  ["Telephone", person.phone, `tel:${person.phoneHref}`],
                  ["GitHub", person.githubHandle, person.github],
                  ["LinkedIn", person.linkedinHandle, person.linkedin],
                  ["Desk", person.location, undefined],
                ] as [string, string, string | undefined][]
              ).map(([k, v, href]) => (
                <div key={k} className="entry flex flex-wrap gap-x-4 py-2">
                  <dt className="w-24 shrink-0 text-[0.8rem] tracking-[0.1em] text-ink-3 [font-variant-caps:all-small-caps]">
                    {k}
                  </dt>
                  <dd className="min-w-0 break-words">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <footer className="colophon sheet">
          <p>
            {person.fullName}. Set in Playfair Display and Source Serif 4. Printed to
            the web in 2026.
          </p>
        </footer>
      </main>
    </>
  );
}
