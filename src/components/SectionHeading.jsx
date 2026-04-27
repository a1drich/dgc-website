export default function SectionHeading({ eyebrow, title, lead, align = 'left' }) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start'
  return (
    <div className={`reveal flex max-w-3xl flex-col gap-6 ${alignClass}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-forest-700">
          <span className="h-px w-8 bg-forest-700/50" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl font-medium tracking-tight text-forest-900 sm:text-5xl md:text-[3.25rem] md:leading-[1.05]">
        {title}
      </h2>
      {lead && (
        <p className="max-w-2xl text-lg leading-relaxed text-ink-500">{lead}</p>
      )}
    </div>
  )
}
