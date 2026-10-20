# dgc-website

Static marketing site for **dgc.ph**, deployed to Vercel. Human contributors start with [`README.md`](README.md).

## Stack
- Vite 6 + React 18 (JS, no TypeScript), React Router 7 in declarative (client-only SPA) mode
- Tailwind CSS v4. The theme (colours, fonts, tracking) lives in `src/index.css` under `@theme`; there is no `tailwind.config.js`. The patterns built from it are documented in `docs/design.md`
- Vite plugins: `@vitejs/plugin-react` 4.x supports Vite up to 7, so check its peer range before moving Vite to a new major
- Fix `npm audit` findings with `npm audit fix` plus deliberate version bumps; don't use `npm audit fix --force`, which jumps majors
- Node version is pinned in `.nvmrc` (Node 24), which CI reads; run `nvm use` locally. There is deliberately no `engines` field in `package.json` (see `docs/decisions.md`)
- Lint: ESLint 9 flat config (`eslint.config.js`) with the React, React Hooks and React Refresh plugins. Tests: Vitest + jsdom + Testing Library, configured under `test` in `vite.config.js`, with setup in `src/test/setup.js`. Only `src/**/*.test.{js,jsx}` files run
- Output: static `dist/` (Vercel auto-detects Vite). `vercel.json` only holds the SPA rewrite that sends every path to `index.html`

## Routes
- Pages live in `src/pages/` and are routed in `src/App.jsx`. Unknown paths render `src/pages/NotFound.jsx`, which sets `noindex` and drops the canonical link.
- Each page exports a `meta` object (`title`, `description`, optional `socialTitle`) and calls `usePageMeta(meta)` (`src/hooks/usePageMeta.js`), which updates the title, description, canonical, `og:title`, `twitter:title` and `og:url` on every route change. The tags in `index.html` hold the Home values, for crawlers that don't run JavaScript.
- Portfolio companies are listed once in `src/data/companies.js`, which Home, Portfolio and the footer import. Add, remove or reorder companies there only, and update the Portfolio page's `meta.description`, `docs/index.md` and the user manual, which name them.
- **A new route** goes in the router (`src/App.jsx`), the route smoke test (`src/App.test.jsx`) and `docs/manual/pages.json`, and gets its own `meta` title and description.

## GitHub
- Repo: `a1drich/dgc-website` (personal account)
- Use SSH key **`~/.ssh/id_ed25519_personal`** (public: `id_ed25519_personal.pub`) for all git operations — never the work key
- Remote uses the `github-personal` host alias from `~/.ssh/config`: `github-personal:a1drich/dgc-website.git`
- This repo has `core.sshCommand` pinned to force the personal key + `IdentitiesOnly=yes`, so plain `git push` works. Do **not** remove that local config — without it ssh-agent may offer a different key first and GitHub will reject the push.
- If pushing manually from elsewhere, prefix with:
  `GIT_SSH_COMMAND='ssh -i ~/.ssh/id_ed25519_personal -o IdentitiesOnly=yes'`

## Deploy
- Vercel project linked to the GitHub repo. Its production branch is `production`: pushes to `production` deploy dgc.ph
- Merges to `main` only create a Vercel preview deployment; they don't change the live site
- A release fast-forwards `production` to a verified commit on `main`. `make release` does this from a checkout of that commit, and `make rollback REF=<commit>` puts an earlier one back. Only the site owner releases, so keep `main` releasable, don't push to `production` and never run either command
- Custom domain `dgc.ph` configured in Vercel → Domains

## Commands
**`npm run verify` must pass before you open a PR.** CI (`.github/workflows/verify.yml`) runs `npm ci` and `npm run verify` on every pull request and every push to `main` or `production`.

- `npm run verify` — installs dependencies with `npm ci` if `node_modules` is missing (so it works on a fresh clone), then lint, then tests, then the production build, then the strict docs build; stops at the first failure
- `npm run lint` — ESLint over the repo; any warning fails
- `npm test` — run the Vitest suite once (no watch mode)
- `npx vitest run src/App.test.jsx` — run a single test file
- `npm run docs:build` — same as `uvx --with mkdocs-material mkdocs build --strict`
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built bundle
- `make docs` — build the docs site with `--strict` (same as the `mkdocs build --strict` command below)
- `uvx --with playwright python scripts/check_metadata.py --base-url <preview-url>` — check route metadata, client-side navigation, not-found recovery, browser errors and mobile overflow against a running production preview. Install Chromium first with `uvx --with playwright python -m playwright install chromium`
- `uvx --with mkdocs-material mkdocs build --strict` — build the docs site to `site/`; must pass with no warnings
- `uvx --with mkdocs-material mkdocs serve` — preview the docs site locally
- `make screenshots` — build the site, serve it, and capture every page in `docs/manual/pages.json` at desktop and mobile widths into `docs/manual/screenshots/`. Set `PORT=<port>` to choose the preview port (default `4173`). Needs `uv`; the first run downloads Chromium

## Browser regression checks
`src/App.test.jsx` is the fast route smoke test: it renders every route in jsdom with no server or browser, checks each page's heading, title and the not-found page's `noindex`, and runs in `npm run verify` and CI. It can't see styles, layout, real navigation or browser errors. The checks below cover those in a real browser against a running server, and stay manual.

After `npm ci` and `npm run build`, start preview and dev servers on available ports with `--host 127.0.0.1 --port <port> --strictPort` to match the test URLs. Install the test browser once with `uv run --with playwright python -m playwright install chromium`, then run:

```sh
uv run --with playwright python tests/browser_smoke.py --base-url http://127.0.0.1:<preview-port> --dev-url http://127.0.0.1:<dev-port>
```

This checks all routes and the not-found page at desktop/mobile widths, navigation, footer, scroll reset, Tailwind styles and browser errors. It also checks the Home and Portfolio company links' keyboard focus and overflow at 320–1440px, that Coming soon headings have no hover state, and the About investment grid at mobile, tablet and desktop widths, including both sides of its breakpoints, for a filled final row, hairlines, rounded clipping and overflow. The optional dev check briefly edits Contact's heading to verify hot reload and restores the original bytes in a `finally` block; run it from a clean checkout without concurrent source edits. Omit `--dev-url` for preview-only checks. `--screenshots <dir>` saves full-page captures for comparing before and after a change; point it outside `docs/` (the user manual's screenshots come from `make screenshots`).

## Docs
The docs site is MkDocs with the Material theme (`mkdocs.yml`, pages in `docs/`).
- `docs/index.md` — product brief: who the site is for and what it must say
- `docs/design.md` — design system: tokens, type scale, shared patterns and known inconsistencies. Read it before building or restyling a page, and update it when you add a token or pattern
- `PRODUCT.md` and `DESIGN.md` (repo root) — short pointers to `docs/index.md` and `docs/design.md` for tools and readers that look for them; keep the content in `docs/`
- `docs/decisions.md` — decision log. Add an entry (decision + why) when you make a choice the next contributor would otherwise have to guess
- `docs/manual/README.md` — user manual: one section per page or shared part of the site, in plain language, with desktop and mobile screenshots
- `docs/manual/pages.json` — the pages `make screenshots` captures: `{"pages": [{"name", "path", "expect"}]}`, where `expect` is text visible on that page

Rules:
- **Any change users can see must update the user manual (`docs/manual/README.md`) and its screenshots (`make screenshots`) in the same PR.** A new route also needs an entry in `docs/manual/pages.json`.
- Keep each docs page to one topic, stated in its first paragraph. Split a page rather than adding a second topic to it.
- Every page in `docs/` must be listed in the `nav` of `mkdocs.yml`.
