import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// index.html is the only HTML crawlers that don't run JavaScript see, on every path,
// so the Organization block lives there as static markup. See docs/seo.md.
// Vitest runs from the project root.
const html = readFileSync('index.html', 'utf8')
const doc = new DOMParser().parseFromString(html, 'text/html')

describe('Organization structured data in index.html', () => {
  const blocks = doc.querySelectorAll('script[type="application/ld+json"]')

  it('has exactly one JSON-LD block, in the head', () => {
    expect(blocks).toHaveLength(1)
    expect(blocks[0].parentElement).toBe(doc.head)
  })

  it('states only the facts in the product brief', () => {
    const description = doc.head.querySelector('meta[name="description"]').getAttribute('content')

    expect(JSON.parse(blocks[0].textContent)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'De Leon Group of Companies',
      alternateName: 'DGC',
      url: 'https://dgc.ph/',
      email: 'contact@dgc.ph',
      description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Manila',
        addressCountry: 'PH',
      },
    })
  })
})
