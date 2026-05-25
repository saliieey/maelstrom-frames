import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Photography Company in Perinthalmanna, Kerala',
  description: 'Professional wedding photography & videography in Perinthalmanna, Kerala. Fast delivery service with expertise in large events, concerts & stage coverage.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
