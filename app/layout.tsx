import './globals.css'
import type { Metadata } from 'next'
import AOSInit from '@/components/AOSInit'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fueldigi.in'),
  title: 'Software Development Company in Chennai | FuelDigi',
  description: 'FuelDigi is a software development company in Chennai offering custom CRM, HRMS, Spa Booking, and SaaS solutions for businesses of all sizes.',
  keywords: 'Software Development Company Chennai, SaaS Solutions, CRM, HRMS, Custom Software, FuelDigi',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Software Development Company in Chennai | FuelDigi',
    description: 'FuelDigi is a software development company in Chennai offering custom CRM, HRMS, Spa Booking, and SaaS solutions for businesses of all sizes.',
    url: 'https://www.fueldigi.in',
    siteName: 'FuelDigi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Development Company in Chennai | FuelDigi',
    description: 'FuelDigi is a software development company in Chennai offering custom CRM, HRMS, Spa Booking, and SaaS solutions for businesses of all sizes.',
  },
  alternates: {
    canonical: 'https://www.fueldigi.in'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6M9G5SZZ2C"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6M9G5SZZ2C');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <AOSInit />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a0306897b544d1c33891442/1jodt32ph';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
