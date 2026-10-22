# Decision log

This page is the decision log for the dgc.ph website: each entry records a choice about how the site is built and why it was made. Add an entry when you make a choice the next contributor would otherwise have to guess, and update or replace an entry when the decision changes.

## Static Vite + React build, no server-side rendering

**Decision:** The site is a single-page React app built by Vite into static files in `dist/`. There is no server-side rendering and no server code.

**Why:** It is a small marketing site with four pages and no data that changes per visitor. Static files are cheap and fast to host on Vercel, there is no server to maintain or secure, and Vercel detects Vite and deploys it with no extra setup.

## Stay on Vite 6 and fix audit findings without `--force`

**Decision:** The build uses Vite 6 (`^6.4.4`) with `@vitejs/plugin-react` 4.x. Dependency advisories are fixed with `npm audit fix` and deliberate version bumps, never `npm audit fix --force`.

**Why:** Vite 6.4.3 and later clear the esbuild dev-server advisory (GHSA-67mh-4wv8-2f99), and both installed Vite plugins already support Vite 6, so it was the smallest upgrade that left `npm audit` clean. `--force` would have jumped to Vite 8, a larger migration than the fix needed. Before moving Vite to a new major, check that `@vitejs/plugin-react` and `@tailwindcss/vite` support it.

## Tailwind CSS v4 with the theme in `src/index.css`

**Decision:** Styling uses Tailwind CSS v4 through the `@tailwindcss/vite` plugin. The design tokens (the `forest`, `sand`, `olive`, `gold` and `ink` colours, the Inter and Fraunces font stacks, the small-label sizes (`text-label-xs` to `text-label-lg`) and the letter-spacings (`tracking-display`, `tracking-eyebrow`, `tracking-label`, `tracking-control`)) are defined in the `@theme` block of `src/index.css`. There is no `tailwind.config.js`.

**Why:** Tailwind v4 configures the theme in CSS rather than a JavaScript config file, so the tokens live next to the rest of the global styles. Add new colours, fonts, type sizes or letter-spacings to `@theme` instead of using raw hex values or arbitrary values in components. The small uppercase labels used to repeat hand-copied values such as `text-[11px] tracking-[0.22em]`, which had drifted to five letter-spacings for one pattern; tokens keep new pages on the same few values.

## SPA rewrite in `vercel.json` and unknown paths show a not-found page with noindex

**Decision:** `vercel.json` rewrites every path to `/index.html`. The router in `src/App.jsx` has a catch-all `*` route that renders `src/pages/NotFound.jsx`, which tells the visitor the page doesn't exist, links to Home and Contact, adds `<meta name="robots" content="noindex">` and removes the canonical link.

**Why:** The app routes in the browser, so a visitor who opens or refreshes `/about` directly needs the server to return `index.html` instead of a 404. Because of that rewrite, unknown paths still return HTTP 200. Showing the Home page there made search engines treat broken links as soft 404s (duplicates of the home page) and gave visitors no sign the link was wrong. The not-found page says so plainly, and `noindex` tells search engines to drop those URLs. Returning a real 404 status would need prerendering or a change to the rewrites, which is a separate decision.

## Per-page title, description and canonical URL set in the browser

**Decision:** Each page in `src/pages/` exports a `meta` object (title, description, and optionally a shorter social title) and passes it to `usePageMeta` (`src/hooks/usePageMeta.js`). On every route change the hook sets `document.title` and updates the description, canonical link, `og:title`, `twitter:title` and `og:url` tags already in `index.html`. Canonical and `og:url` are `https://dgc.ph` plus the path, with no trailing slash (`https://dgc.ph/` for Home). The tags in `index.html` hold the Home values. `https://dgc.ph` is the site's main address: in Vercel → Domains, `dgc.ph` serves the production deployment and `www.dgc.ph` redirects to it with a permanent (308) redirect.

**Why:** Before this, every page declared itself a copy of the home page and every tab showed the same title. A small hook needs no new dependency. Crawlers that don't run JavaScript only see `index.html`, so its tags stay as Home's. `dgc.ph` is the main address because it is the shorter brand address that the site, its email (`contact@dgc.ph`) and its docs already use. A canonical URL must not point at a redirect, or search engines may ignore it or index the other host, so the host Vercel serves without a redirect has to be the canonical one, and the redirect from `www.dgc.ph` is permanent so search engines move its links to `dgc.ph`.

## Contact form opens the visitor's email app

**Decision:** The form on the Contact page does not post to a backend. On submit, `src/pages/Contact.jsx` builds a `mailto:contact@dgc.ph` link with the visitor's name, email and message as the subject and body, and the browser opens the visitor's email app with that draft.

**Why:** It keeps the site fully static: there is no form service, API key, spam filter or stored personal data to manage. The trade-off is that visitors without a configured email app can't send through the form, so the page also shows `contact@dgc.ph` as a plain link they can copy.

## Google Fonts loaded from `index.html`

