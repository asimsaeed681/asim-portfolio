# Pre-launch security checklist — result

Run against the "Complete Pre-Launch Security Checklist" before first deploy.
This site is **static**: no backend, no database, no authentication, no forms,
no file uploads, no payments, no runtime AI, no user input, and no secrets or
environment variables anywhere in the codebase. Most items are therefore not
applicable.

## Applicable items

| # | Item | Status |
| --- | --- | --- |
| 1 | Secrets kept server-side | ✅ No secrets exist. No `.env` file; `.env*` is gitignored. |
| 2 | No secrets in git history | ✅ Fresh repository, verified clean. |
| 16 | Escape user content before rendering | ✅ No user content. Two `dangerouslySetInnerHTML` uses: JSON-LD from `JSON.stringify` of a static object, and a one-line static `classList.add('js')` bootstrap. Neither touches external input. |
| 23 | Force HTTPS | ✅ Enforced by Vercel automatically, with HSTS. |
| 24 | Security headers | ✅ Added in `next.config.ts`: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`. |
| 25 | No debug mode / source maps / `.git` exposed in prod | ✅ Production build; browser source maps off by default; Vercel does not serve `.git`. |
| 26 | No secrets in error messages | ✅ No custom error surfaces; nothing sensitive to leak. |
| 27 | Dependencies patched | ✅ `npm audit` reports 0 vulnerabilities on a fresh dependency tree. |
| 29 | Backups | ✅ Source is in git; push to GitHub for an off-machine copy. |

## Not applicable

Items 3–15, 17–22, 28, 30 (mobile section) concern databases, auth, sessions,
rate limiting, input validation, uploads, payments, and LLM features — none of
which this site has.

## Owner actions (outside the codebase)

- **Item 12 / 30** — enable a spend limit on the Vercel project, and turn on
  two-factor authentication for GitHub, Vercel, the domain registrar, and the
  Google account tied to the contact address.
- After connecting the `.me` domain, update the absolute URLs in
  `src/app/layout.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts`.
