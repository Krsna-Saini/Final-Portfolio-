export type Opportunity = {
  id: string
  name: string
  email: string
  company: string
  type: string
  budget: string
  message: string
  read: boolean
  archived: boolean
  starred: boolean
  createdAt: string
}

export type Stats = { total: number; unread: number; starred: number; archived: number }

const KEY_STORAGE = 'pf_admin_key'

export function getKey() {
  return localStorage.getItem(KEY_STORAGE) || ''
}
export function setKey(k: string) {
  localStorage.setItem(KEY_STORAGE, k)
}
export function clearKey() {
  localStorage.removeItem(KEY_STORAGE)
}

function headers() {
  return { 'Content-Type': 'application/json', 'x-admin-key': getKey() }
}

export async function verifyKey(key: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/verify', { headers: { 'x-admin-key': key } })
    return res.ok
  } catch {
    return false
  }
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const res = await fetch('/api/opportunities', { headers: headers() })
  if (!res.ok) throw new Error('unauthorized')
  const data = await res.json()
  return data.items as Opportunity[]
}

export async function fetchStats(): Promise<Stats> {
  const res = await fetch('/api/opportunities/stats', { headers: headers() })
  if (!res.ok) throw new Error('unauthorized')
  const data = await res.json()
  return data.stats as Stats
}

export async function patchOpportunity(id: string, patch: Partial<Pick<Opportunity, 'read' | 'archived' | 'starred'>>) {
  const res = await fetch(`/api/opportunities/${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error('failed')
  return (await res.json()).item as Opportunity
}

export async function deleteOpportunity(id: string) {
  const res = await fetch(`/api/opportunities/${id}`, { method: 'DELETE', headers: headers() })
  if (!res.ok) throw new Error('failed')
}

export type SubmitPayload = {
  name: string
  email: string
  company?: string
  type?: string
  budget?: string
  message: string
}

export async function submitOpportunity(payload: SubmitPayload) {
  const res = await fetch('/api/opportunities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Could not send your message.')
  return data
}
