import ExpandTile from "@/components/ExpandTile";
import { ClockTile, GithubTile } from "@/components/LiveTiles";
import {
  person,
  projects,
  recognition,
  skills,
  experience,
  education,
  moreWork,
} from "@/lib/content";

const SLOT = ["t-p1", "t-p2", "t-p3"];

function ProjectDetail({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className="space-y-4">
      <p className="text-[1rem]">{p.blurb}</p>
      <div>
        <p className="lbl">Built with</p>
        <div className="pillrow mt-1.5">
          {p.io.in.map((i) => (
            <span key={i} className="pill">
              {i}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="lbl">Result</p>
        <p className="mt-1">{p.io.out}</p>
      </div>
      <ul className="space-y-2">
        {p.detail.map((d) => (
          <li key={d} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden />
            <span className="sub">{d}</span>
          </li>
        ))}
      </ul>
      {p.link && (
        <p>
          <a href={p.link.href} target="_blank" rel="noopener noreferrer">
            {p.link.label}
          </a>
        </p>
      )}
      {p.note && <p className="lbl">{p.note}</p>}
    </div>
  );
}

export default function Page() {
  const stats = recognition.filter((r) => r.stat);

  return (
    <>
      <a href="#intro" className="skip-link">
        Skip to content
      </a>

      <main className="board">
        {/* intro */}
        <section id="intro" className="tile tile--dark t-intro">
          <p className="lbl">{person.role}</p>
          <h1 className="dsp mt-2 text-[clamp(2rem,4.4vw,3rem)] font-700">
            {person.fullName}
          </h1>
          <p className="mt-3 max-w-[40ch] text-[1.02rem]">{person.positioning}</p>
          <p className="sub mt-auto max-w-[46ch] pt-4 text-[0.88rem]">{person.sub}</p>
        </section>

        {/* projects */}
        {projects.map((p, i) => (
          <ExpandTile
            key={p.tag}
            className={SLOT[i]}
            label={`Project ${p.tag}`}
            title={p.title}
            summary={
              i === 0 ? (
                <div>
                  <p className="sub line-clamp-4 text-[0.88rem]">{p.blurb}</p>
                  <div className="pillrow mt-3">
                    {p.io.in.slice(0, 4).map((x) => (
                      <span key={x} className="pill">
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="sub line-clamp-2 text-[0.85rem]">{p.io.out}</p>
              )
            }
          >
            <ProjectDetail p={p} />
          </ExpandTile>
        ))}

        {/* real figures, both from the research record */}
        {stats.map((r, i) => (
          <div key={r.tag} className={`tile t-stat${i + 1}`}>
            <p className="lbl">{r.org}</p>
            <p className="stat mt-auto text-cobalt">{r.stat!.value}</p>
            <p className="mt-1 text-[0.82rem]">{r.stat!.unit}</p>
            <p className="lbl mt-1 line-clamp-2">{r.title}</p>
          </div>
        ))}

        <GithubTile handle={person.githubHandle} href={person.github} />
        <ClockTile />

        {/* toolkit */}
        <section className="tile t-tools">
          <p className="lbl">Toolkit</p>
          <div className="scroll-y mt-2 space-y-2">
            {skills.map((g) => (
              <div key={g.label}>
                <p className="lbl">{g.label}</p>
                <div className="pillrow mt-1">
                  {g.items.map((i) => (
                    <span key={i} className="pill">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* research + path, each expandable */}
        <ExpandTile
          className="t-path"
          label="Record"
          title="Research, experience and education"
          summary={
            <p className="sub text-[0.85rem]">
              {recognition.length} research entries · {experience.length} roles ·{" "}
              {education.length} schools
            </p>
          }
        >
          <div className="space-y-5">
            <div>
              <p className="lbl">Research and recognition</p>
              <ul className="mt-2 space-y-3">
                {recognition.map((r) => (
                  <li key={r.tag}>
                    <p className="dsp text-[1rem] font-600">{r.title}</p>
                    <p className="lbl">
                      {r.org}
                      {r.since ? `, since ${r.since}` : ""}
                    </p>
                    {r.detail && <p className="sub mt-1">{r.detail}</p>}
                    {r.io && (
                      <p className="sub mt-1 text-[0.86rem]">
                        {r.io.in.join(", ")} &rarr; {r.io.out}
                      </p>
                    )}
                    {r.bullets && (
                      <ul className="mt-1 space-y-1">
                        {r.bullets.map((b) => (
                          <li key={b} className="sub flex gap-2.5 text-[0.88rem]">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt"
                              aria-hidden
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="lbl">Experience</p>
              <ul className="mt-2 space-y-3">
                {experience.map((e) => (
                  <li key={e.title}>
                    <p className="dsp text-[1rem] font-600">{e.title}</p>
                    <p className="lbl">
                      {e.org} · {e.period}
                    </p>
                    <p className="sub mt-1">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="lbl">Education</p>
              <ul className="mt-2 space-y-1.5">
                {education.map((e) => (
                  <li key={e.title} className="sub">
                    <span className="text-ink">{e.title}</span> · {e.org} · {e.period}
                    {e.note ? ` · ${e.note}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ExpandTile>

        {/* contact */}
        <section className="tile t-contact">
          <p className="lbl">Contact</p>
          <p className="mt-1.5 text-[0.9rem]">
            Open to software and AI internships, and to contract work on automation
            or tooling.
          </p>
          <div className="scroll-y mt-auto grid gap-x-4 gap-y-1 pt-3 text-[0.86rem] sm:grid-cols-2">
            <a href={`mailto:${person.email}`}>{person.email}</a>
            <a href={`tel:${person.phoneHref}`} className="text-ink">
              {person.phone}
            </a>
            <a href={person.github} target="_blank" rel="noopener noreferrer">
              {person.githubHandle}
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              {person.linkedinHandle}
            </a>
            <p className="lbl col-span-full pt-1">
              {person.location} · {moreWork.text}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
