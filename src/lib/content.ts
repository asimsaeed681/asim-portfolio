// All portfolio content, grounded in Asim's real files and CV.
// Nothing here is invented — where a fact could not be verified from source
// material it has been left out rather than guessed at.

export const person = {
  name: "Asim Saeed",
  fullName: "Muhammad Asim Saeed",
  role: "BS Computer Science · COMSATS University Islamabad",
  positioning:
    "I build the systems around AI models — the orchestration, automation, and tooling that turn a prompt into shipped output.",
  sub: "I lead a 150+ member generative-AI research track at my university, placed 34th nationally in prompt engineering, and drop to C++ when a problem needs to run close to the metal.",
  location: "Islamabad, Pakistan",
  email: "aasim.saeed681@gmail.com",
  phone: "+92 314 2640028",
  phoneHref: "+923142640028",
  github: "https://github.com/asimsaeed681",
  githubHandle: "github.com/asimsaeed681",
  linkedin:
    "https://www.linkedin.com/in/muhammad-asim-saeed-b109a0262/",
  linkedinHandle: "in/muhammad-asim-saeed",
};

export const heroIO = {
  in: ["language models", "browser automation", "REST APIs", "C++ / STL"],
  out: [
    "content pipelines",
    "a compression engine",
    "a shipped browser extension",
  ],
};

export type Project = {
  tag: string;
  title: string;
  blurb: string;
  io: { in: string[]; out: string };
  detail: string[];
  link?: { label: string; href: string };
  note?: string;
};

export const projects: Project[] = [
  {
    tag: "W1",
    title: "Content Generation & Automation Pipeline",
    blurb:
      "An end-to-end system that researches a topic, verifies it against primary sources, synthesizes narration, renders a captioned vertical video, runs it through a technical gate, and stages it for review — with no timeline touched by hand.",
    io: {
      in: [
        "ElevenLabs API",
        "Cloudflare R2",
        "Buffer API",
        "GitHub MCP",
        "Playwright",
      ],
      out: "captioned 9:16 videos, source-verified and gate-checked before a human sees them",
    },
    detail: [
      "Word-timed captions driven by forced-alignment timestamps, not guesswork.",
      "A multi-stage gate checks aspect ratio, audio, duration, caption sync, and frame-to-frame dynamism by sampling real frames.",
      "Repo credibility stats are pulled live at render time through the GitHub connector.",
      "A deterministic local text-to-speech fallback keeps a run from ever blocking on an API quota.",
    ],
    note: "Private — walkthrough on request",
  },
  {
    tag: "W2",
    title: "Huffman File Compression Engine",
    blurb:
      "A modular C++ command-line utility that losslessly compresses and decompresses files with the greedy Huffman algorithm — one binary, -c / -d flags, and real-time space-saving telemetry from the standard filesystem library.",
    io: {
      in: [
        "C++17 / C++20",
        "std::priority_queue + custom comparator",
        "<filesystem>",
        "bitwise packing",
      ],
      out: "a self-describing compressed file that restores byte-for-byte — 26% smaller on an 8 KB payload",
    },
    detail: [
      "A min-heap merges the two lowest-frequency nodes until one tree remains; a depth-first pass then assigns 0/1 codes so frequent characters get the shortest paths.",
      "The serialized tree is written as a header, so a compressed file carries its own decoding dictionary.",
      "Bits are packed eight at a time into real bytes; decompression walks the rebuilt tree bit by bit back to the original text.",
      "A 128-slot ASCII frequency array gives O(1) counting on the first pass. Unified from two legacy scripts and ported to GCC 15.2 (temporary-rvalue binding fixes).",
    ],
    note: "Source available on request",
  },
  {
    tag: "W3",
    title: "YouTube Feed Blocker",
    blurb:
      "A Manifest V3 Chrome extension that removes Shorts everywhere on YouTube — the tab, the shelves, the sidebar, and the /shorts player itself — and replaces the home feed with a blank page, focus widgets, or a typed instruction.",
    io: {
      in: [
        "Manifest V3",
        "MutationObserver",
        "chrome.storage.sync",
        "Playwright",
      ],
      out: "a quieter YouTube, with 10 end-to-end assertions covering SPA re-mounts and live settings",
    },
    detail: [
      "A MutationObserver keeps the rules applied through YouTube's single-page navigation.",
      "Any /shorts/<id> URL is redirected to the normal /watch player.",
      "Settings persist through chrome.storage.sync and propagate to open tabs without a reload.",
    ],
    link: {
      label: "github.com/asimsaeed681/youtube-feed-blocker",
      href: "https://github.com/asimsaeed681/youtube-feed-blocker",
    },
  },
];

