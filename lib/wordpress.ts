const WORKS_API = 'https://maelstromglobal.in/wp-json/wp/v2/works_frames'
const POSTS_API = 'https://maelstromglobal.in/wp-json/wp/v2/posts'

export interface WorkFrame {
  id: number
  title: string
  image: string
  images: string[]
  place: string
  date: string
  main_category: 'wedding' | 'event' | 'save-the-date'
  wedding_type: 'hindu' | 'muslim' | 'christian' | null
  hasPhoto: boolean
  hasVideo: boolean
  videoUrl: string
  imagePosition: 'top' | 'center' | 'bottom'
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
  content?: { rendered: string }
  featured_media: number
  acf?: {
    place?: string
    date?: string
    main_category?: string
    wedding_type?: string | null
    video_url?: string
    gallery?: Array<string | { url: string }>
    cover_image_alignment?: 'top' | 'center' | 'bottom'
    image_position?: 'top' | 'center' | 'bottom'
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

export function decodeHtmlEntities(text: string): string {
  if (!text) return ''
  
  // 1. Decode numeric decimal entities (e.g. &#8217;)
  let decoded = text.replace(/&#(\d+);/g, (_, dec) => {
    try {
      return String.fromCharCode(parseInt(dec, 10))
    } catch {
      return _
    }
  })
  
  // 2. Decode numeric hexadecimal entities (e.g. &#x2019;)
  decoded = decoded.replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) => {
    try {
      return String.fromCharCode(parseInt(hex, 16))
    } catch {
      return _
    }
  })
  
  // 3. Decode common named HTML entities
  const entities: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    ndash: '–',
    mdash: '—',
    middot: '·',
    hellip: '…',
    ldquo: '“',
    rdquo: '”',
    lsquo: '‘',
    rsquo: '’',
    sbquo: '‚',
    bdquo: '„',
    dagger: '†',
    Dagger: '‡',
    permil: '‰',
    lsaquo: '‹',
    rsaquo: '›',
    trade: '™',
    copy: '©',
    reg: '®',
    sect: '§',
    deg: '°',
    plusmn: '±',
    para: '¶',
    euro: '€',
  }
  
  return decoded.replace(/&([a-zA-Z0-9]+);/g, (match, name) => {
    const lowerName = name.toLowerCase()
    return Object.prototype.hasOwnProperty.call(entities, lowerName)
      ? entities[lowerName]
      : match
  })
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

  const images = new Set<string>()
  if (imageUrl) images.add(imageUrl)
    
  if (Array.isArray(item.acf?.gallery)) {
    item.acf.gallery.forEach(g => {
      const gUrl = typeof g === 'string' ? g : g?.url
      if (gUrl) images.add(gUrl)
    })
  }

  // Fallback for non-ACF Pro users: extract images from the native WordPress editor content
  const contentHtml = item.content?.rendered || ''
  const imgRegex = /<img[^>]+src="([^">]+)"/g
  let match
  while ((match = imgRegex.exec(contentHtml)) !== null) {
    images.add(match[1])
  }

  const imagesArray = Array.from(images)
  const videoUrl = item.acf?.video_url ?? ''

  return {
    id: item.id,
    title: decodeHtmlEntities(rawTitle),
    image: imageUrl || (imagesArray.length > 0 ? imagesArray[0] : ''),
    images: imagesArray,
    place: decodeHtmlEntities(item.acf?.place ?? ''),
    date: item.acf?.date ?? '',
    main_category: normalizeMainCategory(item.acf?.main_category),
    wedding_type: (item.acf?.wedding_type as 'hindu' | 'muslim' | 'christian') || null,
    hasPhoto: imagesArray.length > 0,
    hasVideo: !!videoUrl,
    videoUrl,
    imagePosition: item.acf?.cover_image_alignment || item.acf?.image_position || 'center',
  }
}

export async function getWorksFrames(): Promise<WorkFrame[]> {
  try {
    const res = await fetch(
      `${WORKS_API}?_embed&per_page=100&orderby=date&order=desc`,
      {
        next: { revalidate: 60 },
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

// ==========================================
// BLOG POSTS INTEGRATION
// ==========================================

export interface BlogPost {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  image: string
  author: string
  category: string
}

interface RawWPPost {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  acf?: {
    custom_author?: string
  }
  meta?: {
    custom_author?: string
  }
  _embedded?: {
    author?: Array<{ name: string }>
    'wp:term'?: Array<Array<{ name: string }>>
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
  yoast_head_json?: {
    og_image?: Array<{ url?: string }> | string
  }
}

function transformBlogPost(item: RawWPPost): BlogPost {
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

  // Attempt to extract the first category
  const categories = item._embedded?.['wp:term']?.[0] || []
  const category = categories.length > 0 ? categories[0].name : 'Stories'

  // Extract author name: Check for custom_author first, then fallback to native WP author
  const nativeAuthor = item._embedded?.author?.[0]?.name ?? 'Maelstrom Frames'
  const customAuthor = item.acf?.custom_author || item.meta?.custom_author
  const author = customAuthor ? customAuthor.trim() : nativeAuthor

  return {
    id: item.id,
    slug: item.slug,
    title: decodeHtmlEntities(item.title?.rendered ?? ''),
    content: item.content?.rendered ?? '',
    excerpt: decodeHtmlEntities(item.excerpt?.rendered ?? ''),
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    image: imageUrl || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Graceful fallback
    author: decodeHtmlEntities(author),
    category: decodeHtmlEntities(category),
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${POSTS_API}?_embed&per_page=20&orderby=date&order=desc`,
      {
        next: { revalidate: 60 }, // Revalidate every minute instead of no-store for faster blog loading
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!res.ok) return []

    const data: RawWPPost[] = await res.json()
    return data.map(transformBlogPost)
  } catch {
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${POSTS_API}?_embed&slug=${slug}`,
      {
        next: { revalidate: 60 },
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!res.ok) return null
    const data: RawWPPost[] = await res.json()
    
    if (data.length === 0) return null
    
    return transformBlogPost(data[0])
  } catch {
    return null
  }
}
