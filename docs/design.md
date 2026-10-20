# Design system

This page describes the visual design system of the dgc.ph website as it ships today: the design tokens, the type scale and the shared patterns built from them, with the Tailwind classes that produce each one. Use it when you build or redesign a page so new work matches the rest of the site. For who the site is for and what it must say, see the [product brief](index.md).

## Where the system lives

The tokens are defined in the `@theme` block of `src/index.css` (Tailwind CSS v4 has no `tailwind.config.js`). The same file holds the two custom utilities, `.reveal` and `.bg-grain`. Everything else is built from Tailwind classes in `src/components/` and `src/pages/`.

**New colours, fonts or spacing go into `@theme` first**, then get used through the class Tailwind generates for them (`bg-forest-900`, `font-display`). Don't add raw hex values or arbitrary colour values in components. This follows the [Tailwind CSS v4 decision](decisions.md#tailwind-css-v4-with-the-theme-in-srcindexcss).

## Tokens

### Colours

| Scale | Shades defined | Used for |
| --- | --- | --- |
| `forest` | 50–950 | The brand colour. `forest-900` is the dark section and footer background, the primary button and the main heading colour. `forest-700` is the eyebrow, numbered-label and italic-accent colour and the primary button's hover. `forest-800` is the logo mark, the text-selection background and the form-field focus line. `forest-200` (at 40% opacity) is the blurred glow behind page headers. Hairlines and borders use `forest-900` at 10–25% opacity. |
| `sand` | 50–600 | Backgrounds and text on dark. `sand-50` is the page background, `sand-100` the alternate section background and the text colour on `forest-900`. `sand-200` (at 70%) is the second glow in the Home hero. On dark sections, `sand-100` at 10–85% opacity gives hairlines, muted text and labels. |
| `ink` | 400, 500, 700, 900 | Text on light backgrounds. `ink-900` is the default body text colour, `ink-700` the large intro paragraphs, `ink-500` body copy and leads, `ink-400` small labels and fine print. |
| `gold` | 400, 500 | Accent. Only `gold-400` is used today, as the hover colour of the footer email link. |
| `olive` | 400, 500, 600 | Defined but not used on any page yet. |

The Contact page's cards and form use Tailwind's built-in `bg-white` on top of `sand-50`.

### Fonts

| Token | Stack | Used for |
| --- | --- | --- |
| `font-sans` | Inter, then system UI fonts | Everything by default: body text, labels, buttons, navigation. Set on `:root` with the `cv11`, `ss01` and `ss03` font features. |
| `font-display` | Fraunces, then Inter, then serif | Headings, company names, list item titles, stats and the `contact@dgc.ph` address on the Contact page. Always `font-medium`. |

