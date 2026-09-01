# Asim Saeed — portfolio

Personal portfolio for Muhammad Asim Saeed, BS Computer Science at COMSATS
University Islamabad. One page, statically rendered.

## Design

A dark "signal-chain" panel. The recurring motif is the **I/O port** — `IN ─→ OUT`
— which mirrors how the work is built: real inputs, a transform, one concrete
output. Every project states its stack going in and its result coming out.

| Role | Typeface |
| --- | --- |
| Display | Bricolage Grotesque (600/700) |
| Body | Hanken Grotesk (400/500/600) |
| Mono / labels | JetBrains Mono (400/500) |

Palette (see `src/app/globals.css`): near-black `#101117` ground, warm off-white
text, a saturated ultramarine `#3b5bff` "cable", and a mint `#5fe3c7` used only
for the OUT jack — the thing that shipped.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- `next/font` for self-hosted Google fonts
- No client data, no APIs, no environment variables — fully static

All copy lives in `src/lib/content.ts`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Deploy

Deploys to Vercel with zero configuration (framework auto-detected). When the
`.me` domain is ready, add it in the Vercel project's Domains tab and point the
registrar's DNS at Vercel — no rebuild needed. Update the absolute URLs in
`src/app/layout.tsx`, `robots.ts`, and `sitemap.ts` to the final domain at that
point.

## Accessibility

WCAG 2.1 AA targeted: semantic landmarks and heading order, visible keyboard
focus, `prefers-reduced-motion` respected (scroll reveals, the cable draw, and
smooth scrolling all disabled), AA text contrast, a skip link, and content that
renders with JavaScript disabled.
