import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spa Booking Software in Chennai | Online Appointment',
  description: 'All-in-one spa booking software in Chennai with online appointment booking system for both spa and salon, membership plans, and payment integration.',
  keywords: 'Spa Booking Software, Appointment Management, Wellness Center App, Online Scheduling, FuelDigi Spa',
  openGraph: {
    title: 'Spa Booking Software in Chennai | Online Appointment',
    description: 'All-in-one spa booking software in Chennai with online appointment booking system for both spa and salon, membership plans, and payment integration.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/products/spa-booking-software-in-chennai'
  }
}

const schemaData = {
   "@context": "https://schema.org/", 
  "@type": "BreadcrumbList", 
  "itemListElement": [{
    "@type": "ListItem", 
    "position": 1, 
    "name": "HRMS Development Services",
    "item": "https://www.fueldigi.in/products/hrms-development-services-in-chennai"  
  },{
    "@type": "ListItem", 
    "position": 2, 
    "name": "Spa Booking Software",
    "item": "https://www.fueldigi.in/products/spa-booking-software-in-chennai"  
  }]
}

export default function SpaBookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {children}
    </>
  )
}
