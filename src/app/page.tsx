import Desktop from "@/components/Desktop";
import {
  person,
  projects,
  recognition,
  skills,
  experience,
  education,
  moreWork,
} from "@/lib/content";

/*
  Every pane below is real, server-rendered HTML. Without JavaScript the page is
  a single readable column of these panes; with it, Desktop turns them into
  draggable windows (desktop) or full-screen sheets (phone).
*/

function WorkPane() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="h text-[1.05rem]">{person.fullName}</h1>
        <p className="dim mt-1">{person.role}</p>
        <p className="mt-3 max-w-[46ch]">{person.positioning}</p>
        <p className="dim mt-2 max-w-[52ch]">{person.sub}</p>
      </div>
      <div className="rule" />
      <h2 className="h">Selected work</h2>
      {projects.map((p) => (
        <article key={p.tag} className="space-y-2">
          <h3 className="text-bone">
            <span className="k">{p.tag}</span> {p.title}
          </h3>
          <p className="dim">{p.blurb}</p>
          <dl className="space-y-1">
            <div className="flex gap-2">
              <dt className="k w-10 shrink-0">in</dt>
              <dd>{p.io.in.join(", ")}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-10 shrink-0 text-amber">out</dt>
              <dd>{p.io.out}</dd>
            </div>
          </dl>
          <ul className="dim list-none space-y-1">
            {p.detail.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="k shrink-0">-</span>
                <span>{d}</span>
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
          {p.note && <p className="dim">{p.note}</p>}
        </article>
      ))}
      <p className="dim">
        {moreWork.text}{" "}
        <a href={moreWork.href} target="_blank" rel="noopener noreferrer">
          {moreWork.label}
        </a>
      </p>
    </div>
  );
}

function ResearchPane() {
  return (
    <div className="space-y-6">
      <h2 className="h">Research and recognition</h2>
      {recognition.map((r) => (
        <article key={r.tag} className="space-y-1.5">
          <h3 className="text-bone">
            <span className="k">{r.tag}</span> {r.title}
          </h3>
          <p className="dim">
            {r.org}
            {r.since ? `, since ${r.since}` : ""}
          </p>
          {r.stat && (
            <p className="pixel text-[1.6rem] text-phos">
              {r.stat.value}{" "}
              <span className="pixel text-[0.6rem] text-bone-dim">{r.stat.unit}</span>
            </p>
          )}
          {r.detail && <p>{r.detail}</p>}
          {r.io && (
            <p className="dim">
              <span className="k">in</span> {r.io.in.join(", ")}
              <br />
              <span className="text-amber">out</span> {r.io.out}
            </p>
          )}
          {r.bullets && (
            <ul className="dim list-none space-y-1">
              {r.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="k shrink-0">-</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
      <div className="rule" />
      <h2 className="h">Toolkit</h2>
      <dl className="space-y-2">
        {skills.map((g) => (
          <div key={g.label}>
            <dt className="k">{g.label}</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <span key={i} className="tag">
                  {i}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      <div className="rule" />
      <h2 className="h">Experience</h2>
      <ul className="list-none space-y-3">
        {experience.map((e) => (
          <li key={e.title}>
            <p className="k">{e.period}</p>
            <p className="text-bone">
              {e.title}, <span className="dim">{e.org}</span>
            </p>
            <p className="dim">{e.detail}</p>
          </li>
        ))}
      </ul>
      <h2 className="h">Education</h2>
      <ul className="list-none space-y-1.5">
        {education.map((e) => (
          <li key={e.title}>
            <span className="k">{e.period}</span> {e.title},{" "}
            <span className="dim">{e.org}</span>
            {e.note && <span className="dim"> ({e.note})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactPane() {
  const rows: [string, string, string?][] = [
    ["email", person.email, `mailto:${person.email}`],
    ["phone", person.phone, `tel:${person.phoneHref}`],
    ["github", person.githubHandle, person.github],
    ["linkedin", person.linkedinHandle, person.linkedin],
    ["based in", person.location],
  ];
  return (
    <div className="space-y-4">
      <h2 className="h">Get in touch</h2>
      <p>
        Open to software and AI internships, and to contract work on automation or
        tooling. The fastest way to reach me is email.
      </p>
      <dl className="space-y-2">
        {rows.map(([k, v, href]) => (
          <div key={k} className="flex gap-3">
            <dt className="k w-20 shrink-0">{k}</dt>
            <dd className="min-w-0 break-words">
              {href ? (
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
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
  );
}

export default function Page() {
  return (
    <>
      <a href="#app-work" className="skip-link">
        Skip to content
      </a>
      <div className="crt" aria-hidden />
      <main className="desk">
        <Desktop
          panes={{
            work: <WorkPane />,
            research: <ResearchPane />,
            contact: <ContactPane />,
            terminal: null,
          }}
        />
      </main>
    </>
  );
}
