import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export const meta = {
  title: 'Page not found — De Leon Group of Companies',
  description: 'This page doesn’t exist on dgc.ph. Go to the home page or get in touch with DGC.',
  noindex: true,
}

export default function NotFound() {
  usePageMeta(meta)

  return (
    <>
      <PageHeader
        title="We couldn’t find that page."
        lead="The link may be mistyped or out of date. Head to the home page, or get in touch and tell us what you were looking for."
      />

      <section className="bg-sand-50">
        <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-10">
          <div className="reveal flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-4 text-label tracking-control uppercase text-sand-100 transition-all hover:bg-forest-700"
            >
              Go to home
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-forest-900/20 px-7 py-4 text-label tracking-control uppercase text-forest-900 transition-colors hover:border-forest-900 hover:bg-forest-900/5"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
