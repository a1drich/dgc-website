import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const investAreas = [
  { title: 'Technology platforms', body: 'Software-leveraged businesses serving real, recurring needs.' },
  { title: 'Digital marketplaces', body: 'Two-sided networks unlocking liquidity in underserved categories.' },
  { title: 'Consumer internet', body: 'Brands and products built natively for the mobile-first Filipino consumer.' },
  { title: 'Sustainability-driven brands', body: 'Companies whose growth and impact compound in the same direction.' },
  { title: 'Wellness & lifestyle', body: 'Modern, durable brands shaping how people live and feel better, daily.' },
]

const approach = [
  { k: '01', title: 'Patient, long-term capital', body: 'We hold for outcomes, not exit windows. Founders set the pace.' },
  { k: '02', title: 'Strategic partnership', body: 'Board-level partnership where it matters; absent where it doesn’t.' },
  { k: '03', title: 'Hands-on when needed', body: 'Operating support across distribution, hiring, and finance — on demand.' },
  { k: '04', title: 'Durable, scalable growth', body: 'We optimize for compounding fundamentals over short-cycle metrics.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About DGC"
        title="A privately held family office focused on future-ready businesses."
        lead="De Leon Group of Companies invests in and builds companies across technology, digital platforms, and sustainability — with a long horizon and deep operating roots in the Philippines."
      />

      {/* WHO WE ARE */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <SectionHeading
                eyebrow="Who we are"
                title="Family-backed capital, built for the long term."
              />
            </div>
            <div className="md:col-span-7 md:pl-8">
              <p className="reveal text-xl leading-relaxed text-ink-700 md:text-2xl md:leading-[1.45]">
                DGC is a privately held family office focused on investing in
                and building future-ready businesses in the Philippines.
              </p>
              <p
                className="reveal mt-8 text-[17px] leading-relaxed text-ink-500"
                style={{ transitionDelay: '120ms' }}
              >
                We partner with operators across consumer technology, digital
                services, and sustainability-driven categories — backing
                companies we believe will define the next generation of
                Southeast Asian growth. Our capital is patient, our
                relationships are direct, and our reputation is the only
                metric that compounds across every cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE INVEST IN */}
      <section className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <SectionHeading
            eyebrow="What we invest in"
            title="A focused mandate, intentionally narrow."
            lead="We back a small number of categories where we have conviction, networks, and operating context."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {investAreas.map((a, i) => (
              <div
                key={a.title}
                className="reveal bg-sand-50 p-8"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="text-[11px] tracking-[0.22em] uppercase text-forest-700">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-2xl font-medium text-forest-900">
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-forest-900 text-sand-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="reveal inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-sand-100/60">
                <span className="h-px w-8 bg-sand-100/40" aria-hidden="true" />
                Our approach
              </span>
              <h2 className="reveal mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-[3.25rem] md:leading-[1.05]">
                Quietly involved.
                <br />
                Deeply aligned.
              </h2>
            </div>

            <ol className="md:col-span-7 md:pl-8">
              {approach.map((a, i) => (
                <li
                  key={a.k}
                  className="reveal flex flex-col gap-3 border-t border-sand-100/10 py-8 sm:flex-row sm:gap-10"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <p className="text-[12px] tracking-[0.22em] uppercase text-sand-100/40 sm:w-16 sm:shrink-0">
                    {a.k}
                  </p>
                  <div>
                    <p className="font-display text-2xl font-medium text-sand-100">
                      {a.title}
                    </p>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-sand-100/65">
                      {a.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
          <div className="reveal flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight text-forest-900 sm:text-4xl">
              Curious whether we’re the right partner?
            </h2>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-4 text-[12px] tracking-[0.18em] uppercase text-sand-100 transition-all hover:bg-forest-700"
            >
              Reach out
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
