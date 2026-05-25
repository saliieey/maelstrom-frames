import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Photography in Perinthalmanna, Kerala',
  description: 'Professional event photography & videography in Perinthalmanna, Kerala. Specialized in large events, concerts, stages & corporate gatherings.',
  alternates: {
    canonical: '/events',
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
