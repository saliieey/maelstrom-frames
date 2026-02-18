'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    name: 'Sarah & Michael',
    event: 'Wedding',
    text: 'Maelstrom Frames captured our wedding day perfectly. Every moment was beautifully documented, and the final photos exceeded our expectations. The team was professional, creative, and made us feel completely at ease. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'TechCorp Inc.',
    event: 'Corporate Event',
    text: 'Professional, punctual, and incredibly talented. The team documented our product launch flawlessly. The video highlights were exactly what we needed for our marketing campaign. Outstanding work!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Jennifer & David',
    event: 'Wedding',
    text: 'Working with Maelstrom Frames was an absolute pleasure. They made us feel comfortable throughout the day and delivered stunning results that we\'ll treasure forever. The attention to detail was remarkable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation - faster and smoother
      gsap.from('.testimonials-title', {
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

      // Stagger animation for cards - optimized for speed
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
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
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-warm-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-warm-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto px-4">
          <div className="inline-block mb-4">
            <span className="text-warm-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="testimonials-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Don&apos;t just take our word for it - hear from our satisfied clients
          </p>
        </div>

        {/* Testimonials Grid - Perfect 3 Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-warm-200 h-full flex flex-col"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-warm-100 text-5xl md:text-6xl font-serif leading-none pointer-events-none">
                &quot;
              </div>

              {/* Rating */}
              <div className="flex mb-4 md:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-warm-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed relative z-10 italic text-sm md:text-base md:text-lg flex-grow">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author - Perfectly Aligned */}
              <div className="flex items-center gap-3 md:gap-4 pt-6 border-t border-gray-100">
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-warm-200 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-sm md:text-base truncate">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.event}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-500 to-warm-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
