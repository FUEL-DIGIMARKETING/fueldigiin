import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fueldigi CRM Data Deletion Policy',
  description: 'Learn how to request data deletion in the Fueldigi CRM system. We ensure safe, timely, and compliant removal of your personal and business data.',
  keywords: 'HRMS Software, Payroll System, HR Management, Employee Attendance, FuelDigi HRMS',
  openGraph: {
    title: 'Fueldigi CRM Data Deletion Policy',
    description: 'Learn how to request data deletion in the Fueldigi CRM system. We ensure safe, timely, and compliant removal of your personal and business data.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/crm/deletion-policy'
  }
}

export default function DeletePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
