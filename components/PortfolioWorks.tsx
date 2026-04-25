'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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

function getCategoryLabel(item: WorkFrame): string {
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

function getObjectPositionClass(pos?: string): string {
  if (pos === 'top') return 'object-top'
  if (pos === 'bottom') return 'object-bottom'
  return 'object-center'
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
  const [detailModal, setDetailModal] = useState<WorkFrame | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalView, setModalView] = useState<ModalView>('video')

  const openDetail = (item: WorkFrame) => {
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

  const filteredWorks = useMemo(
    () => filterWorks(works, effectiveFilter),
    [works, effectiveFilter]
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
    <section className="section-padding bg-white min-h-screen">
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
                    ? 'bg-warm-600 text-white shadow-lg shadow-warm-600/30 scale-105 ring-2 ring-warm-600 ring-offset-2'
                    : 'bg-warm-50 text-gray-700 hover:bg-warm-100 hover:scale-105 border border-warm-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wedding Subcategory Filters */}
        <AnimatePresence>
          {activeFilter === 'wedding' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-12 md:mb-16"
            >
              <div className="text-center mb-4 md:mb-6 pt-4">
                <span className="text-warm-400 text-xs md:text-sm font-semibold uppercase tracking-widest">
                  Wedding Types
                </span>
                <div className="w-12 h-0.5 bg-warm-200 mx-auto mt-2 rounded-full" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4 py-2 pb-4">
                <button
                  onClick={() => setActiveSubFilter(null)}
                  className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm touch-manipulation border ${
                    activeSubFilter === null
                      ? 'bg-gray-900 border-gray-900 text-white shadow-md scale-105'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:scale-105'
                  }`}
                >
                  All Weddings
                </button>
                {WEDDING_SUB_FILTERS.map((subFilter) => (
                  <button
                    key={subFilter.id}
                    onClick={() => setActiveSubFilter(subFilter.id)}
                    className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm touch-manipulation border ${
                      activeSubFilter === subFilter.id
                        ? 'bg-warm-600 border-warm-600 text-white shadow-md shadow-warm-600/30 scale-105'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:scale-105'
                    }`}
                  >
                    {subFilter.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Grid with Framer Motion Layout animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((item, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                key={item.id}
                onClick={() => openDetail(item)}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] w-full cursor-pointer bg-gray-50 shadow-sm hover:shadow-2xl transition-shadow duration-500 will-change-transform ring-1 ring-black/5"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {(item.hasVideo || item.hasPhoto) && (
                  <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                    {item.hasVideo && item.images.length > 1 ? (
                      <div className="px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center gap-2.5 text-white shadow-xl group-hover:bg-white/25 group-hover:scale-105 transition-all duration-500">
                        <VideoIcon className="w-4 h-4 ml-0.5 shadow-sm" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] pt-px drop-shadow-sm">Film & {item.images.length} Photos</span>
                      </div>
                    ) : item.hasVideo ? (
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 shadow-xl">
                        <VideoIcon className="w-6 h-6 md:w-7 md:h-7 text-white ml-1 shadow-sm" />
                      </div>
                    ) : null}
                  </div>
                )}
                <Image
                  src={item.image || fallbackImage}
                  alt={item.title}
                  fill
                  className={`object-cover ${getObjectPositionClass(item.imagePosition)} group-hover:scale-105 transition-transform duration-700 ease-out`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  loading={index < 6 ? 'eager' : 'lazy'}
                  quality={90}
                />
                <div className="absolute inset-0 z-20 px-6 pt-6 pb-8 flex flex-col justify-end">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 bg-warm-600/90 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                        {getCategoryLabel(item)}
                      </span>
                      <MediaTypeBadge hasPhoto={item.hasPhoto} hasVideo={item.hasVideo} />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-md">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-medium">
                      {item.place && <span>{item.place}</span>}
                      {item.place && item.date && <span className="opacity-50">•</span>}
                      {item.date && <span>{item.date}</span>}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWorks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-24 px-4"
          >
            <div className="inline-block p-6 rounded-3xl bg-warm-50 border border-warm-100">
              <svg className="w-12 h-12 text-warm-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Works Found</h3>
              <p className="text-gray-500">We don&apos;t have any projects matching these exact filters yet.</p>
            </div>
          </motion.div>
        )}

        {/* Premium Lightbox Modal */}
        <AnimatePresence>
          {detailModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-xl w-full h-full min-h-[100dvh] overflow-hidden"
              onClick={closeDetail}
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio detail"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  closeDetail()
                }}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-[300] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md border border-white/20 touch-manipulation select-none hover:scale-105"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label="Close"
              >
                <svg className="w-6 h-6 md:w-7 md:h-7 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
                {/* Video View */}
                {detailModal.hasVideo && getYouTubeEmbedUrl(detailModal.videoUrl) && modalView === 'video' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 w-full h-full md:p-8 lg:p-16 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full max-w-7xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                      <iframe
                        src={getYouTubeEmbedUrl(detailModal.videoUrl)!}
                        title={detailModal.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full bg-black"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Photos View */}
                {detailModal.images.length > 0 && (modalView === 'photos' || !detailModal.hasVideo) && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Seamless Preloader for Next & Previous Images to ensure instant UX */}
                    {detailModal.images.length > 1 && (
                      <div className="absolute inset-0 opacity-0 pointer-events-none -z-50 overflow-hidden">
                        <Image
                          src={detailModal.images[(currentImageIndex + 1) % detailModal.images.length] || fallbackImage}
                          alt="preload next"
                          fill
                          sizes="100vw"
                          priority
                          quality={90}
                        />
                        <Image
                          src={detailModal.images[(currentImageIndex - 1 + detailModal.images.length) % detailModal.images.length] || fallbackImage}
                          alt="preload prev"
                          fill
                          sizes="100vw"
                          priority
                          quality={90}
                        />
                      </div>
                    )}

                    <div className="relative w-full h-full md:py-8 lg:py-12">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={detailModal.images[currentImageIndex] || fallbackImage}
                            alt={`${detailModal.title} - ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                            quality={90}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {detailModal.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevImage() }}
                          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all duration-300 z-10 border border-white/20 touch-manipulation backdrop-blur-md hover:scale-105 hover:pr-1"
                          aria-label="Previous image"
                        >
                          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextImage() }}
                          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all duration-300 z-10 border border-white/20 touch-manipulation backdrop-blur-md hover:scale-105 hover:pl-1"
                          aria-label="Next image"
                        >
                          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm md:text-base font-medium z-10 border border-white/20 backdrop-blur-md tracking-wider">
                          {currentImageIndex + 1} <span className="opacity-50 mx-1">/</span> {detailModal.images.length}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* View Switcher (Video / Photos) */}
                {detailModal.hasVideo && detailModal.images.length > 1 && getYouTubeEmbedUrl(detailModal.videoUrl) && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[205] flex justify-center pointer-events-none">
                    <div className="pointer-events-auto flex items-center rounded-full bg-black/40 backdrop-blur-xl border border-white/20 p-1.5 shadow-2xl">
                      <button
                        onClick={(e) => { e.stopPropagation(); setModalView('video') }}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 touch-manipulation ${modalView === 'video' ? 'bg-warm-600 text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                        aria-pressed={modalView === 'video'}
                      >
                        Video
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setModalView('photos') }}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 touch-manipulation ${modalView === 'photos' ? 'bg-warm-600 text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                        aria-pressed={modalView === 'photos'}
                      >
                        Gallery ({detailModal.images.length})
                      </button>
                    </div>
                  </div>
                )}

                {/* Premium Project Label */}
                <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none w-full pb-8 md:pb-12 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-white/70 text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] drop-shadow-md">
                      {getCategoryLabel(detailModal)}
                    </span>
                    <span className="text-white text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-wide drop-shadow-xl">
                      {detailModal.title}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
