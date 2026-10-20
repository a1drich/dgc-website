# dgc-website

Static marketing site for **dgc.ph**, deployed to Vercel.

## Stack
- Vite 6 + React 18 (JS, no TypeScript), React Router 7 in declarative (client-only SPA) mode
- Tailwind CSS 4 via `@tailwindcss/vite` (theme configured in CSS, not `tailwind.config.js`)
- Vite plugins: `@vitejs/plugin-react` 4.x supports Vite up to 7, so check its peer range before moving Vite to a new major
- Fix `npm audit` findings with `npm audit fix` plus deliberate version bumps; don't use `npm audit fix --force`, which jumps majors
- Output: static `dist/` (Vercel auto-detects Vite — no `vercel.json` needed)

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

## Browser regression checks
After `npm ci` and `npm run build`, start preview and dev servers on available ports with `--host 127.0.0.1 --port <port> --strictPort` to match the test URLs. Install the test browser once with `uv run --with playwright python -m playwright install chromium`, then run:

```sh
uv run --with playwright python tests/browser_smoke.py --base-url http://127.0.0.1:<preview-port> --dev-url http://127.0.0.1:<dev-port> --screenshots docs/manual/screenshots
```

This checks all routes and the Home fallback at desktop/mobile widths, navigation, footer, scroll reset, Tailwind styles and browser errors. The optional dev check briefly edits Contact's heading to verify hot reload and restores the original bytes in a `finally` block; run it from a clean checkout without concurrent source edits. Omit `--dev-url` for preview-only checks. `--screenshots` saves full-page captures; omit it to leave existing captures untouched.
