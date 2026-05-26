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
      image: '/images/services/wedding.jpg',
      imagePosition: 'object-[50%_15%]',
      description: 'There is only one time for your wedding, and we all ensure that everything, from the initial nervousness to the last dance, is captured in all its beauty.Our method is combined, we all be subtle enough to catch the true candid moments of your wedding, but we are also experienced enough to stage the necessary poses for your wedding album. Its a choice between one or another for some other photography companies; we cover both aspects because your wedding deserves both.',
      features: [
        'Coverage can include either full or half days.',
        'Pre-wedding engagement photoshoots',
        'Drones to provide impressive shots from high angles',
        'Same-day highlight clips (you dont need to wait to enjoy your wedding)',
        'Professional post-production of the material',
        'Fast delivery without sacrificing any quality',
      ],
    },
    {
      title: 'Event Coverage',
      image: '/images/services/events.jpg',
      imagePosition: 'object-center',
      description: 'This is what we do best. Whether festival productions, corporate conventions, product launches, or concert stages—no matter how complex the event, we do it seamlessly and quickly.Large events are fast-paced and require organization. With years of experience shooting concerts, festivals, and corporate functions throughout the state of Kerala, we know how to get into the groove of the event without being a hindrance.',
      features: [
        'Multi-cam coverage of the entire event',
        'Live streaming/real-time monitoring',
        'Professional sound synchronization',
        'Multi-videographers covering multiple angles',
        'Fast creation of highlight videos',
        'Familiarity with outdoor and indoor locations',
      ],
    },
    {
      title: 'Portrait Photography',
      image: '/images/services/portraits.jpg',
      imagePosition: 'object-[50%_30%]',
      description: 'Some people require more than just a photograph; they require an image that *resonates* with them.We have professional portraiture services for business headshots, family portraits, couples, and personal branding. We make sure that you forget about the camera and just be yourself in our sessions, because the results come from that place of authenticity.',
      features: [
        'Studio photography services',
        'Location photography services',
        'Professional business headshots',
        'Family portraits for your home',
        'Couple and engagement portraits',
        'Professional editing services',
      ],
    },
    {
      title: 'Commercial Photography',
      image: '/images/services/commercial.jpg',
      imagePosition: 'object-center',
      description: 'For brands, pictures should sell. Our services include commercial photography that will tell the story of your brand.Our experience encompasses e-commerce companies, restaurants, real estate agents, fashion brands, and other service-oriented businesses. We specialize in commercial photography that ranges from product photography to lifestyle shots that help create an engaging brand story.',
      features: [
        'Product photography for e-commerce businesses',
        'Lifestyle photography and campaigns',
        'Photography of food & beverages',
        'Real estate and architectural photography',
        'Commercial headshots and group shots',
        'Brand storytelling through pictures',
      ],
    },
  ]

  const fallbackImage = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  const fallbackHero = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <Image
            src={`/images/services/hero.jpg`}
            alt="Services"
            onError={(e: any) => { e.currentTarget.src = fallbackHero; e.currentTarget.srcset = '' }}
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
            Professional Photography Services in Perinthalmanna
            <span className="text-xl sm:text-2xl md:text-3xl block mt-3 text-white/90 font-medium">Wedding, Event, Portrait & Commercial Photography</span>
          </h1>
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
                    href="/contact#contact-form"
                    className="btn btn-primary inline-block"
                  >
                    Get a Quote
                  </Link>
                </div>
                <div className="flex-1 w-full px-4 sm:px-0">
                  <div className="relative aspect-[4/3] rounded-lg md:rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      onError={(e: any) => { e.currentTarget.src = `${fallbackImage}&sig=${index}`; e.currentTarget.srcset = '' }}
                      fill
                      className={`object-cover ${service.imagePosition || 'object-center'}`}
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
            Which Services Will Work For You?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Are you not sure where to begin? We can chat about it. Projects differ from one another, and we will be glad to create custom packages tailored to meet your requirements.
          </p>
          <Link href="/contact" className="btn btn-primary text-lg px-8 py-4">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
