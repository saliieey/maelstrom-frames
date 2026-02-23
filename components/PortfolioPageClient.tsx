'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import PortfolioWorks from './PortfolioWorks'
import type { WorkFrame } from '@/lib/wordpress'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface PortfolioPageClientProps {
  works: WorkFrame[]
}

export default function PortfolioPageClient({ works }: PortfolioPageClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)

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
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Portfolio"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div ref={heroRef} className="relative z-20 text-center px-4">
          <div className="mb-4 md:mb-6">
            <span className="inline-block px-4 md:px-5 py-2 md:py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs md:text-sm font-medium border border-white/20">
              Our Portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
            Our Portfolio
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of stunning photography and videography work
          </p>
        </div>
      </section>

      {/* Portfolio Works - WordPress CMS */}
      <PortfolioWorks works={works} />

      {/* CTA Section */}
      <section className="section-padding bg-warm-50">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Ready to Create Your Story?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can capture your special moments
          </p>
          <Link href="/contact" className="btn btn-primary text-lg px-8 py-4">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
