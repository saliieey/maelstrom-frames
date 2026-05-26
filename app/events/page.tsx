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
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
        })
      }

      if (introRef.current) {
        gsap.from(introRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 60,
          opacity: 0,
          scale: 0.98,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
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
      title: 'Large-scale Events & Concerts',
      description: 'University fests, music fests, community fests, concerts – all fall into our expertise. Our team has dealt with big crowds, many stages, fast-moving activities, and colorful lights. With our multi-camera team, we can make sure that you cover everything, from the main stage to reactions of the audience.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Corporate Events',
      description: 'Product launches, conferences, seminars, business meetings, awards ceremonies—everything falls into our expertise. Our team knows what is worth covering at a corporate event.',
      image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Festivals & Cultural Celebrations',
      description: 'The chaos of a festival and colorful people—everything is worth capturing. That’s why our team works best in such conditions, knowing how to move through big crowds and capture natural reactions.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Commercial & Marketing Events',
      description: 'Launch events, product activation, brand promotion – we are here to make content for you to use right away. Our clips will be perfect for social media and marketing teams.',
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
            Event Photography in Perinthalmanna
            <span className="text-xl sm:text-2xl md:text-3xl block mt-3 text-white/90 font-medium drop-shadow-lg">Professional Coverage for Large Events, Concerts & Corporate Gatherings</span>
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section ref={introRef} className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              Comprehensive Event Coverage 
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Things can get messy, and there is no retake option at any time. That&#39;s why we come prepared to the shoot, knowing the layout of the place and how we will adapt to your event.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Our methodology includes: Scouting the location before the shoot; Understanding the flow of the event; Positioning multiple cameras to catch the highlights; Anticipating key events; Capturing the feeling of the event; Being discreet and blending into the background; Providing you with outstanding results in days instead of weeks.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
             We have done everything, from college fests with thousands of people participating to marathons where everyone runs; From launching new products in corporations where we need to follow strict schedules to shooting music concerts with stages and lighting equipment. Every event needs particular skills; we have all of those.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            The outcome of our work? You receive full video documentation that is useful for several purposes at once: Social media content while the event trends, promotional material for future campaigns, archived footage, and highlight reels capturing the atmosphere.
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
              What we deliver
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                'Multiple camera shooting — Diverse angles, flawless sync, full coverage',
                'Professional photographs — Broad images, detailed pictures, spontaneous clicks, and hero shots',
                'Drone footage — Above-the-ground visuals where required/appropriate',
                'Option for live streaming—Live coverage in case it is required',
                'Immediate social media content—Content that trends while your event is in progress',
                'Event highlights reel—Polished 2-5 minute video ready within 48-72 hours',
                'Event documentation — Full video/photography documentation for future use',
                'Finalized color grading—Not raw content but professionally graded final output',
                'Online gallery — For easy download and distribution among your team members',
                'Backup equipment—Never dependent on a single camera or battery',
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
                  title: 'Before Your Event',
                  description: 'We organize a consultation meeting in which we learn about your event and its goals. We then make our way to your location to check out possible camera angles, light placements, and other relevant aspects of shooting.',
                },
                {
                  step: '02',
                  title: 'During Your Event',
                  description: 'We come early to setup and begin preparations before the first guest arrives at your party. During the process, we stay discreetly in the background, always on time but in a manner in which you will barely notice us. With multiple camera crews, we cover all angles—main events, secondary events, and random events.',
                },
                {
                  step: '03',
                  title: 'After Your Event',
                  description: 'We organize your content into a professional video or image presentation. In this regard, you can enjoy viewing a preview within just a few days after the event. You also get access to our entire content library with editing services included.',
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
            Let’s Record Your Event
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
         It doesn’t matter whether you are organizing an event for 100 or 5000 people; we have the skills and equipment to get the job done. Simply tell us about your event, and we will devise a recording plan that is perfect for you.
          </p>
          <Link href="/contact#contact-form" className="btn bg-white text-warm-800 hover:bg-warm-50 text-lg px-8 py-4">
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}
