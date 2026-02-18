import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import PortfolioGrid from '@/components/PortfolioGrid'
import ServicesPreview from '@/components/ServicesPreview'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

export const metadata = {
  title: 'Maelstrom Frames - Professional Photography & Videography',
  description: 'Capturing life\'s most precious moments with artistic excellence. Professional wedding photography, event coverage, and cinematic videography.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <WhyChooseUs />
      <PortfolioGrid />
      <Testimonials />
      <CTA />
    </>
  )
}

