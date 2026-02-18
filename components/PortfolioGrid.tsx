'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
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
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Elegant Garden Wedding',
    category: 'Wedding',
    location: 'Tuscany, Italy',
    date: 'June 2024',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/portfolio/wedding-1',
    featured: true,
  },
  {
    id: 2,
    title: 'Corporate Annual Meeting',
    category: 'Event',
    location: 'New York, USA',
    date: 'May 2024',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/portfolio/event-1',
  },
  {
    id: 3,
    title: 'Intimate Beach Ceremony',
    category: 'Wedding',
    location: 'Maldives',
    date: 'April 2024',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/portfolio/wedding-2',
    featured: true,
  },
  {
    id: 4,
    title: 'Music Festival Coverage',
    category: 'Event',
    location: 'Coachella, USA',
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/portfolio/event-2',
  },
  {
    id: 5,
    title: 'Destination Wedding',
    category: 'Wedding',
    location: 'Santorini, Greece',
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/portfolio/wedding-3',
  },
  {
    id: 6,
    title: 'Product Launch Event',
    category: 'Event',
    location: 'San Francisco, USA',
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/portfolio/event-3',
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

        {/* Featured Items - Large - Perfect Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 px-4 sm:px-0">
          {featuredItems.map((item, index) => (
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
              
              {/* Content Overlay - Perfectly Positioned */}
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

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-warm-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30" />
            </Link>
          ))}
        </div>

        {/* Regular Grid - Perfect 3 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-0">
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
                className={`object-cover transition-all duration-700 ${
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
