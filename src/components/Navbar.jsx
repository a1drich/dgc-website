import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-sand-50/85 backdrop-blur-md border-b border-forest-900/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link
          to="/"
          aria-label="De Leon Group of Companies — home"
          className="text-forest-900 hover:text-forest-700 transition-colors"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `text-[13px] tracking-[0.18em] uppercase transition-colors ${
                      isActive
                        ? 'text-forest-900'
                        : 'text-ink-500 hover:text-forest-900'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-forest-900/15 bg-white/40 px-5 py-2 text-[12px] tracking-[0.18em] uppercase text-forest-900 transition-all hover:bg-forest-900 hover:text-sand-100 hover:border-forest-900"
        >
          Get in touch
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/15 text-forest-900"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 right-0 top-0 h-px bg-current transition-transform duration-300 ${
                open ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 right-0 bottom-0 h-px bg-current transition-transform duration-300 ${
                open ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-forest-900/10 bg-sand-50/95 backdrop-blur-md transition-[max-height,opacity] duration-500 ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="px-6 py-6">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `block py-3 text-2xl font-display tracking-tight transition-colors ${
                      isActive ? 'text-forest-900' : 'text-ink-700'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-sand-100"
          >
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
