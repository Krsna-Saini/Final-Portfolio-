import express from 'express'
import cors from 'cors'
import {
  createOpportunity,
  readAll,
  updateOpportunity,
  deleteOpportunity,
  getStats,
} from './store.js'
import { notifyNewOpportunity } from './notify.js'

const PORT = Number(process.env.PORT) || 4000
const ADMIN_KEY = process.env.ADMIN_KEY || 'krishna-admin'

const app = express()
app.use(cors())
app.use(express.json({ limit: '64kb' }))

// naive rate-limit for the public submit endpoint (per-IP, sliding window)
const hits = new Map()
function rateLimit(ip, max = 8, windowMs = 60_000) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length <= max
}

function requireAdmin(req, res, next) {
  const key = req.get('x-admin-key') || req.query.key
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: 'Invalid admin key' })
  }
  next()
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || ''))
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api', time: new Date().toISOString() })
})

// --- Public: submit an opportunity ---
app.post('/api/opportunities', async (req, res) => {
  const ip = req.ip || 'unknown'
  if (!rateLimit(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many requests, slow down.' })
  }

  const { name, email, message } = req.body || {}
  if (!name || !isEmail(email) || !message || String(message).trim().length < 5) {
    return res
      .status(400)
      .json({ ok: false, error: 'Please provide a name, a valid email and a message.' })
  }

  try {
    const opp = await createOpportunity(req.body)
    notifyNewOpportunity(opp).catch(() => {})
    res.status(201).json({ ok: true, id: opp.id })
  } catch (err) {
    console.error('create failed:', err)
    res.status(500).json({ ok: false, error: 'Could not save your message.' })
  }
})

// --- Admin: verify key ---
app.get('/api/admin/verify', requireAdmin, (_req, res) => {
  res.json({ ok: true })
})

// --- Admin: list ---
app.get('/api/opportunities', requireAdmin, async (_req, res) => {
  const list = await readAll()
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json({ ok: true, items: list })
})

// --- Admin: stats (unread badge) ---
app.get('/api/opportunities/stats', requireAdmin, async (_req, res) => {
  res.json({ ok: true, stats: await getStats() })
})

// --- Admin: update (read / archived / starred) ---
app.patch('/api/opportunities/:id', requireAdmin, async (req, res) => {
  const updated = await updateOpportunity(req.params.id, req.body || {})
  if (!updated) return res.status(404).json({ ok: false, error: 'Not found' })
  res.json({ ok: true, item: updated })
})

// --- Admin: delete ---
app.delete('/api/opportunities/:id', requireAdmin, async (req, res) => {
  const ok = await deleteOpportunity(req.params.id)
  if (!ok) return res.status(404).json({ ok: false, error: 'Not found' })
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`\n  ▸ Portfolio API running on http://localhost:${PORT}`)
  console.log(`  ▸ Admin key: ${ADMIN_KEY === 'krishna-admin' ? 'krishna-admin (default — change ADMIN_KEY in production)' : '****** (from env)'}\n`)
})
