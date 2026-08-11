import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Clients - FuelDigi | Trusted by Businesses Worldwide',
  description: 'Discover businesses that trust FuelDigi for their SaaS solutions. Join our growing list of satisfied clients.',
  keywords: 'FuelDigi Clients, Customer Success, Business Partners, Client Testimonials',
  openGraph: {
    title: 'Our Clients - FuelDigi',
    description: 'Discover businesses that trust FuelDigi for their SaaS solutions.',
    type: 'website',
  },
}

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
