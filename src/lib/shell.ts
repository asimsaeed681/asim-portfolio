import {
  person,
  projects,
  recognition,
  skills,
  experience,
  education,
} from "./content";

export type Line = { kind: "out" | "echo" | "err"; text: string };

const wrap = (s: string) => s.replace(/\s+/g, " ").trim();

const HELP = [
  "available commands",
  "",
  "  help              this list",
  "  whoami            name, role, what I build",
  "  projects          the three shipped projects",
  "  cat <id>          full detail for a project (w1, w2, w3)",
  "  research          research track, competitions, hackathon",
  "  skills            languages and tooling",
  "  path              experience and education",
  "  contact           email, phone, links",
  "  clear             empty the screen",
].join("\n");

function listProjects() {
  return [
    `${projects.length} projects. run "cat w1" for the full record.`,
    "",
    ...projects.map((p) => `  ${p.tag}  ${p.title}`),
  ].join("\n");
}

function catProject(id: string) {
  const p = projects.find((x) => x.tag.toLowerCase() === id.toLowerCase());
  if (!p) {
    return {
      kind: "err" as const,
      text: `cat: ${id}: no such project. try: ${projects.map((x) => x.tag.toLowerCase()).join(", ")}`,
    };
  }
  const lines = [
    `${p.tag}  ${p.title}`,
    "",
    wrap(p.blurb),
    "",
    `  in   ${p.io.in.join(", ")}`,
    `  out  ${p.io.out}`,
    "",
    ...p.detail.map((d) => `  - ${wrap(d)}`),
  ];
  if (p.link) lines.push("", `  source  ${p.link.href}`);
  if (p.note) lines.push("", `  ${p.note}`);
  return { kind: "out" as const, text: lines.join("\n") };
}

function research() {
  const out: string[] = [];
  for (const r of recognition) {
    out.push(`${r.tag}  ${r.title}`);
    out.push(`    ${r.org}${r.since ? `, since ${r.since}` : ""}`);
    if (r.stat) out.push(`    ${r.stat.value} ${r.stat.unit}`);
    if (r.detail) out.push(`    ${wrap(r.detail)}`);
    if (r.io) {
      out.push(`    in   ${r.io.in.join(", ")}`);
      out.push(`    out  ${r.io.out}`);
    }
    if (r.bullets) for (const b of r.bullets) out.push(`    - ${wrap(b)}`);
    out.push("");
  }
  return out.join("\n").trimEnd();
}

function pathCmd() {
  const out: string[] = ["experience", ""];
  for (const e of experience) {
    out.push(`  ${e.period}`);
    out.push(`    ${e.title}, ${e.org}`);
    out.push(`    ${wrap(e.detail)}`);
    out.push("");
  }
  out.push("education", "");
  for (const e of education) {
    out.push(`  ${e.period}  ${e.title}, ${e.org}${e.note ? `  (${e.note})` : ""}`);
  }
  return out.join("\n");
}

/** Pure command dispatch. Returns the lines to append, or "clear". */
export function run(input: string): Line[] | "clear" {
  const raw = input.trim();
  if (!raw) return [];
  const [cmd, ...rest] = raw.split(/\s+/);
  const arg = rest.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
    case "?":
      return [{ kind: "out", text: HELP }];
    case "whoami":
      return [
        {
          kind: "out",
          text: [
            person.fullName,
            person.role,
            "",
            wrap(person.positioning),
            "",
            wrap(person.sub),
          ].join("\n"),
        },
      ];
    case "projects":
    case "ls":
      return [{ kind: "out", text: listProjects() }];
    case "cat":
      if (!arg) return [{ kind: "err", text: "cat: needs a project id, e.g. cat w1" }];
      return [catProject(arg)];
    case "research":
      return [{ kind: "out", text: research() }];
    case "skills":
      return [
        {
          kind: "out",
          text: skills.map((g) => `  ${g.label.padEnd(14)} ${g.items.join(", ")}`).join("\n"),
        },
      ];
    case "path":
      return [{ kind: "out", text: pathCmd() }];
    case "contact":
      return [
        {
          kind: "out",
          text: [
            `  email     ${person.email}`,
            `  phone     ${person.phone}`,
            `  github    ${person.github}`,
            `  linkedin  ${person.linkedin}`,
            `  based in  ${person.location}`,
          ].join("\n"),
        },
      ];
    case "clear":
      return "clear";
    default:
      return [{ kind: "err", text: `${cmd}: command not found. type "help".` }];
  }
}

export const BOOT: Line[] = [
  { kind: "out", text: `asim.os  //  ${person.role}` },
  { kind: "out", text: 'type "help" for commands, or open an app from the dock.' },
];
