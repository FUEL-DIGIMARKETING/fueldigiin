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

export default function EmailMarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