**Decision:** Inter (body text) and Fraunces (display headings) are loaded from Google Fonts with `<link>` tags in `index.html`, with `preconnect` hints and `display=swap`.

**Why:** It is the simplest way to get both typefaces with no font files to host or build steps. `display=swap` shows text in a fallback font straight away instead of hiding it while the fonts load. The font stacks in `src/index.css` fall back to system fonts if Google Fonts is unavailable.

## `npm run verify` is the gate, run in CI on every PR

**Decision:** `npm run verify` runs ESLint, the Vitest route smoke test (`src/App.test.jsx`), `npm run build` and the strict MkDocs build, in that order, stopping at the first failure. `.github/workflows/verify.yml` runs `npm ci` and `npm run verify` on every pull request and every push to `main` or `production`. A second job in the same workflow, `browser`, builds the site, serves it with `npm run preview` on port 4173, installs Chromium through `uv` and runs the Playwright checks against it: `tests/browser_smoke.py` without `--dev-url`, then `scripts/check_metadata.py`. Neither job needs secrets or deploys. The Playwright checks are not part of `npm run verify`, and the hot-reload check (`--dev-url`) is run by hand.

**Why:** `main` is what gets released to production, so a broken import, route or docs link merged there used to reach dgc.ph at the next release unchecked. Running it on pushes to `production` as well verifies the exact commit that goes live. One command gives contributors and CI the same definition of "done". The smoke test runs in jsdom so it needs no server or browser download and finishes in seconds; the Playwright checks need a running server and a Chromium download, so they run as their own CI job rather than inside `npm run verify`, which stays quick and works on a machine without a browser. Layout, styling and metadata after client-side navigation are the main risks on this site and jsdom can't see them, so a lost Tailwind class or a wrong title now fails CI before it reaches `main`. The hot-reload check edits a source file while it runs, so CI never runs it.

## Node pinned with `.nvmrc`, not `engines`

**Decision:** The Node major used for local work and CI is pinned in `.nvmrc`. `package.json` has no `engines` field.

**Why:** Vercel reads `engines.node` to choose the Node version for production builds, so adding it would change a production setting. `.nvmrc` pins local and CI builds without touching the live build. If the production Node version should change too, that is a separate decision made in Vercel's project settings or by adding `engines` deliberately.

## Portfolio companies listed once, in `src/data/companies.js`

**Decision:** The portfolio companies (name, website, sector, description) live in one list in `src/data/companies.js`. The Home page's portfolio section, the Portfolio page and the footer all import it, and show the companies in the list's order. A company with no website yet uses `href: '#'`, which shows as **Coming soon** on the Home and Portfolio pages and **Soon** in the footer.

**Why:** The list used to be copied into all three files, so removing a company meant three matching edits, and missing one left a dead link on the live site. One list keeps every place in step. `src/App.test.jsx` checks that each place shows exactly the companies in the list.

## Portfolio companies shown as a numbered index, not cards

**Decision:** Home and the Portfolio page show the companies with one component, `src/components/PortfolioCard.jsx`, as a numbered list separated by thin lines. The Portfolio page uses its `row` variant, which spreads each company across one full-width row on large screens. Home uses the `compact` variant in two columns. There are no shadows or boxed cards, hover and focus only change colours from the theme, and a company without a website shows **Coming soon** and is not a link. The card shows only what `src/data/companies.js` holds, with nothing written for one company.

**Why:** A three-column card grid left empty slots whenever the number of companies wasn't a multiple of three (four companies left The Hillside alone on a second row). A one-column list has no empty slots at any count. Numbered rows with thin lines are how the About page already lists things, so the portfolio matches the rest of the site. Dropping the shadow also removed the card's arbitrary `rgba(...)` colour, and dropping the location line removed the "Palawan, Philippines" text that every company without a website would have shown.

## Releases go out from the `production` branch

**Decision:** Vercel's production branch is `production`, not `main`. Only commits on `production` deploy to dgc.ph; merges to `main` create preview deployments. A release fast-forwards `production` to a verified commit on `main`, and only the site owner releases.

**Why:** Merging to `main` doesn't change the live site, so reviewed work can collect on `main` and be checked on its preview before anyone sees it. Releasing is a separate, deliberate step that the owner takes when they are ready, and a fast-forward keeps `production` an exact copy of a commit that already passed `npm run verify` on `main`.

## Hairline grids fill their last row

**Decision:** A grid whose dividing lines come from the container's background showing through `gap-px` (such as **What we invest in** on the About page) gives its last item the classes from `lastRowSpan(count)` in `src/lib/lastRowSpan.js`. The last item then stretches across the rest of its row at the two-column (`sm`) and three-column (`lg`) widths.

**Why:** Any empty slot in such a grid shows the container's background as a solid grey block that looks like a missing card. Computing the span from the item count keeps the grid whole when items are added or removed, without moving the hairlines onto each item's borders.
