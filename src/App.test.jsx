import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { meta as homeMeta } from './pages/Home.jsx'
import { meta as aboutMeta } from './pages/About.jsx'
import { meta as portfolioMeta } from './pages/Portfolio.jsx'
import { meta as contactMeta } from './pages/Contact.jsx'
import { meta as notFoundMeta } from './pages/NotFound.jsx'

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
