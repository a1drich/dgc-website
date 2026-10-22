import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://dgc.ph'

function setMeta(selector, attr, key, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (href === null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Sets the document title and the head tags from index.html for the current
// page. `socialTitle` is the og:title / twitter:title and defaults to `title`;
// `socialDescription` is the og:description / twitter:description and defaults
// to `description`.
// `noindex` adds a robots noindex tag and drops the canonical link; every
// other page removes the robots tag again.
export default function usePageMeta({ title, description, socialTitle, socialDescription, noindex = false }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
    const url = SITE_URL + path

    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', socialTitle ?? title)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', socialTitle ?? title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', socialDescription ?? description)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', socialDescription ?? description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)

    if (noindex) {
      setCanonical(null)
      setMeta('meta[name="robots"]', 'name', 'robots', 'noindex')
    } else {
      setCanonical(url)
      document.head.querySelector('meta[name="robots"]')?.remove()
    }
  }, [pathname, title, description, socialTitle, socialDescription, noindex])
}
