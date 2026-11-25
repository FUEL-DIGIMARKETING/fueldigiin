'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  Mail,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

// ── 6 Slides Definition ────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    clientName: 'Sringeri',
    appName: 'Sringeri',
    logo: '/assets/sringeri-logo.png',
    image: '/assets/sringeri-app.png',
    badgeText: 'Open Sringeri App',
    appLink: 'https://play.google.com/store/apps',
    description:
      'Official mobile app for Sri Sharada Peetham, Sringeri featuring daily Panchangam, Sandhya Kala & Peetham events.',
  },
  {
    id: 2,
    clientName: 'Riverdayspa',
    appName: 'Riverdayspa',
    logo: '/assets/riverdayspa-logo.png',
    image: '/assets/river-booking-app.png',
    badgeText: 'View Spa Booking App',
    appLink: '/products/spa-booking-software-in-chennai',
    description:
      'Seamless spa & salon appointment booking app with service discovery, curated packages, and instant offers.',
  },
  {
    id: 3,
    clientName: 'HRMS',
    appName: 'Fueldigi HRMS',
    logo: '/assets/hrms-logo.png',
    image: '/assets/hrms-app.png',
    badgeText: 'Get on Google Play',
    appLink: 'https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem',
    description:
      'All-in-one HR & payroll mobile platform for attendance tracking, leave approvals, and instant payslips.',
  },
  {
    id: 4,
    clientName: 'CRM',
    appName: 'Fueldigi CRM',
    logo: '/assets/crm-logo.png',
    image: '/assets/crm-app.png',
    badgeText: 'Explore CRM App',
    appLink: '/products/crm-development-company-in-chennai',
    description:
      'Streamline leads, customer relationships, and sales pipelines on the go with our advanced cloud CRM app.',
  },
  {
    id: 5,
    clientName: 'POS',
    appName: 'Fueldigi POS',
    logo: '/assets/pos-logo.png',
    image: '/assets/pos-app.png',
    badgeText: 'Explore POS System',
    appLink: '/contact',
    description:
      'Smart billing, inventory, and staff portal solution engineered for fast retail and hospitality operations.',
  },
  {
    id: 6,
    clientName: 'Invoice',
    appName: 'Fueldigi Invoice',
    logo: '/assets/invoice-logo.png',
    image: '/assets/invoice-app.png',
    badgeText: 'Explore Invoice App',
    appLink: '/contact',
    description:
      'Automated GST invoicing, payment tracking, and financial summary reports built for growing businesses.',
  },
]

