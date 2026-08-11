import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get in Touch | Software Development Services in Chennai',
  description: 'Have a Software development requirement? Contact our Chennai team for scalable solutions, demos, and expert guidance.',
  keywords: 'Contact FuelDigi, Free Demo, Business Consultation, SaaS Solutions',
  openGraph: {
    title: 'Get in Touch | Software Development Services in Chennai',
    description: 'Have a Software development requirement? Contact our Chennai team for scalable solutions, demos, and expert guidance.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/contact'
  }
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Demo",
  "image": "https://www.fueldigi.in/assets/best-digital-marketing-company-services-chennai-online-fdm.webp",
  "@id": "https://www.fueldigi.in/contact",
  "url": "https://www.fueldigi.in/contact",
  "telephone": "+918438240280",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chandrasekaran Nagar Second Street,",
    "addressLocality": "Chennai",
    "postalCode": "600097",
    "addressCountry": "IN",
    "addressRegion": "TN"
  }
}

export default function ContactLayout({
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