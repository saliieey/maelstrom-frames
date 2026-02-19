'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states to prevent flash of content
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 80 })
      }
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 50 })
      }
      if (buttonRef.current) {
        gsap.set(buttonRef.current.children, { opacity: 0, y: 40 })
      }

      // Animate title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        })
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6,
        })
      }

      // Animate buttons
      if (buttonRef.current) {
        gsap.to(buttonRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.9,
        })
      }

      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden hero-section-safe"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Hero"
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Animated Overlay Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-warm-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-warm-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content - Perfectly Centered with ideal positioning */}
      <div 
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-screen py-20 hero-safe-top"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)',
        }}
      >
        <div className="w-full flex flex-col items-center">
          {/* Badge - Enhanced with better styling and safe area support */}
          <div className="mb-8 md:mb-10">
            <span className="inline-block px-4 py-2.5 sm:px-6 sm:py-3 bg-white/15 backdrop-blur-xl rounded-full text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase border border-white/30 shadow-lg shadow-black/20 hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
              Professional Photography & Videography
            </span>
          </div>
          
          {/* Main Title - Matching website font style */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 md:mb-10 leading-tight tracking-tight px-4 opacity-0 drop-shadow-2xl -mt-6 md:-mt-10"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}
          >
            Capturing Life&apos;s<br />Precious Moments
          </h1>
          
          {/* Subtitle - Enhanced with better readability */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto font-normal leading-relaxed px-4 opacity-0 drop-shadow-lg"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}
          >
            Where artistry meets emotion, creating timeless visual narratives that preserve your most cherished memories
          </p>
          
          {/* CTA Buttons - Enhanced with better prominence and positioning */}
          <div ref={buttonRef} className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center px-4 mb-24 md:mb-32">
            <Link
              href="/portfolio"
              className="group relative px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-warm-600 to-warm-700 text-white font-bold text-base sm:text-lg rounded-full overflow-hidden transition-all duration-300 hover:from-warm-700 hover:to-warm-800 hover:scale-105 hover:shadow-2xl hover:shadow-warm-600/60 w-full sm:w-auto opacity-0 transform"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Our Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-warm-500 via-warm-600 to-warm-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
            <Link
              href="/contact"
              className="group relative px-10 sm:px-12 py-4 sm:py-5 bg-white/15 backdrop-blur-xl text-white font-bold text-base sm:text-lg rounded-full border-2 border-white/40 hover:bg-white/25 hover:border-white/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 w-full sm:w-auto opacity-0 transform"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs uppercase tracking-wider font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Gradient Overlay Bottom - Smooth Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