const HeroSlider = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showHeroNavbar, setShowHeroNavbar] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Scroll handler for desktop navbar
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

  // Automatic cycling every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const productLinks = [
    { name: 'CRM', href: '/products/crm-development-company-in-chennai' },
    { name: 'HRMS', href: '/products/hrms-development-services-in-chennai' },
    { name: 'Spa Booking', href: '/products/spa-booking-software-in-chennai' },
    { name: 'FuelDigi Campaigns', href: '/products/email-marketing-software-in-chennai' },
  ]

  const activeSlide = slides[currentSlide]

  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Fixed Navbar - Desktop Only - Shown Initially, Hidden on Scroll */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ${
          showHeroNavbar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        data-hero-navbar
      >
        <div className="flex justify-center">
          <div className="w-11/12 max-w-7xl flex items-center justify-between h-20 px-8">
            <Link href="/">
              <img
                src="/assets/best-tech-solution.webp"
                alt="FDM Logo"
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </Link>

            <div className="flex items-center gap-12">
              <Link href="/" className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors">
                Home
              </Link>
              <Link
                href="/software-application-development-services-in-chennai"
                className="text-gray-700 hover:text-[#870d23] font-semibold transition-colors"
              >
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
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl py-2 z-50 border border-gray-100">
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

            <div className="bg-[#870d23] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300 flex flex-col items-start gap-1 text-xs shadow-md">
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

      {/* Hero Section Container with 100vh height on desktop & responsive padding */}
      <div
        className="relative w-full min-h-[100vh] lg:h-[100vh] px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-28 md:pt-24 pb-4 md:pb-6 flex items-center justify-center"
        data-hero-slider
      >
        {/* Outer Banner with 100vh proportional height, increased width & curved edges */}
        <div className="relative w-full h-full max-w-[1550px] mx-auto rounded-[28px] sm:rounded-[40px] md:rounded-[48px] lg:rounded-[56px] overflow-hidden bg-gradient-to-br from-[#870d23] via-[#a01129] to-[#600918] shadow-2xl border border-[#a01129]/40 flex flex-col justify-between">
          {/* Subtle Ambient Radial Glows & Pattern */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#ffcf3e]/10 rounded-full blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L56 15L56 45L30 60L4 45L4 15Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Main Grid: Left side text/stats + Right side responsive glassmorphism container */}
          <div className="relative z-10 w-full h-full flex-1 flex flex-col lg:flex-row items-stretch justify-between">
            {/* ── LEFT SIDE: Responsive Alignment & Balanced Vertical Rhythm ── */}
            <div className="w-full lg:w-[48%] px-5 sm:px-8 md:px-10 lg:px-10 xl:px-14 py-7 sm:py-9 lg:py-10 xl:py-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              {/* Header Block: Main Title & Subtitle */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-5 max-w-xl">
                <p className="text-2xl sm:text-3xl md:text-3xl lg:text-[38px] xl:text-[38px] font-black text-white leading-tight tracking-tight drop-shadow-md">
                  Smart Business Software,
                  <br className="hidden sm:inline" />
                  <span className="text-yellow-300"> Built for Your Evolution</span>
                </p>

                <p className="text-sm sm:text-base lg:text-[14px] xl:text-lg text-white/90 font-normal leading-relaxed drop-shadow-sm">
                  From startups to enterprises, we stimulate you to manage customers, teams, and operations efficiently through our cloud-based applications. Currently, it is available on the Web and the Play Store.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-5 sm:pt-6 lg:pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 bg-white text-[#870d23] hover:bg-gray-100 font-extrabold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 text-sm sm:text-base group"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="pt-6 sm:pt-8 lg:pt-8 w-full flex justify-center lg:justify-start">
                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-md w-full">
                  {/* Stat 1 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 group">
                    <p className="text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-md">
                      5+
                    </p>
                    <p className="text-[10px] sm:text-xs font-semibold text-white/85 uppercase tracking-wider mt-1">
                      App deployed
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 group">
                    <p className="text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-md">
                      20+
                    </p>
                    <p className="text-[10px] sm:text-xs font-semibold text-white/85 uppercase tracking-wider mt-1">
                      Clients
                    </p>
                  </div>

                  {/* Stat 3 */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 group">
                    <p className="text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-md">
                      7+
                    </p>
                    <p className="text-[10px] sm:text-xs font-semibold text-white/85 uppercase tracking-wider mt-1">
                      Years
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDE: Responsive Glassmorphism Container Split into Two ── */}
            <div className="w-full lg:w-[52%] h-auto lg:h-full flex flex-col justify-end relative z-10">
              {/* Glassmorphism Container anchored bottom-right with dashed border highlight */}
              <div className="w-full h-auto lg:h-[85%] lg:min-h-0 lg:max-h-[85%] bg-white/10 backdrop-blur-2xl border-2 border-dashed border-yellow-300/75 lg:border-r-0 lg:border-b-0 ring-1 ring-inset ring-white/25 rounded-t-[28px] sm:rounded-t-[40px] lg:rounded-t-none lg:rounded-tl-[56px] xl:rounded-tl-[72px] px-4 pt-12 pb-6 sm:px-7 sm:pt-12 sm:pb-7 md:py-6 lg:px-6 lg:py-5 xl:px-8 xl:py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 lg:gap-4 overflow-hidden shadow-[0_0_40px_rgba(253,224,71,0.16),0_25px_50px_rgba(0,0,0,0.4)] relative">
                {/* Subtle Warm Glass Highlight in Top-Left Curve */}
                <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full bg-yellow-300/15 blur-3xl" />

                {/* Top-Right Corner Slide Navigation Arrows */}
                <div className="absolute top-3.5 right-4 sm:top-4 sm:right-6 z-30 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#870d23] border border-white/30 flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#870d23] border border-white/30 flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Container Left Half: Enlarged Responsive Mobile Phone Screen Only */}
                <div className="w-full md:w-[58%] flex items-center justify-center relative z-10">
                  <img
                    key={`app-${activeSlide.id}`}
                    src={activeSlide.image}
                    alt={activeSlide.appName}
                    className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[500px] 2xl:max-w-[540px] h-[310px] sm:h-[360px] md:h-[390px] lg:h-[430px] xl:h-[480px] 2xl:h-[520px] lg:scale-105 xl:scale-110 object-contain mx-auto block rounded-2xl drop-shadow-[0_22px_32px_rgba(0,0,0,0.55)] transition-all duration-500 hover:scale-[1.03]"
                  />
                </div>

                {/* Container Right Half: Watermark Logo Background + Aligned App Name, Black Badge & Description */}
                <div className="w-full md:w-[42%] relative flex flex-col items-center md:items-start justify-center text-center md:text-left z-20 md:pr-2 py-4 sm:py-6 md:py-10 min-h-[190px] sm:min-h-[220px] md:min-h-[290px]">
                  {/* Watermark Logo in Background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <img
                      key={`watermark-${activeSlide.id}`}
                      src={activeSlide.logo}
                      alt=""
                      aria-hidden="true"
                      className="w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain opacity-15 sm:opacity-20 rounded-3xl select-none transition-opacity duration-500"
                    />
                  </div>

                  {/* Foreground Content: App Name, Black Badge & Description */}
                  <div className="relative z-10 flex flex-col items-center md:items-start">
                    {/* App Name */}
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-[26px] font-extrabold text-white tracking-wide drop-shadow-md">
                      {activeSlide.appName}
                    </p>

                    {/* Clickable Badge in Black Colour with App Link */}
                    <div className="mt-3">
                      <a
                        href={activeSlide.appLink}
                        target={activeSlide.appLink.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-neutral-900 text-white hover:text-yellow-400 text-xs sm:text-sm font-bold transition-all duration-300 shadow-2xl border border-neutral-700/80 hover:border-neutral-500 hover:scale-105 active:scale-95 group"
                      >
                        <span>{activeSlide.badgeText}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all" />
                      </a>
                    </div>

                    {/* App Description */}
                    <p className="mt-3 text-xs sm:text-sm xl:text-[15px] text-white/90 leading-relaxed drop-shadow-sm max-w-xs">
                      {activeSlide.description}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
