import { NextRequest, NextResponse } from 'next/server'
import { checkContactRateLimit } from '@/lib/contact-rate-limit'
import {
  isAllowedEventType,
  isReasonableMessage,
  isReasonableName,
  isValidEmail,
  isValidPhoneOptional,
  LIMITS,
} from '@/lib/contact-validation'

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }
  const real = request.headers.get('x-real-ip')
  if (real) return real.trim()
  const cf = request.headers.get('cf-connecting-ip')
  if (cf) return cf.trim()
  return 'unknown'
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function parseResendErrorBody(raw: string): string | null {
  try {
    const j = JSON.parse(raw) as { message?: string }
    if (typeof j.message === 'string' && j.message.trim()) return j.message.trim()
  } catch {
    /* ignore */
  }
  return null
}

function clip(s: string, max: number) {
  return s.trim().slice(0, max)
}

const EVENT_LABELS: Record<string, string> = {
  wedding: 'Wedding',
  event: 'Corporate Event',
  festival: 'Festival',
  portrait: 'Portrait Session',
  other: 'Other',
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'maelstromframes@gmail.com'
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    'Maelstrom Frames <onboarding@resend.dev>'

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server email is not configured.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }

  const d = body as Record<string, unknown>

  /** Honeypot: must stay empty (bots often fill hidden fields) */
  const hp = String(d.company_website ?? '').trim()
  if (hp.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const ip = getClientIp(request)
  const limited = checkContactRateLimit(ip)
  if (!limited.ok) {
    return NextResponse.json(
      {
        error: `Too many submissions. Please wait ${Math.ceil(limited.retryAfterSec / 60)} minutes and try again.`,
        code: 'RATE_LIMIT',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(limited.retryAfterSec) },
      }
    )
  }

  const name = clip(String(d.name ?? ''), LIMITS.name.max)
  const email = clip(String(d.email ?? ''), LIMITS.email.max)
  const phone = clip(String(d.phone ?? ''), LIMITS.phone.max)
  const eventType = String(d.eventType ?? '').trim()
  const eventDate = clip(String(d.eventDate ?? ''), 32)
  const message = clip(String(d.message ?? ''), LIMITS.message.max)

  if (!name || !email || !eventType || !message) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
  }

  if (!isReasonableName(name)) {
    return NextResponse.json(
      { error: 'Please enter a valid name (2–120 characters).' },
      { status: 400 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (!isValidPhoneOptional(phone)) {
    return NextResponse.json(
      {
        error:
          'Invalid phone number. Use a valid mobile (e.g. 98765 43210 or +91 9876543210), or leave it blank.',
      },
      { status: 400 }
    )
  }

  if (!isAllowedEventType(eventType)) {
    return NextResponse.json({ error: 'Invalid event type.' }, { status: 400 })
  }

  if (eventDate.length > 0 && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
    return NextResponse.json({ error: 'Invalid event date.' }, { status: 400 })
  }

  if (!isReasonableMessage(message)) {
    return NextResponse.json(
      {
        error: `Message must be between ${LIMITS.message.min} and ${LIMITS.message.max} characters and look like a real message.`,
      },
      { status: 400 }
    )
  }

  const eventLabel = EVENT_LABELS[eventType] || eventType
  const subject = `Website inquiry: ${eventLabel} - ${name}`

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Event type:</strong> ${escapeHtml(eventLabel)}</p>
    <p><strong>Event date:</strong> ${escapeHtml(eventDate || '—')}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
  `.trim()

  const text = [
    `New contact form submission`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `Event type: ${eventLabel}`,
    `Event date: ${eventDate || '—'}`,
    `Message:\n${message}`,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      html,
      text,
    }),
  })

  const raw = await res.text()

  if (!res.ok) {
    const resendMsg = parseResendErrorBody(raw)
    console.error('[contact] Resend error:', res.status, raw)

    const errorForClient =
      process.env.NODE_ENV === 'development' && resendMsg
        ? resendMsg
        : 'Could not send message. Please try again later.'

    return NextResponse.json({ error: errorForClient }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
