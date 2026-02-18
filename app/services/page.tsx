'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

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

      if (servicesRef.current) {
        gsap.from(servicesRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const services = [
    {
      title: 'Wedding Photography & Videography',
      description: 'Capture your special day with our comprehensive wedding photography and videography services. We document every precious moment from the ceremony to the reception, creating a beautiful visual narrative of your wedding day. Our team works discreetly to capture candid moments while also orchestrating stunning formal portraits. We offer multiple packages to suit different needs, including engagement sessions, full-day coverage, and destination weddings.',
      features: [
        'Full-day coverage',
        'Engagement sessions',
        'Drone photography',
        'Same-day highlights',
        'Online gallery',
        'Professional editing',
      ],
    },
    {
      title: 'Event Coverage',
      description: 'Professional event documentation for corporate gatherings, festivals, conferences, and celebrations. We understand that every event is unique and requires a tailored approach. Our team arrives early to scout locations, set up equipment, and coordinate with event organizers. We capture both the energy of the event and the important moments, ensuring comprehensive coverage that tells the complete story of your occasion.',
      features: [
        'Multi-camera setup',
        'Live streaming options',
        'Real-time social media updates',
        'Post-event highlights',
        'Professional documentation',
        'Custom packages',
      ],
    },
    {
      title: 'Portrait Photography',
      description: 'Elegant and timeless portrait sessions for individuals, families, couples, and professionals. Whether you need headshots for your business, family portraits for your home, or creative personal portraits, we create images that reflect your personality and style. Our portrait sessions are relaxed and enjoyable, allowing your true self to shine through. We work with natural and studio lighting to achieve the perfect look for every client.',
      features: [
        'Studio sessions',
        'Outdoor locations',
        'Professional headshots',
        'Family portraits',
        'Maternity photography',
        'Retouching services',
      ],
    },
    {
      title: 'Commercial Photography',
      description: 'High-quality commercial photography for businesses, products, and marketing campaigns. We help brands tell their story through compelling visual content that resonates with their target audience. From product photography to lifestyle shoots, we create images that elevate your brand and drive engagement. Our commercial work includes e-commerce photography, brand campaigns, architectural photography, and food photography.',
      features: [
        'Product photography',
        'Lifestyle shoots',
        'Architectural photography',
        'Food photography',
        'Brand campaigns',
        'E-commerce imagery',
      ],
    },
  ]

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Services"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div ref={heroRef} className="relative z-20 text-center px-4">
          <div className="mb-4 md:mb-6">
            <span className="inline-block px-4 md:px-5 py-2 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs md:text-sm font-medium border border-white/20">
              Our Services
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            Comprehensive photography and videography solutions
          </p>
        </div>
      </section>

      {/* Services List */}
      <section ref={servicesRef} className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 md:gap-12 items-center`}
              >
                <div className="flex-1 w-full px-4 sm:px-0">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700 text-sm md:text-base">
                        <svg
                          className="w-5 h-5 text-warm-600 mr-2 md:mr-3 flex-shrink-0"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="btn btn-primary inline-block"
                  >
                    Get a Quote
                  </Link>
                </div>
                <div className="flex-1 w-full px-4 sm:px-0">
                  <div className="relative aspect-[4/3] rounded-lg md:rounded-2xl overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=${index}`}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-warm-50">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 md:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Contact us today to discuss your project and learn more about our services
          </p>
          <Link href="/contact" className="btn btn-primary text-lg px-8 py-4">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
