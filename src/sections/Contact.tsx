import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, MapPin, Check, Loader2, AlertCircle } from 'lucide-react'
import { profile, socials } from '../data'
import { brandIcons } from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import { submitOpportunity } from '../lib/inboxApi'

const OPP_TYPES = [
  'Job opportunity',
  'Freelance / Contract',
  'Collaboration',
  'Just saying hi',
  'Other',
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: OPP_TYPES[0],
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`[${form.type}] from ${form.name || 'someone'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nType: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await submitOpportunity(form)
      setStatus('sent')
      setForm({ name: '', email: '', company: '', type: OPP_TYPES[0], budget: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      // backend unreachable → gracefully fall back to the user's mail app
      setStatus('error')
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : 'Could not reach the server — opening your mail app instead.',
      )
      mailtoFallback()
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-violet-glow/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-glow/20'
  const labelCls = 'mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500'

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-violet-glow/10 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          label="Contact"
          title={
            <>
              Let&apos;s <span className="gradient-text">Build</span> Something
            </>
          }
          description="Have a role, a project or an idea? Send it my way — it lands straight in my inbox."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col justify-between gap-6"
          >
            <div className="card-glow glass rounded-3xl p-7">
              <h3 className="font-display text-2xl font-bold text-white">📬 Get in touch</h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                I&apos;m currently open to internships, freelance work and interesting
                collaborations. Let&apos;s turn an idea into something real.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-violet-glow/40 hover:bg-white/5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-violet-glow/15 text-violet-300">
                    <Mail size={18} />
                  </span>
                  <span className="text-sm text-slate-300 group-hover:text-white">
                    {profile.email}
                  </span>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-glow/15 text-cyan-300">
                    <MapPin size={18} />
                  </span>
                  <span className="text-sm text-slate-300">{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="card-glow glass rounded-3xl p-7">
              <p className="mb-4 text-sm font-medium text-slate-300">Find me online</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => {
                  const Brand = brandIcons[s.icon]
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.name}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:-translate-y-1 hover:border-violet-glow/50 hover:text-white hover:shadow-glow"
                    >
                      {Brand ? <Brand className="h-5 w-5" /> : <Mail size={20} />}
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="card-glow glass relative rounded-3xl p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Name</label>
                <input required value={form.name} onChange={set('name')} placeholder="Your name" className={field} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" className={field} />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Company / Org (optional)</label>
                <input value={form.company} onChange={set('company')} placeholder="Where you're from" className={field} />
              </div>
              <div>
                <label className={labelCls}>Type</label>
                <select value={form.type} onChange={set('type')} className={`${field} appearance-none`}>
                  {OPP_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-ink-950">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls}>Budget / Timeline (optional)</label>
              <input value={form.budget} onChange={set('budget')} placeholder="e.g. Full-time, or $2k, or ASAP" className={field} />
            </div>

            <div className="mt-4">
              <label className={labelCls}>Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set('message')}
                placeholder="Tell me about the opportunity or idea..."
                className={`${field} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-3.5 font-semibold text-white shadow-glow transition-all hover:shadow-glow-cyan disabled:opacity-70"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending…
                </>
              ) : status === 'sent' ? (
                <>
                  <Check size={18} /> Sent — thank you!
                </>
              ) : (
                <>
                  🚀 Send Opportunity
                  <Send size={17} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <AnimatePresence>
              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-green-400"
                >
                  <Check size={15} /> Your message landed in Krishna&apos;s inbox. He&apos;ll reply soon!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-amber-400"
                >
                  <AlertCircle size={15} /> {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
