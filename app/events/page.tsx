'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Events() {
  const heroRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
        })
      }

      if (introRef.current) {
        gsap.from(introRef.current.children, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 100,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
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

  const eventTypes = [
    {
      title: 'Corporate Events',
      description: 'Professional documentation of corporate gatherings, product launches, conferences, and business meetings. We understand the importance of capturing both the formal proceedings and the networking moments that make corporate events successful.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Festivals & Celebrations',
      description: 'Capture the energy and excitement of festivals, cultural celebrations, and community events. Our team thrives in dynamic environments, documenting the vibrant atmosphere and memorable moments that make these occasions special.',
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Conferences & Seminars',
      description: 'Comprehensive coverage of conferences, seminars, and educational events. We document keynote speeches, panel discussions, and networking sessions, ensuring that important content and interactions are preserved for future reference.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Product Launches',
      description: 'Create excitement and buzz around your product launch with professional photography and videography. We capture the unveiling, demonstrations, and audience reactions, creating content perfect for marketing and social media.',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Event Coverage"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div ref={heroRef} className="relative z-20 text-center px-4">
          <div className="mb-4 md:mb-6">
            <span className="inline-block px-4 md:px-5 py-2 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs md:text-sm font-medium border border-white/20">
              Event Coverage
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
            Event Coverage
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            Professional documentation of your most important events
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section ref={introRef} className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              Comprehensive Event Documentation
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              At Maelstrom Frames, we specialize in capturing the essence of events through professional photography and videography. Whether you're hosting a corporate conference, a cultural festival, a product launch, or any other significant gathering, our experienced team ensures that every important moment is documented with precision and artistry.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Our event coverage services go beyond simple documentation. We understand that events are dynamic, multi-faceted experiences that require a comprehensive approach. Our team arrives early to assess the venue, coordinate with event organizers, and set up equipment strategically to capture both the planned activities and spontaneous moments that make events memorable.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              With state-of-the-art equipment and years of experience, we deliver high-quality visual content that serves multiple purposes: from marketing materials and social media content to archival documentation and future reference. We work seamlessly in the background, ensuring that our presence enhances rather than disrupts your event, while capturing the energy, emotions, and key moments that define the occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section-padding bg-warm-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Types of Events We Cover
            </h2>
          </div>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-0">
            {eventTypes.map((event, index) => (
              <div
                key={event.title}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 md:mb-12 text-center leading-tight">
              What's Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                'Multi-camera video coverage',
                'Professional photography',
                'Drone footage (where applicable)',
                'Real-time social media updates',
                'Same-day highlights reel',
                'Full event documentation',
                'Post-event editing',
                'Online gallery access',
                'Custom packages available',
                'Backup equipment on-site',
              ].map((item) => (
                <div key={item} className="flex items-start">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-warm-600 mr-3 flex-shrink-0 mt-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-warm-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 md:mb-12 text-center leading-tight">
              Our Process
            </h2>
            <div className="space-y-8 md:space-y-12">
              {[
                {
                  step: '01',
                  title: 'Consultation',
                  description: 'We begin with a detailed consultation to understand your event, its objectives, and your specific requirements. This helps us create a customized coverage plan.',
                },
                {
                  step: '02',
                  title: 'Pre-Event Planning',
                  description: 'Our team visits the venue, coordinates with event organizers, and plans camera placements and coverage strategies to ensure comprehensive documentation.',
                },
                {
                  step: '03',
                  title: 'Event Coverage',
                  description: 'On the day of the event, our professional team arrives early, sets up equipment, and captures all important moments throughout the duration of your event.',
                },
                {
                  step: '04',
                  title: 'Post-Production',
                  description: 'After the event, we carefully edit and curate the footage and photographs, creating polished content that tells the complete story of your event.',
                },
                {
                  step: '05',
                  title: 'Delivery',
                  description: 'You receive your content in your preferred format, including high-resolution images, edited videos, and access to an online gallery for easy sharing.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-warm-600 text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-warm-600 to-warm-800 text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 md:mb-8 leading-tight">
            Ready to Document Your Event?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Contact us today to discuss your event coverage needs and receive a customized quote
          </p>
          <Link href="/contact" className="btn bg-white text-warm-800 hover:bg-warm-50 text-lg px-8 py-4">
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}
