import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navLinks, profile } from '../data'
import { EASE } from '../lib/motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!onHome) return
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [onHome])

  const goTo = (href: string) => {
    const id = href.slice(1)
    setOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', href)
    } else {
      navigate('/' + href)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? 'glass-strong shadow-glow' : 'bg-transparent'
          }`}
        >
          <Link to="/" className="group flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-glow to-cyan-glow font-display text-sm font-bold text-white shadow-glow">
              KS
            </span>
            <span className="font-display text-sm font-semibold tracking-wide text-white/90">
              Krishna<span className="text-violet-400">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => goTo(link.href)}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    onHome && active === link.href.slice(1)
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {onHome && active === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-white transition-all hover:border-violet-glow/50 hover:bg-violet-glow/10 sm:flex"
            >
              <Download size={15} /> Resume
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.ul
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="glass-strong absolute inset-x-4 top-20 rounded-2xl p-3"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => goTo(link.href)}
                    className="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
