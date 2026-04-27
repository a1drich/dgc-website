import { Link } from 'react-router-dom'
import PortfolioCard from '../components/PortfolioCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const portfolio = [
  {
    name: 'Bookmo',
    href: 'https://bookmo.ph',
    sector: 'Digital Booking',
    description:
      'A digital booking platform connecting users with services through seamless, technology-driven experiences.',
  },
  {
    name: 'Yay',
    href: 'https://yay.ph',
    sector: 'Consumer Internet',
    description:
      'A fast-growing platform simplifying everyday services for Filipinos through intuitive digital solutions.',
  },
  {
    name: 'The Daily Detox',
    href: 'https://thedailydetox.com.ph/',
    sector: 'Wellness · Sustainability',
    description:
      'A wellness brand focused on natural detox, functional beverages, and sustainable health products.',
  },
  {
    name: 'DGC Farms',
    href: '#',
    sector: 'Agri-tourism · Sustainability',
    description:
      'A sustainable farm and agri-tourism destination in Palawan, blending regenerative agriculture with immersive guest experiences.',
  },
]

const focusAreas = [
  'Digital platforms',
  'Consumer technology',
  'Sustainability',
  'Scalable internet businesses',
]

const principles = [
  {
    title: 'Long-term perspective',
    body: 'Patient, founder-aligned capital that compounds across cycles, not quarters.',
  },
  {
    title: 'Founder-first mindset',
    body: 'We back operators with conviction, then get out of the way until we can be useful.',
  },
  {
    title: 'Sustainable growth',
    body: 'Durable unit economics and real impact — not growth at any cost.',
  },
  {
    title: 'Technology-driven impact',
    body: 'Software-leveraged businesses that meaningfully reshape everyday life.',
  },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grain"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem] rounded-full bg-forest-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-sand-200/70 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-forest-700">
            <span className="h-px w-10 bg-forest-700/50" aria-hidden="true" />
            De Leon Group of Companies · Est. Manila
          </div>

          <h1 className="reveal mt-8 max-w-5xl font-display text-5xl font-medium tracking-[-0.025em] text-forest-900 sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.02]">
            Building the future of{' '}
            <span className="italic text-forest-700">technology</span> &amp;{' '}
            <span className="italic text-forest-700">sustainable</span> ventures
            in the Philippines.
          </h1>

          <p
            className="reveal mt-10 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl"
            style={{ transitionDelay: '120ms' }}
          >
            De Leon Group of Companies is a family-backed investment group
            supporting innovative platforms and businesses shaping the future of
            everyday life across Southeast Asia.
          </p>

          <div
            className="reveal mt-12 flex flex-wrap items-center gap-4"
            style={{ transitionDelay: '220ms' }}
          >
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-4 text-[12px] tracking-[0.18em] uppercase text-sand-100 transition-all hover:bg-forest-700"
            >
              View portfolio
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 rounded-full border border-forest-900/20 px-7 py-4 text-[12px] tracking-[0.18em] uppercase text-forest-900 transition-all hover:border-forest-900 hover:bg-forest-900/5"
            >
              About DGC
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          <div
            className="reveal mt-24 grid grid-cols-2 gap-6 border-t border-forest-900/10 pt-10 sm:grid-cols-4"
            style={{ transitionDelay: '320ms' }}
          >
            {[
              { k: 'Manila', v: 'Headquarters' },
              { k: 'Family-backed', v: 'Capital base' },
              { k: 'SEA', v: 'Growth focus' },
              { k: 'Long-term', v: 'Horizon' },
            ].map((s) => (
              <div key={s.k}>
                <p className="font-display text-2xl font-medium text-forest-900 sm:text-3xl">
                  {s.k}
                </p>
                <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-ink-400">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <SectionHeading
                eyebrow="About"
                title="A family office building for the long horizon."
              />
            </div>
            <div className="md:col-span-7 md:pl-8">
              <p className="reveal text-xl leading-relaxed text-ink-700 md:text-2xl md:leading-[1.45]">
                De Leon Group of Companies (DGC) is a Philippine-based family
                office investing in and building companies across technology,
                digital platforms, and sustainability-driven industries.
              </p>

              <ul
                className="reveal mt-12 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
                style={{ transitionDelay: '120ms' }}
              >
                {focusAreas.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-4 border-t border-forest-900/10 pt-4 text-[15px] text-forest-900"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-forest-700"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Portfolio"
              title="Companies we back & build."
              lead="A focused set of operating companies and platforms across digital services, consumer internet, and sustainability."
            />
            <Link
              to="/portfolio"
              className="reveal group inline-flex items-center gap-2 self-start text-[12px] tracking-[0.18em] uppercase text-forest-900 md:self-end"
            >
              See full portfolio
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((c, i) => (
              <PortfolioCard key={c.name} index={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT PHILOSOPHY */}
      <section className="bg-forest-900 text-sand-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="reveal inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-sand-100/60">
                <span className="h-px w-8 bg-sand-100/40" aria-hidden="true" />
                Investment Philosophy
              </span>
              <h2 className="reveal mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-[3.25rem] md:leading-[1.05]">
                We partner with founders building meaningful, scalable
                businesses.
              </h2>
              <p
                className="reveal mt-8 max-w-md text-lg leading-relaxed text-sand-100/70"
                style={{ transitionDelay: '120ms' }}
              >
                Innovation, sustainability, and long-term value — not as
                slogans, but as the actual filter for every company we choose
                to back.
              </p>
            </div>

            <div className="md:col-span-7 md:pl-8">
              <ul className="grid gap-px overflow-hidden rounded-2xl bg-sand-100/10 sm:grid-cols-2">
                {principles.map((p, i) => (
                  <li
                    key={p.title}
                    className="reveal bg-forest-900 p-8"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <p className="font-display text-2xl font-medium text-sand-100">
                      {p.title}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-sand-100/65">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-sand-100">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grain opacity-60"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="reveal flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-display text-4xl font-medium tracking-tight text-forest-900 sm:text-5xl md:text-[3.5rem] md:leading-[1.05]">
              Building something impactful in the Philippines or Southeast
              Asia?
            </h2>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-forest-900 px-8 py-5 text-[12px] tracking-[0.18em] uppercase text-sand-100 transition-all hover:bg-forest-700"
            >
              Contact us
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
