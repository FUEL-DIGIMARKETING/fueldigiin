import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRM Development Company in Chennai',
  description: 'Build powerful CRM systems with a leading CRM development company in Chennai. Improve sales tracking, customer engagement, and performance.',
  keywords: 'CRM Software, Customer Management, Lead Tracking, Sales Management, FuelDigi CRM',
  openGraph: {
    title: 'CRM Development Company in Chennai',
    description: 'Build powerful CRM systems with a leading CRM development company in Chennai. Improve sales tracking, customer engagement, and performance.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/products/crm-development-company-in-chennai'
  }
}

const schemaData = {
  "@context": "https://schema.org/", 
  "@type": "BreadcrumbList", 
  "itemListElement": [{
    "@type": "ListItem", 
    "position": 1, 
    "name": "Smart Business Software",
    "item": "https://www.fueldigi.in/"  
  },{
    "@type": "ListItem", 
    "position": 2, 
    "name": "CRM Development Company",
    "item": "https://www.fueldigi.in/products/crm-development-company-in-chennai"  
  }]
}

export default function CRMLayout({
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
