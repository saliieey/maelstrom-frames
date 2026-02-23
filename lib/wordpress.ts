const WORKS_API = 'https://maelstromglobal.in/wp-json/wp/v2/works_frames'

export interface WorkFrame {
  id: number
  title: string
  image: string
  place: string
  date: string
  main_category: 'wedding' | 'event'
  wedding_type: 'hindu' | 'muslim' | 'christian' | null
  media_type: 'photo' | 'video'
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
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
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
  const imageUrl = media?.source_url ?? ''
  const rawTitle = item.title?.rendered ?? ''

  return {
    id: item.id,
    title: decodeHtmlEntities(rawTitle),
    image: imageUrl,
    place: item.acf?.place ?? '',
    date: item.acf?.date ?? '',
    main_category: (item.acf?.main_category === 'wedding' ? 'wedding' : 'event') as 'wedding' | 'event',
    wedding_type: (item.acf?.wedding_type as 'hindu' | 'muslim' | 'christian') || null,
    media_type: (item.acf?.media_type === 'video' ? 'video' : 'photo') as 'photo' | 'video',
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
