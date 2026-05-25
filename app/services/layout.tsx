import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photography Services in Perinthalmanna, Kerala',
  description: 'Professional photography services in Perinthalmanna including wedding, event, portrait & commercial photography. Capture every moment with our expert team.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
