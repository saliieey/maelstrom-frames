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
      // Hero animation
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
        })
      }

      // Story section animations
      if (storyRef.current) {
        gsap.from(storyRef.current.children, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Values section animations
      if (valuesRef.current) {
        gsap.from(valuesRef.current.children, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
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
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="About"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div ref={heroRef} className="relative z-20 text-center px-4">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20">
              Our Story
            </span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            About Maelstrom Frames
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            Crafting visual stories that last a lifetime
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <span className="text-warm-600 text-sm font-semibold uppercase tracking-wider mb-4 block">
                Our Journey
              </span>
              <h2 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-6">
                Where Art Meets Emotion
              </h2>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-6">
                  Maelstrom Frames was born from a simple yet profound passion: the desire to capture life's most meaningful moments with artistic excellence. Founded by a team of dedicated photographers and videographers, we have spent years perfecting our craft, learning that every frame tells a story, and every story deserves to be told beautifully.
                </p>
                <p className="mb-6">
                  What sets us apart is our unwavering commitment to understanding not just what you want to capture, but why it matters to you. We believe that photography and videography are not merely about documenting events—they are about preserving emotions, relationships, and the essence of moments that define who we are. This philosophy drives every project we undertake, from intimate wedding ceremonies to grand corporate events.
                </p>
                <p className="mb-6">
                  Our team brings together diverse talents and perspectives, united by a shared vision of creating visual narratives that resonate deeply. We combine technical expertise with creative intuition, ensuring that each photograph and video we produce is both technically flawless and emotionally compelling. Whether it's the subtle exchange of glances during a wedding ceremony or the energy of a corporate product launch, we capture it all with precision and artistry.
                </p>
                <p className="mb-6">
                  Over the years, we have had the privilege of working with countless clients, each with unique stories to tell. These experiences have taught us that the best work happens when there's a genuine connection between the photographer and the subject. That's why we take the time to understand your vision, your style, and your expectations before we even pick up a camera.
                </p>
                <p>
                  As we continue to grow and evolve, our core values remain unchanged: excellence in execution, authenticity in storytelling, and a genuine passion for what we do. We are not just service providers—we are visual storytellers, memory keepers, and artists dedicated to making your moments immortal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section-padding bg-gradient-to-b from-white via-warm-50/30 to-white relative overflow-hidden">
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
                title: 'Excellence',
                description: 'We strive for perfection in every frame, ensuring that our work meets the highest standards of quality and artistry. Every detail matters, and we never compromise on the quality of our deliverables.',
                icon: '⭐',
              },
              {
                title: 'Authenticity',
                description: 'We believe in capturing genuine moments and emotions, creating authentic visual stories that reflect the true essence of your event. Real moments, real emotions, real stories.',
                icon: '💎',
              },
              {
                title: 'Passion',
                description: 'Our love for photography and videography drives us to continuously innovate and push creative boundaries. This passion is evident in every project we undertake.',
                icon: '🔥',
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="group relative bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-warm-200 hover:-translate-y-2"
              >
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {value.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-warm-700 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-warm-500 to-warm-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-warm-600 text-sm font-semibold uppercase tracking-wider mb-4 block">
              Our Team
            </span>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-6">
              Meet the Artists
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A talented group of professionals dedicated to bringing your vision to life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center group">
                <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-warm-100 group-hover:ring-warm-300 transition-all duration-500">
                  <Image
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&sig=${i}`}
                    alt={`Team member ${i}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Team Member {i}</h3>
                <p className="text-warm-600 font-medium mb-2">Lead Photographer</p>
                <p className="text-gray-600">Specializing in wedding and event photography with over 8 years of experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
