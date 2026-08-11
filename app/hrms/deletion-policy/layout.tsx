import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HRMS Data Deletion Policy | Employee Data Removal',
  description: 'Learn how we handle employee data deletion requests and secure removal of HRMS payroll and attendance records. ',
  keywords: 'HRMS Software, Payroll System, HR Management, Employee Attendance, FuelDigi HRMS',
  openGraph: {
    title: 'HRMS Data Deletion Policy | Employee Data Removal',
    description: 'Learn how we handle employee data deletion requests and secure removal of HRMS payroll and attendance records. ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in/hrms/deletion-policy'
  }
}

export default function DeletePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
