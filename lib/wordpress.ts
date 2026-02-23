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

function transformWorkFrame(item: RawWorkFrame): WorkFrame {
  const media = item._embedded?.['wp:featuredmedia']?.[0]
  const imageUrl = media?.source_url ?? ''

  return {
    id: item.id,
    title: item.title?.rendered ?? '',
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
