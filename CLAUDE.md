# CLAUDE.md

Guidance for AI agents (and developers) working on this repository.

## What this is

The personal single-page portfolio of **MD Rafiqul Islam** (Software Engineer),
hosted at **https://codewithrafiq.github.io** via **GitHub Pages**.

- **Framework:** React 19 (Create React App / `react-scripts` 5).
- **Type:** Single page, single component. No router, no backend, no external runtime deps.
- **Styling:** Hand-written CSS (no Tailwind/UI library). Design tokens are CSS
  custom properties in `:root` (see `app/src/App.css`). Warm palette, coral accent.
- **Theming:** Light ("Ivory", the default) and dark ("Ember") themes. Tokens are
  defined under `:root[data-theme='light']` and `:root[data-theme='dark']`; the
  active theme is set via `data-theme` on `<html>`. A toggle in the nav flips it
  and persists to `localStorage('theme')`; an inline script in `public/index.html`
  applies the saved theme before paint (no flash). New colors MUST be added as
  tokens in BOTH theme blocks — never hard-code a hex that only works in one theme.

## Critical layout convention (read before building)

GitHub Pages for a **user site** (`<user>.github.io`) serves the site from the
**root** of the deployed branch. Therefore:

```
/                      ← repo root = the COMPILED site (what Pages serves)
├── index.html         ← generated; do NOT hand-edit
├── static/            ← generated JS/CSS bundles
├── favicon.ico, profile*.jpeg, manifest.json, .nojekyll …  ← generated
│
├── app/               ← ALL React SOURCE lives here (edit code here)
│   ├── src/           ← App.js (everything), App.css, index.css, index.js
│   ├── public/        ← static assets + index.html template + favicon/logos
│   ├── scripts/copy-to-root.js   ← publishes the build to the repo root
│   └── package.json
│
└── contex/            ← source material (CV PDF, photos, links.md). NOT part of the site.
```

**Never hand-edit the generated files at the repo root.** Edit `app/src/**`,
then rebuild — the build regenerates and overwrites the root.

## Commands

All npm commands run from **`app/`**:

```bash
cd app
npm install        # first time only
npm start          # dev server → http://localhost:3000
npm run build      # react-scripts build + copy output to repo root
```

`npm run build` = `react-scripts build && node scripts/copy-to-root.js`.
`copy-to-root.js` removes the previously generated artifacts at the root
(a fixed allow-list — it never touches `app/`, `contex/`, `.git`) and copies the
fresh `app/build/*` up, then writes `.nojekyll`.

## Where the content lives

All page content is **data-driven** from constants at the top of
[`app/src/App.js`](app/src/App.js):

- `NAV` — section nav items
- `SOCIALS` — social links (sourced from `contex/links.md`)
- `CV_URL` — résumé link (Google Drive; from `contex/links.md`)
- `EXPERIENCE` — work history (from the CV)
- `SKILLS` — categorized skill tags
- `PROJECTS` — project cards
- `STATS` — hero stat counters

To update content (new job, project, link, CV), edit the relevant constant and
rebuild. The CV / photos / links source files are in `contex/`.

## Assets

- Hero headshot: `app/public/profile.jpeg`. About portrait: `app/public/profile-2.jpeg`.
- Images are referenced as `` `${process.env.PUBLIC_URL}/file` `` so they resolve
  with the relative `homepage: "."` setting.
- **Optimize large images before committing.** The About portrait was recompressed
  from a 1.6 MB PNG to an 80 KB JPEG (≤720 px wide). There is no `sharp`/ImageMagick
  here; use .NET `System.Drawing` via PowerShell for resize/recompress if needed.
- Favicon (`favicon.ico`, multi-res) and PWA logos (`logo192/512.png`) are an
  orange rounded tile with a bold "R" — regenerable via the same `System.Drawing`
  approach. `homepage` is `"."` so asset URLs are relative (works from the root).

## Deploy

GitHub Pages serves from the **`main`** branch root.

1. `cd app && npm run build` (regenerates the root).
2. Commit the root build output **and** the `app/` source.
3. Push to `main`. Pages config: **Settings → Pages → Deploy from branch → `main` / root**.

## Gotchas / non-obvious decisions

- **React 19 on `react-scripts` 5** works, but the build prints harmless
  deprecation / browserslist warnings. Don't "fix" these by ejecting.
- **`copy-to-root.js` copies entry-by-entry**, not the whole `build/` dir in one
  `fs.cpSync` call — copying a directory into its own ancestor (root) trips a
  Node overlap guard and crashes. Keep the per-entry loop.
- `index.css` sets `overflow-x: hidden` on `html, body`; hero grid children use
  `min-width: 0` to prevent mobile horizontal overflow.
- The mobile breakpoint is `max-width: 860px` (nav collapses to a burger).
- Headless screenshots can render at a wider layout viewport than the requested
  window width — verify true mobile behavior on a real device or with proper
  device emulation, not raw `--window-size`.
- Respect `prefers-reduced-motion` — animations are already gated on it.
