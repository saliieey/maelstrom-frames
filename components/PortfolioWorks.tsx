'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import type { WorkFrame } from '@/lib/wordpress'

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url?.trim()) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
  ]
  const match = url.match(patterns[0])
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

const MAIN_FILTERS = [
  { id: 'all', label: 'All Work' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'event', label: 'Events' },
  { id: 'save-the-date', label: 'Save the Date' },
] as const

const WEDDING_SUB_FILTERS = [
  { id: 'hindu', label: 'Hindu Wedding' },
  { id: 'muslim', label: 'Muslim Wedding' },
  { id: 'christian', label: 'Christian Wedding' },
] as const

function normalizeKey(s: string): string {
  return (s || '').toLowerCase().trim().replace(/\s+/g, ' ')
}

/**
 * Group key for merging related media.
 * Using only title caused different works with same names to merge into one card.
 * Include category/place/date to keep distinct works visible.
 */
function getProjectKey(w: WorkFrame): string {
  return [
    normalizeKey(w.title),
    normalizeKey(w.main_category),
    normalizeKey(w.place),
    normalizeKey(w.date),
  ].join('::')
}

/** Merged project: one card per event, collecting ALL images + video */
interface MergedWork {
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
}

function mergeWorksByProject(works: WorkFrame[]): MergedWork[] {
  const map = new Map<string, MergedWork>()
  for (const w of works) {
    const key = getProjectKey(w)
    const existing = map.get(key)
    if (existing) {
      if (w.media_type === 'video' && w.video_url) {
        existing.hasVideo = true
        existing.videoUrl = w.video_url
        if (w.image && !existing.images.includes(w.image)) existing.images.push(w.image)
      } else if (w.media_type === 'photo' && w.image) {
        existing.hasPhoto = true
        if (!existing.images.includes(w.image)) existing.images.push(w.image)
        if (!existing.image) existing.image = w.image
      }
    } else {
      const images: string[] = w.image ? [w.image] : []
      map.set(key, {
        id: w.id,
        title: w.title,
        image: w.image,
        images,
        place: w.place,
        date: w.date,
        main_category: w.main_category,
        wedding_type: w.wedding_type,
        hasPhoto: w.media_type === 'photo',
        hasVideo: w.media_type === 'video' && !!w.video_url,
        videoUrl: w.video_url || '',
      })
    }
  }
  return Array.from(map.values())
}

function getCategoryLabel(item: MergedWork): string {
  if (item.main_category === 'event') return 'Event'
  if (item.main_category === 'save-the-date') return 'Save the Date'
  if (item.wedding_type) {
    const type = item.wedding_type.charAt(0).toUpperCase() + item.wedding_type.slice(1)
    return `${type} Wedding`
  }
  return 'Wedding'
}

function filterWorks(works: WorkFrame[], filterId: string): WorkFrame[] {
  if (filterId === 'all') return works
  if (filterId === 'event') return works.filter((w) => w.main_category === 'event')
  if (filterId === 'save-the-date') return works.filter((w) => w.main_category === 'save-the-date')
  if (filterId === 'wedding') return works.filter((w) => w.main_category === 'wedding')
  return works.filter(
    (w) => w.main_category === 'wedding' && w.wedding_type === filterId
  )
}

function filterMergedWorks(works: MergedWork[], filterId: string): MergedWork[] {
  if (filterId === 'all') return works
  if (filterId === 'event') return works.filter((w) => w.main_category === 'event')
  if (filterId === 'save-the-date') return works.filter((w) => w.main_category === 'save-the-date')
  if (filterId === 'wedding') return works.filter((w) => w.main_category === 'wedding')
  return works.filter(
    (w) => w.main_category === 'wedding' && w.wedding_type === filterId
  )
}

