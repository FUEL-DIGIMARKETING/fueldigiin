import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HRMS Development Services in Chennai ',
  description: 'Advanced HRMS Development Services in Chennai with attendance management, payroll processing, leave tracking, and employee management.',
  keywords: 'HRMS Software, Payroll System, HR Management, Employee Attendance, FuelDigi HRMS',
  openGraph: {
    title: 'HRMS Development Services in Chennai ',
    description: 'Advanced HRMS Development Services in Chennai with attendance management, payroll processing, leave tracking, and employee management.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/products/hrms-development-services-in-chennai'
  }
}

const schemaData = {
  "@context": "https://schema.org/", 
  "@type": "BreadcrumbList", 
  "itemListElement": [{
    "@type": "ListItem", 
    "position": 1, 
    "name": "CRM Development Company",
    "item": "https://www.fueldigi.in/products/crm-development-company-in-chennai"  
  },{
    "@type": "ListItem", 
    "position": 2, 
    "name": "HRMS Development Services",
    "item": "https://www.fueldigi.in/products/hrms-development-services-in-chennai"  
  }]
}

export default function HRMSLayout({
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
