'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import type { WorkFrame } from '@/lib/wordpress'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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
] as const

const WEDDING_SUB_FILTERS = [
  { id: 'hindu', label: 'Hindu Wedding' },
  { id: 'muslim', label: 'Muslim Wedding' },
  { id: 'christian', label: 'Christian Wedding' },
] as const

function getCategoryLabel(item: WorkFrame): string {
  if (item.main_category === 'event') return 'Event'
  if (item.wedding_type) {
    const type = item.wedding_type.charAt(0).toUpperCase() + item.wedding_type.slice(1)
    return `${type} Wedding`
  }
  return 'Wedding'
}

function filterWorks(works: WorkFrame[], filterId: string): WorkFrame[] {
  if (filterId === 'all') return works
  if (filterId === 'event') return works.filter((w) => w.main_category === 'event')
  if (filterId === 'wedding') return works.filter((w) => w.main_category === 'wedding')
  return works.filter(
    (w) => w.main_category === 'wedding' && w.wedding_type === filterId
  )
}

interface PortfolioWorksProps {
  works: WorkFrame[]
}

export default function PortfolioWorks({ works }: PortfolioWorksProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null)
  const [videoModal, setVideoModal] = useState<WorkFrame | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const openVideo = (item: WorkFrame) => {
    if (item.media_type === 'video' && item.video_url) {
      setVideoModal(item)
    }
  }

  const closeVideo = () => setVideoModal(null)

  const effectiveFilter = activeFilter === 'wedding' && activeSubFilter
    ? activeSubFilter
    : activeFilter

  const filteredWorks = useMemo(
    () => filterWorks(works, effectiveFilter),
    [works, effectiveFilter]
  )

  const handleMainFilter = (id: string) => {
    setActiveFilter(id)
    setActiveSubFilter(null)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const items = Array.from(gridRef.current.children) as HTMLElement[]
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: 'power2.out',
              delay: index * 0.03,
            }
          )
        })
      }
    }, [filteredWorks])

    return () => ctx.revert()
  }, [filteredWorks])

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
                className={`px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
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
                className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm ${
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
                  className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm ${
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
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 px-4 sm:px-0"
        >
          {filteredWorks.map((item) => {
            const isVideo = item.media_type === 'video' && item.video_url
            const embedUrl = isVideo ? getYouTubeEmbedUrl(item.video_url) : null

            return (
            <article
              key={item.id}
              onClick={() => isVideo && embedUrl && openVideo(item)}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] w-full ${
                isVideo ? 'cursor-pointer' : ''
              }`}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {isVideo && embedUrl && (
                <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-black/50 group-hover:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              <Image
                src={item.image ? item.image : fallbackImage}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 z-20 px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 flex flex-col justify-end">
                <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-warm-300 text-xs font-semibold uppercase tracking-wider">
                      {getCategoryLabel(item)}
                    </span>
                    <span className="text-warm-300 text-xs">
                      {item.media_type === 'video' ? '🎬 Video' : '📸 Photo'}
                    </span>
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
          )})}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-16 px-4">
            <p className="text-gray-500 text-lg">No works found for this filter.</p>
          </div>
        )}

        {/* Video Modal */}
        {videoModal && (() => {
          const embedUrl = getYouTubeEmbedUrl(videoModal.video_url)
          if (!embedUrl) return null
          return (
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90"
              onClick={closeVideo}
              role="dialog"
              aria-modal="true"
              aria-label="Video modal"
            >
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div
                className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={embedUrl}
                  title={videoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-medium">
                {videoModal.title}
              </p>
            </div>
          )
        })()}
      </div>
    </section>
  )
}
