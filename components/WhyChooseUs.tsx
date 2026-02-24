'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ArtisticIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
)

const TeamIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 13v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7" />
  </svg>
)

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const features = [
  {
    title: 'Artistic Excellence',
    description: 'Every frame is crafted with artistic vision, ensuring your memories are not just documented, but transformed into works of art.',
    Icon: ArtisticIcon,
  },
  {
    title: 'Professional Team',
    description: 'Our experienced photographers and videographers bring years of expertise to every project, ensuring flawless execution.',
    Icon: TeamIcon,
  },
  {
    title: 'Cutting-Edge Technology',
    description: 'We use the latest professional equipment and editing software to deliver stunning, high-quality results that exceed expectations.',
    Icon: CameraIcon,
  },
  {
    title: 'Personalized Service',
    description: 'Every client is unique, and we tailor our approach to match your style, preferences, and vision for your special occasion.',
    Icon: SparkleIcon,
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - faster and smoother
      gsap.from('.why-title', {
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
            delay: index * 0.06,
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
          {features.map((feature, index) => {
            const Icon = feature.Icon
            return (
            <div
              key={feature.title}
              ref={(el) => {
                itemsRef.current[index] = el
              }}
              className="group relative bg-gradient-to-br from-white to-warm-50/50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-warm-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col"
            >
              {/* Icon */}
              <div className="mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-warm-100 flex items-center justify-center text-warm-600 group-hover:bg-warm-200 group-hover:text-warm-700 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                  <Icon className="w-7 h-7 md:w-8 md:h-8" />
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
          )})}
        </div>
      </div>
    </section>
  )
}
