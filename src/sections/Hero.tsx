import { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, ChevronDown, MapPin } from 'lucide-react'
import { profile, socials, stats } from '../data'
import { brandIcons } from '../components/Icons'
import { Mail } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'
import { fadeUp as item, stagger as container } from '../lib/motion'

const HeroScene = lazy(() => import('../three/HeroScene'))

function useTypewriter(words: string[], speed = 90, pause = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout: number

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      timeout = window.setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
          )
        },
        deleting ? speed / 2 : speed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, speed, pause])

  return text
}

export default function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<div className="h-full w-full bg-ink-950" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* ambient gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-violet-glow/10 blur-[130px]" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-glow/10 blur-[110px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />

      <div className="container-x relative">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div
            variants={item}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.p variants={item} className="mb-3 font-mono text-sm text-cyan-glow">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            <span className="gradient-text animate-shimmer">{profile.name}</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 flex items-center gap-2 font-display text-2xl font-medium text-slate-200 sm:text-3xl"
          >
            <span className="text-slate-400">I&apos;m a</span>
            <span className="min-h-[1.4em] text-white">
              {role}
              <span className="ml-0.5 inline-block h-6 w-[3px] translate-y-0.5 animate-pulse-glow bg-violet-400 sm:h-7" />
            </span>
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.heroBlurb}
          </motion.p>

          <motion.div variants={item} className="mt-5 inline-flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={15} className="text-violet-400" /> {profile.location}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href="#work">
              <span className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-3 font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-cyan">
                View My Work
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>
            <MagneticButton href={profile.resume} external strength={0.3}>
              <span className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:border-violet-glow/50 hover:bg-white/10">
                <Download size={18} /> Download CV
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {socials.map((s) => {
              const Brand = brandIcons[s.icon]
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.name}
                  className="group grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:-translate-y-1 hover:border-violet-glow/50 hover:text-white hover:shadow-glow"
                >
                  {Brand ? <Brand className="h-[18px] w-[18px]" /> : <Mail size={18} />}
                </a>
              )
            })}
          </motion.div>
        </motion.div>

        {/* floating stat chips */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-4 md:absolute md:bottom-10 md:right-6 md:mt-0 md:w-auto md:grid-cols-1 lg:right-0"
        >
          {stats.slice(0, 3).map((st, i) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="glass rounded-2xl px-4 py-3 text-center md:text-left"
            >
              <div className="gradient-text font-display text-2xl font-bold">
                {st.value}
                {st.suffix}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{st.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-white md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  )
}
