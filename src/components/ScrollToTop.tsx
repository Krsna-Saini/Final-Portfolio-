import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route change: scroll to the hash target if present (smoothly),
 * otherwise jump to the top of the page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // let the target section mount first
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo({ top: 0 })
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])

  return null
}
