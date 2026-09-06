# Meridian Facilities

Marketing site for a commercial cleaning and facility maintenance company
serving offices and retail in greater Portland.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · zod · Supabase

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional | Origin used for canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph tags. Falls back to `https://meridianfacilities.com`. |
| `SUPABASE_URL` | For forms | Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | For forms | Service role key. Server-side only — it deliberately has no `NEXT_PUBLIC_` prefix and must never reach the browser. |

**The build never depends on the environment.** `npm run build` succeeds with no
variables set at all. `NEXT_PUBLIC_SITE_URL` is resolved through a single
normaliser in `src/lib/site.ts`: a blank, whitespace-only, non-http or malformed
value falls back to the default origin instead of throwing, a bare hostname
gains `https://`, and any trailing slash, query or fragment is stripped so
`${site.url}/services` can never produce a doubled slash. This matters because
hosts do not always leave an unset variable undefined — Vercel supplies an empty
string for a variable that is declared but has no value, and `??` does not catch
that.

**If the two Supabase variables are missing, both form endpoints return HTTP 503**
and the UI tells the visitor to call instead. This is deliberate: a form that
fakes success loses real leads silently, and nobody finds out until a prospect
follows up about an enquiry that never arrived.

## Database

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor. It
creates `contact_submissions` and `quote_requests`, and enables row level
security on both **with no policies** — so only the service role key can read or
write leads. A leaked publishable key exposes nothing.

## Deploying to Vercel

1. Push this repository and import it at [vercel.com/new](https://vercel.com/new).
   The framework preset is detected automatically; no build configuration is needed.
2. Add `NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
   under **Settings → Environment Variables** for Production, Preview and Development.
3. Deploy, then set `NEXT_PUBLIC_SITE_URL` to your final domain and redeploy so
   canonical URLs and Open Graph tags point at the right origin.

Every page except the two API routes prerenders as static HTML at build time.

## Architecture

```
src/app
  page.tsx                    Home
  services/                   Index + [slug] detail (4 pages, prerendered)
  about/ contact/ quote/       
  api/contact  api/quote      POST endpoints — zod validated, written to Supabase
  sitemap.ts  robots.ts       Generated from the same data the nav uses
  opengraph-image.tsx         Site card; services/[slug] has its own
src/components                Sections, forms, Reveal, header/footer
src/lib
  site.ts                     Business facts — single source for copy and JSON-LD
  services.ts                 Service content
  pricing.ts                  Quote estimator
  schemas.ts                  zod schemas shared by browser and server
  supabase.ts  rate-limit.ts  api.ts  jsonld.ts
supabase/schema.sql
```

**One source of truth.** Business details live in `src/lib/site.ts` and services
in `src/lib/services.ts`. The footer, the sitemap, the `LocalBusiness` JSON-LD
and the OG cards all read from them, so a new service cannot be added without
appearing everywhere it should.

**Shared validation.** `src/lib/schemas.ts` is imported by both the form
components and the API routes, so the browser cannot accept anything the server
would reject. The quote endpoint additionally recalculates the estimate
server-side rather than trusting the figure the client posts.

## The quote estimator

`src/lib/pricing.ts` models a per-visit rate from cleanable square footage,
adjusted for soil accumulation between visits and for the economies of scale of
a larger site, with a monthly minimum. It produces a range, not a single number.
Rates, frequencies and the minimum are all constants at the top of that file.

## Design

Deep navy `#101e33`, warm white `#f7f4ef`, one copper accent `#b65e2e`, set in
Fraunces and Inter. Tokens live in the `@theme` block of
`src/app/globals.css`; every foreground/background pairing in the UI was
contrast-checked against WCAG AA.

## Illustrations

Artwork in `public/img` is a set of hand-authored duotone SVGs. They render
through `next/image` (via `src/components/Artwork.tsx`) with fixed dimensions,
so replacing one with photography means dropping the `unoptimized` flag at that
call site — nothing else changes. Because the set is vector, the image optimizer
is bypassed entirely and `dangerouslyAllowSVG` is never enabled.

**Placeholder content to replace before launch:** the client logo strip in
`src/components/ClientLogos.tsx`, the testimonials in
`src/components/Testimonials.tsx`, and the team in `src/app/about/page.tsx` are
fictional. So are the business details in `src/lib/site.ts` — address, phone and
credentials all need real values.

## Verified

Measured against a production build (`next build && next start`) in Chromium:

- **Lighthouse** — 97-99 performance / 100 accessibility / 100 best practices /
  100 SEO on all six page types, CLS 0 across the board.
  Reproduce with `npx lighthouse http://localhost:3000/ --only-categories=performance,accessibility,best-practices,seo`.
- **axe-core** — zero violations across seven pages at 1440px and 390px,
  including the open mobile menu, against `wcag2a`, `wcag2aa`, `wcag21a`,
  `wcag21aa` and best-practice rules.
- **Mobile menu** — focus moves into the panel on open, Tab cycles within it,
  and Escape closes it and returns focus to the toggle.
- **Forms** — the full four-step quote flow and the contact form, including
  per-step validation, keyboard-only operation, and insert payloads checked
  against the columns in `supabase/schema.sql`.
- **Degradation** — with JavaScript disabled and with
  `prefers-reduced-motion: reduce`, no revealed content stays hidden.
- **Environment independence** — production builds pass with the app variables
  unset and with `NEXT_PUBLIC_SITE_URL` set to `""`, whitespace, a bare
  hostname, a trailing slash, `ftp://`, and free text. With nothing set, the
  canonical tags, `sitemap.xml`, `robots.txt` and JSON-LD all emit the fallback
  origin, and the forms still answer 503.

`npm audit` reports advisories in the `postcss` copy nested inside `next`. It is
a build-time dependency and the only fix available is Next.js 16, which would
mean leaving the Next 15 App Router this project targets.
