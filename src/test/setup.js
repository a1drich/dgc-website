import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom doesn't implement scrolling; useScrollToTop calls window.scrollTo.
window.scrollTo = vi.fn()

// The head tags index.html provides and usePageMeta updates.
document.head.innerHTML = `
  <title>De Leon Group of Companies</title>
  <meta name="description" content="" />
  <link rel="canonical" href="https://dgc.ph/" />
  <meta property="og:title" content="" />
  <meta property="og:url" content="https://dgc.ph/" />
  <meta name="twitter:title" content="" />
`

afterEach(cleanup)
