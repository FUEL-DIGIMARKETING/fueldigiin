import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Application Development Services in Chennai',
  description: 'Fueldigi is a Software Application Development Services in Chennai and a business software company in India, providing custom app solutions.',
  keywords: 'About FuelDigi, SaaS Company, Business Software, Custom Solutions',
  openGraph: {
    title: 'Software Application Development Services in Chennai',
    description: 'Fueldigi is a Software Application Development Services in Chennai and a business software company in India, providing custom app solutions.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/software-application-development-services-in-chennai'
  }
}

const schemaData = {
  "@context": "https://schema.org/", 
  "@type": "BreadcrumbList", 
  "itemListElement": [{
    "@type": "ListItem", 
    "position": 1, 
    "name": "Software Development Services",
    "item": "https://www.fueldigi.in/"  
  },{
    "@type": "ListItem", 
    "position": 2, 
    "name": "Customized Software Solutions",
    "item": "https://www.fueldigi.in/software-application-development-services-in-chennai"  
  }]
}


export default function AboutLayout({
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
