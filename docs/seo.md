# SEO strategy

This page is the search engine optimisation (SEO) strategy for **dgc.ph**: which searches the site should be found for, which page should rank for each, what is in place today, what to do next and in what order, and how to tell whether it is working. It builds on the audiences in the [product brief](index.md) and the choices in the [decision log](decisions.md). Recommendations that would change a recorded decision are marked **Owner's decision** and are proposals, not settled choices.

## Goals

Each goal serves one of the audiences in the [product brief](index.md#who-it-is-for).

1. **Own brand searches.** Anyone curious about DGC, and co-investors or partners checking who it is, search for the name. dgc.ph should be the first result for "De Leon Group of Companies", "DGC Philippines", "DGC family office" and "dgc.ph", with a result title and description that say what DGC is.
2. **Be findable by founders looking for capital.** Founders building technology, digital-platform or sustainability businesses in the Philippines search for investors, not for DGC by name. dgc.ph should appear for searches such as "family office Philippines", "family office investor Manila" and "investor for tech startups Philippines". These are competitive, so the realistic aim is to be indexed and visible for them, not to rank first.
3. **Connect DGC and its portfolio.** People who find a portfolio company (Bookmo, lyv, Comuni, The Hillside) and want to know who backs it should find DGC's Portfolio page, for searches like "Bookmo DGC" or "De Leon Group of Companies portfolio".
4. **Show a correct preview wherever a link is shared.** Co-investors and partners often meet the site through a link in a message, email or social post. Every page's link preview should show that page's own title, description and an image.

Out of scope: content marketing (blog posts, news), paid search and local listings. The product brief describes a four-page site, and none of those are in it.

## Target queries per page

Each query is mapped to the one page that should rank for it, so that pages don't compete with each other. Lengths are in characters: Google usually shows about 60 characters of a title and about 155 of a description, and cuts off the rest.

### Home (`/`)

**Target queries:** De Leon Group of Companies, DGC Philippines, DGC family office, dgc.ph, family office Philippines.

| | Current (`src/pages/Home.jsx`, also in `index.html`) | Check |
| --- | --- | --- |
| Title | De Leon Group of Companies — Technology & Sustainable Ventures in the Philippines (81) | Leads with the brand name, which is right for brand searches. Too long: "in the Philippines" is cut off, and "family office", the phrase founders search for, is missing. |
| Description | De Leon Group of Companies (DGC) is a Philippine-based family office investing in and building companies across technology, digital platforms, and sustainability-driven industries. (180) | Covers the brand, "DGC", "family office" and the sectors. Too long, so the end is cut off. |

### About (`/about`)

**Target queries:** about De Leon Group of Companies, DGC family office Manila, family office investor Philippines, patient capital Philippines.

| | Current (`src/pages/About.jsx`) | Check |
| --- | --- | --- |
| Title | About DGC — De Leon Group of Companies (38) | Clear for brand searches, but says nothing that a founder searching for an investor would match. There is room for "family office" and "Manila". |
| Description | Who De Leon Group of Companies is: a privately held, family-backed office in the Philippines, what it invests in and how it works with founders. (144) | Good length. Says "family-backed office" rather than the searched phrase "family office", and doesn't name the sectors. |

### Portfolio (`/portfolio`)

**Target queries:** De Leon Group of Companies portfolio, DGC portfolio companies, Bookmo / lyv / Comuni / The Hillside investor.

| | Current (`src/pages/Portfolio.jsx`) | Check |
| --- | --- | --- |
| Title | Portfolio — De Leon Group of Companies (38) | Matches. No change needed. |
| Description | The companies DGC backs and builds: Bookmo, lyv, Comuni and The Hillside, across digital platforms, commerce tools, software and sustainable agri-tech. (151) | Names every company and sector, at a good length. No change needed while the list in `src/data/companies.js` stays the same; it has to be updated whenever that list changes (see `AGENTS.md`). |

### Contact (`/contact`)

**Target queries:** contact De Leon Group of Companies, DGC email, DGC Manila contact.

| | Current (`src/pages/Contact.jsx`) | Check |
| --- | --- | --- |
| Title | Contact — De Leon Group of Companies (36) | Matches. No change needed. |
| Description | Get in touch with De Leon Group of Companies. Email contact@dgc.ph or send a message to DGC’s team in Manila, Philippines. (122) | Matches, and shows the email address in the result itself. No change needed. |

### Recommended title and description changes

These are proposals for a follow-up change, not made by this page. Each one changes both the page's `meta` export and, for Home, the matching tags in `index.html`.

| Page | Field | Proposed text | Why |
| --- | --- | --- | --- |
| Home | Title | De Leon Group of Companies (DGC) — Philippine Family Office (59) | Fits in a search result, keeps the brand first, and adds "DGC" and "family office". |
| Home | Description | De Leon Group of Companies (DGC) is a family office in Manila investing in and building technology, digital-platform and sustainability companies. (146) | Same message, short enough to show in full, and adds "Manila". |
| About | Title | About DGC — Family Office in Manila, Philippines (48) | Matches founders' "family office Philippines" searches. "De Leon Group of Companies" stays in the description and the page heading. |
| About | Description | De Leon Group of Companies is a privately held family office in Manila investing patient capital in technology, digital platforms and sustainability. (149) | Uses the searched phrase "family office" and names the sectors. |

## Current state

What is in place on dgc.ph today, and what is missing.

| Area | Today | Gap |
| --- | --- | --- |
| **Per-page metadata** | Each page's `meta` export sets the title, description, canonical URL, `og:title`, `twitter:title`, `og:description`, `twitter:description` and `og:url` in the browser on every route change (`src/hooks/usePageMeta.js`), and `scripts/check_metadata.py` checks them in CI. | None in a browser; crawlers that don't run JavaScript are covered in the next row. |
| **Crawlers that don't run JavaScript** | Every path is served the same `index.html`, which holds Home's tags. | Crawlers that don't run JavaScript see Home's title, description, canonical URL and `og:url` on every path. Google renders JavaScript, so it does see each page's own tags, but later than the HTML. Link previews in social apps and messengers don't run JavaScript, so a shared `/about` or `/contact` link shows Home's preview, and its `og:url` points at Home. |
| **Canonical host** | `https://dgc.ph` is the main address; `www.dgc.ph` redirects to it with a permanent (308) redirect, and canonical URLs use `dgc.ph` with no trailing slash ([decision](decisions.md#per-page-title-description-and-canonical-url-set-in-the-browser)). | None. |
| **`robots.txt`** | None. There is no `public/` folder, so `/robots.txt` falls through the SPA rewrite and returns the site's HTML with HTTP 200. | Crawlers get an HTML page instead of crawl rules and a sitemap address. Tracked in [#41](https://github.com/a1drich/dgc-website/issues/41). |
| **`sitemap.xml`** | None; `/sitemap.xml` also returns the site's HTML. | Search engines learn about pages only by following links. Tracked in [#41](https://github.com/a1drich/dgc-website/issues/41). |
| **Structured data** | None. | No machine-readable statement of who DGC is (name, address, email, main address), which helps brand searches resolve to the right organisation. Tracked in [#42](https://github.com/a1drich/dgc-website/issues/42). |
| **Social preview image** | `twitter:card` is `summary_large_image`, but there is no `og:image` or `twitter:image`. | Shared links show no image, and the large-image card has nothing to show. |
| **Favicon** | An SVG embedded in `index.html` as a `data:` URL. | Google's favicon guidelines ask for an icon file at a URL Google can crawl, so dgc.ph results may show a generic icon instead of DGC's. |
| **Not-found handling** | Unknown paths return HTTP 200 with a not-found page that adds `noindex` and drops the canonical link ([decision](decisions.md#spa-rewrite-in-verceljson-and-unknown-paths-show-a-not-found-page-with-noindex)). | Search engines drop those URLs, but only after rendering the page. They may report them as soft 404s. |
| **Headings** | Every page has exactly one `h1`: Home's "Building the future of technology & sustainable ventures in the Philippines.", and the page header on About, Portfolio and Contact. | The brand name is not in Home's `h1` (it is in the label above it). On Portfolio the company names are `h3` with no `h2` above them, and the footer's column titles are `h3`. Minor. |
| **Internal links** | The navigation bar and footer link all four pages with real `<a href>` links that crawlers can follow, and Home links to About, Portfolio and Contact. | None. |
| **Links to portfolio companies** | Home, Portfolio and the footer link to Bookmo, lyv and Comuni's sites (`target="_blank"`, `rel="noreferrer noopener"`, no `nofollow`). The Hillside has no site yet. | Links from the portfolio companies' sites back to dgc.ph would help both goal 1 and goal 3; whether they exist is outside this repo. |
| **Page speed** | One JavaScript bundle (216 kB, 68 kB gzipped) and one stylesheet (36 kB, 7 kB gzipped). Inter and Fraunces load from Google Fonts with `preconnect` and `display=swap` ([decision](decisions.md#google-fonts-loaded-from-indexhtml)). | Nothing shows until the bundle has loaded and run, because `index.html` has an empty `<div id="root">`. The Google Fonts stylesheet is a render-blocking request to another host. No field data (Core Web Vitals) has been looked at yet. |
| **Mobile** | Viewport tag is set, and CI's browser checks confirm there is no sideways overflow on every page from 320 px wide. | None known. |
| **Search Console and Bing Webmaster Tools** | Nothing records whether either is set up for `dgc.ph`. | No data on which searches show dgc.ph, which pages are indexed, or crawl errors. |

## Recommendations

In priority order. Effort is rough: **S** is under half a day, **M** is a day or two, **L** is more.

| # | Recommendation | Why | Effort | Status |
| --- | --- | --- | --- | --- |
| 1 | Verify `dgc.ph` in Google Search Console as a domain property, and in Bing Webmaster Tools (which can import from Search Console). | Every other step needs this data to show it worked. A domain property also covers `www.dgc.ph`. | S | Site owner; see [Accounts and access](#accounts-and-access). |
| 2 | Add `robots.txt` and `sitemap.xml` listing the four pages. | Tells crawlers where every page is and stops `/robots.txt` returning HTML. | S | [#41](https://github.com/a1drich/dgc-website/issues/41) |
| 3 | Add an `Organization` JSON-LD block to `index.html`. | Gives search engines a machine-readable description of DGC for brand searches. A static block in `index.html` reaches every crawler. | S | [#42](https://github.com/a1drich/dgc-website/issues/42) |
| 4 | Make the Home and About titles and descriptions match their target queries (see [the proposed text](#recommended-title-and-description-changes)). | The Home title and description are cut off in results, and neither page uses "family office", which founders search for. | S | Copy change for the site owner to approve. |
| 5 | Update `og:description` and `twitter:description` per page in `usePageMeta`, from each page's `meta.description`. | Pages currently keep Home's social description even in a browser. | S | Done in [#45](https://github.com/a1drich/dgc-website/issues/45). Pages can set a shorter `socialDescription`; Home does, to keep its link preview text. |
| 6 | Add a 1200 × 630 social preview image as `og:image` and `twitter:image`, and give the favicon its own file in `public/`. | Shared links get an image, the `summary_large_image` card has something to show, and search results can show DGC's icon. | S–M | Needs an image the site owner approves. |
| 7 | **Owner's decision:** prerender each route to its own static HTML at build time. | Every crawler and link preview would see each page's own title, description, canonical URL and content without running JavaScript, and the first paint would no longer wait for the bundle. **Trade-off:** it changes the [static SPA decision](decisions.md#static-vite-react-build-no-server-side-rendering): the build gets a prerender step and possibly a new dependency, and every page has to render without a browser. Site hosting stays static. A lighter option is to write a copy of `index.html` per route with only the head tags changed, which fixes link previews but not the empty first paint. | M | Needs the site owner's decision. |
| 8 | **Owner's decision:** return a real HTTP 404 for unknown paths. | Search engines would see a clear 404 instead of a page they must render to find `noindex`, with no soft-404 reports. **Trade-off:** it changes the [not-found decision](decisions.md#spa-rewrite-in-verceljson-and-unknown-paths-show-a-not-found-page-with-noindex). `vercel.json` would have to rewrite only the four known paths (or depend on recommendation 7) and serve a static `404.html` for the rest, so every new route also needs a `vercel.json` change, and a missed one breaks that page on the live site. The current `noindex` already keeps those URLs out of results, so the gain is small. | S–M | Needs the site owner's decision. Best done together with 7, if at all. |
| 9 | Measure page speed with PageSpeed Insights, then, if fonts or the bundle are the bottleneck, consider self-hosting Inter and Fraunces. | Speed is a small ranking factor and matters to visitors on mobile data. Measure before changing anything. | S to measure, M to change | Self-hosting fonts would change the [Google Fonts decision](decisions.md#google-fonts-loaded-from-indexhtml), so it needs the site owner's decision. |
| 10 | Ask the portfolio companies to link to dgc.ph from their own sites (for example "Backed by De Leon Group of Companies"). | Links from related sites are the main outside signal for goals 1 and 3. | S each | Site owner, outside this repo. |

## Measuring success

Record a baseline in Search Console as soon as it is set up, before the other changes are released, and compare after each release and then monthly.

| Goal | Measure | Where | Target |
| --- | --- | --- | --- |
| Own brand searches | Average position, clicks and impressions for "De Leon Group of Companies", "DGC Philippines" and "dgc.ph" | Search Console → Performance, filtered by query | Average position 1 |
| Every page indexed correctly | Indexed pages, and pages excluded as duplicates or with a different chosen canonical | Search Console → Pages | The four pages indexed, each under its own canonical URL; nothing else indexed |
| Findable by founders | Impressions and clicks for non-brand queries containing "family office" or "investor" | Search Console → Performance | Impressions rising release over release |
| Portfolio connection | Clicks to `/portfolio`, and queries naming a portfolio company | Search Console → Performance, filtered by page | Portfolio page appears for those queries |
| Correct link previews | Each page's preview | Paste each URL into a messaging app, or a preview checker such as LinkedIn's Post Inspector | Each page shows its own title, description and image |
| Page speed | Core Web Vitals (LCP, INP, CLS) on mobile | PageSpeed Insights, Search Console → Core Web Vitals once there is enough traffic | All "Good" |

## Accounts and access

These need the site owner, because they are tied to the domain or to accounts outside this repo. None of them is part of the code.

- **Google Search Console:** add `dgc.ph` as a domain property and verify it with the DNS TXT record Google gives. Add anyone who needs to read the reports as a user.
- **Bing Webmaster Tools:** add the site, most easily by importing it from Search Console.
- **Sitemap submission:** once `sitemap.xml` is live ([#41](https://github.com/a1drich/dgc-website/issues/41)), submit `https://dgc.ph/sitemap.xml` in both tools.

Verifying by DNS keeps the site's code free of verification tokens. If a tool ever needs an HTML tag or file instead, or analytics or a tracking script is wanted, add it in its own change with a decision log entry.
