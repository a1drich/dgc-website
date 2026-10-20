# Decision log

This page is the decision log for the dgc.ph website: each entry records a choice about how the site is built and why it was made. Add an entry when you make a choice the next contributor would otherwise have to guess, and update or replace an entry when the decision changes.

## Static Vite + React build, no server-side rendering

**Decision:** The site is a single-page React app built by Vite into static files in `dist/`. There is no server-side rendering and no server code.

**Why:** It is a small marketing site with four pages and no data that changes per visitor. Static files are cheap and fast to host on Vercel, there is no server to maintain or secure, and Vercel detects Vite and deploys it with no extra setup.

## Stay on Vite 6 and fix audit findings without `--force`

**Decision:** The build uses Vite 6 (`^6.4.4`) with `@vitejs/plugin-react` 4.x. Dependency advisories are fixed with `npm audit fix` and deliberate version bumps, never `npm audit fix --force`.

**Why:** Vite 6.4.3 and later clear the esbuild dev-server advisory (GHSA-67mh-4wv8-2f99), and both installed Vite plugins already support Vite 6, so it was the smallest upgrade that left `npm audit` clean. `--force` would have jumped to Vite 8, a larger migration than the fix needed. Before moving Vite to a new major, check that `@vitejs/plugin-react` and `@tailwindcss/vite` support it.

## Tailwind CSS v4 with the theme in `src/index.css`

**Decision:** Styling uses Tailwind CSS v4 through the `@tailwindcss/vite` plugin. The design tokens (the `forest`, `sand`, `olive`, `gold` and `ink` colours, the Inter and Fraunces font stacks and letter-spacing) are defined in the `@theme` block of `src/index.css`. There is no `tailwind.config.js`.

**Why:** Tailwind v4 configures the theme in CSS rather than a JavaScript config file, so the tokens live next to the rest of the global styles. Add new colours or fonts to `@theme` instead of using raw hex values in components.

## SPA rewrite in `vercel.json` and unknown paths show a not-found page with noindex

**Decision:** `vercel.json` rewrites every path to `/index.html`. The router in `src/App.jsx` has a catch-all `*` route that renders `src/pages/NotFound.jsx`, which tells the visitor the page doesn't exist, links to Home and Contact, adds `<meta name="robots" content="noindex">` and removes the canonical link.

**Why:** The app routes in the browser, so a visitor who opens or refreshes `/about` directly needs the server to return `index.html` instead of a 404. Because of that rewrite, unknown paths still return HTTP 200. Showing the Home page there made search engines treat broken links as soft 404s (duplicates of the home page) and gave visitors no sign the link was wrong. The not-found page says so plainly, and `noindex` tells search engines to drop those URLs. Returning a real 404 status would need prerendering or a change to the rewrites, which is a separate decision.

## Per-page title, description and canonical URL set in the browser

**Decision:** Each page in `src/pages/` exports a `meta` object (title, description, and optionally a shorter social title) and passes it to `usePageMeta` (`src/hooks/usePageMeta.js`). On every route change the hook sets `document.title` and updates the description, canonical link, `og:title`, `twitter:title` and `og:url` tags already in `index.html`. Canonical and `og:url` are `https://dgc.ph` plus the path, with no trailing slash (`https://dgc.ph/` for Home). The tags in `index.html` hold the Home values.

**Why:** Before this, every page declared itself a copy of the home page and every tab showed the same title. A small hook needs no new dependency. Crawlers that don't run JavaScript only see `index.html`, so its tags stay as Home's.

## Contact form opens the visitor's email app

**Decision:** The form on the Contact page does not post to a backend. On submit, `src/pages/Contact.jsx` builds a `mailto:contact@dgc.ph` link with the visitor's name, email and message as the subject and body, and the browser opens the visitor's email app with that draft.

**Why:** It keeps the site fully static: there is no form service, API key, spam filter or stored personal data to manage. The trade-off is that visitors without a configured email app can't send through the form, so the page also shows `contact@dgc.ph` as a plain link they can copy.

## Google Fonts loaded from `index.html`

**Decision:** Inter (body text) and Fraunces (display headings) are loaded from Google Fonts with `<link>` tags in `index.html`, with `preconnect` hints and `display=swap`.

**Why:** It is the simplest way to get both typefaces with no font files to host or build steps. `display=swap` shows text in a fallback font straight away instead of hiding it while the fonts load. The font stacks in `src/index.css` fall back to system fonts if Google Fonts is unavailable.

## `npm run verify` is the gate, run in CI on every PR

**Decision:** `npm run verify` runs ESLint, the Vitest route smoke test (`src/App.test.jsx`), `npm run build` and the strict MkDocs build, in that order, stopping at the first failure. `.github/workflows/verify.yml` runs `npm ci` and `npm run verify` on every pull request and every push to `main`. It needs no secrets and does not deploy. The Playwright checks in `tests/` and `scripts/` are not part of it.

**Why:** Pushes to `main` deploy straight to dgc.ph, so a broken import, route or docs link used to go live unchecked. One command gives contributors and CI the same definition of "done". The smoke test runs in jsdom so it needs no server or browser download and finishes in seconds; the Playwright checks need a running server and Chromium, so they stay manual for changes that affect layout or behaviour in a real browser.

## Node pinned with `.nvmrc`, not `engines`

**Decision:** The Node major used for local work and CI is pinned in `.nvmrc`. `package.json` has no `engines` field.

**Why:** Vercel reads `engines.node` to choose the Node version for production builds, so adding it would change a production setting. `.nvmrc` pins local and CI builds without touching the live build. If the production Node version should change too, that is a separate decision made in Vercel's project settings or by adding `engines` deliberately.

## Portfolio companies listed once, in `src/data/companies.js`

**Decision:** The portfolio companies (name, website, sector, description) live in one list in `src/data/companies.js`. The Home page's portfolio section, the Portfolio page and the footer all import it, and show the companies in the list's order. A company with no website yet uses `href: '#'`, which shows as **Coming soon** on cards and **Soon** in the footer.

**Why:** The list used to be copied into all three files, so removing a company meant three matching edits, and missing one left a dead link on the live site. One list keeps every place in step. `src/App.test.jsx` checks that each place shows exactly the companies in the list.
