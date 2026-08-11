import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spa Booking App Privacy Policy | Data Security',
  description: 'Understand how our spa booking software protects customer data, appointment details, and online payment information.',
  keywords: 'Spa Booking App, Privacy Policy, Data Security, Customer Information',
  openGraph: {
    title: 'Spa Booking App Privacy Policy | Data Security',
    description: 'Understand how our spa booking software protects customer data, appointment details, and online payment information.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/spa-booking/privacy-policy'
  }
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
