'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Shield, Cloud, Smartphone, Clock, MapPin as MapPinIcon, Calendar, Users, FileBarChart, IndianRupee, User,  Database, Lock, RefreshCw, Check, ArrowRight, GiftIcon, CheckCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const customStyles = `
  @keyframes flip-horizontal-once {
    0% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(180deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }
  .animate-flip-once {
    animation: flip-horizontal-once 0.8s ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: both;
  }
  @keyframes fadeInFromRight {
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes shimmer {
    0% {
      transform: translateX(-100%) skewX(-12deg);
    }
    100% {
      transform: translateX(200%) skewX(-12deg);
    }
  }
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
  .fade-bg {
    opacity: 0;
    animation: fadeInFromRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s forwards;
  }
  .fade-image {
    opacity: 0;
    animation: fadeInFromRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s forwards;
  }
`

export default function HRMSPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', companyName: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [countryCode, setCountryCode] = useState('+91')
  const [formErrors, setFormErrors] = useState<{ email?: string; phone?: string }>({})

  const countryCodes = [
    { code: '+91', digits: 10, label: '🇮🇳 +91' },
    { code: '+1', digits: 10, label: '🇺🇸 +1' },
    { code: '+44', digits: 10, label: '🇬🇧 +44' },
    { code: '+61', digits: 9, label: '🇦🇺 +61' },
    { code: '+971', digits: 9, label: '🇦🇪 +971' },
    { code: '+65', digits: 8, label: '🇸🇬 +65' },
    { code: '+60', digits: 9, label: '🇲🇾 +60' },
    { code: '+94', digits: 9, label: '🇱🇰 +94' },
  ]
  const selectedCountry = countryCodes.find(c => c.code === countryCode)!
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address'
  const validatePhone = (v: string) => {
    if (!v) return ''
    return v.replace(/\D/g, '').length === selectedCountry.digits ? '' : `Phone must be ${selectedCountry.digits} digits`
  }

  const [activeTab, setActiveTab] = useState('appointments')
  const [currentSlide, setCurrentSlide] = useState(0)
    
    const sliderImages = [
      '/assets/spa-client-management.png',
      '/assets/spa-management.png',
      '/assets/spa-software-development.png',
      '/assets/spa-booking-app.png',
      '/assets/spa-booking-system.png',
      '/assets/spa-app-software.png'
    ]

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
      }, 3000)
      return () => clearInterval(interval)
    }, [])
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const emailErr = validateEmail(formData.email)
      const phoneErr = validatePhone(formData.phone)
      if (emailErr || phoneErr) { setFormErrors({ email: emailErr, phone: phoneErr }); return }
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, phone: `${countryCode} ${formData.phone}`, product: 'Spa Booking' }),
        })
        const result = await response.json()
        if (result.success) {
          setFormData({ name: '', email: '', phone: '', companyName: '' })
          setFormErrors({})
          setShowModal(true)
        } else {
          alert('Failed to submit form. Please try again.')
        }
      } catch (error) {
        alert('Failed to submit form. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }

  const features = [
    { id: 'appointments', name: 'Online Appointments', icon: <Calendar className="w-6 h-6" />, points: ['Checking slot time availability', 'Prepared therapist appointments','Suits for rescheduling and cancellation options','Shared the Auto-mated SMS and Email confirmations','Easily track booking history.','Reduce workload and manual process.'], image: "/assets/spa-appointments.webp" },
    { id: 'pricing', name: 'Service & Pricing', icon: <IndianRupee className="w-6 h-6" />, points: ['Suits to make unlimited service categories','Easily fill in the Price details individually.','Easily add combo and package details.','Process the Seasonal offer management.'], image: "/assets/spa-service.webp" },
    { id: 'giftcards', name: 'Membership & Gift Cards', icon: <GiftIcon className="w-6 h-6" />, points: ['Support to manage clients membership plans.','Handle gift cards and purchases easily.','Tracking Cards duration and limits.'], image: "/assets/spa-membership.webp" },
    { id: 'customer', name: 'Customer Management', icon: <Users className="w-6 h-6" />, points: ['We have centeralized customer database.','Easily visible booking and payment history','It stores clients contact information.','Support to track the spa cards','With advanced and filter search, clients details.'], image: "/assets/spa-customer.webp" },
    { id: 'secure', name: 'Secure Payments', icon: <Shield className="w-6 h-6" />, points: ['It supports Debit, Credit Card, and UPI.','Fast and secure payment gateway integration','Easily and automatically generate invoices.','Efficiently review transaction history.','Effortless support for refund management.'], image: "/assets/spa-payments.webp" },
    { id: 'reports', name: 'Reports & Analytics', icon: <FileBarChart className="w-6 h-6" />, points: ['Estimate daily booking reports.','Tracking customized revenue reports.','Analysis of services-wise performance','Track branch-wise reports and revenue','Membership card reports and growth.','Easily export Data in Excel format.'], image: "/assets/spa-reports.webp" },
  ]

  const activeFeature = features.find(f => f.id === activeTab) || features[0]
  const [openIndex, setOpenIndex] = useState(0)

  const plans = [
    { name: "Starter Plan", subtitle: "For Single Location Spa", price: "₹4,999", period: "Per month", features: ["Appointment Management","Service Setup","Customer Database","Mobile & Web Access","Basic Reports","Email Support"], note: "Best for new and small spas.", highlighted: false, color: "bg-blue-500" },
    { name: "Growth Plan", subtitle: "For Multi-Branch Spas", price: "₹9,999", period: "Per month", features: ["Includes everything in Starter plus:","Membership & Gift Card Module","Advanced Reports","Multi-Branch Management","Role-Based Access","Priority Support"], note: "Best for growing spa businesses.", highlighted: true, color: "bg-gradient-to-br from-[#870d23] to-[#a01129]" },
    { name: "Enterprise Plan", subtitle: "Custom Pricing", price: "Custom", period: "For large wellness chains", features: ["Unlimited branches", "Custom integrations", "API access", "Dedicated account manager", "Advanced security controls", "Onboarding & training"], note: "Contact us for enterprise pricing.", highlighted: false, color: "bg-emerald-500" }
  ]

  const faqs = [
    { question: 'What is a spa booking app?', answer: 'A Fueldigi spa booking app of River Spa and Salon - Booking App is a digital platform that allows customers to book spa services online, select preferred time slots, make payments, and manage memberships.' },
    { question: 'Can I manage numerous spa branches with this software?', answer: 'Yes, Fueldigi custom spa management software supports multi-branch operations with centralized control.' },
    { question: 'Does this system help Indian payment gateways?', answer: 'Yes, it supports secure Indian debit/credit cards and digital payment integrations.' },
    { question: 'Is the spa booking software customizable?', answer: 'Yes, Fueldigi builds custom features, services, pricing, membership plans, workflows, and access roles that can be customized based on your business needs.' },
    { question: 'How secure is customer data?', answer: 'The complete data is kept on secure cloud servers with encryption and role-based access control.' },
    { question: 'Can I offer memberships and gift cards?', answer: 'Yes, the system includes full membership and gift card management modules.' },
  ]

  return (
    <div className="min-h-screen">
      <style>{customStyles}</style>
      <Navbar />

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl z-10" onClick={(e) => e.stopPropagation()}>
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
            <p className="text-gray-600 text-lg mb-6">Thank you for submitting the form. We will reach you soon!</p>
            <button onClick={() => setShowModal(false)} className="bg-[#870d23] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[#6b0a1c] transition-all duration-300 hover:scale-105">
              Close
            </button>
          </div>
        </div>
      )}
      <section className="relative min-h-screen overflow-hidden pt-20 md:pt-0">

        {/* Single H1 for SEO */}
        <h1 className="sr-only">Spa Booking Software in Chennai &amp; Spa Management App</h1>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden flex flex-col">
          {/* Content */}
          <div className="bg-white px-4 sm:px-6 py-6">
            <div className="text-center max-w-lg w-full mx-auto">
              <p className="text-3xl sm:text-4xl font-bold text-black mb-4 leading-tight">
                Spa Booking Software
                <span className="text-[#870d23]"> in Chennai </span>
                & Spa Management App
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white px-4 sm:px-6 py-2">
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-xl font-semibold text-gray-900 mb-4">Book a Free Demo</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => { setFormData({...formData, email: e.target.value}); setFormErrors(p => ({...p, email: validateEmail(e.target.value)})) }}
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23] focus:border-transparent ${formErrors.email ? 'border-red-400' : 'border-gray-300'}`}
                      required
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="flex gap-2">
                        <select value={countryCode} onChange={(e) => { setCountryCode(e.target.value); setFormData(f => ({...f, phone: ''})) }} className="px-2 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23] bg-white text-sm">
                          {countryCodes.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => { const d = e.target.value.replace(/\D/g,''); if(d.length <= selectedCountry.digits){ setFormData({...formData, phone: d}); setFormErrors(p => ({...p, phone: validatePhone(d)})) } }}
                          className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23] focus:border-transparent ${formErrors.phone ? 'border-red-400' : 'border-gray-300'}`}
                          required
                        />
                      </div>
                      {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23] focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#870d23] to-[#a01129] text-white font-semibold rounded-lg hover:from-[#a01129] hover:to-[#870d23] transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Booking Demo...' : 'Book a Demo'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Download App Buttons */}
          <div className="bg-white px-4 sm:px-6 py-6">
            <div className="max-w-lg mx-auto">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => window.open('https://apps.apple.com/us/app/river-salon-spa-booking/id6761760106', '_blank')}
                    className="flex items-center justify-center gap-2 px-3 py-3 bg-black text-white rounded-lg text-sm animate-flip-once"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Download for iOS
                  </button>
                  <button 
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.riverdayspa.booking&hl=en_IN', '_blank')}
                    className="flex items-center justify-center gap-2 px-3 py-3 bg-green-600 text-white rounded-lg text-sm animate-flip-once"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.793 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.395 12l2.303-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z"/>
                    </svg>
                    Download for Android
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Slider with Enhanced Indicators and Progress Bar */}
          <div className="pb-4">
            <div className="max-w-lg mx-auto">
              <div className="relative w-full h-[500px] sm:h-[550px]">
                <div className="absolute inset-0 bg-[#870d23] backdrop-blur-xl border border-[#870d23]/30 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden fade-image">
                  {/* Sliding Images Container */}
                  <div 
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {sliderImages.map((image, index) => (
                      <div
                        key={index}
                        className="w-full h-full flex-shrink-0 relative p-2"
                      >
                        <div className={`w-full h-full relative transition-all duration-1000 ${
                          index === currentSlide 
                            ? 'scale-100 opacity-100' 
                            : 'scale-95 opacity-70'
                        }`}>
                          <img
                            src={image}
                            alt={`HRMS Feature ${index + 1}`}
                            className="w-full h-full object-contain transition-all duration-1000 hover:scale-105 filter drop-shadow-2xl"
                          />
                          
                          {/* Image Overlay Effects */}
                          <div className={`absolute inset-0 bg-gradient-to-t from-[#870d23]/20 to-transparent rounded-2xl transition-opacity duration-500 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                          }`}></div>
                          
                          {/* Shimmer Effect on Active Image */}
                          {index === currentSlide && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced Floating Animation Elements */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/15 rounded-full animate-bounce shadow-md" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/2 left-3 w-6 h-6 bg-white/10 rounded-full animate-pulse shadow-sm"></div>
                  <div className="absolute top-1/4 right-3 w-4 h-4 bg-white/25 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                  
                  {/* Rotating Background Elements */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                  <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-white/5 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                  
                  {/* Enhanced Navigation Arrows */}
                  <button 
                    onClick={() => setCurrentSlide(currentSlide === 0 ? sliderImages.length - 1 : currentSlide - 1)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/25 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all duration-300 hover:scale-110 shadow-xl border border-white/20 group z-10"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setCurrentSlide(currentSlide === sliderImages.length - 1 ? 0 : currentSlide + 1)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/25 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all duration-300 hover:scale-110 shadow-xl border border-white/20 group z-10"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Indicators + Progress Bar inside slider */}
                  <div className="absolute bottom-4 left-0 right-0 px-5 z-10">
                    <div className="flex justify-center items-center gap-2 mb-2">
                      {sliderImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`relative transition-all duration-500 ${
                            index === currentSlide
                              ? 'w-8 h-3 bg-white rounded-full shadow-lg'
                              : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/70'
                          }`}
                        >
                          {index === currentSlide && (
                            <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50 scale-150"></div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-700 ease-out relative"
                        style={{ width: `${((currentSlide + 1) / sliderImages.length) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden lg:grid min-h-screen" style={{ gridTemplateColumns: '70% 30%' }}>
          {/* Left Content - White Background (70%) */}
          <div className="bg-white flex items-center justify-center px-12 py-16">
            <div className="w-full max-w-5xl">
              {/* Header Section with Proper Spacing */}
              <p className="text-5xl font-bold text-black leading-tight mb-12">
                Spa Booking Software
                <span className="text-[#870d23]"> in Chennai </span>
                & Spa Management App
              </p>
              {/* 3-column: Points | Download Buttons | Form */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">

                {/* Column 1 - Glassmorphism Feature Points Box */}
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(135,13,35,0.15)] overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-[#870d23]/5 rounded-2xl"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#870d23]/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  <div className="relative z-10 space-y-4">
                    {[
                      { icon: <Cloud className="w-4 h-4" />, label: 'Cloud-Based Spa Management Software' },
                      { icon: <User className="w-4 h-4" />, label: 'Custom Role-Based Secure Access' },
                      { icon: <Smartphone className="w-4 h-4" />, label: 'Easily Handle Multi-Branch Support' },
                      { icon: <MapPinIcon className="w-4 h-4" />, label: 'Intergrate Secure Indian Payment Gateway' },
                      { icon: <Smartphone className="w-4 h-4" />, label: 'Mobile and Web Booking Systems' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 group hover:scale-105 transition-all duration-300">
                        <div className="bg-gradient-to-br from-[#870d23] to-[#a01129] text-white p-2.5 rounded-xl shadow-lg group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-gray-800 font-semibold text-sm group-hover:text-[#870d23] transition-colors duration-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 - Centered Download Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 px-2 h-full">
                  {/* Animated divider line top */}
                  <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#870d23]/30 to-[#870d23]/60"></div>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => window.open('https://apps.apple.com/us/app/river-salon-spa-booking/id6761760106', '_blank')}
                      className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl text-xs font-medium animate-flip-once hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      iOS
                    </button>
                    <button
                      onClick={() => window.open('https://play.google.com/store/apps/details?id=com.riverdayspa.booking&hl=en_IN', '_blank')}
                      className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-xs font-medium animate-flip-once hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.609 1.814L13.793 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.395 12l2.303-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z"/>
                      </svg>
                      Android
                    </button>
                  </div>

                  {/* Animated divider line bottom */}
                  <div className="w-px flex-1 bg-gradient-to-b from-[#870d23]/60 via-[#870d23]/30 to-transparent"></div>
                </div>

                {/* Column 3 - Glassmorphism Form */}
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(135,13,35,0.15)] overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-tl from-white/15 via-white/5 to-[#870d23]/5 rounded-2xl"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 bg-[#870d23]/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  <div className="relative z-10">
                    <p className="text-base font-bold text-gray-900 mb-4 text-center">Book a Free Demo</p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2.5 bg-white/20 backdrop-blur-md border border-white/25 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23]/40 focus:bg-white/30 transition-all duration-300 placeholder-gray-500 text-gray-900 text-sm"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => { setFormData({...formData, email: e.target.value}); setFormErrors(p => ({...p, email: validateEmail(e.target.value)})) }}
                        className={`w-full px-3 py-2.5 bg-white/20 backdrop-blur-md border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23]/40 focus:bg-white/30 transition-all duration-300 placeholder-gray-500 text-gray-900 text-sm ${formErrors.email ? 'border-red-400' : 'border-white/25'}`}
                        required
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                      <div className="flex gap-1">
                        <select value={countryCode} onChange={(e) => { setCountryCode(e.target.value); setFormData(f => ({...f, phone: ''})) }} className="px-1 py-2.5 bg-white/20 backdrop-blur-md border border-white/25 rounded-lg focus:outline-none text-gray-900 text-xs">
                          {countryCodes.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                        </select>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => { const d = e.target.value.replace(/\D/g,''); if(d.length <= selectedCountry.digits){ setFormData({...formData, phone: d}); setFormErrors(p => ({...p, phone: validatePhone(d)})) } }}
                          className={`flex-1 px-3 py-2.5 bg-white/20 backdrop-blur-md border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23]/40 focus:bg-white/30 transition-all duration-300 placeholder-gray-500 text-gray-900 text-sm ${formErrors.phone ? 'border-red-400' : 'border-white/25'}`}
                          required
                        />
                      </div>
                      {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full px-3 py-2.5 bg-white/20 backdrop-blur-md border border-white/25 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#870d23]/40 focus:bg-white/30 transition-all duration-300 placeholder-gray-500 text-gray-900 text-sm"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 bg-gradient-to-r from-[#870d23] to-[#a01129] text-white font-bold rounded-lg hover:from-[#a01129] hover:to-[#870d23] hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 text-sm"
                      >
                        {isSubmitting ? 'Booking...' : 'Book a Demo'}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Content - Brand Color Background with Image Slider (30%) */}
          <div className="bg-[#870d23] flex items-center justify-center p-6 fade-bg min-h-screen relative overflow-hidden" style={{ borderTopLeftRadius: '20%', borderBottomLeftRadius: '20%' }}>
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Auto Sliding Images with Animations */}
              <div className="relative w-full h-[500px] flex items-center justify-center mb-8">
                {sliderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      index === currentSlide 
                        ? 'opacity-100 scale-100 rotate-0' 
                        : 'opacity-0 scale-95 rotate-3'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`HRMS Feature ${index + 1}`}
                      className="w-full h-full object-contain rounded-2xl shadow-2xl"
                    />
                  </div>
                ))}
                
                {/* Floating Animation Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/15 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -left-6 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
              </div>
              
              {/* Slider Indicators */}
              <div className="flex space-x-3 mb-4">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentSlide 
                        ? 'bg-white shadow-lg scale-110' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              
              {/* Progress Bar */}
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentSlide + 1) / sliderImages.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#870d23]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#870d23]/3 rounded-full blur-2xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-3xl lg:text-4xl font-bold text-[#870d23] mb-4">Essential Characteristics of Fueldigi Spa Booking App</p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to manage your spa business efficiently</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === feature.id
                    ? 'shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff] bg-gradient-to-r from-[#870d23] to-[#a01129] text-white'
                    : 'shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] bg-gray-50 text-gray-700 hover:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    activeTab === feature.id ? 'text-white' : 'text-[#870d23]'
                  }`}>
                    {feature.icon}
                  </div>
                  <span className="hidden sm:inline">{feature.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Content Display */}
          <div className="p-8 bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] min-h-[400px] max-w-5xl mx-auto" style={{ borderRadius: '15%' }}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="pr-6 flex justify-center">
                <div className="max-w-md">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-[#870d23] to-[#a01129] text-white p-3 rounded-2xl shadow-xl transform hover:rotate-6 transition-all duration-300">
                      {activeFeature.icon}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{activeFeature.name}</p>
                  </div>
                  <ul className="space-y-4">
                    {activeFeature.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-[#870d23] group-hover:text-[#a01129]" />
                        </div>
                        <span className="text-gray-800 leading-relaxed group-hover:text-[#870d23] transition-colors duration-300 text-lg">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Right Side */}
              <div className="relative flex items-center justify-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#870d23]/20 to-[#a01129]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                    <img 
                      src={activeFeature.image} 
                      alt={activeFeature.name} 
                      className="w-full h-96 aspect-[9/16] object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-full opacity-20 group-hover:scale-125 transition-all duration-500"></div>
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-full opacity-10 group-hover:scale-150 transition-all duration-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#870d23]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#870d23] mt-3 mb-6">About Fueldigi Spa Booking App & Management Software</h2>
              <p className="text-black leading-relaxed mb-4 text-justify">Spa management software in Chennai is built with a SaaS-based platform to improve the spa's daily booking and sales operations smoothly.</p>
              <p className="text-black leading-relaxed mb-6 text-justify">This online appointment booking app supports handling and tracking of membership, gift cards, and appointments in one dashboard. Through this, <a href="https://www.fueldigi.in/software-application-development-services-in-chennai" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">SaaS development</a> contains multiple options and solutions.</p>
              <p className="font-semibold text-gray-900 mb-4 text-lg">Under one app handle multiple branches:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  'Easily separate data securely.',
                  'Get the centralized reports for all branches.',
                  'You can access with a subscription-based',
                  'It is suitable for all kinds of luxury centers.',
                  'Spa and Salon-based chains in one place.',
                  'It is suitable for Ayurvedic treatment centers.',
                ].map((point, idx) => (
                  <div key={idx} className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-[0_4px_16px_0_rgba(135,13,35,0.10)] overflow-hidden group hover:scale-105 hover:bg-white/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#870d23]/5 rounded-xl"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#870d23] to-[#a01129] flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-800 text-sm font-medium group-hover:text-[#870d23] transition-colors duration-300">{point}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 lg:h-[550px]">
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                <img src="/assets/spa-booking-software.webp" alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-2xl opacity-20" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-full opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#870d23]">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Why Choose Fueldigi Spa Booking Software in Chennai?</h3>
              <div className="space-y-4 text-lg text-white/90 text-justify leading-relaxed">
                <p>It was built for Indian Spa Businesses, completely designed for Indian wellness and beauty brands in the markets to handle service information effortlessly in a secure way. We are offering support with local payment integrations and operational flexibility.</p>
                <p>Fueldigi booking app is a match for single to multi-branch & franchise support. It contains multiple logins based on position and category. The business dashboards thought is based on the login approval.</p>
                <p><a href="https://www.fueldigi.in/" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">Fueldigi booking app</a> reduces operational work by 60%+ and helps to manage features such as customers, automate bookings, confirmations, and notifications</p>
                <p>We develop the app with a unique UI design and make it easy for Non-Technical Staff.</p>
                <p className="font-semibold text-white">Easy UI with quick onboarding and training.</p>
              </div>
              <div className="pt-4">
                <p className="text-xl font-bold text-[#f59e0b] mb-4">Fully Customizable Solution</p>
                <p className="text-white/90 text-lg">Customize services, workflows, pricing models, memberships, and offers based on your business requirements.</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-bold text-white mb-6">Business Benefits of Using Our Spa Management Software</p>
              {[
                "Reduce operational costs",
                "Increase online bookings",
                "Improve customer transparency",
                "Centralized appointment tracking",
                "Higher customer retention",
                "Real-time business visibility",
                "Scalable SaaS infrastructure",
                "Secure cloud data storage"
              ].map((benefit, idx) => (
                <div key={idx} className="group bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#870d23] to-[#f59e0b] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Check className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="font-semibold text-white">{benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Architecture */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-4xl lg:text-5xl font-bold text-[#870d23] text-center mb-6">Cloud-Based SaaS Architecture</p>
          <p className="text-xl text-black text-center mb-12 max-w-3xl mx-auto">Our <b>Spa Booking SaaS Platform</b> is designed to grow with your business.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Database className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Multi-branch support</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Lock className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Secure tenant data isolation</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Cloud className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Automatic backup</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <RefreshCw className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Scalable infrastructure</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Clock className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Subscription-based pricing model</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Shield className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Centralized control</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h4 className="text-2xl md:text-3xl font-bold text-[#870d23] mt-3">Pricing Plans for Spa Booking Software</h4>
            <p className="text-gray-600 mt-3 max-w-lg mx-auto">Choose the best plan based on your spa size and business needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-3xl p-8 relative ${plan.highlighted ? "bg-gradient-to-br from-[#870d23] to-[#a01129] text-white scale-105 shadow-2xl z-10" : "bg-white text-gray-900 border border-gray-200 shadow-lg"}`}>
                {plan.highlighted && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#870d23] text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>}
                <div className={`w-3 h-3 rounded-full ${plan.color} mb-4`} />
                <p className="text-xl font-bold">{plan.name}</p>
                <p className={`text-sm ${plan.highlighted ? "text-white/70" : "text-gray-600"} mb-4`}>{plan.subtitle}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ml-2 ${plan.highlighted ? "text-white/70" : "text-gray-600"}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 shrink-0 ${plan.highlighted ? "text-white" : "text-[#870d23]"}`} />{f}
                    </li>
                  ))}
                </ul>
                <p className={`text-xs mb-5 ${plan.highlighted ? "text-white/60" : "text-gray-600"}`}>{plan.note}</p>
                <button onClick={() => router.push('/hrms/payment')} className={`w-full rounded-xl h-12 font-bold transition-all duration-300 ${plan.highlighted ? "bg-white text-[#870d23] hover:bg-gray-100" : "bg-gradient-to-br from-[#870d23] to-[#a01129] text-white"}`}>Choose Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
     <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h5 className="text-2xl lg:text-3xl font-bold mb-6 text-primary">
              Frequently Asked Questions
            </h5>
          </div>

          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl neumorphic px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-brand-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-black">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#870d23] via-[#a01129] to-[#6b0a1c]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMlMwIDIyLjYyNyAwIDE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute top-0 left-0">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z" fill="white" />
        </svg>
        <div className="container mx-auto px-4 relative z-10 mt-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Live in 24 hours — simple and easy setup</span>
                </div>
              </div>
            </div>
            <p className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">Tackle Your Online Spa Booking System Today</p>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed">Smart way to increase online appointments, reduce manual work, and grow your spa business with our powerful <b>Spa Booking App & Spa Management Software in Chennai, India</b>.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.riverdayspa.booking', '_blank')} className="group bg-white hover:bg-gray-100 text-[#870d23] font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/30 flex items-center gap-3">
                <span className="text-lg">Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-transparent border-2 border-white hover:bg-white hover:text-[#870d23] text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg">Book Demo</button>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-3xl font-bold text-white mb-2">24h</p>
                <p className="text-white/80">Quick Setup</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-3xl font-bold text-white mb-2">100%</p>
                <p className="text-white/80">Secure Platform</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-3xl font-bold text-white mb-2">24/7</p>
                <p className="text-white/80">Support Available</p>
              </div>
            </div>
             <div className="mt-8 flex items-center justify-center gap-4 text-white/80 text-sm">
              <a href="/spa-booking/privacy-policy" className="font-bold hover:text-white transition-colors duration-300">Privacy Policy</a>
              <span>|</span>
              <a href="/spa-booking/deletion-policy" className="font-bold hover:text-white transition-colors duration-300">Delete Policy</a>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full absolute bottom-0 left-0">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#870d23" />
        </svg>
      </section>

      
    </div>
  )
}