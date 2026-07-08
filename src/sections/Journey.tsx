import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { timeline } from '../data'
import SectionHeading from '../components/SectionHeading'

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="container-x relative">
        <SectionHeading
          label="Timeline"
          title={
            <>
              My <span className="gradient-text">Journey</span> So Far
            </>
          }
          description="From a first line of C++ to shipping full-stack products and a big-tech internship."
        />

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* track */}
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
          {/* progress */}
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-violet-glow via-magenta-glow to-cyan-glow md:left-1/2"
          />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const left = i % 2 === 0
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-start gap-6 pl-12 md:pl-0 ${
                    left ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-4 top-1.5 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-ink-950 md:left-1/2">
                    <span className="h-3 w-3 rounded-full bg-gradient-to-br from-violet-glow to-cyan-glow shadow-glow" />
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-violet-glow/40" />
                  </span>

                  <div className="hidden flex-1 md:block" />

                  <div className="flex-1">
                    <div
                      className={`card-glow glass relative rounded-2xl p-5 ${
                        left ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <span className="gradient-text font-mono text-sm font-semibold">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <ul
                        className={`mt-3 space-y-1.5 text-sm text-slate-400 ${
                          left ? 'md:list-none' : ''
                        }`}
                      >
                        {item.points.map((p, pi) => (
                          <li key={pi}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
