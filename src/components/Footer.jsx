import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const portfolio = [
  { name: 'Bookmo', href: 'https://bookmo.ph' },
  { name: 'Yay', href: 'https://yay.ph' },
  { name: 'BabyCrate', href: 'https://babycrate.ph' },
  { name: 'The Hillside', href: '#' },
]

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-sand-100">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-sand-100" />
            <p className="mt-6 max-w-sm text-sand-100/70 text-[15px] leading-relaxed">
              A Philippine-based family office investing in technology,
              digital platforms, and sustainability-driven ventures.
            </p>
            <a
              href="mailto:contact@dgc.ph"
              className="mt-8 inline-flex items-center gap-3 text-[13px] tracking-[0.18em] uppercase text-sand-100 hover:text-gold-400 transition-colors"
            >
              <span className="h-px w-8 bg-sand-100/40" aria-hidden="true" />
              contact@dgc.ph
            </a>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[11px] tracking-[0.22em] uppercase text-sand-100/50">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-sand-100/85 hover:text-sand-100 transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[11px] tracking-[0.22em] uppercase text-sand-100/50">
              Portfolio
            </h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {portfolio.map((p) => {
                const hasLink = p.href && p.href !== '#'
                return (
                  <li key={p.name}>
                    {hasLink ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-2 text-sand-100/85 hover:text-sand-100 transition-colors"
                      >
                        {p.name}
                        <span
                          aria-hidden="true"
                          className="text-sand-100/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sand-100/85">
                        {p.name}
                        <span className="text-[9px] tracking-[0.2em] uppercase text-sand-100/40">
                          Soon
                        </span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-sand-100/10 pt-8 text-[12px] tracking-[0.16em] uppercase text-sand-100/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 De Leon Group of Companies (DGC). All rights reserved.</p>
          <p>Manila · Philippines</p>
        </div>
      </div>
    </footer>
  )
}
