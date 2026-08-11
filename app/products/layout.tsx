import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Products - FuelDigi | CRM, HRMS & Spa Booking Solutions',
  description: 'Explore FuelDigi\'s suite of powerful SaaS products including CRM, HRMS, and Spa Booking systems designed to transform your business.',
  keywords: 'FuelDigi Products, CRM Software, HRMS System, Spa Booking App, Business Solutions',
  openGraph: {
    title: 'Our Products - FuelDigi',
    description: 'Explore FuelDigi\'s suite of powerful SaaS products.',
    type: 'website',
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
