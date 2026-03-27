'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

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

interface PortfolioItem {
  id: number
  title: string
  category: string
  location: string
  date: string
  image: string
  href: string
  featured?: boolean
  videoUrl?: string
  imageClassName?: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Wedding Highlights',
    category: 'Wedding',
    location: 'Calicut',
    date: 'Feb 2026',
    image: '/images/portfolio/portfolio-1.jpg',
    href: '/portfolio/wedding-1',
    featured: true,
    videoUrl: 'https://youtu.be/0oEx8q_X10s?si=iR7CdqMoYaVaj0qX',
  },
  {
    id: 2,
    title: 'Vyshnav & Sandra - Love Marriage',
    category: 'Wedding',
    location: 'New York, USA',
    date: 'Jan 2026',
    image: '/images/portfolio/portfolio-2.jpg',
    href: '/portfolio/event-1',
    imageClassName: 'object-top',
  },
  {
    id: 3,
    title: 'Wedding Highlights',
    category: 'Wedding',
    location: 'Calicut',
    date: 'Dec 2025',
    image: '/images/portfolio/portfolio-3.jpg',
    href: '/portfolio/wedding-2',
    featured: true,
    videoUrl: 'https://youtu.be/eE3nD-DPExQ?si=gw70tK8KUWF-pLHT',
  },
  {
    id: 4,
    title: 'Save the Date - Akshay & Abhiramy',
    category: 'Save the Date',
    location: 'Coachella, USA',
    date: 'Dec 2025',
    image: '/images/portfolio/portfolio-4.jpg',
    href: '/portfolio/event-2',
    // Focus lower so the couple stays in-frame (this image has subjects near the bottom)
    imageClassName: 'object-[50%_80%]',
  },
  {
    id: 5,
    title: 'Grand Wedding Ceremony',
    category: 'Wedding',
    location: 'Santorini, Greece',
    date: 'February 2024',
    image: '/images/portfolio/portfolio-5.jpg',
    href: '/portfolio/wedding-3',
  },
  {
    id: 6,
    title: 'Save the Date - Sniya & Sreejith',
    category: 'Save the Date',
    location: 'San Francisco, USA',
    date: 'Jan 2026',
    image: '/images/portfolio/portfolio-6.jpg',
    href: '/portfolio/event-3',
  },
  {
    id: 7,
    title: 'Save the Date - Arun & Nila',
    category: 'Save the Date',
    location: 'Paris, France',
    date: 'Jan 2026',
    image: '/images/portfolio/portfolio-7.jpg',
    href: '/portfolio/wedding-4',
  },
  {
    id: 8,
    title: 'Elegant Wedding Portrait',
    category: 'Wedding',
    location: 'London, UK',
    date: 'Feb 2026',
    image: '/images/portfolio/portfolio-8.jpg',
    href: '/portfolio/event-4',
  },
]

export default function PortfolioGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLElement | null)[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation - faster and smoother
      gsap.from('.section-title', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      // Stagger animation for items - optimized for speed
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            y: 60,
            opacity: 0,
            scale: 0.98,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.05,
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const featuredItems = portfolioItems.filter(item => item.featured)
  const regularItems = portfolioItems.filter(item => !item.featured)

  return (
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-warm-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto px-4">
          <div className="inline-block mb-4">
            <span className="text-warm-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Our Work
            </span>
          </div>
          <h2 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Each frame tells a story, each moment captured with precision and artistry
          </p>
        </div>

        {/* Featured Items - Large - Video players (first row) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-0">
          {featuredItems.map((item, index) => {
            const embedUrl = item.videoUrl ? getYouTubeEmbedUrl(item.videoUrl) : null
            const isVideo = !!embedUrl

            if (isVideo && embedUrl) {
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[index] = el
                  }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] w-full bg-gray-900"
                >
                  <iframe
                    src={embedUrl}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Bottom gradient + label overlay (pointer-events-none so clicks reach the iframe) */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-0 z-20 px-6 md:px-8 pt-6 md:pt-8 pb-6 md:pb-8 flex flex-col justify-end pointer-events-none">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <span className="px-3 py-1 bg-warm-600/90 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                        {item.category}
                      </span>
                      <span className="text-white/80 text-xs sm:text-sm">{item.location}</span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-0">{item.date}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-warm-600 z-20 pointer-events-none" />
                </div>
              )
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                ref={(el) => {
                  itemsRef.current[index] = el
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer w-full"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    hoveredId === item.id ? 'scale-110' : 'scale-100'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 z-20 px-6 md:px-8 pt-6 md:pt-8 pb-6 md:pb-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                      <span className="px-3 py-1 bg-warm-600/90 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                        {item.category}
                      </span>
                      <span className="text-white/80 text-xs sm:text-sm">{item.location}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-1 md:mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-0">{item.date}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-warm-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30" />
              </Link>
            )
          })}
        </div>

        {/* Regular Grid - Perfect 3 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 px-4 sm:px-0 mt-6 md:mt-6">
          {regularItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              ref={(el) => {
                itemsRef.current[featuredItems.length + index] = el
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] cursor-pointer w-full"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover ${item.imageClassName ?? ''} transition-all duration-700 ${
                  hoveredId === item.id ? 'scale-110' : 'scale-100'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Content Overlay - Perfectly Aligned */}
              <div className="absolute inset-0 z-20 px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 flex flex-col justify-end">
                <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-warm-300 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mb-0">{item.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button - Centered */}
        <div className="text-center mt-12 md:mt-16 px-4">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            <span>View Full Portfolio</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
