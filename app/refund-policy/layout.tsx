import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Software Subscription Refund and Cancellation Policy',
  description: 'Review subscription refund policy, including payment terms, cancellation process, billing guidelines, etc. For more info, call us. ',
  keywords: 'Spa Booking App, Refund Policy, Data Security, Customer Information',
  openGraph: {
    title: 'Software Subscription Refund and Cancellation Policy',
    description: 'Review subscription refund policy, including payment terms, cancellation process, billing guidelines, etc. For more info, call us. ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/refund-policy'
  }
}

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
