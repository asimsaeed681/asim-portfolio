import Board, { type Node } from "@/components/Board";
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
  Two renderings of the same content:
  - .board  a linear stack of drawing sheets. This is what ships in the HTML,
            what a screen reader reads, and what shows without JavaScript or on
            a phone.
  - Board   the same sheets placed on a pannable, zoomable drawing board.
*/

function ProjectDetail({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className="space-y-2">
      <p className="text-[0.82rem] leading-snug">{p.blurb}</p>
      <dl className="spec">
        <dt>Input</dt>
        <dd>{p.io.in.join(", ")}</dd>
        <dt>Output</dt>
        <dd className="tick">{p.io.out}</dd>
      </dl>
      <ul className="space-y-1 text-[0.78rem] text-line">
        {p.detail.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="tick shrink-0">—</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      {p.link && (
        <p className="text-[0.78rem]">
          <a href={p.link.href} target="_blank" rel="noopener noreferrer">
            {p.link.label}
          </a>
        </p>
      )}
      {p.note && <p className="callout">{p.note}</p>}
    </div>
  );
}

function ResearchDetail() {
  return (
    <div className="space-y-3">
      {recognition.map((r) => (
        <div key={r.tag}>
          <p className="draft text-[0.85rem]">{r.title}</p>
          <p className="text-[0.72rem] text-line-soft">
            {r.org}
            {r.since ? `, since ${r.since}` : ""}
          </p>
          {r.stat && (
            <p className="draft mt-1 text-[1.5rem] leading-none text-ochre">
              {r.stat.value}{" "}
              <span className="text-[0.62rem] text-line-soft">{r.stat.unit}</span>
            </p>
          )}
          {r.detail && <p className="mt-1 text-[0.78rem] text-line">{r.detail}</p>}
          {r.io && (
            <dl className="spec mt-1">
              <dt>Input</dt>
              <dd>{r.io.in.join(", ")}</dd>
              <dt>Output</dt>
              <dd className="tick">{r.io.out}</dd>
            </dl>
          )}
          {r.bullets && (
            <ul className="mt-1 space-y-1 text-[0.78rem] text-line">
              {r.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="tick shrink-0">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function PathDetail() {
  return (
    <div className="space-y-3">
      {experience.map((e) => (
        <div key={e.title}>
          <p className="draft text-[0.85rem]">{e.title}</p>
          <p className="text-[0.72rem] text-line-soft">
            {e.org} · {e.period}
          </p>
          <p className="mt-1 text-[0.78rem] text-line">{e.detail}</p>
        </div>
      ))}
      <div className="dim-rule" />
      {education.map((e) => (
        <p key={e.title} className="text-[0.78rem]">
          <span className="draft">{e.title}</span>
          <span className="text-line-soft">
            {" "}
            · {e.org} · {e.period}
            {e.note ? ` · ${e.note}` : ""}
          </span>
        </p>
      ))}
    </div>
  );
}

function ToolkitDetail() {
  return (
    <dl className="spec">
      {skills.map((g) => (
        <div key={g.label} className="contents">
          <dt>{g.label}</dt>
          <dd>{g.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}

function ContactDetail() {
  const rows: [string, string, string?][] = [
    ["Email", person.email, `mailto:${person.email}`],
    ["Phone", person.phone, `tel:${person.phoneHref}`],
    ["GitHub", person.githubHandle, person.github],
    ["LinkedIn", person.linkedinHandle, person.linkedin],
    ["Location", person.location],
  ];
  return (
    <div className="space-y-2">
      <p className="text-[0.82rem]">
        Open to software and AI internships, and to contract work on automation or
        tooling. The fastest way to reach me is email.
      </p>
      <dl className="spec">
        {rows.map(([k, v, href]) => (
          <div key={k} className="contents">
            <dt>{k}</dt>
            <dd className="break-words">
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
  );
}

const NODES: Node[] = [
  ...projects.map((p, i) => ({
    id: p.tag.toLowerCase(),
    ref: `REF ${p.tag}`,
    title: p.title,
    sub: p.io.in.slice(0, 2).join(" · "),
    x: 310,
    y: 210 + i * 300,
    w: 300,
    detail: <ProjectDetail p={p} />,
  })),
  {
    id: "research",
    ref: "REF R0",
    title: "Research and recognition",
    sub: `${recognition.length} entries`,
    x: 1620,
    y: 250,
    w: 300,
    detail: <ResearchDetail />,
  },
  {
    id: "toolkit",
    ref: "REF T0",
    title: "Toolkit",
    sub: `${skills.length} groups`,
    x: 1620,
    y: 640,
    w: 300,
    detail: <ToolkitDetail />,
  },
  {
    id: "path",
    ref: "REF P0",
    title: "Experience and education",
    sub: `${experience.length} roles`,
    x: 1620,
    y: 980,
    w: 300,
    detail: <PathDetail />,
  },
  {
    id: "contact",
    ref: "REF C0",
    title: "Contact",
    sub: person.location,
    x: 980,
    y: 1130,
    w: 300,
    detail: <ContactDetail />,
  },
];

function Sheet({
  id,
  ref_,
  title,
  children,
}: {
  id: string;
  ref_: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="sheet">
      <header className="sheet__head">
        <span className="sheet__id">{ref_}</span>
        <h2 className="sheet__title">{title}</h2>
      </header>
      <div className="sheet__body">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <a href="#subject" className="skip-link">
        Skip to content
      </a>

      <main className="board">
        <Sheet id="subject" ref_="REF 00" title="Subject">
          <h1 className="draft text-[1.6rem] leading-none">{person.fullName}</h1>
          <p className="mt-1 text-[0.8rem] text-line-soft">{person.role}</p>
          <div className="dim-rule" />
          <p>{person.positioning}</p>
          <p className="mt-2 text-line">{person.sub}</p>
        </Sheet>

        {projects.map((p) => (
          <Sheet key={p.tag} id={p.tag.toLowerCase()} ref_={`REF ${p.tag}`} title={p.title}>
            <ProjectDetail p={p} />
          </Sheet>
        ))}

        <p className="callout mb-5">
          {moreWork.text}{" "}
          <a href={moreWork.href} target="_blank" rel="noopener noreferrer">
            {moreWork.label}
          </a>
        </p>

        <Sheet id="research" ref_="REF R0" title="Research and recognition">
          <ResearchDetail />
        </Sheet>
        <Sheet id="toolkit" ref_="REF T0" title="Toolkit">
          <ToolkitDetail />
        </Sheet>
        <Sheet id="path" ref_="REF P0" title="Experience and education">
          <PathDetail />
        </Sheet>
        <Sheet id="contact" ref_="REF C0" title="Contact">
          <ContactDetail />
        </Sheet>

        <p className="text-[0.72rem] text-line-soft">
          Drawn 2026 · {person.fullName} · scale 1:1
        </p>
      </main>

      <Board nodes={NODES} />
    </>
  );
}
