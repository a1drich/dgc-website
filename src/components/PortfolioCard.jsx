export default function PortfolioCard({ name, href, description, sector, index }) {
  const hasLink = href && href !== '#'
  const Tag = hasLink ? 'a' : 'div'
  const linkProps = hasLink
    ? { href, target: '_blank', rel: 'noreferrer noopener' }
    : { 'aria-label': `${name} — coming soon` }

  return (
    <Tag
      {...linkProps}
      className={`reveal group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-forest-900/10 bg-white p-8 transition-all duration-500 ${
        hasLink
          ? 'hover:-translate-y-1 hover:border-forest-900/25 hover:shadow-[0_30px_60px_-30px_rgba(11,61,46,0.35)]'
          : ''
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest-800/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="flex items-start justify-between gap-6">
        <div>
          {sector && (
            <p className="text-[11px] tracking-[0.22em] uppercase text-ink-400">
              {sector}
            </p>
          )}
          <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.01em] text-forest-900">
            {name}
          </h3>
        </div>
        {hasLink ? (
          <span
            aria-hidden="true"
            className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-900/15 text-forest-900 transition-all duration-500 group-hover:bg-forest-900 group-hover:text-sand-100 group-hover:border-forest-900 group-hover:rotate-[-12deg]"
          >
            ↗
          </span>
        ) : (
          <span className="mt-1 inline-flex shrink-0 items-center rounded-full border border-forest-900/15 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-ink-400">
            Coming soon
          </span>
        )}
      </div>

      <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-500">
        {description}
      </p>

      <p className="mt-8 text-[12px] tracking-[0.18em] uppercase text-ink-400 group-hover:text-forest-700 transition-colors">
        {hasLink
          ? href.replace(/^https?:\/\//, '').replace(/\/$/, '')
          : 'Palawan, Philippines'}
      </p>
    </Tag>
  )
}
