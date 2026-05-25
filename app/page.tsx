import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import PortfolioGrid from '@/components/PortfolioGrid'
import ServicesPreview from '@/components/ServicesPreview'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

export const metadata = {
  title: 'Best Wedding Photography in Perinthalmanna, Kerala',
  description: 'Best wedding photography & videography in Perinthalmanna, Kerala. Capture your special moments with professional wedding videography services. Book us now!',
  alternates: {
    canonical: '/',
  },
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

