import { getWorksFrames } from '@/lib/wordpress'
import PortfolioPageClient from '@/components/PortfolioPageClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Wedding Photography Portfolio Perinthalmanna, Kerala',
  description: 'Explore our wedding & event photography portfolio in Perinthalmanna, Kerala. View our best work showcasing portrait, commercial & large event coverage.',
  alternates: {
    canonical: '/portfolio',
  },
}

export default async function Portfolio() {
  const works = await getWorksFrames()

  return <PortfolioPageClient works={works} />
}
