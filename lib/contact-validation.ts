/** Shared rules for /api/contact — keep in sync with app/contact/page.tsx */

import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const ALLOWED_EVENT_TYPES = [
  'wedding',
  'event',
  'festival',
  'portrait',
  'other',
] as const

export type AllowedEventType = (typeof ALLOWED_EVENT_TYPES)[number]

export const LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  phone: { max: 40 },
  message: { min: 15, max: 6000 },
} as const

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

/**
 * Phone is optional. If provided, must be a valid number for the region.
 * Parses as India (IN) first for local 10-digit style numbers, then as international if +country code is used.
 * This checks real numbering rules (length, ranges) — not whether the SIM is active (that would need a carrier API).
 */
export function isValidPhoneOptional(s: string): boolean {
  const t = s.trim()
  if (t.length === 0) return true
  if (t.length > LIMITS.phone.max) return false

  const parsed =
    parsePhoneNumberFromString(t, 'IN') ?? parsePhoneNumberFromString(t)

  return Boolean(parsed?.isValid())
}

export function isValidEmail(s: string): boolean {
  const t = s.trim()
  if (t.length > LIMITS.email.max) return false
  return EMAIL_RE.test(t)
}

export function isReasonableName(s: string): boolean {
  const t = s.trim()
  if (t.length < LIMITS.name.min || t.length > LIMITS.name.max) return false
  if (/^\d+$/.test(t.replace(/\s/g, ''))) return false
  const collapsed = t.replace(/(.)\1{7,}/g, '')
  if (collapsed.length < t.length - 4) return false
  return true
}

export function isReasonableMessage(s: string): boolean {
  const t = s.trim()
  if (t.length < LIMITS.message.min || t.length > LIMITS.message.max) return false
  const unique = new Set(t.toLowerCase().replace(/\s/g, ''))
  if (unique.size < 4 && t.length > 40) return false
  return true
}

export function isAllowedEventType(v: string): v is AllowedEventType {
  return (ALLOWED_EVENT_TYPES as readonly string[]).includes(v)
}
