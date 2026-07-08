import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Code2, GraduationCap, Rocket } from 'lucide-react'
import { profile, stats } from '../data'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'

const aboutParagraphs = profile.about

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1400
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

const facts = [
  { icon: GraduationCap, label: 'Education', value: 'IIT (BHU) Varanasi' },
  { icon: Code2, label: 'Focus', value: 'Full-Stack Engineering' },
  { icon: Rocket, label: 'Currently', value: 'AI · Real-time · Cloud' },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 rounded-full bg-violet-glow/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          label="About Me"
          title={
            <>
              Developer. <span className="gradient-text">Problem Solver.</span> Dreamer.
            </>
          }
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mx-auto w-full max-w-sm"
          >
            <TiltCard intensity={10} className="rounded-3xl">
              <div className="card-glow glass relative overflow-hidden rounded-3xl p-3">
                <span className="absolute -right-10 -top-10 h-32 w-32 animate-spin-slow rounded-full border border-dashed border-violet-glow/30" />
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
                      <p className="text-xs text-cyan-glow">{profile.title}</p>
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 backdrop-blur">
                      <Sparkles size={16} className="text-violet-300" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Text */}
          <div>
            {aboutParagraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12 }}
                className="mb-4 leading-relaxed text-slate-400"
              >
                {p}
              </motion.p>
            ))}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="glass rounded-2xl p-4"
                >
                  <f.icon size={18} className="mb-2 text-violet-400" />
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">{f.label}</p>
                  <p className="text-sm font-medium text-white">{f.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="gradient-text font-display text-3xl font-bold">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