function MediaTypeBadge({ hasPhoto, hasVideo }: { hasPhoto: boolean; hasVideo: boolean }) {
  if (hasPhoto && hasVideo) {
    return (
      <span className="inline-flex items-center gap-1.5 text-warm-300 text-xs font-medium uppercase tracking-wider">
        <PhotoIcon className="w-3.5 h-3.5" />
        <span>+</span>
        <VideoIcon className="w-3.5 h-3.5" />
        <span className="sr-only">Photos & Video</span>
      </span>
    )
  }
  if (hasVideo) {
    return (
      <span className="inline-flex items-center gap-1.5 text-warm-300 text-xs font-medium uppercase tracking-wider">
        <VideoIcon className="w-3.5 h-3.5" />
        <span>Video</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-warm-300 text-xs font-medium uppercase tracking-wider">
      <PhotoIcon className="w-3.5 h-3.5" />
      <span>Photos</span>
    </span>
  )
}

function PhotoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

interface PortfolioWorksProps {
  works: WorkFrame[]
}

type ModalView = 'video' | 'photos'

export default function PortfolioWorks({ works }: PortfolioWorksProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null)
  const [detailModal, setDetailModal] = useState<MergedWork | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalView, setModalView] = useState<ModalView>('video')

  const openDetail = (item: MergedWork) => {
    setDetailModal(item)
    setCurrentImageIndex(0)
    setModalView(item.hasVideo ? 'video' : 'photos')
  }

  const closeDetail = () => {
    setDetailModal(null)
  }

  const nextImage = () => {
    if (!detailModal) return
    const images = detailModal.images
    if (images.length > 1) {
      setCurrentImageIndex((i) => (i + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (!detailModal) return
    const images = detailModal.images
    if (images.length > 1) {
      setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)
    }
  }

  const effectiveFilter = activeFilter === 'wedding' && activeSubFilter
    ? activeSubFilter
    : activeFilter

  const mergedWorks = useMemo(() => mergeWorksByProject(works), [works])
  const filteredMergedWorks = useMemo(
    () => filterMergedWorks(mergedWorks, effectiveFilter),
    [mergedWorks, effectiveFilter]
  )

  const handleMainFilter = (id: string) => {
    setActiveFilter(id)
    setActiveSubFilter(null)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail()
    }
    if (detailModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [detailModal])

  const fallbackImage = 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        {/* Main Category Filters */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
            {MAIN_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleMainFilter(filter.id)}
                className={`px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base touch-manipulation ${
                  activeFilter === filter.id
                    ? 'bg-warm-600 text-white shadow-lg shadow-warm-600/30 scale-105'
                    : 'bg-warm-100 text-gray-700 hover:bg-warm-200 hover:scale-105'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wedding Subcategory Filters - Only when Weddings selected */}
        {activeFilter === 'wedding' && (
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-4 md:mb-6">
              <span className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">
                Wedding Types
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
              <button
                onClick={() => setActiveSubFilter(null)}
                className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm touch-manipulation ${
                  activeSubFilter === null
                    ? 'bg-gray-900 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                All Weddings
              </button>
              {WEDDING_SUB_FILTERS.map((subFilter) => (
                <button
                  key={subFilter.id}
                  onClick={() => setActiveSubFilter(subFilter.id)}
                  className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm touch-manipulation ${
                    activeSubFilter === subFilter.id
                      ? 'bg-warm-600 text-white shadow-md shadow-warm-600/30 scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {subFilter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 px-4 sm:px-0">
          {filteredMergedWorks.map((item, index) => (
            <article
              key={`${item.id}-${item.title}`}
              onClick={() => openDetail(item)}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] w-full cursor-pointer border border-gray-100/70 bg-white shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {item.hasVideo && (
                <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-black/60 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <VideoIcon className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" />
                  </div>
                </div>
              )}
              <Image
                src={item.image || fallbackImage}
                alt={item.title}
                fill
                className="object-cover object-[50%_25%] group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
                loading={index < 6 ? 'eager' : 'lazy'}
                quality={85}
              />
              <div className="absolute inset-0 z-20 px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 flex flex-col justify-end">
                <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-warm-300 text-xs font-semibold uppercase tracking-wider">
                      {getCategoryLabel(item)}
                    </span>
                    <MediaTypeBadge hasPhoto={item.hasPhoto} hasVideo={item.hasVideo} />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                    {item.place && <span>{item.place}</span>}
                    {item.place && item.date && <span>•</span>}
                    {item.date && <span>{item.date}</span>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredMergedWorks.length === 0 && (
          <div className="text-center py-16 px-4">
            <p className="text-gray-500 text-lg">No works found for this filter.</p>
          </div>
        )}

        {/* Detail Modal - Full viewport, professional lightbox */}
        {detailModal && (
          <div
            className="fixed inset-0 z-[200] flex flex-col bg-black w-full h-full min-h-[100dvh] overflow-hidden"
            onClick={closeDetail}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio detail"
          >
            {/* Close Button - always on top, stops propagation so tap does not hit YouTube iframe on mobile */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                closeDetail()
              }}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-[300] w-12 h-12 md:w-12 md:h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors backdrop-blur-md border-2 border-white/20 touch-manipulation select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="Close"
            >
              <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Single viewport: no scroll inside modal to avoid mobile stuck/iframe capture */}
            <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
              {/* Video - full viewport, only when modalView is video and we have video */}
              {detailModal.hasVideo && getYouTubeEmbedUrl(detailModal.videoUrl) && modalView === 'video' && (
                <div className="absolute inset-0 w-full h-full">
                  <iframe
                    src={getYouTubeEmbedUrl(detailModal.videoUrl)!}
                    title={detailModal.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}

              {/* Images - full viewport, when modalView is photos or only photos exist */}
              {detailModal.images.length > 0 && (modalView === 'photos' || !detailModal.hasVideo) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={detailModal.images[currentImageIndex] || fallbackImage}
                      alt={`${detailModal.title} - ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  {detailModal.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage() }}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-10 border border-white/10 touch-manipulation"
                        aria-label="Previous image"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage() }}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors z-10 border border-white/10 touch-manipulation"
                        aria-label="Next image"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs md:text-sm font-medium z-10 border border-white/10">
                        {currentImageIndex + 1} / {detailModal.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* View switcher: only when project has both video AND multiple photos (not for video + single cover) */}
              {detailModal.hasVideo && detailModal.images.length > 1 && getYouTubeEmbedUrl(detailModal.videoUrl) && (
                <div className="absolute top-4 left-4 right-16 z-[205] flex justify-center pointer-events-none sm:top-6 sm:left-6 sm:right-20">
                  <div className="pointer-events-auto flex rounded-full bg-black/60 backdrop-blur-sm border border-white/10 p-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); setModalView('video') }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors touch-manipulation ${modalView === 'video' ? 'bg-warm-600 text-white' : 'text-white/80 hover:text-white'}`}
                      aria-pressed={modalView === 'video'}
                      aria-label="Show video"
                    >
                      Video
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setModalView('photos') }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors touch-manipulation ${modalView === 'photos' ? 'bg-warm-600 text-white' : 'text-white/80 hover:text-white'}`}
                      aria-pressed={modalView === 'photos'}
                      aria-label={`Show ${detailModal.images.length} photos`}
                    >
                      Photos ({detailModal.images.length})
                    </button>
                  </div>
                </div>
              )}

              {/* Minimal project label to keep full image visibility */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none sm:bottom-6 sm:left-6 sm:right-6">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                  <span className="text-white text-xs sm:text-sm font-medium truncate">
                    {detailModal.title}
                  </span>
                  <span className="text-white/50 text-xs">•</span>
                  <span className="text-white/80 text-[11px] sm:text-xs uppercase tracking-wide whitespace-nowrap">
                    {getCategoryLabel(detailModal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
