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
      // Animate stats on scroll - faster and smoother
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.from(stat, {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.05,
          })
        }
      })
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
          {/* Stats Grid - Professional Design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => {
                  statsRef.current[i] = el
                }}
                className="group relative text-center p-6 md:p-8 bg-gradient-to-br from-white to-warm-50/50 rounded-2xl border border-gray-100 hover:border-warm-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-warm-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                
                {/* Number */}
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-3 md:mb-4 leading-none font-serif">
                  {stat.number}
                </div>
                
                {/* Label */}
                <div className="text-gray-600 text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider">
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

