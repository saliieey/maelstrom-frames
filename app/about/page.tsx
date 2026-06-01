'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation - faster and smoother
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
        })
      }

      // Story section animations - optimized
      if (storyRef.current) {
        gsap.from(storyRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Values section animations - optimized
      if (valuesRef.current) {
        gsap.from(valuesRef.current.children, {
          y: 50,
          opacity: 0,
          scale: 0.98,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <Image
            src="/images/hero/about-cover.jpg"
            alt="About - Wedding Photography Company Perinthalmanna"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
            loading="eager"
            decoding="async"
          />
        </div>
        <div ref={heroRef} className="relative z-20 text-center px-4">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Wedding Photography Company in Perinthalmanna
            <span className="text-2xl sm:text-3xl lg:text-4xl block mt-4 text-white/90 font-medium drop-shadow-lg">Fast Delivery & Large Event Coverage Experts</span>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="pt-[clamp(3rem,8vw,6rem)] md:pt-[clamp(4rem,10vw,8rem)] pb-8 md:pb-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <span className="text-warm-600 text-sm font-semibold uppercase tracking-wider mb-4 block">
                Our Journey
              </span>
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-6">
               The Fusion of Speed and Artistry
              </h2>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 text-center">
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-6">
                  Maelstrom Frames began from no vision of awards and recognition; rather, it was borne from the realization of the need for people who can provide high-quality visuals quickly.
                </p>
                <p className="mb-6">
                  As a company located in Perinthalmanna, Kerala, we have more than two years of experience in providing high-quality visuals under pressure. Having worked on everything from small-scale wedding projects to large-scale concerts involving thousands of participants, we know how to manage our time effectively while still maintaining an artistic touch to all our visual work.
                </p>
                <p className="mb-6">
                 Our uniqueness comes not from the speed at which we provide services but from the fact that we can do the kind of work at that pace. When our competitors are still working on their videos, we&#39;ve already delivered the wedding photography package you ordered. When they&#39;re trying to cope with the logistics of a big event, we&#39;ve already captured the whole concert using multiple angles, mixing live recordings and high-quality video.
                </p>
                <p className="mb-0">
                  We are a professional wedding videography company in Perinthalmanna that knows one thing: your time is now, not tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="pt-8 md:pt-12 pb-[clamp(3rem,8vw,6rem)] md:pb-[clamp(4rem,10vw,8rem)] bg-gradient-to-b from-white via-warm-50/30 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-warm-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-warm-300/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-warm-600 text-sm font-semibold uppercase tracking-wider mb-4 block">
              Our Values
            </span>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-6">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Fast but Not at the Cost of Quality',
                description: 'We work fast because we have optimized the process and not because we have sacrificed quality. Wedding photographs in days and not in weeks. Event videos delivered before the memory fades away.',
                Icon: () => (
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
              },
              {
                title: 'True Moments Over Flawless Shots',
                description: 'We take photographs of those authentic moments when there was a spontaneous laugh, a tear, a feeling. The right lighting is always appreciated. True emotions are what matters.',
                Icon: () => (
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Close by Your Side in Perinthalmanna',
                description: 'We won&#39;t arrive in your place after a long flight. We operate in the town of Perinthalmanna. We know the venue and are aware of the weather conditions.',
                Icon: () => (
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                ),
              },
            ].map((value) => {
              const Icon = value.Icon
              return (
              <div
                key={value.title}
                className="group relative bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-warm-200 hover:-translate-y-2"
              >
                <div className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] mb-6 rounded-2xl bg-warm-100 flex items-center justify-center text-warm-600 group-hover:bg-warm-200 group-hover:text-warm-700 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                  <Icon />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-warm-700 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-500 to-warm-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <span className="text-warm-600 text-sm font-semibold uppercase tracking-wider mb-4 block">
                Our Team
              </span>
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-6">
                The Maelstrom Crew
              </h2>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 text-center">
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-6">
                  Besides being photographers and videographers, we are professional visual storytellers who have been trained to do things quickly while delivering great quality over the years. The crew is made up of members who have been trained in capturing events, including weddings, mega events, concerts, and commercial videos. We have been doing this together as a crew for quite some time now; therefore, because we know one another very well, we can easily capture things.
                </p>
                <p>
                  Each member of our crew comes with unique skills such as wedding filming, event photography, portrait photography, color grading, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
