import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data'
import SectionHeading from '../components/SectionHeading'
import TiltCard from '../components/TiltCard'

const accentBorder: Record<string, string> = {
  violet: 'hover:shadow-glow',
  cyan: 'hover:shadow-glow-cyan',
  magenta: 'hover:shadow-glow-pink',
}
const tagColor: Record<string, string> = {
  violet: 'text-violet-300 border-violet-glow/30',
  cyan: 'text-cyan-300 border-cyan-glow/30',
  magenta: 'text-magenta-glow border-magenta-glow/30',
}

export default function Projects() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-magenta-glow/10 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          label="Selected Work"
          title={
            <>
              Things I&apos;ve <span className="gradient-text">Built</span>
            </>
          }
          description="A handful of products I designed and shipped — tap any project to explore it in 3D."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
            >
              <TiltCard intensity={8} className="rounded-3xl">
                <Link
                  to={`/projects/${project.slug}`}
                  className={`card-glow glass group relative block overflow-hidden rounded-3xl transition-shadow duration-500 ${accentBorder[project.accent]}`}
                >
                  {/* image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

                    {/* live-site shortcut */}
                    <span
                      role="link"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(project.url, '_blank', 'noopener,noreferrer')
                      }}
                      className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-white/20 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      title="Open live site"
                    >
                      <ExternalLink size={16} className="text-white" />
                    </span>
                  </div>

                  {/* body */}
                  <div className="relative -mt-10 p-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                      {project.tagline}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className={`rounded-lg border bg-white/5 px-2.5 py-1 font-mono text-xs ${tagColor[project.accent]}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                      Explore Project
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://github.com/Krsna-Saini"
          target="_blank"
          rel="noreferrer noopener"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:border-violet-glow/50 hover:bg-white/10"
        >
          Explore more on GitHub
          <ArrowUpRight size={18} />
        </motion.a>
      </div>
    </section>
  )
}
