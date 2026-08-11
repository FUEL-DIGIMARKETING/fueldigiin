'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, Phone, Mail } from 'lucide-react'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleDemoClick = () => {
    window.location.href = '/contact'
  }

  const isHRMSPage = pathname?.includes('/products/hrms-development-services-in-chennai')
  const isCRMPage = pathname?.includes('/products/crm-development-company-in-chennai')
  const isSpaPage = pathname?.includes('/products/spa-booking-software-in-chennai')
  const isEmailPage = pathname?.includes('/products/email-marketing-software-in-chennai')
  const isProductPage = isHRMSPage || isCRMPage || isSpaPage || isEmailPage

  const getProductInfo = () => {
    if (isHRMSPage) return { logo: '/assets/custom-hrms.webp', name: 'HRMS', excludeProducts: ['CRM', 'Spa Booking', 'E-Mail Campaign'] }
    if (isCRMPage) return { logo: '/assets/customised-crm.webp', name: 'CRM', excludeProducts: ['HRMS', 'Spa Booking', 'E-Mail Campaign'] }
    if (isSpaPage) return { logo: '/assets/spa-management-software.webp', name: 'Spa', excludeProducts: ['CRM', 'HRMS', 'E-Mail Campaign'] }
    if (isEmailPage) return { logo: '/assets/email-marketing-software.webp', name: 'E-Mail Campaign', excludeProducts: ['CRM', 'HRMS', 'Spa Booking'] }
    return null
  }

  const getMobileLogo = () => {
    if (isHRMSPage) return '/assets/custom-hrms.webp'
    if (isCRMPage) return '/assets/customised-crm.webp'
    if (isSpaPage) return '/assets/spa-management-software.webp'
    if (isEmailPage) return '/assets/email-marketing-software.webp'
    return '/assets/FDM.webp'
  }

  const productInfo = getProductInfo()
  const mobileLogo = getMobileLogo()

  const getProductLinks = () => {
    const allProducts = [
      { name: 'CRM', href: '/products/crm-development-company-in-chennai' },
      { name: 'HRMS', href: '/products/hrms-development-services-in-chennai' },
      { name: 'Spa Booking', href: '/products/spa-booking-software-in-chennai' },
      { name: 'E-Mail Campaign', href: '/products/email-marketing-software-in-chennai' }
    ]
    
    if (productInfo) {
      return allProducts.filter(p => productInfo.excludeProducts.includes(p.name))
    }
    return allProducts
  }

  const productLinks = getProductLinks()

  if (isProductPage) {
    return (
      <>
        {/* Desktop - Curved navbar on scroll */}
        <div className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="flex justify-center">
            <div className="bg-white shadow-lg w-11/12 max-w-7xl flex items-center justify-between px-8 h-20" style={{
              borderBottomLeftRadius: '50px',
              borderBottomRightRadius: '50px',
            }}>
              <Link href="/">
                <img src="/assets/best-digital-marketing-company-services-chennai-online-fdm.webp" alt="FuelDigi Logo" width={120} height={48} className="h-12 w-auto" />
              </Link>
              <img src={productInfo!.logo} alt={`${productInfo!.name} Logo`} width={150} height={60} className="h-14 w-auto" />
              <div className="bg-brand-primary text-white font-bold px-4 py-2 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300 flex flex-col items-start gap-1">
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

          <div className="flex justify-center">
            <div className="shadow-lg w-9/12 max-w-5xl flex items-center justify-center gap-8 px-8 h-16" style={{
              borderBottomLeftRadius: '40px',
              borderBottomRightRadius: '40px',
              background: 'linear-gradient(135deg, #870d23 0%, #a91129 100%)',
            }}>
              <Link href="/" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Home
              </Link>
              <Link href="/software-application-development-services-in-chennai" className="text-white hover:text-gray-200 font-semibold transition-colors">
                About
              </Link>
              <div 
                className="relative group"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="text-white hover:text-gray-200 font-semibold transition-colors flex items-center gap-1 py-2">
                  Products
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-xl shadow-xl py-2 z-50">
                    {productLinks.map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        className="block px-6 py-3 text-gray-700 hover:bg-brand-primary hover:text-white transition-colors"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* <Link href="/clients" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Client
              </Link> */}
              <Link href="/team" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Team
              </Link>
               <Link href="/blog" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile - Top contact bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-brand-primary px-4">
          <div className="flex items-center justify-center gap-4 h-10 text-white text-xs font-semibold">
            <a href="tel:+918754236989" className="flex items-center gap-1 hover:text-gray-200 transition-colors">
              <Phone className="w-3 h-3" />
              <span>8754236989</span>
            </a>
            <span className="text-white/40">|</span>
            <a href="mailto:info@fueldigi.in" className="flex items-center gap-1 hover:text-gray-200 transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@fueldigi.in</span>
            </a>
          </div>
        </div>

        {/* Mobile - Only curved navbar */}
        <div className="md:hidden fixed top-10 left-0 right-0 z-50 px-4">
          <div className="bg-white shadow-lg" style={{
            borderBottomLeftRadius: '30px',
            borderBottomRightRadius: '30px',
          }}>
            <div className="flex items-center justify-between h-16 px-4">
              <Link href="/">
              <img src={mobileLogo} alt="Logo" width={120} height={48} className="h-10 w-auto" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-brand-primary"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="py-4 px-4 space-y-4">
                <Link href="/" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/software-application-development-services-in-chennai" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold py-2">Products</p>
                  {productLinks.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block pl-4 text-gray-700 hover:text-brand-primary transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
                {/* <Link href="/clients" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                  Client
                </Link> */}
                <Link href="/team" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Team
              </Link>
              <Link href="/blog" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Blog
              </Link>
                <Link href="/contact" className="text-white hover:text-gray-200 font-semibold transition-colors">
                Contact
              </Link>
                <div className="flex flex-col gap-3">
                  <a href="tel:+918754236989" className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300">
                    <Phone className="w-4 h-4" />
                    <span>+91 87542 36989</span>
                  </a>
                  <a href="mailto:info@fueldigi.in" className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300">
                    <Mail className="w-4 h-4" />
                    <span>info@fueldigi.in</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Desktop - Curved navbar on scroll */}
      <div className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex justify-center">
          <nav
            className="bg-white shadow-lg w-11/12 max-w-7xl"
            style={{
              borderBottomLeftRadius: '50px',
              borderBottomRightRadius: '50px',
            }}
          >
            <div className="flex items-center justify-between h-20 px-8">
              <Link href="/">
                <img src="/assets/best-digital-marketing-company-services-chennai-online-fdm.webp" alt="FDM Logo" width={120} height={48} className="h-12 w-auto" />
              </Link>
              
              <div className="flex items-center gap-12 flex-1 justify-center">
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
              
              <div className="bg-[#870d23] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300 flex flex-col items-start gap-1">
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
          </nav>
        </div>
      </div>

      {/* Mobile - Top contact bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-brand-primary px-4">
        <div className="flex items-center justify-center gap-4 h-10 text-white text-xs font-semibold">
          <a href="tel:+918754236989" className="flex items-center gap-1 hover:text-gray-200 transition-colors">
            <Phone className="w-3 h-3" />
            <span>8754236989</span>
          </a>
          <span className="text-white/40">|</span>
          <a href="mailto:info@fueldigi.in" className="flex items-center gap-1 hover:text-gray-200 transition-colors">
            <Mail className="w-3 h-3" />
            <span>info@fueldigi.in</span>
          </a>
        </div>
      </div>

      {/* Mobile - Only curved navbar */}
      <div className="md:hidden fixed top-10 left-0 right-0 z-50 px-4">
        <div className="bg-white shadow-lg" style={{
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
        }}>
          <div className="flex items-center justify-between h-16 px-4">
            <Link href="/">
              <img src="/assets/best-digital-marketing-company-services-chennai-online-fdm.webp" alt="FDM Logo" width={120} height={48} className="h-10 w-auto" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-brand-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="py-4 px-4 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/software-application-development-services-in-chennai" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <div className="space-y-2">
                <p className="text-gray-700 font-semibold py-2">Our Product</p>
                {productLinks.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="block pl-4 text-gray-700 hover:text-brand-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
              {/* <Link href="/clients" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Our Client
              </Link> */}
              <Link href="/team" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Team
              </Link>
              <Link href="/blog" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-brand-primary font-semibold transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col gap-3">
                <a href="tel:+918754236989" className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300">
                  <Phone className="w-4 h-4" />
                  <span>+91 87542 36989</span>
                </a>
                <a href="mailto:info@fueldigi.in" className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-[#6b0a1c] transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  <span>info@fueldigi.in</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for fixed navbar - only on home page */}
    </>
  )
}
