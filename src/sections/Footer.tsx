import { ArrowUp, Heart, Inbox } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile, socials, navLinks } from '../data'
import { brandIcons } from '../components/Icons'
import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-12">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-x relative">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-xs text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-glow to-cyan-glow font-display text-sm font-bold text-white">
                KS
              </span>
              <span className="font-display text-lg font-semibold text-white">
                {profile.name}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Full-stack developer crafting fast, meaningful and beautiful digital experiences.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={'/' + l.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-3">
              {socials.map((s) => {
                const Brand = brandIcons[s.icon]
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.name}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:-translate-y-1 hover:border-violet-glow/50 hover:text-white"
                  >
                    {Brand ? <Brand className="h-[18px] w-[18px]" /> : <Mail size={18} />}
                  </a>
                )
              })}
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-violet-glow/50 hover:text-white"
            >
              Back to top <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="inline-flex items-center gap-4">
            <p className="inline-flex items-center gap-1.5">
              Built with <Heart size={12} className="text-magenta-glow" /> &amp; a lot of coffee.
            </p>
            <Link
              to="/inbox"
              className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-violet-300"
              title="Owner inbox"
            >
              <Inbox size={12} /> Inbox
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