export const moreWork = {
  text: "Also on GitHub: a C++ word-frequency analyzer with O(1) stop-word filtering, and this site.",
  href: "https://github.com/asimsaeed681",
  label: "github.com/asimsaeed681",
};

export type Recognition = {
  tag: string;
  title: string;
  org: string;
  since?: string;
  stat?: { value: string; unit: string };
  detail?: string;
  bullets?: string[];
  io?: { in: string[]; out: string };
};

export const recognition: Recognition[] = [
  {
    tag: "R1",
    title: "Student Lead — Generative AI Sub-Circle",
    org: "ResearchCircle, COMSATS University Islamabad",
    since: "March 2026",
    stat: { value: "150+", unit: "members" },
    detail:
      "Run the group's structured literature reviews on LLM architectures and prompt-optimization frameworks.",
  },
  {
    tag: "R2",
    title: "All Pakistan Prompt Engineering Competition",
    org: "APPEC 2026",
    stat: { value: "34th", unit: "nationally" },
    detail:
      "A national field measuring how precisely a competitor can steer a model to a target output.",
  },
  {
    tag: "R3",
    title: "Indus AI Week",
    org: "February 2026",
    detail: "Selected for the Search and AI and Overview of AI tracks.",
  },
  {
    tag: "R4",
    title: "AI Hackathon — Drone Swarm Gala",
    org: "January 2026",
    io: {
      in: ["Streamlit", "NewsAPI", "OpenAI GPT-4o-mini / vision", "PIL"],
      out: "two working AI prototypes built under real-time hackathon constraints",
    },
    bullets: [
      "A news-aggregation tool that refuses to synthesize a story until it has three or more distinct sources.",
      "A multimodal image-understanding tool — upload or webcam in, a fixed five-point structured read-out (GPT-4o vision).",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C++", "Python", "Java", "JavaScript"],
  },
  {
    label: "AI & tooling",
    items: [
      "Prompt engineering",
      "LLM orchestration",
      "ElevenLabs API",
      "GitHub MCP / connectors",
      "Playwright automation",
    ],
  },
  {
    label: "Web & systems",
    items: [
      "Chrome extensions (MV3)",
      "REST API integration",
      "Cloudflare R2",
      "Git & GitHub",
      "HTML / CSS",
    ],
  },
  {
    label: "Practices",
    items: [
      "Primary-source verification",
      "Deterministic fallbacks",
      "End-to-end testing",
      "Technical writing",
    ],
  },
];

export type Role = {
  title: string;
  org: string;
  period: string;
  detail: string;
};

export const experience: Role[] = [
  {
    title: "Independent Admissions & Visa Advisor",
    org: "Self-directed",
    period: "May 2025 – present",
    detail:
      "Advise prospective international students on admissions requirements, credential evaluation, and visa-documentation compliance.",
  },
  {
    title: "Intern, ISPR Directorate",
    org: "Inter-Services Public Relations, GHQ Rawalpindi",
    period: "Jul – Sep 2026",
    detail:
      "ISPR's national internship program. Hands-on exposure to media production, press communications, and strategic messaging alongside the PR, editorial, and social media teams.",
  },
  {
    title: "Operations Manager",
    org: "Seasonal Agricultural Enterprise",
    period: "2023",
    detail:
      "Ran logistics, supply-chain scheduling, and resource allocation for a seasonal operation.",
  },
  {
    title: "Customer Sales Representative",
    org: "Platinum Tech",
    period: "2023",
    detail: "Handled client communication and account coordination.",
  },
];

export type Education = { title: string; org: string; period: string; note?: string };

export const education: Education[] = [
  {
    title: "BS Computer Science",
    org: "COMSATS University Islamabad",
    period: "2024 – present",
  },
  {
    title: "FSc Computer Science (ICS)",
    org: "Hadaf College for Boys, Peshawar",
    period: "2021 – 2023",
    note: "940 / 1100",
  },
  {
    title: "Matriculation, Science",
    org: "Sahibzada Educational Complex, Sarai Naurang",
    period: "2019 – 2021",
    note: "1078 / 1100",
  },
];