Both fonts load from Google Fonts in `index.html` (see the [decision log](decisions.md#google-fonts-loaded-from-indexhtml)).

### Letter-spacing

| Token | Value | Status |
| --- | --- | --- |
| `tracking-tightest` | `-0.04em` | Defined, not used yet. |
| `tracking-display` | `-0.02em` | Defined, not used yet. Page titles use `tracking-[-0.025em]` and section headings use Tailwind's `tracking-tight` (also `-0.025em`) instead; see [Known inconsistencies](#known-inconsistencies). |

## Type scale

All headings are `font-display font-medium`, `text-forest-900` on light sections and `text-sand-100` on dark ones.

| Role | Classes | Example |
| --- | --- | --- |
| Home hero title (`h1`) | `text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.02] tracking-[-0.025em]`; key words in `italic text-forest-700` | `src/pages/Home.jsx` |
| Page title (`h1`) | `text-5xl sm:text-6xl md:text-7xl md:leading-[1.04] tracking-[-0.025em]` | `src/components/PageHeader.jsx` |
| Section heading (`h2`) | `text-4xl sm:text-5xl md:text-[3.25rem] md:leading-[1.05] tracking-tight` | `src/components/SectionHeading.jsx` |
| Closing call-to-action heading (`h2`) | `text-3xl sm:text-4xl tracking-tight` | `src/pages/About.jsx`, `src/pages/Portfolio.jsx` |
| Company name (`h3`) | `text-4xl md:text-5xl tracking-[-0.01em]` on the Portfolio page, `text-3xl tracking-[-0.01em]` on Home | `src/components/PortfolioCard.jsx` |
| Item title and stat | `text-2xl` (stats add `sm:text-3xl`) | `src/pages/About.jsx`, `src/pages/Home.jsx` |
| Lead under a title | `text-lg sm:text-xl leading-relaxed text-ink-500` (section leads: `text-lg`) | `src/components/PageHeader.jsx` |
| Intro paragraph | `text-xl md:text-2xl leading-relaxed md:leading-[1.45] text-ink-700` | `src/pages/About.jsx` |
| Body text | `text-[17px]` or `text-[15px] leading-relaxed text-ink-500` (`text-sand-100/65` on dark) | `src/pages/About.jsx` |
| Small label | `text-[11px]`–`text-[13px] uppercase` with `tracking-[0.16em]`–`[0.24em]`; see [Small tracked labels](#small-tracked-labels) | `src/pages/Contact.jsx` |
| Fine print | `text-[12px] text-ink-400` | `src/pages/Contact.jsx` |

## Shared patterns

### Eyebrow label with a leading line

**What:** a short uppercase label above a heading, introduced by a thin horizontal line. It names the page or section ("About DGC", "Our approach").

**When:** above every page title and section heading that has a topic name. Not on the not-found page.

**How:** pass `eyebrow` to `PageHeader` or `SectionHeading`, which render it. By hand:

```html
<span class="inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-forest-700">
  <span class="h-px w-8 bg-forest-700/50" aria-hidden="true"></span>
  Who we are
</span>
```

On `forest-900` sections, use `text-sand-100/60` for the text and `bg-sand-100/40` for the line. The line is `w-10` in page headers and the Home hero and `w-8` in section headings.

**Used in:** `src/components/SectionHeading.jsx`.

### Small tracked labels

**What:** small uppercase text with wide letter-spacing, in Inter. It is the site's "label voice": navigation links, button text, sector names, form-field labels, company website addresses, list numbers and the footer column titles.

**When:** for metadata and controls, never for sentences. Content is written in sentence case; the `uppercase` class sets the casing.

**How:** the common combinations are:

| Use | Classes |
| --- | --- |
| Field labels, sector names, footer column titles | `text-[11px] tracking-[0.22em] uppercase text-ink-400` (or `text-forest-700`, or `text-sand-100/50` on dark) |
| Buttons, company website addresses | `text-[12px] tracking-[0.18em] uppercase` |
| Navigation links, footer email | `text-[13px] tracking-[0.18em] uppercase` |
| Eyebrows | `text-[11px] tracking-[0.24em] uppercase` |

**Used in:** `src/pages/Contact.jsx` (the `Field` component's label).

### Display headings and the shared heading components

**What:** Fraunces headings at the sizes in the [type scale](#type-scale). Two components produce the standard ones:

- **`PageHeader`** (`src/components/PageHeader.jsx`): the top of every page except Home. Props: `eyebrow` (optional), `title`, `lead` (optional). It renders the eyebrow, the `h1` and the lead on the page background, with `bg-grain` and a blurred `forest-200` glow behind them, and fades each in with `reveal` (the lead 120 ms later).
- **`SectionHeading`** (`src/components/SectionHeading.jsx`): the heading block of a light section. Props: `eyebrow`, `title`, `lead` (all but `title` optional) and `align` (`left`, the default, or `center`). It renders the eyebrow, the `h2` and the lead, revealed together.

**When:** use `PageHeader` for a new page and `SectionHeading` for a section on `sand-50` or `sand-100`. Neither has a dark variant, so headings on `forest-900` sections are written by hand with the same classes and `text-sand-100` (see `src/pages/About.jsx`, "Our approach").

**Used in:** `src/pages/About.jsx`.

### Numbered hairline lists

**What:** lists whose items are separated by 1-pixel lines instead of boxes, often numbered `01`, `02` in a small tracked label.

**When:** for short sets of three to six parallel points (principles, focus areas, ways of working), and for the portfolio companies.

**How:** two forms are used:

- **Hairline rows:** each item has `border-t` in a faint tint (`border-forest-900/10` on light, `border-sand-100/10` on dark) and vertical padding. In the "Our approach" list each row has the number in `text-[12px] tracking-[0.22em] uppercase text-sand-100/40` beside a `font-display text-2xl` title and body text. The Home "About" focus list uses the same rows with a small `forest-700` dot instead of a number.
- **Hairline grid:** a grid with `gap-px overflow-hidden rounded-2xl` on a faint tinted background (`bg-forest-900/10` or `bg-sand-100/10`), whose cells use the section's own background, so the gaps show as lines. "What we invest in" numbers its cells with `String(i + 1).padStart(2, '0')` in `text-[11px] tracking-[0.22em] uppercase text-forest-700`.

- **Company index:** `PortfolioCard` (`src/components/PortfolioCard.jsx`) renders one company as a hairline row inside an `<ol>` whose `<li>`s have `border-t border-forest-900/10` and the list a closing `border-b`. It shows the number and sector in `text-[12px] tracking-[0.22em] uppercase text-ink-400`, the name as a Fraunces `h3`, the description, and either the website address with a round `↗` or a **Coming soon** pill. The `row` variant (Portfolio page) spreads this across a 12-column row from `lg`; the `compact` variant (Home, two columns from `md`) stays stacked. A company with a website is one `<a>` that opens in a new tab: on hover and keyboard focus its background goes to `sand-100`, the name and address to `forest-700`, and the `↗` fills with `forest-900` and turns 12° (only without reduced motion); focus also shows a `forest-700` outline. A company without one (`href: '#'`) is an `<article>` with no hover or focus state. There are no shadows or lifts.

Numbers come from the item's position or a `k` field in the data. Index-derived numbers update automatically when reordered; the hard-coded `k` values in About's `approach` array must be updated when items move.

**Used in:** `src/pages/About.jsx` ("Our approach" rows and "What we invest in" grid), `src/pages/Portfolio.jsx` and `src/pages/Home.jsx` (the company index).

### Pill buttons with an arrow

**What:** fully rounded buttons and links with small tracked uppercase text followed by a `→` that nudges right on hover.

**When:** for the main action of a section or page (view the portfolio, get in touch, send the form). Use one primary button per section; put a secondary button beside it for a second choice.

**How:**

| Variant | Classes |
| --- | --- |
| Primary | `group inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-4 text-[12px] tracking-[0.18em] uppercase text-sand-100 transition-all hover:bg-forest-700` |
| Secondary (outlined) | `group inline-flex items-center gap-3 rounded-full border border-forest-900/20 px-7 py-4 text-[12px] tracking-[0.18em] uppercase text-forest-900 transition-all hover:border-forest-900 hover:bg-forest-900/5` |
| Navigation bar "Get in touch" | `rounded-full border border-forest-900/15 bg-white/40 px-5 py-2 text-[12px] tracking-[0.18em] uppercase`; fills with `forest-900` on hover |

The arrow is `<span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>`. Text-only links such as "See full portfolio" on Home use the same text and arrow without the pill. Links that leave the site use `↗` instead of `→`.

**Used in:** `src/pages/Home.jsx` (hero, primary and secondary side by side).

### Section background rhythm

**What:** pages are a stack of full-width sections whose backgrounds alternate so each section reads as its own band without borders.

**When:** for every page. Each section is `<section class="bg-…">` with an inner `mx-auto max-w-7xl px-6 lg:px-10` container and vertical padding of `py-24 sm:py-32` (`sm:py-28` for short call-to-action bands).

**How:** the sequence is:

1. **Top:** `PageHeader` or the Home hero on the `sand-50` page background, with `bg-grain`.
2. **Content sections:** alternate `bg-sand-100` and `bg-sand-50`. A section that continues straight from the page header (the Portfolio company index, the Contact form) stays `bg-sand-50` and uses bottom padding only (`pb-24 sm:pb-32`).
3. **One dark section** at most, `bg-forest-900 text-sand-100`, for the page's core statement (Home's "Investment Philosophy", About's "Our approach"), placed before the closing call to action.
4. **Closing call to action:** `bg-sand-100` with a heading and a primary pill button.
5. **Footer:** `bg-forest-900` (`src/components/Footer.jsx`).

Home runs hero → `sand-100` → `sand-50` → `forest-900` → `sand-100` → footer. About runs the same sequence after its page header.

**Used in:** `src/pages/About.jsx`.

### Reveal-on-scroll motion

**What:** elements fade in and rise 16 px as they scroll into view, over 900 ms with an ease-out curve.

**When:** on headings, paragraphs, cards and list items, so a page settles in rather than appearing at once. Navigation and the footer do not reveal. On Contact, the form reveals as one block; its fields are not individually staggered.

**How:** add the `reveal` class. The `useReveal` hook (`src/hooks/useReveal.js`, called once in `src/App.jsx`) adds `is-visible` to each `.reveal` element when it enters the viewport, and runs again on every route change. Stagger items in a list with an inline ``style={{ transitionDelay: `${i * 70}ms` }}`` (70–80 ms per item; 120 ms for a lead under its heading). Browsers without `IntersectionObserver` show everything immediately.

**Reduced motion:** under `prefers-reduced-motion: reduce`, `.reveal` elements are fully visible with no transform or transition, so nothing moves or waits.

**Used in:** `src/components/PageHeader.jsx`.

### Grain background

**What:** `bg-grain` is a very faint dotted texture (two offset `forest-800` dot grids at 4% and 2.5% opacity) that keeps large light areas from looking flat.

**When:** behind the top of each page and, at reduced opacity, behind Home's closing call to action. Put it on an absolutely positioned, `aria-hidden`, `pointer-events-none` layer under the content:

```html
<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-grain"></div>
```

**Used in:** `src/components/PageHeader.jsx`.

## Known inconsistencies

The same pattern uses different values in different places. They are recorded here rather than changed; pick the more common value for new work and fix the rest in a dedicated change.

- **Eyebrow line width:** `w-10` in `src/components/PageHeader.jsx` and the Home hero (`src/pages/Home.jsx`), `w-8` in `src/components/SectionHeading.jsx` and the dark-section eyebrows in `src/pages/Home.jsx` and `src/pages/About.jsx`.
- **Small label letter-spacing:** five values for one pattern. `0.24em` (eyebrows), `0.22em` (field labels, sector names, footer column titles, list numbers), `0.2em` (Home hero stats in `src/pages/Home.jsx`, "Coming soon" in `src/components/PortfolioCard.jsx`, "Soon" in `src/components/Footer.jsx`), `0.18em` (buttons, navigation, card URLs) and `0.16em` (the copyright line in `src/components/Footer.jsx`).
- **Small label sizes:** list numbers are `text-[11px]` in "What we invest in" and `text-[12px]` in "Our approach" (both `src/pages/About.jsx`). "Coming soon" is `text-[10px]` and "Soon" `text-[9px]`.
- **Heading letter-spacing tokens unused:** `tracking-display` and `tracking-tightest` are defined in `src/index.css` but nothing uses them. Page titles use the arbitrary `tracking-[-0.025em]` (`src/components/PageHeader.jsx`, `src/pages/Home.jsx`), section headings `tracking-tight`, and company names `tracking-[-0.01em]` (`src/components/PortfolioCard.jsx`).
- **Dark-section headings written by hand:** `SectionHeading` has no dark variant, so the eyebrow and `h2` on `forest-900` are copied in `src/pages/Home.jsx` and `src/pages/About.jsx`.
- **Pill button classes copied:** the primary button's classes are repeated in `src/pages/Home.jsx`, `src/pages/About.jsx`, `src/pages/Portfolio.jsx`, `src/pages/Contact.jsx` and `src/pages/NotFound.jsx` instead of coming from a shared component. Home's closing button is larger (`px-8 py-5`) than the rest (`px-7 py-4`).
- **Secondary button:** the Home hero's "About DGC" has a `→` and `transition-all`; the not-found page's "Contact us" (`src/pages/NotFound.jsx`) has no arrow and uses `transition-colors`.
- **Closing call-to-action heading size:** Home's is `text-4xl sm:text-5xl md:text-[3.5rem]` (`src/pages/Home.jsx`); About's and Portfolio's are `text-3xl sm:text-4xl`.
- **Raw colour value:** the page background in `src/index.css` is the hex `#fbfaf6` (the value of `sand-50`) rather than the token.
- **Unused tokens:** the `olive` scale, `gold-500`, `forest-50`, `forest-100`, `forest-300` to `forest-600`, `forest-950` and `sand-300` to `sand-600` are defined but not used.
