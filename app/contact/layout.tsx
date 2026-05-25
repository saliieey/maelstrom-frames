import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Photography Services Perinthalmanna, Kerala',
  description: 'Get in touch with our photography team in Perinthalmanna, Kerala. Book your wedding, event or portrait photography services. Fast response & consultation.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
