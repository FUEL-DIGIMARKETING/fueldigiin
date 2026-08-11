import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR Software in Chennai | Make Easy, Starting Now',
  description: 'Secure your Fueldigi HR Software and streamline payroll, attendance, and employee management — all in one powerful system. Choose a package now!',
  keywords: 'CRM Software, Customer Management, Lead Tracking, Sales Management, FuelDigi CRM',
  openGraph: {
    title: 'HR Software in Chennai | Make Easy, Starting Now',
    description: 'Secure your Fueldigi HR Software and streamline payroll, attendance, and employee management — all in one powerful system. Choose a package now!',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/hrms/payment'
  }
}

export default function HRMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
