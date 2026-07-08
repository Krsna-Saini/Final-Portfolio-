import { motion } from 'framer-motion'
import { Building2, Zap, ArrowUpRight } from 'lucide-react'
import { experiences } from '../data'
import SectionHeading from '../components/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-cyan-glow/10 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          label="Experience"
          title={
            <>
              Where I&apos;ve <span className="gradient-text">Made Impact</span>
            </>
          }
          description="A production-scale engineering internship at Microsoft, working on M365 Copilot."
        />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.company + i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="card-glow glass relative overflow-hidden rounded-3xl p-6 sm:p-9"
            >
              {/* accent corner */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-glow/20 blur-3xl" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-glow to-cyan-glow shadow-glow">
                    <Building2 size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-cyan-glow">
                      {exp.company} · <span className="text-slate-400">{exp.location}</span>
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-sm text-slate-300">
                  {exp.period}
                </span>
              </div>

              <p className="relative mt-6 max-w-3xl leading-relaxed text-slate-300">
                {exp.summary}
              </p>

              <ul className="relative mt-6 grid gap-4 lg:grid-cols-2">
                {exp.highlights.map((h, hi) => (
                  <motion.li
                    key={hi}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + hi * 0.08 }}
                    className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-violet-glow/15 text-violet-300">
                      <Zap size={13} />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-400">{h}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="relative mt-6 flex flex-wrap items-center gap-2">
                {exp.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500"
        >
          <ArrowUpRight size={16} className="text-violet-400" />
          Turning ambiguous performance problems into measurable, data-backed decisions.
        </motion.div>
      </div>
    </section>
  )
}
