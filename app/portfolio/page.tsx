'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
        })
      }

      if (gridRef.current) {
        // Set initial states to prevent layout shift
        gsap.set(gridRef.current.children, {
          y: 60,
          opacity: 0,
          scale: 0.98,
        })
        
        gsap.to(gridRef.current.children, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  // Animate grid when filters change
  useEffect(() => {
    if (gridRef.current) {
      const items = Array.from(gridRef.current.children) as HTMLElement[]
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            delay: index * 0.03,
          }
        )
      })
    }
  }, [activeFilter, activeSubFilter])

  const portfolioItems = [
    {
      id: 1,
      title: 'Elegant Garden Wedding',
      category: 'wedding',
      subcategory: 'christian',
      location: 'Tuscany, Italy',
      date: 'June 2024',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'photo',
    },
    {
      id: 2,
      title: 'Corporate Annual Meeting',
      category: 'event',
      subcategory: null,
      location: 'New York, USA',
      date: 'May 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'video',
    },
    {
      id: 3,
      title: 'Traditional Hindu Ceremony',
      category: 'wedding',
      subcategory: 'hindu',
      location: 'Mumbai, India',
      date: 'April 2024',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'photo',
    },
    {
      id: 4,
      title: 'Music Festival Coverage',
      category: 'event',
      subcategory: null,
      location: 'Coachella, USA',
      date: 'March 2024',
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'video',
    },
    {
      id: 5,
      title: 'Beautiful Nikah Ceremony',
      category: 'wedding',
      subcategory: 'muslim',
      location: 'Dubai, UAE',
      date: 'February 2024',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'photo',
    },
    {
      id: 6,
      title: 'Product Launch Event',
      category: 'event',
      subcategory: null,
      location: 'San Francisco, USA',
      date: 'January 2024',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'video',
    },
    {
      id: 7,
      title: 'Grand Hindu Wedding',
      category: 'wedding',
      subcategory: 'hindu',
      location: 'Delhi, India',
      date: 'December 2023',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'photo',
    },
    {
      id: 8,
      title: 'Conference Documentation',
      category: 'event',
      subcategory: null,
      location: 'London, UK',
      date: 'November 2023',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'video',
    },
    {
      id: 9,
      title: 'Elegant Christian Wedding',
      category: 'wedding',
      subcategory: 'christian',
      location: 'Bali, Indonesia',
      date: 'October 2023',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'photo',
    },
    {
      id: 10,
      title: 'Muslim Wedding Celebration',
      category: 'wedding',
      subcategory: 'muslim',
      location: 'Kuala Lumpur, Malaysia',
      date: 'September 2023',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'photo',
    },
    {
      id: 11,
      title: 'Hindu Wedding Festivities',
      category: 'wedding',
      subcategory: 'hindu',
      location: 'Bangalore, India',
      date: 'August 2023',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'video',
    },
    {
      id: 12,
      title: 'Corporate Gala',
      category: 'event',
      subcategory: null,
      location: 'Paris, France',
      date: 'July 2023',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'photo',
    },
  ]

  const mainFilters = [
    { id: 'all', label: 'All Work' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'event', label: 'Events' },
  ]

  const weddingSubFilters = [
    { id: 'hindu', label: 'Hindu Wedding' },
    { id: 'muslim', label: 'Muslim Wedding' },
    { id: 'christian', label: 'Christian Wedding' },
  ]

  // Handle filter changes
  const handleMainFilter = (filterId: string) => {
    setActiveFilter(filterId)
    setActiveSubFilter(null) // Reset subfilter when changing main filter
  }

  const handleSubFilter = (subFilterId: string) => {
    setActiveSubFilter(subFilterId)
  }

  // Filter logic
  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'wedding' && item.category === 'wedding') {
      if (activeSubFilter) {
        return item.subcategory === activeSubFilter
      }
      return true
    }
    return item.category === activeFilter
  })

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Portfolio"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div ref={heroRef} className="relative z-20 text-center px-4">
          <div className="mb-4 md:mb-6">
            <span className="inline-block px-4 md:px-5 py-2 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs md:text-sm font-medium border border-white/20">
              Our Portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
            Our Portfolio
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of stunning photography and videography work
          </p>
        </div>
      </section>

      {/* Filter Section - Professional Design */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          {/* Main Category Filters */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
              {mainFilters.map((filter) => (
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

          {/* Wedding Subcategory Filters - Only show when Wedding is selected */}
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
                {weddingSubFilters.map((subFilter) => (
                  <button
                    key={subFilter.id}
                    onClick={() => handleSubFilter(subFilter.id)}
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

          {/* Portfolio Grid - Perfect Alignment */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 md:gap-6 px-4 sm:px-0">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] cursor-pointer w-full m-0"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Content Overlay - Perfectly Positioned */}
                <div className="absolute inset-0 z-20 px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-warm-300 text-xs font-semibold uppercase tracking-wider">
                        {item.subcategory 
                          ? `${item.subcategory.charAt(0).toUpperCase() + item.subcategory.slice(1)} Wedding`
                          : item.category === 'wedding' 
                          ? 'Wedding' 
                          : item.category}
                      </span>
                      <span className="text-warm-300 text-xs">
                        {item.type === 'video' ? '🎬 Video' : '📸 Photo'}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-warm-50">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Ready to Create Your Story?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can capture your special moments
          </p>
          <Link href="/contact" className="btn btn-primary text-lg px-8 py-4">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
