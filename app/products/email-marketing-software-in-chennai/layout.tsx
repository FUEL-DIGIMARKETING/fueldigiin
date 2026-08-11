import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Marketing Software: Bulk Email Campaign and Automated',
  description: 'Email marketing software to grow and automate campaigns all in one place. Simplify email marketing tactics. Sign up, choose a plan for your business.',
  keywords: 'email marketing software, bulk email campaign, email automation, email marketing Chennai, SMTP email marketing, FuelDigi Campaigns',
  alternates: {
    canonical: 'https://www.fueldigi.in/products/email-marketing-software-in-chennai',
  },
  openGraph: {
    title: 'Email Marketing Software: Bulk Email Campaign and Automated',
    description: 'Email marketing software to grow and automate campaigns all in one place. Simplify email marketing tactics. Sign up, choose a plan for your business.',
    type: 'website',
  },
}
const schemaData = {
   "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.fueldigi.in/products/email-marketing-software-in-chennai#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.fueldigi.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Email Marketing Software",
          "item": "https://www.fueldigi.in/products/email-marketing-software-in-chennai"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.fueldigi.in/products/email-marketing-software-in-chennai#webpage",
      "name": "Email Marketing Software",
      "url": "https://www.fueldigi.in/products/email-marketing-software-in-chennai",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.fueldigi.in/#website",
        "url": "https://www.fueldigi.in/"
      },
      "breadcrumb": {
        "@id": "https://www.fueldigi.in/products/email-marketing-software-in-chennai#breadcrumb"
      }
    }
  ]
}

export default function EmailMarketingLayout({
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