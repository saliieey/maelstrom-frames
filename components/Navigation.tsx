'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    // Check initial scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            ? 'bg-white/95 backdrop-blur-2xl shadow-lg border-b border-gray-200/60 py-4'
            : isHomePage
            ? 'bg-gradient-to-b from-black/40 via-black/30 to-transparent backdrop-blur-sm py-6 md:py-7'
            : 'bg-white/95 backdrop-blur-2xl shadow-md border-b border-gray-200/60 py-5'
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
              <div className="flex items-center gap-3">
                <span className={`text-2xl sm:text-3xl md:text-[2rem] font-serif font-bold tracking-tight ${
                  isScrolled || !isHomePage
                    ? 'text-gray-900'
                    : 'text-white drop-shadow-lg'
                }`}>
                  Maelstrom Frames
                </span>
                {/* Elegant decorative element */}
                <span className={`hidden sm:block w-1 h-8 rounded-full ${
                  isScrolled || !isHomePage
                    ? 'bg-warm-600/30'
                    : 'bg-white/30'
                }`} />
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

      {/* Mobile Menu - Premium Full Screen */}
      <div
        className={`mobile-menu fixed top-0 left-0 w-full h-screen bg-white z-[110] lg:hidden transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
          <div className="flex flex-col h-full">
            {/* Mobile Header - Clean and Professional */}
            <div className="flex items-center justify-end p-6 border-b border-gray-100">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="p-2.5 text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false)
                  }}
                  className={`text-3xl md:text-4xl font-light transition-colors duration-300 ${
                    pathname === link.href
                      ? 'text-warm-600'
                      : 'text-gray-700 hover:text-warm-600'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={(e) => {
                  setIsOpen(false)
                }}
                className="mt-8 px-10 py-4 bg-warm-600 text-white font-semibold rounded-full text-lg hover:bg-warm-700 transition-all"
              >
                Get Quote
              </Link>
            </div>
          </div>
      </div>
    </>
  )
}
