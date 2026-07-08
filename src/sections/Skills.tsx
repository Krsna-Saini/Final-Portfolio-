import { motion } from 'framer-motion'
import { Code2, Server, Database, Cpu } from 'lucide-react'
import { skillGroups, marqueeTech } from '../data'
import SectionHeading from '../components/SectionHeading'

const groupIcon = [Code2, Server, Database, Cpu]

const accentMap: Record<string, string> = {
  violet: 'from-violet-glow/20 to-violet-glow/0 text-violet-300 border-violet-glow/30',
  cyan: 'from-cyan-glow/20 to-cyan-glow/0 text-cyan-300 border-cyan-glow/30',
  magenta: 'from-magenta-glow/20 to-magenta-glow/0 text-magenta-glow border-magenta-glow/30',
}
const dotMap: Record<string, string> = {
  violet: 'bg-violet-glow',
  cyan: 'bg-cyan-glow',
  magenta: 'bg-magenta-glow',
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeading
          label="Toolbox"
          title={
            <>
              Skills &amp; <span className="gradient-text">Technologies</span>
            </>
          }
          description="The stack I reach for to design, build and ship polished products end to end."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => {
            const Icon = groupIcon[gi % groupIcon.length]
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: gi * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="card-glow glass group relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br ${accentMap[group.accent]}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mb-4 font-display text-lg font-semibold text-white">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <span className={`h-1.5 w-1.5 rounded-full ${dotMap[group.accent]}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-16 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4">
          {[...marqueeTech, ...marqueeTech].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 font-mono text-sm text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
