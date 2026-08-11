'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#840c1c] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <a href="/"><img src="/assets/software-development-company.webp" alt="FuelDigi Logo" width={120} height={120} className="rounded-full" /></a>
            </div>
            <p className="text-white">
              Smart SaaS Solutions for Smarter Businesses. Building customized software that grows with you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-lg font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white hover:text-[#ffcf3e] transition-colors">Home</Link></li>
              <li><Link href="/software-application-development-services-in-chennai" className="text-white hover:text-[#ffcf3e] transition-colors">About</Link></li>
              <li><Link href="/products/hrms-development-services-in-chennai" className="text-white hover:text-[#ffcf3e] transition-colors">Products</Link></li>
              <li><Link href="/team" className="text-white hover:text-[#ffcf3e] transition-colors">Team</Link></li>
              <li><Link href="/contact" className="text-white hover:text-[#ffcf3e] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="text-lg font-semibold mb-4">Our Products</p>
            <ul className="space-y-2">
              <li><Link href="/products/crm-development-company-in-chennai" className="text-white hover:text-[#ffcf3e] transition-colors">CRM System</Link></li>
              <li><Link href="/products/hrms-development-services-in-chennai" className="text-white hover:text-[#ffcf3e] transition-colors">HRMS</Link></li>
              <li><Link href="/products/spa-booking-software-in-chennai" className="text-white hover:text-[#ffcf3e] transition-colors">Spa Booking</Link></li>
              <li><Link href="/products/email-marketing-software-in-chennai" className="text-white hover:text-[#ffcf3e] transition-colors">E-Mail Campaign</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-lg font-semibold mb-4">Contact Us</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white">
                <Mail size={18} className="text-[#ffcf3e]" />
                <a href="mailto:info@fueldigi.in" className="hover:text-[#ffcf3e] transition-colors">
                  info@fueldigi.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-white">
                <Phone size={18} className="text-[#ffcf3e]" />
                <a href="tel:+918754236989" className="hover:text-[#ffcf3e] transition-colors">
                  +91 8754236989
                </a>
              </li>
               <li className="flex items-center gap-2 text-white">
                <Phone size={18} className="text-[#ffcf3e]" />
                <a href="tel:+918015874749" className="hover:text-[#ffcf3e] transition-colors">
                  +91 8438240280
                </a>
              </li>
              <li className="flex items-start gap-2 text-white">
                <MapPin size={18} className="text-[#ffcf3e] flex-shrink-0 mt-1" />
                <a href="https://maps.app.goo.gl/Akm2DMg8dLCzqhhg8" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcf3e] transition-colors">
                  Door No.S102, Second Floor, Plot No.36, Chandrasekaran Nagar Second Street, Rajiv Gandhi Salai, Thoraipakkam, Chennai, Tamil Nadu 600097
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
          <p>&copy; 2026 copyright reserved by <a href="https://www.fueldigi.com" className="hover:text-[#ffcf3e] transition-colors">FuelDigi Marketing Private Limited</a>.</p>
          <div className="flex gap-4">
            <Link href="/refund-policy" className="hover:text-[#ffcf3e] transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
