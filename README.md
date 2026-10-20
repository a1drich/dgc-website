# dgc-website

The static marketing site for [dgc.ph](https://dgc.ph), built with Vite + React (JavaScript) and Tailwind CSS v4, and deployed on Vercel. It has four pages: Home, About, Portfolio and Contact.

## Prerequisites

- **Node.js and npm**: the current Node LTS release.
- **[uv](https://docs.astral.sh/uv/)** (provides `uvx`): only needed for the docs and screenshot commands.

## Getting started

Clone the repo with your own GitHub access (HTTPS or your own SSH key), then install and run:

```sh
git clone https://github.com/a1drich/dgc-website.git
cd dgc-website
npm ci
npm run dev
```

Vite prints the local URL to open. Owner-specific git and SSH notes are in [`AGENTS.md`](AGENTS.md).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reload. |
| `npm run build` | Builds the production site into `dist/`. |
| `npm run preview` | Serves the built `dist/` locally, to check the production build. |
| `make docs` | Builds the docs site into `site/` with `mkdocs build --strict`, failing on any warning. |
| `make screenshots` | Builds and serves the site, then captures every page in `docs/manual/pages.json` at desktop and mobile widths into `docs/manual/screenshots/`. `PORT=<port>` sets the preview port (default `4173`). |

## Project layout

| Path | What it holds |
| --- | --- |
| `src/pages/` | One component per page. |
| `src/components/` | Shared parts such as the navbar, footer and page header. |
| `src/hooks/` | Shared React hooks, including per-page title and meta tags. |
| `src/index.css` | Tailwind setup and the design tokens under `@theme`. There is no `tailwind.config.js`. |
| `src/App.jsx` | The routes. |
| `scripts/` | Python scripts for screenshot capture and route metadata checks. |
| `docs/`, `mkdocs.yml` | The docs site (MkDocs with the Material theme). |
| `vercel.json` | The SPA rewrite that sends every path to `index.html`. |

## How changes go live

Changes reach dgc.ph in two steps:

1. **Pull request to `main`.** Work on a branch and open a pull request to `main`. Vercel builds a preview deployment for it, and merging to `main` creates another preview. Neither changes the live site.
2. **Release.** The site owner brings the `production` branch up to a verified commit on `main` (a fast-forward of `production` to `main`, which `make release` does from a checkout of that commit; `make rollback REF=<commit>` puts an earlier one back). Vercel's production branch is `production`, so that push deploys to dgc.ph.

A merged change is not live until it has been released. Any commit on `main` can be released, so `main` must always stay releasable. Only the site owner releases.

## Docs and conventions

- [`AGENTS.md`](AGENTS.md): working conventions, routes, commands and deploy notes.
- [`docs/index.md`](docs/index.md): product brief, who the site is for and what it must say.
- [`docs/decisions.md`](docs/decisions.md): decision log.
- [`docs/manual/README.md`](docs/manual/README.md): user manual, one section per page with screenshots.

Build the docs with `make docs` (or `uvx --with mkdocs-material mkdocs build --strict`), or preview them with `uvx --with mkdocs-material mkdocs serve`.

Any change users can see must update the user manual and its screenshots (`make screenshots`) in the same pull request.
