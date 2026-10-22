// One company in the portfolio index. `variant="row"` spreads the entry across
// a 12-column row on large screens (Portfolio page); `variant="compact"` keeps
// it stacked for the two-column list on Home. Below `lg` both stack the same way.
export default function PortfolioCard({
  name,
  href,
  description,
  sector,
  index,
  variant = 'row',
}) {
  const hasLink = href && href !== '#'
  const row = variant === 'row'
  const number = String(index + 1).padStart(2, '0')
  const domain = hasLink
    ? href.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null

  const Tag = hasLink ? 'a' : 'article'
  const rootProps = hasLink
    ? { href, target: '_blank', rel: 'noreferrer noopener' }
    : { 'aria-label': `${name} — coming soon` }

  const marker = hasLink ? (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-900/15 text-forest-900 transition-all duration-500 group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-sand-100 group-focus-visible:border-forest-900 group-focus-visible:bg-forest-900 group-focus-visible:text-sand-100 motion-safe:group-hover:rotate-[-12deg] motion-safe:group-focus-visible:rotate-[-12deg]"
    >
      ↗
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-forest-900/15 px-3 py-1 text-label-xs tracking-label uppercase text-ink-400">
      Coming soon
    </span>
  )

  const domainLine = domain && (
    <p className="text-label tracking-control uppercase text-ink-400 transition-colors group-hover:text-forest-700 group-focus-visible:text-forest-700">
      {domain}
      <span className="sr-only"> (opens in a new tab)</span>
    </p>
  )

  return (
    <Tag
      {...rootProps}
      className={`reveal -mx-4 block rounded-2xl px-4 transition-colors duration-500 ${
        row ? 'py-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:py-10' : 'py-8'
      } ${
        // Only linked entries get `group`, so a Coming soon entry's heading
        // never picks up the group-hover colour.
        hasLink
          ? 'group hover:bg-sand-100 focus-visible:bg-sand-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-700'
          : ''
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top line: number and sector, with the arrow or Coming soon pill on
          the right. On a large row the number gets its own column. */}
      <div
        className={`flex items-start justify-between gap-6 ${
          row ? 'lg:col-span-1 lg:block' : ''
        }`}
      >
        <p className="min-w-0 text-label tracking-label uppercase text-ink-400">
          {number}
          {sector && (
            <span className={row ? 'lg:hidden' : ''}>
              <span aria-hidden="true"> · </span>
              {sector}
            </span>
          )}
        </p>
        <span className={row ? 'lg:hidden' : ''}>{marker}</span>
      </div>

      <div className={row ? 'lg:col-span-4' : ''}>
        {sector && row && (
          <p className="hidden text-label-sm tracking-label uppercase text-ink-400 lg:block">
            {sector}
          </p>
        )}
        <h3
          className={`mt-4 font-display font-medium tracking-[-0.01em] text-forest-900 transition-colors group-hover:text-forest-700 group-focus-visible:text-forest-700 ${
            row ? 'text-4xl md:text-5xl lg:mt-3' : 'text-3xl'
          }`}
        >
          {name}
        </h3>
      </div>

      <p
        className={`mt-4 max-w-md text-[15px] leading-relaxed text-ink-500 ${
          row ? 'lg:col-span-5 lg:mt-1 lg:text-[17px]' : ''
        }`}
      >
        {description}
      </p>

      {domainLine && (
        <div className={`mt-6 ${row ? 'lg:hidden' : ''}`}>{domainLine}</div>
      )}

      {row && (
        <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:text-right">
          {marker}
          {domainLine}
        </div>
      )}
    </Tag>
  )
}
