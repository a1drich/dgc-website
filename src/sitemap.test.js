import { describe, expect, it } from 'vitest'
import appSource from './App.jsx?raw'
import sitemapSource from '../public/sitemap.xml?raw'
import robotsSource from '../public/robots.txt?raw'

const SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'

// Every <Route path="..."> in App.jsx except the `*` not-found route.
const routePaths = [...appSource.matchAll(/<Route\b[^>]*\bpath="([^"]*)"/g)]
  .map(([, path]) => path)
  .filter((path) => path !== '*')

const sitemap = new DOMParser().parseFromString(sitemapSource, 'application/xml')
const locs = [...sitemap.getElementsByTagNameNS(SITEMAP_NS, 'loc')].map((loc) => loc.textContent.trim())

describe('sitemap.xml', () => {
  it('is a sitemaps.org urlset', () => {
    expect(sitemap.querySelector('parsererror')).toBeNull()
    expect(sitemap.documentElement.localName).toBe('urlset')
    expect(sitemap.documentElement.namespaceURI).toBe(SITEMAP_NS)
  })

  it('finds the routes in App.jsx', () => {
    expect(routePaths).toContain('/')
    expect(routePaths.length).toBeGreaterThan(1)
  })

  it('lists the canonical URL of every route in App.jsx, and nothing else', () => {
    const expected = routePaths.map((path) => 'https://dgc.ph' + path)
    expect([...locs].sort()).toEqual([...expected].sort())
    expect(new Set(locs).size).toBe(locs.length)
  })
})

describe('robots.txt', () => {
  it('allows every crawler and points to the sitemap', () => {
    const lines = robotsSource.split('\n').map((line) => line.trim())
    expect(lines).toContain('User-agent: *')
    expect(lines.filter((line) => /^Disallow:\s*\S/i.test(line))).toEqual([])
    expect(lines).toContain('Sitemap: https://dgc.ph/sitemap.xml')
  })
})
