export default function PageHeader({ eyebrow, title, lead }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grain"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-forest-200/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {eyebrow && (
          <span className="reveal inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-forest-700">
            <span className="h-px w-10 bg-forest-700/50" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h1 className="reveal mt-8 max-w-4xl font-display text-5xl font-medium tracking-[-0.025em] text-forest-900 sm:text-6xl md:text-7xl md:leading-[1.04]">
          {title}
        </h1>
        {lead && (
          <p
            className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl"
            style={{ transitionDelay: '120ms' }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  )
}
