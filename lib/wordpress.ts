const WORKS_API = 'https://maelstromglobal.in/wp-json/wp/v2/works_frames'

export interface WorkFrame {
  id: number
  title: string
  image: string
  place: string
  date: string
  main_category: 'wedding' | 'event' | 'save-the-date'
  wedding_type: 'hindu' | 'muslim' | 'christian' | null
  media_type: 'photo' | 'video'
  video_url: string
}

function normalizeMainCategory(value: string | undefined | null): WorkFrame['main_category'] {
  const raw = (value ?? '').toString().toLowerCase().trim()
  if (!raw) return 'event'

  // Normalize common variations coming from ACF select values
  const v = raw.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ')

  if (v === 'wedding') return 'wedding'

  // ACF choice label is "Save the Date" and value may be "save the date" (with spaces)
  if (v.replace(/\s+/g, '') === 'savethedate' || (v.includes('save') && v.includes('date'))) {
    return 'save-the-date'
  }

  return 'event'
}

interface RawWorkFrame {
  id: number
  title: { rendered: string }
  featured_media: number
  acf?: {
    place?: string
    date?: string
    main_category?: string
    wedding_type?: string | null
    media_type?: string
    video_url?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
  /**
   * Yoast SEO outputs the OpenGraph image URL here.
   * Even when WP REST blocks featured-media embedding (rest_forbidden),
   * Yoast can still provide an accessible image URL for the post.
   */
  yoast_head_json?: {
    og_image?: Array<{ url?: string }> | string
  }
}

function decodeHtmlEntities(text: string): string {
  if (!text) return ''
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function transformWorkFrame(item: RawWorkFrame): WorkFrame {
  const media = item._embedded?.['wp:featuredmedia']?.[0]
  let imageUrl = media?.source_url ?? ''

  // Fallback for cases where REST featured-media embedding is forbidden.
  if (!imageUrl) {
    const og = item.yoast_head_json?.og_image
    if (Array.isArray(og)) {
      imageUrl = og[0]?.url ?? ''
    } else if (typeof og === 'string') {
      imageUrl = og
    }
  }

  const rawTitle = item.title?.rendered ?? ''

  return {
    id: item.id,
    title: decodeHtmlEntities(rawTitle),
    image: imageUrl,
    place: item.acf?.place ?? '',
    date: item.acf?.date ?? '',
    main_category: normalizeMainCategory(item.acf?.main_category),
    wedding_type: (item.acf?.wedding_type as 'hindu' | 'muslim' | 'christian') || null,
    media_type: (item.acf?.media_type === 'video' ? 'video' : 'photo') as 'photo' | 'video',
    video_url: item.acf?.video_url ?? '',
  }
}

export async function getWorksFrames(): Promise<WorkFrame[]> {
  try {
    const res = await fetch(
      `${WORKS_API}?_embed&per_page=100&orderby=date&order=desc`,
      {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!res.ok) return []

    const data: RawWorkFrame[] = await res.json()
    return data.map(transformWorkFrame)
  } catch {
    return []
  }
}
