import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import PortfolioCard from '../components/PortfolioCard.jsx'

const companies = [
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

export default function Portfolio() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="A focused set of companies, intentionally chosen."
        lead="We back a small number of operators in technology, digital services, and sustainability — companies we believe will compound over the long term."
      />

      <section className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((c, i) => (
              <PortfolioCard key={c.name} index={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
          <div className="reveal flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-medium tracking-tight text-forest-900 sm:text-4xl">
                Founders we’d love to meet.
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-500">
                If you’re building something meaningful in the Philippines or
                Southeast Asia, we’d like to hear from you.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-4 text-[12px] tracking-[0.18em] uppercase text-sand-100 transition-all hover:bg-forest-700"
            >
              Get in touch
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
