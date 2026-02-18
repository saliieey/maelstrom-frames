'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    title: 'Artistic Excellence',
    description: 'Every frame is crafted with artistic vision, ensuring your memories are not just documented, but transformed into works of art.',
    icon: '🎨',
  },
  {
    title: 'Professional Team',
    description: 'Our experienced photographers and videographers bring years of expertise to every project, ensuring flawless execution.',
    icon: '👥',
  },
  {
    title: 'Cutting-Edge Technology',
    description: 'We use the latest professional equipment and editing software to deliver stunning, high-quality results that exceed expectations.',
    icon: '📷',
  },
  {
    title: 'Personalized Service',
    description: 'Every client is unique, and we tailor our approach to match your style, preferences, and vision for your special occasion.',
    icon: '✨',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.why-title', {
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

      // Stagger animation for items
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
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
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto px-4">
          <div className="inline-block mb-4">
            <span className="text-warm-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>
          <h2 className="why-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Excellence in Every Frame
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            We don&apos;t just capture moments—we create timeless visual narratives
          </p>
        </div>

        {/* Features Grid - Perfect 4 Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-0">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => {
                itemsRef.current[index] = el
              }}
              className="group relative bg-gradient-to-br from-white to-warm-50/50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-warm-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col"
            >
              {/* Icon */}
              <div className="mb-4 md:mb-6">
                <div className="text-5xl md:text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-warm-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base flex-grow">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-warm-100 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
