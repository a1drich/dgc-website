import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
