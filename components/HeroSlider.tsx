'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Mail, Phone } from 'lucide-react'

const HeroSlider = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showHeroNavbar, setShowHeroNavbar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const heroSlider = document.querySelector('[data-hero-slider]')
      if (!heroSlider) return

      const heroRect = heroSlider.getBoundingClientRect()
      const isHeroVisible = heroRect.bottom > 100

      setShowHeroNavbar(isHeroVisible)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const productLinks = [
    { name: 'CRM', href: '/products/crm-development-company-in-chennai' },
    { name: 'HRMS', href: '/products/hrms-development-services-in-chennai' },
    { name: 'Spa Booking', href: 'products/spa-booking-software-in-chennai' },
    { name: 'E-Mail Campaign', href: 'products/email-marketing-software-in-chennai ' }
  ]

  return (
    <div className="relative bg-white">
      {/* Fixed Navbar - Desktop Only - Shown Initially, Hidden on Scroll */}
      <div className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-all duration-300 ${
        showHeroNavbar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`} data-hero-navbar>
        <div className="flex justify-center">
          <div className="w-11/12 max-w-7xl flex items-center justify-between h-20 px-8">
            <Link href="/">
              <img src="/assets/best-digital-marketing-company-services-chennai-online-fdm.webp" alt="FDM Logo" width={120} height={48} className="h-12 w-auto" />
            </Link>
            
            <div className="flex items-center gap-12">
              <Link href="/" className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors">
                Home
              </Link>
              <Link href="/software-application-development-services-in-chennai" className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors">
                About
              </Link>
              <div 
                className="relative group"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors flex items-center gap-1 py-2">
                  Our Product
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-xl shadow-xl py-2 z-50">
                    {productLinks.map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        className="block px-6 py-3 text-gray-700 hover:bg-[#870d23] hover:text-white transition-colors"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* <Link href="/clients" className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors">
                Our Client
              </Link> */}
              <Link href="/team" className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors">
                Team
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors">
                Contact
              </Link>
            </div>
            
            <div className="bg-[#870d23] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300 flex flex-col items-start gap-1 text-xs">
                <a href="tel:+918754236989" className="flex items-center gap-2 hover:text-gray-200">
                  <Phone className="w-4 h-4" />
                  <span>+91 87542 36989</span>
                </a>
                <a href="mailto:info@fueldigi.in" className="flex items-center gap-2 hover:text-gray-200">
                  <Mail className="w-4 h-4" />
                  <span>info@fueldigi.in</span>
                </a>
              </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Curved Edges */}
      <div className="relative h-[100vh] overflow-hidden pt-4 md:pt-4 px-0 md:px-8 pb-4 md:pb-8" data-hero-slider>
        {/* Curved Background Container */}
        <div className="relative h-full rounded-[40px] md:rounded-[60px] overflow-hidden">
          <img
            src="/assets/software-development-services.webp"
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Black overlay for mobile text visibility */}
          <div className="absolute inset-0 bg-black/50 md:bg-transparent z-[1]" />

          {/* Hexagonal Pattern Overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3 25L93.3 75L50 100L6.7 75L6.7 25Z' fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
          
          {/* Decorative Dots */}
          <div className="absolute top-20 left-10 w-40 h-40 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-3 h-3 bg-gray-500 rounded-full" style={{
                left: `${(i % 5) * 25}%`,
                top: `${Math.floor(i / 5) * 25}%`
              }} />
            ))}
          </div>
          <div className="absolute bottom-20 right-10 w-40 h-40 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-3 h-3 bg-gray-500 rounded-full" style={{
                left: `${(i % 5) * 25}%`,
                top: `${Math.floor(i / 5) * 25}%`
              }} />
            ))}
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="container mx-auto px-8 text-center">
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Smart Business Software,<br />Built for Your Evolution
              </p>
              <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-md">
                From startups to enterprises, we stimulate you to manage customers, teams, and operations efficiently through our cloud-based applications. Currently, it is available on the <b>Web and the Play Store</b>.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Start Your Project
              </Link>
            </div>
          </div>
          
          {/* Brand Logos Section */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[100%] z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl py-4 px-2 overflow-hidden border border-white/50 shadow-lg">
              <p className="text-gray-800 font-bold text-sm mb-2 tracking-wider text-center">TRUSTED BY AMAZING BRANDS</p>
              <div className="flex items-center gap-16 md:gap-32 animate-scroll-fast" style={{ width: 'max-content' }}>
                <img src="/assets/good-caterers-in-chennai.png" alt="CMS Business Finance" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/sgm-finance-associate.png" alt="KVB Events" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/river-salon-and-day-spa.png" alt="KVB" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/Kalyana-virundhu-biryani-kvb-chennai-order-online.png" alt="KVB Biryani" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/best-real-estate-company-in-chennai-river-properties.png" alt="River Properties" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/best-automatic-water-level-controller-in-chennai.png" alt="SGM" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/financial-consultant-in-chennai.png" alt="Financial Consultant" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                {/* Duplicate for seamless loop */}
                <img src="/assets/good-caterers-in-chennai.png" alt="CMS Business Finance" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/sgm-finance-associate.png" alt="KVB Events" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/river-salon-and-day-spa.png" alt="KVB" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/Kalyana-virundhu-biryani-kvb-chennai-order-online.png" alt="KVB Biryani" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/best-real-estate-company-in-chennai-river-properties.png" alt="River Properties" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/best-automatic-water-level-controller-in-chennai.png" alt="SGM" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
                <img src="/assets/financial-consultant-in-chennai.png" alt="Financial Consultant" width={120} height={60} className="h-8 md:h-12 w-auto flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
