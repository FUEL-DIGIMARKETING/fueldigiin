import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meet FuelDigi’s Team of Digital & Software Experts',
  description: 'Get to know the experts behind FuelDigi, creating powerful software products and digital strategies for business growth.',
  keywords: 'FuelDigi Experts, Technology Experts, Innovation Leaders',
  openGraph: {
    title: 'Meet FuelDigi’s Team of Digital & Software Experts',
    description: 'Get to know the experts behind FuelDigi, creating powerful software products and digital strategies for business growth.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/team'
  }
}

// const schemaData = {
//   "@context": "https://schema.org",
//   "@type": "LocalBusiness",
//   "name": "Demo",
//   "image": "https://www.fueldigi.in/assets/best-digital-marketing-company-services-chennai-online-fdm.webp",
//   "@id": "https://www.fueldigi.in/contact",
//   "url": "https://www.fueldigi.in/contact",
//   "telephone": "+918438240280",
//   "address": {
//     "@type": "PostalAddress",
//     "streetAddress": "Chandrasekaran Nagar Second Street,",
//     "addressLocality": "Chennai",
//     "postalCode": "600097",
//     "addressCountry": "IN",
//     "addressRegion": "TN"
//   }
// }

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      /> */}
      {children}
    </>
  )
}