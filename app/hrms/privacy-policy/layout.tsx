import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HRMS Software Privacy Policy | Data Protection',
  description: 'Read our HRMS privacy policy to understand how we protect employee data, payroll records, and attendance information securely.',
  keywords: 'HRMS Software, Payroll System, HR Management, Employee Attendance, FuelDigi HRMS',
  openGraph: {
    title: 'HRMS Software Privacy Policy | Data Protection',
    description: 'Read our HRMS privacy policy to understand how we protect employee data, payroll records, and attendance information securely.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/hrms/privacy-policy'
  }
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
