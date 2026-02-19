'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states immediately to prevent flash
      statsRef.current.forEach((stat) => {
        if (stat) {
          gsap.set(stat, {
            y: 40,
            opacity: 0,
            scale: 0.95,
          })
        }
      })
      
      // Animate stats on scroll - faster and smoother
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.to(stat, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              refreshPriority: -1,
            },
            delay: index * 0.05,
          })

          // Mobile scroll-based hover effect - only on mobile (one by one)
          const isMobile = window.innerWidth < 640
          if (isMobile) {
            // Find decorative elements
            const topLine = stat.querySelector('.absolute.top-0') as HTMLElement
            const bottomLine = stat.querySelector('.absolute.bottom-0') as HTMLElement
            
            // Create scroll-triggered hover effect for each card individually
            ScrollTrigger.create({
              trigger: stat,
              start: 'top 70%',
              end: 'bottom 30%',
              onEnter: () => {
                // Apply desktop hover effect via GSAP - same as desktop hover
                gsap.to(stat, {
                  y: -8,
                  duration: 0.5,
                  ease: 'power2.out',
                })
                // Show decorative elements (same as desktop hover)
                if (topLine) gsap.to(topLine, { opacity: 1, duration: 0.5 })
                if (bottomLine) gsap.to(bottomLine, { width: '5rem', duration: 0.5 })
                // Add border and shadow
                stat.classList.add('mobile-stat-active')
              },
              onLeave: () => {
                gsap.to(stat, {
                  y: 0,
                  duration: 0.5,
                  ease: 'power2.out',
                })
                if (topLine) gsap.to(topLine, { opacity: 0, duration: 0.5 })
                if (bottomLine) gsap.to(bottomLine, { width: 0, duration: 0.5 })
                stat.classList.remove('mobile-stat-active')
              },
              onEnterBack: () => {
                gsap.to(stat, {
                  y: -8,
                  duration: 0.5,
                  ease: 'power2.out',
                })
                if (topLine) gsap.to(topLine, { opacity: 1, duration: 0.5 })
                if (bottomLine) gsap.to(bottomLine, { width: '5rem', duration: 0.5 })
                stat.classList.add('mobile-stat-active')
              },
              onLeaveBack: () => {
                gsap.to(stat, {
                  y: 0,
                  duration: 0.5,
                  ease: 'power2.out',
                })
                if (topLine) gsap.to(topLine, { opacity: 0, duration: 0.5 })
                if (bottomLine) gsap.to(bottomLine, { width: 0, duration: 0.5 })
                stat.classList.remove('mobile-stat-active')
              },
            })
          }
        }
      })
      
      // Refresh ScrollTrigger after a brief delay to ensure proper calculation
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { number: '500+', label: 'Events Captured' },
    { number: '10+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative bg-white py-12 md:py-16 -mt-16 md:-mt-20 z-30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Grid - Professional Design - Same as Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => {
                  statsRef.current[i] = el
                }}
                className="group relative text-center p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-warm-50/50 rounded-2xl border border-gray-100 hover:border-warm-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden mobile-stat-card"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-warm-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                
                {/* Number - Same sizing as desktop */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight font-serif break-words overflow-visible">
                  {stat.number}
                </div>
                
                {/* Label - Same sizing as desktop */}
                <div className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg font-medium uppercase tracking-wider break-words px-2">
                  {stat.label}
                </div>
                
                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-warm-500 to-warm-600 group-hover:w-20 transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

