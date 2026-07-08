import { Suspense, lazy } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Layers,
  Zap,
} from 'lucide-react'
import { projects, getProject } from '../data'
import Navbar from '../components/Navbar'
import Footer from '../sections/Footer'
import { GithubIcon } from '../components/Icons'
import { fadeUp, stagger } from '../lib/motion'

const ProjectScene = lazy(() => import('../three/ProjectScene'))

const accentText: Record<string, string> = {
  violet: 'text-violet-300',
  cyan: 'text-cyan-300',
  magenta: 'text-magenta-glow',
}
const accentTagBorder: Record<string, string> = {
  violet: 'border-violet-glow/30 text-violet-200',
  cyan: 'border-cyan-glow/30 text-cyan-200',
  magenta: 'border-magenta-glow/30 text-pink-200',
}
const accentGlow: Record<string, string> = {
  violet: 'bg-violet-glow/15',
  cyan: 'bg-cyan-glow/15',
  magenta: 'bg-magenta-glow/15',
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="grid min-h-screen place-items-center px-6 text-center">
          <div>
            <p className="section-label">404</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white">Project not found</h1>
            <p className="mt-3 text-slate-400">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              to="/#work"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-3 font-semibold text-white shadow-glow"
            >
              <ArrowLeft size={18} /> Back to all work
            </Link>
          </div>
        </div>
      </>
    )
  }

  const index = projects.findIndex((p) => p.slug === project.slug)
  const shape = index % 4
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <Navbar />

      {/* HERO with unique 3D scene */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10">
          <Suspense fallback={<div className="h-full w-full bg-ink-950" />}>
            <ProjectScene accent={project.accent} shape={shape} />
          </Suspense>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
        <div className={`pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-[130px] ${accentGlow[project.accent]}`} />

        <div className="container-x relative">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
            <motion.div variants={fadeUp}>
              <Link
                to="/#work"
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:text-white"
              >
                <ArrowLeft size={13} /> All Work
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className={`mt-6 font-mono text-sm ${accentText[project.accent]}`}>
              {project.tagline}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-2 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              <span className="gradient-text animate-shimmer">{project.name}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-balance text-base leading-relaxed text-slate-300 sm:text-lg">
              {project.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <span><span className="text-slate-500">Year — </span>{project.year}</span>
              <span><span className="text-slate-500">Role — </span>{project.role}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-3 font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-cyan"
              >
                Visit Live <ExternalLink size={17} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:border-violet-glow/50 hover:bg-white/10"
                >
                  <GithubIcon className="h-[18px] w-[18px]" /> Source
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 md:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-violet-glow to-transparent" />
        </div>
      </section>

      {/* OVERVIEW + SCREENSHOT */}
      <section className="relative py-24 sm:py-28">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-glow" />
                <span className="section-label">Overview</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The story behind <span className="gradient-text">{project.name}</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-400">
                {project.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className={`rounded-lg border bg-white/5 px-3 py-1.5 font-mono text-xs ${accentTagBorder[project.accent]}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="card-glow glass group relative block overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100">
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-8 sm:py-12">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-glow" />
              <span className="section-label">Highlights</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-glow" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What makes it <span className="gradient-text">work</span>
            </h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 md:grid-cols-3"
          >
            {project.features.map((f, i) => {
              const Icon = [Sparkles, Layers, Zap][i % 3]
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  className="card-glow glass group relative rounded-2xl p-6 transition-transform hover:-translate-y-1"
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${accentGlow[project.accent]} ${accentText[project.accent]}`}>
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="relative py-24 sm:py-28">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to={`/projects/${prev.slug}`}
              className="card-glow glass group flex items-center gap-4 rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <ArrowLeft size={20} className="shrink-0 text-slate-400 transition-transform group-hover:-translate-x-1 group-hover:text-white" />
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-500">Previous</p>
                <p className="mt-1 font-display text-lg font-bold text-white">{prev.name}</p>
              </div>
            </Link>
            <Link
              to={`/projects/${next.slug}`}
              className="card-glow glass group flex items-center justify-end gap-4 rounded-2xl p-6 text-right transition-transform hover:-translate-y-1"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-500">Next</p>
                <p className="mt-1 font-display text-lg font-bold text-white">{next.name}</p>
              </div>
              <ArrowRight size={20} className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:border-violet-glow/50 hover:bg-white/10"
            >
              <Layers size={17} /> View all projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
