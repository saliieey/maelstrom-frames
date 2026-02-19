'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    // Check initial scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Animate menu items when menu opens
  useEffect(() => {
    if (isOpen) {
      const items = menuItemsRef.current.filter(Boolean)
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.06,
          }
        )
      }
    }
  }, [isOpen])

  // Mobile menu animation removed - using CSS transitions instead

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/events', label: 'Events' },
    { href: '/contact', label: 'Contact' },
  ]

  // Premium navigation with sophisticated design
  const isScrolled = scrolled
  const isHomePage = pathname === '/'

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-lg border-b border-gray-200/60 pb-4 nav-safe-top-scrolled'
            : isHomePage
            ? 'bg-gradient-to-b from-black/40 via-black/30 to-transparent backdrop-blur-sm pb-6 md:pb-7 nav-safe-top'
            : 'bg-white/95 backdrop-blur-2xl shadow-md border-b border-gray-200/60 pb-5 nav-safe-top-other'
        }`}
      >
        {/* Subtle gradient overlay for depth */}
        {!isScrolled && isHomePage && (
          <div className="absolute inset-0 bg-gradient-to-r from-warm-900/5 via-transparent to-warm-900/5 pointer-events-none" />
        )}
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          <div className="flex items-center justify-between">
            {/* Logo - Ultra Premium with Impressive Effects */}
            <Link 
              href="/" 
              className={`relative z-10 group transition-all duration-500 ${
                isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <div className="flex items-center">
                <span className={`text-2xl sm:text-3xl md:text-[2rem] font-serif font-bold tracking-tight ${
                  isScrolled || !isHomePage
                    ? 'text-gray-900'
                    : 'text-white drop-shadow-lg'
                }`}>
                  Maelstrom Frames
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Premium Design with Impressive Hovers */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 ease-out ${
                    pathname === link.href
                      ? isScrolled || !isHomePage
                        ? 'text-warm-600'
                        : 'text-white'
                      : isScrolled || !isHomePage
                      ? 'text-gray-700'
                      : 'text-white/90'
                  }`}
                >
                  <span className={`relative z-10 inline-block transition-all duration-300 group-hover:scale-105 ${
                    pathname !== link.href
                      ? isScrolled || !isHomePage
                        ? 'group-hover:text-warm-600'
                        : 'group-hover:text-white'
                      : ''
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Active state - elegant underline (only when scrolled or not on home page) */}
                  {pathname === link.href && (isScrolled || !isHomePage) && (
                    <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 rounded-full bg-gradient-to-r from-warm-500 via-warm-600 to-warm-500 transition-all duration-500" />
                  )}
                  
                  {/* Hover effect - animated underline that slides in */}
                  {pathname !== link.href && (
                    <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-16 group-hover:h-1 ${
                      isScrolled || !isHomePage
                        ? 'bg-gradient-to-r from-warm-500 via-warm-600 to-warm-500'
                        : 'bg-gradient-to-r from-white/60 via-white to-white/60'
                    }`} />
                  )}
                </Link>
              ))}
              
              {/* Elegant Divider with gradient */}
              <div className={`mx-3 h-8 w-px transition-all duration-500 ${
                isScrolled || !isHomePage 
                  ? 'bg-gradient-to-b from-transparent via-gray-300 to-transparent' 
                  : 'bg-gradient-to-b from-transparent via-white/30 to-transparent'
              }`} />
              
              {/* CTA Button - Ultra Premium with Multiple Effects */}
              <Link
                href="/contact"
                className={`group relative px-8 py-3.5 font-bold text-sm tracking-wider rounded-full overflow-hidden transition-all duration-500 ${
                  isScrolled || !isHomePage
                    ? 'bg-gradient-to-r from-warm-600 via-warm-600 to-warm-700 text-white shadow-xl shadow-warm-600/40 hover:shadow-2xl hover:shadow-warm-600/50'
                    : 'bg-white/20 backdrop-blur-lg text-white border border-white/40 hover:bg-white/30 hover:border-white/60 shadow-xl shadow-black/30'
                }`}
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-105">
                  Get Quote
                </span>
                
                {/* Animated gradient overlay */}
                <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isScrolled || !isHomePage
                    ? 'bg-gradient-to-r from-warm-500 via-warm-600 to-warm-700'
                    : 'bg-gradient-to-r from-white/30 via-white/40 to-white/30'
                }`} />
                
                {/* Shine sweep effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                {/* Pulse glow on hover */}
                <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isScrolled || !isHomePage
                    ? 'bg-warm-600 blur-xl scale-150'
                    : 'bg-white blur-xl scale-150'
                }`} />
                
                {/* Scale effect */}
                <span className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-500 rounded-full" />
              </Link>
            </div>

            {/* Mobile Menu Button - Refined Design */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden z-10 p-2.5 focus:outline-none relative w-11 h-11 rounded-lg transition-all duration-300 ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <div className="absolute inset-0 flex flex-col justify-center space-y-1.5">
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 rounded-full ${
                    isOpen 
                      ? 'rotate-45 translate-y-2 bg-gray-900' 
                      : isScrolled || !isHomePage ? 'bg-gray-900' : 'bg-white'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 rounded-full ${
                    isOpen 
                      ? 'opacity-0' 
                      : isScrolled || !isHomePage ? 'bg-gray-900' : 'bg-white'
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 rounded-full ${
                    isOpen 
                      ? '-rotate-45 -translate-y-2 bg-gray-900' 
                      : isScrolled || !isHomePage ? 'bg-gray-900' : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Premium Professional Design */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Professional Backdrop with Blur */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ease-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Premium Sliding Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-[360px] bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Professional Header Section */}
          <div className="relative border-b border-gray-100 bg-gradient-to-br from-white to-gray-50/50">
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex flex-col space-y-1">
                <span className="text-lg font-serif font-bold tracking-tight text-gray-900">
                  Maelstrom Frames
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  Photography &amp; Videography
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:ring-offset-2"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Navigation
              </span>
            </div>
            
            <ul className="space-y-2">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href
                return (
                  <li 
                    key={link.href}
                    ref={(el) => {
                      menuItemsRef.current[index] = el
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group relative flex items-center justify-between rounded-xl px-4 py-3.5
                        text-[15px] font-semibold leading-tight
                        transition-all duration-300 ease-out
                        ${isActive
                          ? 'bg-gradient-to-r from-warm-50 to-warm-100/50 text-warm-700 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100'
                        }
                      `}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="text-base">{link.label}</span>
                      </span>
                      
                      {isActive ? (
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-warm-600 shadow-sm" />
                          <svg className="h-4 w-4 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ) : (
                        <svg className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                      
                      {/* Active indicator line */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gradient-to-b from-warm-500 to-warm-600" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Professional CTA Section */}
          <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-6">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-warm-600 via-warm-600 to-warm-700 px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-warm-600/40 transition-all duration-300 hover:shadow-xl hover:shadow-warm-600/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Get a Quote</span>
              <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </Link>
            
            {/* Contact Info */}
            <div className="mt-4 space-y-2 text-center">
              <a 
                href="tel:+1234567890" 
                className="block text-xs font-medium text-gray-600 hover:text-warm-600 transition-colors"
              >
                +1 (234) 567-890
              </a>
              <a 
                href="mailto:info@maelstromframes.com" 
                className="block text-xs text-gray-500 hover:text-warm-600 transition-colors"
              >
                info@maelstromframes.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
