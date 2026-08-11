import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRM Software Provider in Chennai | Custom Software Solution',
  description: 'Get a custom CRM Software Provider in Chennai with Fueldigi. Choose the suitable package for your business growth. Contact us.',
  keywords: 'CRM Software, Customer Management, Lead Tracking, Sales Management, FuelDigi CRM',
  openGraph: {
    title: 'CRM Software Provider in Chennai | Custom Software Solution',
    description: 'Get a custom CRM Software Provider in Chennai with Fueldigi. Choose the suitable package for your business growth. Contact us.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/products/crm-development-company-in-chennai/payment'
  }
}

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
