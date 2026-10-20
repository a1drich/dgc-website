# dgc-website

Static marketing site for **dgc.ph**, deployed to Vercel.

## Stack
- Vite + React (JS, no TypeScript)
- Tailwind CSS v4. The theme (colours, fonts, tracking) lives in `src/index.css` under `@theme`; there is no `tailwind.config.js`
- Output: static `dist/` (Vercel auto-detects Vite). `vercel.json` only holds the SPA rewrite that sends every path to `index.html`

## Routes
- Pages live in `src/pages/` and are routed in `src/App.jsx`. Unknown paths render `src/pages/NotFound.jsx`, which sets `noindex` and drops the canonical link.
- Each page exports a `meta` object (`title`, `description`, optional `socialTitle`) and calls `usePageMeta(meta)` (`src/hooks/usePageMeta.js`), which updates the title, description, canonical, `og:title`, `twitter:title` and `og:url` on every route change. The tags in `index.html` hold the Home values, for crawlers that don't run JavaScript.
- **A new route** goes in the router (`src/App.jsx`), the route smoke test (if there is one) and `docs/manual/pages.json`, and gets its own `meta` title and description.

## GitHub
- Repo: `a1drich/dgc-website` (personal account)
- Use SSH key **`~/.ssh/id_ed25519_personal`** (public: `id_ed25519_personal.pub`) for all git operations — never the work key
- Remote uses the `github-personal` host alias from `~/.ssh/config`: `github-personal:a1drich/dgc-website.git`
- This repo has `core.sshCommand` pinned to force the personal key + `IdentitiesOnly=yes`, so plain `git push` works. Do **not** remove that local config — without it ssh-agent may offer a different key first and GitHub will reject the push.
- If pushing manually from elsewhere, prefix with:
  `GIT_SSH_COMMAND='ssh -i ~/.ssh/id_ed25519_personal -o IdentitiesOnly=yes'`

## Deploy
- Vercel project linked to the GitHub repo; pushes to `main` auto-deploy
- Custom domain `dgc.ph` configured in Vercel → Domains

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built bundle
- `uvx --with playwright python scripts/check_metadata.py --base-url <preview-url>` — check route metadata, client-side navigation, not-found recovery, browser errors and mobile overflow against a running production preview. Install Chromium first with `uvx --with playwright python -m playwright install chromium`
- `uvx --with mkdocs-material mkdocs build --strict` — build the docs site to `site/`; must pass with no warnings
- `uvx --with mkdocs-material mkdocs serve` — preview the docs site locally
- `make screenshots` — build the site, serve it, and capture every page in `docs/manual/pages.json` at desktop and mobile widths into `docs/manual/screenshots/`. Set `PORT=<port>` to choose the preview port (default `4173`). Needs `uv`; the first run downloads Chromium

## Docs
The docs site is MkDocs with the Material theme (`mkdocs.yml`, pages in `docs/`).
- `docs/index.md` — product brief: who the site is for and what it must say
- `docs/decisions.md` — decision log. Add an entry (decision + why) when you make a choice the next contributor would otherwise have to guess
- `docs/manual/README.md` — user manual: one section per page or shared part of the site, in plain language, with desktop and mobile screenshots
- `docs/manual/pages.json` — the pages `make screenshots` captures: `{"pages": [{"name", "path", "expect"}]}`, where `expect` is text visible on that page

Rules:
- **Any change users can see must update the user manual (`docs/manual/README.md`) and its screenshots (`make screenshots`) in the same PR.** A new route also needs an entry in `docs/manual/pages.json`.
- Keep each docs page to one topic, stated in its first paragraph. Split a page rather than adding a second topic to it.
- Every page in `docs/` must be listed in the `nav` of `mkdocs.yml`.
