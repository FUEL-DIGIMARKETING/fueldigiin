import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRM Privacy Policy | Data Protection & Security',
  description: 'Read our CRM privacy policy to understand how we collect, use, and protect your data. Secure, compliant, and transparent data handling practices.',
  keywords: 'HRMS Software, Payroll System, HR Management, Employee Attendance, FuelDigi HRMS',
  openGraph: {
    title: 'CRM Privacy Policy | Data Protection & Security',
    description: 'Read our CRM privacy policy to understand how we collect, use, and protect your data. Secure, compliant, and transparent data handling practices.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/crm/privacy-policy'
  }
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
