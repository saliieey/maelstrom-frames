/**
 * Best-effort in-memory rate limit per IP.
 * On multi-instance hosts (e.g. Vercel) each instance has its own counter — still blocks casual abuse.
 * For strict global limits, use Upstash Redis + @upstash/ratelimit later.
 */

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5
const PRUNE_EVERY = 500

type Entry = { count: number; windowStart: number }

const store = new Map<string, Entry>()
let pruneCounter = 0

function prune(now: number) {
  const cutoff = now - WINDOW_MS * 2
  store.forEach((e, ip) => {
    if (e.windowStart < cutoff) store.delete(ip)
  })
}

export function checkContactRateLimit(ip: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  pruneCounter++
  if (pruneCounter >= PRUNE_EVERY) {
    pruneCounter = 0
    prune(now)
  }

  let e = store.get(ip)
  if (!e || now - e.windowStart >= WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now })
    return { ok: true }
  }

  if (e.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.max(1, Math.ceil((e.windowStart + WINDOW_MS - now) / 1000))
    return { ok: false, retryAfterSec }
  }

  e.count++
  return { ok: true }
}
