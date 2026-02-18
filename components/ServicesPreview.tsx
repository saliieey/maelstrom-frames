'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: 'Wedding Photography',
    description: 'Capturing your special day with artistic vision and attention to detail. Every moment, every emotion, beautifully preserved.',
    icon: '💍',
    color: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Event Coverage',
    description: 'Professional documentation of corporate events, festivals, and celebrations. Comprehensive coverage that tells your story.',
    icon: '🎉',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Videography',
    description: 'Cinematic storytelling that brings your memories to life. Motion, emotion, and artistry combined.',
    icon: '🎬',
    color: 'from-purple-500 to-violet-600',
  },
  {
    title: 'Portrait Sessions',
    description: 'Elegant and timeless portraits for individuals, families, and couples. Professional studio and location photography.',
    icon: '📸',
    color: 'from-amber-500 to-orange-600',
  },
]

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from('.services-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Stagger animation for cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.15,
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-white via-warm-50/30 to-white relative overflow-hidden pt-12 md:pt-16">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-warm-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-warm-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto px-4">
          <div className="inline-block mb-4">
            <span className="text-warm-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          <h2 className="services-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Comprehensive photography and videography solutions crafted with precision and passion
          </p>
        </div>

        {/* Services Grid - Perfect Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 px-4 sm:px-0">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-warm-200 h-full flex flex-col"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className="relative mb-4 md:mb-6">
                <div className="text-5xl md:text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {service.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-warm-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-warm-700 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm md:text-base">
                {service.description}
              </p>

              {/* Hover Arrow */}
              <div className="flex items-center text-warm-600 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                <span className="text-xs sm:text-sm">Learn More</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-500 to-warm-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>

        {/* CTA Button - Centered */}
        <div className="text-center px-4">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            <span>View All Services</span>
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
