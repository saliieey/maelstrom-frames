import type { Metadata } from 'next'
import { Urbanist, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'

const urbanist = Urbanist({ 
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Maelstrom Frames - Professional Photography & Videography',
  description: 'Capturing life\'s most precious moments with artistic excellence. Professional wedding photography, event coverage, and cinematic videography.',
  keywords: 'photography, videography, wedding photography, event coverage, professional photographer',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover', // Support for iOS safe areas
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${urbanist.variable} ${cormorant.variable} font-sans antialiased`}>
        <SmoothScroll>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}

