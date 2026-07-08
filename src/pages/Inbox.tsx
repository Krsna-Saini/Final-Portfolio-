import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  LogOut,
  RefreshCw,
  Star,
  Archive,
  Trash2,
  Mail,
  Clock,
  Inbox as InboxIcon,
  Check,
  ArrowLeft,
  Home,
  Building2,
  Wallet,
  Tag,
} from 'lucide-react'
import {
  type Opportunity,
  type Stats,
  getKey,
  setKey,
  clearKey,
  verifyKey,
  fetchOpportunities,
  fetchStats,
  patchOpportunity,
  deleteOpportunity,
} from '../lib/inboxApi'

type Filter = 'all' | 'unread' | 'starred' | 'archived'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(iso).toLocaleDateString()
}

export default function Inbox() {
  const [authed, setAuthed] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [checking, setChecking] = useState(false)
  const [authError, setAuthError] = useState('')

  const [items, setItems] = useState<Opportunity[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, starred: 0, archived: 0 })
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const k = getKey()
    if (!k) return
    verifyKey(k).then((ok) => {
      if (ok) {
        setAuthed(true)
        load()
      } else {
        clearKey()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function load() {
    setLoading(true)
    try {
      const [it, st] = await Promise.all([fetchOpportunities(), fetchStats()])
      setItems(it)
      setStats(st)
    } catch {
      clearKey()
      setAuthed(false)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setChecking(true)
    setAuthError('')
    const ok = await verifyKey(keyInput.trim())
    if (ok) {
      setKey(keyInput.trim())
      setAuthed(true)
      setKeyInput('')
      load()
    } else {
      setAuthError('Incorrect passcode. Please try again.')
    }
    setChecking(false)
  }

  function logout() {
    clearKey()
    setAuthed(false)
    setItems([])
  }

  async function refreshStats() {
    try {
      setStats(await fetchStats())
    } catch {
      /* ignore */
    }
  }

  async function toggle(id: string, patch: Partial<Pick<Opportunity, 'read' | 'starred' | 'archived'>>) {
    setItems((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)))
    try {
      await patchOpportunity(id, patch)
      refreshStats()
    } catch {
      load()
    }
  }

  async function remove(id: string) {
    setItems((prev) => prev.filter((o) => o.id !== id))
    try {
      await deleteOpportunity(id)
      refreshStats()
    } catch {
      load()
    }
  }

  function openCard(o: Opportunity) {
    setExpanded((e) => (e === o.id ? null : o.id))
    if (!o.read) toggle(o.id, { read: true })
  }

  const visible = items.filter((o) => {
    if (filter === 'archived') return o.archived
    if (o.archived) return false
    if (filter === 'unread') return !o.read
    if (filter === 'starred') return o.starred
    return true
  })

  // ---------- AUTH GATE ----------
  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center overflow-hidden px-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-glow/10 blur-[130px]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-glow glass w-full max-w-md rounded-3xl p-8"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-glow to-cyan-glow text-white shadow-glow">
            <Lock size={24} />
          </span>
          <h1 className="mt-6 font-display text-2xl font-bold text-white">Owner Inbox</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            This area is private. Enter your admin passcode to view opportunities people have sent you.
          </p>

          <form onSubmit={handleLogin} className="mt-6">
            <input
              type="password"
              autoFocus
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Admin passcode"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-violet-glow/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-glow/20"
            />
            {authError && <p className="mt-2 text-sm text-red-400">{authError}</p>}
            <button
              type="submit"
              disabled={checking || !keyInput.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-3 font-semibold text-white shadow-glow transition-all hover:shadow-glow-cyan disabled:opacity-50"
            >
              {checking ? 'Checking…' : 'Unlock Inbox'}
            </button>
          </form>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>
        </motion.div>
      </div>
    )
  }

  // ---------- INBOX ----------
  const filters: { key: Filter; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: stats.total - stats.archived },
    { key: 'unread', label: 'Unread', count: stats.unread },
    { key: 'starred', label: 'Starred', count: stats.starred },
    { key: 'archived', label: 'Archived', count: stats.archived },
  ]

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-glow to-cyan-glow text-white shadow-glow">
              <InboxIcon size={22} />
              {stats.unread > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-6 min-w-6 place-items-center rounded-full bg-magenta-glow px-1.5 text-xs font-bold text-white">
                  {stats.unread}
                </span>
              )}
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Opportunities</h1>
              <p className="text-sm text-slate-500">
                {stats.unread > 0 ? `${stats.unread} unread` : 'All caught up'} · {stats.total} total
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-violet-glow/50 hover:text-white"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <Link
              to="/"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-violet-glow/50 hover:text-white"
              title="Home"
            >
              <Home size={16} />
            </Link>
            <button
              onClick={logout}
              className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-slate-300 transition-colors hover:border-red-400/50 hover:text-white"
            >
              <LogOut size={15} /> Lock
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-white/10 text-white ring-1 ring-violet-glow/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {f.label}
              {typeof f.count === 'number' && (
                <span className={`rounded-full px-1.5 text-xs ${filter === f.key ? 'bg-violet-glow/30 text-white' : 'bg-white/10 text-slate-400'}`}>
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="mt-6 space-y-3">
          {visible.length === 0 && (
            <div className="glass rounded-3xl px-6 py-20 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-slate-500">
                <InboxIcon size={28} />
              </span>
              <p className="mt-5 font-display text-lg font-semibold text-white">
                {filter === 'all' ? 'No opportunities yet' : `Nothing in ${filter}`}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                When someone sends you an opportunity through the contact form, it&apos;ll appear here.
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {visible.map((o) => (
              <motion.div
                key={o.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className={`card-glow glass overflow-hidden rounded-2xl transition-colors ${
                  !o.read ? 'ring-1 ring-violet-glow/30' : ''
                }`}
              >
                <button onClick={() => openCard(o)} className="flex w-full items-start gap-4 p-5 text-left">
                  <span className="mt-1 shrink-0">
                    {!o.read ? (
                      <span className="block h-2.5 w-2.5 rounded-full bg-violet-glow shadow-glow" />
                    ) : (
                      <span className="block h-2.5 w-2.5 rounded-full bg-white/15" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className={`font-display text-base font-semibold ${o.read ? 'text-slate-300' : 'text-white'}`}>
                        {o.name}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-violet-glow/15 px-2 py-0.5 font-mono text-[11px] text-violet-200">
                        <Tag size={11} /> {o.type}
                      </span>
                      {o.starred && <Star size={14} className="fill-yellow-400 text-yellow-400" />}
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-400">
                      {o.company ? <span className="text-slate-500">{o.company} · </span> : null}
                      {o.message}
                    </p>
                  </div>

                  <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-xs text-slate-500">
                    <Clock size={12} /> {timeAgo(o.createdAt)}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {expanded === o.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5"
                    >
                      <div className="space-y-4 p-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <a href={`mailto:${o.email}`} className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-violet-300">
                            <Mail size={15} className="text-violet-300" /> {o.email}
                          </a>
                          {o.company && (
                            <span className="flex items-center gap-2 text-sm text-slate-300">
                              <Building2 size={15} className="text-cyan-300" /> {o.company}
                            </span>
                          )}
                          {o.budget && (
                            <span className="flex items-center gap-2 text-sm text-slate-300">
                              <Wallet size={15} className="text-magenta-glow" /> {o.budget}
                            </span>
                          )}
                          <span className="flex items-center gap-2 text-sm text-slate-400">
                            <Clock size={15} className="text-slate-500" /> {new Date(o.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <p className="whitespace-pre-wrap rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm leading-relaxed text-slate-300">
                          {o.message}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`mailto:${o.email}?subject=${encodeURIComponent('Re: your message')}`}
                            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-glow to-cyan-glow px-4 py-2 text-sm font-semibold text-white shadow-glow"
                          >
                            <Mail size={15} /> Reply
                          </a>
                          <button
                            onClick={() => toggle(o.id, { read: !o.read })}
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white"
                          >
                            <Check size={15} /> {o.read ? 'Mark unread' : 'Mark read'}
                          </button>
                          <button
                            onClick={() => toggle(o.id, { starred: !o.starred })}
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white"
                          >
                            <Star size={15} className={o.starred ? 'fill-yellow-400 text-yellow-400' : ''} /> {o.starred ? 'Unstar' : 'Star'}
                          </button>
                          <button
                            onClick={() => toggle(o.id, { archived: !o.archived })}
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white"
                          >
                            <Archive size={15} /> {o.archived ? 'Unarchive' : 'Archive'}
                          </button>
                          <button
                            onClick={() => remove(o.id)}
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-red-400/50 hover:text-red-300"
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
