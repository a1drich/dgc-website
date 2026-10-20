import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { meta as homeMeta } from './pages/Home.jsx'
import { meta as aboutMeta } from './pages/About.jsx'
import { meta as portfolioMeta } from './pages/Portfolio.jsx'
import { meta as contactMeta } from './pages/Contact.jsx'
import { meta as notFoundMeta } from './pages/NotFound.jsx'
import { companies } from './data/companies.js'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

const routes = [
  { path: '/', meta: homeMeta, heading: /Building the future of technology & sustainable ventures in the Philippines/ },
  { path: '/about', meta: aboutMeta, heading: 'A privately held family office focused on future-ready businesses.' },
  { path: '/portfolio', meta: portfolioMeta, heading: 'A focused set of companies, intentionally chosen.' },
  { path: '/contact', meta: contactMeta, heading: 'Let’s start a conversation.' },
]

describe('routes', () => {
  it.each(routes)('$path renders its page and title', ({ path, meta, heading }) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeTruthy()
    expect(document.title).toBe(meta.title)
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
  })

  it('an unknown path renders the not-found page with noindex', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { level: 1, name: 'We couldn’t find that page.' })).toBeTruthy()
    expect(document.title).toBe(notFoundMeta.title)
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex')
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })
})

describe('portfolio companies', () => {
  const names = ['Bookmo', 'lyv', 'Comuni', 'The Hillside']
  const linked = companies.filter((c) => c.href !== '#')

  it('lists the current companies and their destinations', () => {
    expect(companies.map(({ name, href }) => ({ name, href }))).toEqual([
      { name: 'Bookmo', href: 'https://bookmo.ph' },
      { name: 'lyv', href: 'https://www.lyv.ph' },
      { name: 'Comuni', href: 'https://www.comuni.ph' },
      { name: 'The Hillside', href: '#' },
    ])
  })

  it.each(['/', '/portfolio'])('%s shows a card for each company, in order', (path) => {
    renderAt(path)
    const main = screen.getByRole('main')
    const cardNames = within(main)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
      .filter((name) => names.includes(name))
    expect(cardNames).toEqual(names)
    expect(within(main).getByLabelText('The Hillside — coming soon').textContent).toContain('Coming soon')
    for (const c of companies) {
      const card = within(main).getByRole('heading', { level: 3, name: c.name }).closest('a, [aria-label]')
      expect(card.textContent).toContain(c.sector)
      expect(card.textContent).toContain(c.description)
    }
    for (const c of linked) {
      const card = within(main).getByRole('heading', { level: 3, name: c.name }).closest('a')
      expect(card.getAttribute('href')).toBe(c.href)
      expect(card.getAttribute('target')).toBe('_blank')
      expect(card.textContent).toContain(c.href.replace(/^https?:\/\//, ''))
    }
  })

  it('the footer links to each company with a website', () => {
    renderAt('/')
    const footer = screen.getByRole('contentinfo')
    const portfolio = within(footer).getByRole('heading', { name: 'Portfolio' }).parentElement
    expect(within(portfolio).getAllByRole('listitem').map((item) => item.textContent.replace(/Soon|↗/g, '').trim())).toEqual(names)
    for (const c of linked) {
      const link = within(footer).getByRole('link', { name: c.name })
      expect(link.getAttribute('href')).toBe(c.href)
      expect(link.getAttribute('target')).toBe('_blank')
    }
    expect(within(footer).getByText('The Hillside')).toBeTruthy()
  })
})
