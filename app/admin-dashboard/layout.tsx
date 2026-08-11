import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Fuel Digi',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      {children}
    </>
  )
}