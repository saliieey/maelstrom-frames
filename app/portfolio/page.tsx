import { getWorksFrames } from '@/lib/wordpress'
import PortfolioPageClient from '@/components/PortfolioPageClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Our Portfolio - Maelstrom Frames',
  description: 'Explore our collection of stunning wedding photography, event coverage, and videography work.',
}

export default async function Portfolio() {
  const works = await getWorksFrames()

  return <PortfolioPageClient works={works} />
}
