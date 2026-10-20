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

## SPA rewrite in `vercel.json` and unknown paths show Home

**Decision:** `vercel.json` rewrites every path to `/index.html`, and the router in `src/App.jsx` has a catch-all `*` route that renders the Home page.

**Why:** The app routes in the browser, so a visitor who opens or refreshes `/about` directly needs the server to return `index.html` instead of a 404. The catch-all means a mistyped or outdated link still lands on a useful page rather than a blank one. The trade-off is that there is no "page not found" message and unknown paths return HTTP 200.

## Contact form opens the visitor's email app

**Decision:** The form on the Contact page does not post to a backend. On submit, `src/pages/Contact.jsx` builds a `mailto:contact@dgc.ph` link with the visitor's name, email and message as the subject and body, and the browser opens the visitor's email app with that draft.

**Why:** It keeps the site fully static: there is no form service, API key, spam filter or stored personal data to manage. The trade-off is that visitors without a configured email app can't send through the form, so the page also shows `contact@dgc.ph` as a plain link they can copy.

## Google Fonts loaded from `index.html`

**Decision:** Inter (body text) and Fraunces (display headings) are loaded from Google Fonts with `<link>` tags in `index.html`, with `preconnect` hints and `display=swap`.

**Why:** It is the simplest way to get both typefaces with no font files to host or build steps. `display=swap` shows text in a fallback font straight away instead of hiding it while the fonts load. The font stacks in `src/index.css` fall back to system fonts if Google Fonts is unavailable.
