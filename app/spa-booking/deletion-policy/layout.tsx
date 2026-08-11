import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account Deletion Policy | River Salon and Spa Booking',
  description: 'Learn how to request account deletion and understand what data will be removed from River Salon and Day Spa booking application.',
  keywords: 'account deletion, data removal, privacy, River Salon, spa booking app, delete account',
  openGraph: {
    title: 'Account Deletion Policy | River Salon and Spa Booking',
    description: 'Learn how to request account deletion and understand what data will be removed from River Salon and Day Spa booking application.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/spa-booking/deletion-policy'
  }
}

export default function DeletionPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
