import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'opportunities.json')

/** Serialized write queue so concurrent requests never corrupt the file. */
let writeChain = Promise.resolve()

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8')
  }
}

export async function readAll() {
  await ensureFile()
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist(list) {
  // chain writes; write to a temp file then atomically rename
  writeChain = writeChain.then(async () => {
    await ensureFile()
    const tmp = `${DATA_FILE}.${Date.now()}.tmp`
    await fs.writeFile(tmp, JSON.stringify(list, null, 2), 'utf8')
    await fs.rename(tmp, DATA_FILE)
  })
  return writeChain
}

function makeId() {
  return `opp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export async function createOpportunity(input) {
  const list = await readAll()
  const entry = {
    id: makeId(),
    name: String(input.name || '').slice(0, 120),
    email: String(input.email || '').slice(0, 160),
    company: String(input.company || '').slice(0, 160),
    type: String(input.type || 'General').slice(0, 60),
    budget: String(input.budget || '').slice(0, 60),
    message: String(input.message || '').slice(0, 4000),
    read: false,
    archived: false,
    starred: false,
    createdAt: new Date().toISOString(),
  }
  list.push(entry)
  await persist(list)
  return entry
}

export async function updateOpportunity(id, patch) {
  const list = await readAll()
  const idx = list.findIndex((o) => o.id === id)
  if (idx === -1) return null
  const allowed = ['read', 'archived', 'starred']
  for (const key of allowed) {
    if (key in patch) list[idx][key] = Boolean(patch[key])
  }
  await persist(list)
  return list[idx]
}

export async function deleteOpportunity(id) {
  const list = await readAll()
  const next = list.filter((o) => o.id !== id)
  if (next.length === list.length) return false
  await persist(next)
  return true
}

export async function getStats() {
  const list = await readAll()
  return {
    total: list.length,
    unread: list.filter((o) => !o.read && !o.archived).length,
    starred: list.filter((o) => o.starred && !o.archived).length,
    archived: list.filter((o) => o.archived).length,
  }
}
