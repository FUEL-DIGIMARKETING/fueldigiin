'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Shield, Cloud, Smartphone, MapPin, Clock, CheckCircle, MapPin as MapPinIcon, Calendar, DollarSign, FileText, Users, Settings, FileBarChart, IndianRupee, User, UserCheck, Crown, Database, Lock, RefreshCw, TrendingUp, Zap, BarChart, Building2, Gauge, Monitor, Rocket, Check, ArrowRight, ChevronDown, CalendarOff, Wallet, Bell, Star, Flower, Target, Headphones, Building, Stethoscope, Wrench, Factory } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Add custom CSS for animations
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
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 8px 2px rgba(135,13,35,0.5), 0 4px 15px rgba(135,13,35,0.4); }
    50% { box-shadow: 0 0 20px 6px rgba(135,13,35,0.8), 0 8px 25px rgba(135,13,35,0.6); }
  }
  .btn-get-started {
    position: relative;
    overflow: hidden;
    background: linear-gradient(270deg, #870d23, #c0152e, #a01129, #6b0a1c);
    background-size: 300% 300%;
    animation: gradientShift 3s ease infinite, pulseGlow 2s ease-in-out infinite;
    transition: transform 0.3s ease, letter-spacing 0.3s ease;
  }
  .btn-get-started::before {
    content: '';
    position: absolute;
    top: 0; left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: skewX(-20deg);
    animation: shimmer 2.5s ease-in-out infinite;
  }
  .btn-get-started:hover {
    transform: scale(1.07);
    letter-spacing: 0.5px;
  }
  .btn-get-started-highlighted {
    position: relative;
    overflow: hidden;
    background: white;
    animation: pulseGlow 2s ease-in-out infinite;
    transition: transform 0.3s ease;
  }
  .btn-get-started-highlighted::before {
    content: '';
    position: absolute;
    top: 0; left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(135,13,35,0.15), transparent);
    transform: skewX(-20deg);
    animation: shimmer 2.5s ease-in-out infinite;
  }
  .btn-get-started-highlighted:hover {
    transform: scale(1.07);
    background: #f3f4f6;
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

export default function CRMPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', companyName: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [countryCode, setCountryCode] = useState('+91')
  const [formErrors, setFormErrors] = useState<{ email?: string; phone?: string }>({})
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

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

  const [activeTab, setActiveTab] = useState('leads')
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const sliderImages = [
    '/assets/crm-development-services.png',
    '/assets/crm-software-development-company-in-chennai.png',
    '/assets/custom-crm-Software-development-company-in-chennai.png',
    '/assets/crm-development-company-in-chennai.png',
    '/assets/crm-software-development.png',
    '/assets/custom-crm-software-development.png',
  ]
  
  // Auto slider effect
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
        body: JSON.stringify({ ...formData, phone: `${countryCode} ${formData.phone}`, product: 'CRM' }),
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

  const [openIndex, setOpenIndex] = useState(0)

  const plans = [
    { name: "Starter Plan", price: "₹1,000", period: "/ month", subtitle: ["Platform Fee: ₹1,000/month", "Extra Users: ₹500/user/month", "Lead Limit: 1,000 (₹1/extra lead)", "Users Included: Up to 3", "Facebook Pages: 1"], features: ["Telecalling page with call logging","Basic reporting & analytics","Email integration","Role-based permission management","Call tracking (calls made, converted)","Team management","Calendar integration","Mobile app access"], lockedFeatures: ["Cold case management","Facebook lead integration","Advanced reporting & dashboards","Follow-up tracker"], note: "Best for startups and small sales teams.", highlighted: false, color: "bg-blue-500" },
    { name: "Professional Plan", price: "₹2,500", period: "/ month", subtitle: ["Platform Fee: ₹2,500/month","Extra Users: ₹1,000/user/month","Lead Limit: 2,500 (₹1/extra lead)","Users Included: Up to 8","Facebook Pages: 2"], features: ["All Starter Plan features","Facebook lead integration (2 pages)","Cold case management","Automated reminders & follow-ups","Advanced reporting & dashboards","24/7 customer support","Onboarding & training assistance"], lockedFeatures: ["Follow-up tracker","Import/Export functionality", "Advanced analytics & insights", "Team performance analytics"], note: "Best for growing sales organizations.", highlighted: true, color: "bg-gradient-to-br from-[#870d23] to-[#a01129]" },
    { name: "Enterprise Plan", price: "₹4,000", period: "/ month", subtitle: ["Platform Fee: ₹4,000/month","Extra Users: ₹1,500/user/month","Lead Limit: Unlimited","Users Included: 12 included","Facebook Pages: 5"], features: ["All Professional Plan features","Facebook integration (up to 5 pages)","Advanced analytics & insights","Follow-up tracker with automation","Import/Export functionality","Custom fields & workflows","Priority support","Team performance analytics","Bulk operations","Work Progress Tracking","Usage Dashboard"], note: "Contact sales for customized pricing.", highlighted: false, color: "bg-emerald-500" }
  ]

  const yearlyPlans = [
    { name: "Starter Plan", price: "₹11,400", period: "/ year", saving: "Save 5% ≈ ₹600", subtitle: ["Platform Fee: ₹1000/month (₹950/month)", "Extra Users: ₹500/user/month", "Lead Limit: 1000 (₹1/extra lead)", "Users Included: Up to 3", "Facebook Pages: 1"], features: ["Telecalling page with call logging","Basic reporting & analytics","Email integration","Role-based permission management","Call tracking (calls made, converted)","Team management","Calendar integration","Mobile app access"], lockedFeatures: ["Cold case management","Facebook lead integration","Advanced reporting & dashboards","Follow-up tracker"], note: "Best for startups and small sales teams.", highlighted: false, color: "bg-blue-500" },
    { name: "Professional Plan", price: "₹27,000", period: "/ year", saving: "Save 10% ≈ ₹3,000", subtitle: ["Platform Fee: ₹2500/month (₹2,250/month)", "Extra Users: ₹1000/user/month", "Lead Limit: 2500 (₹1/extra lead)", "Users Included: Up to 8", "Facebook Pages: 2"], features: ["All Starter Plan features","Facebook lead integration (2 pages)","Cold case management","Automated reminders & follow-ups","Advanced reporting & dashboards","24/7 customer support","Onboarding & training assistance"], lockedFeatures: ["Follow-up tracker","Import/Export functionality", "Advanced analytics & insights", "Team performance analytics"], note: "Best for growing sales organizations.", highlighted: true, color: "bg-gradient-to-br from-[#870d23] to-[#a01129]" },
    { name: "Enterprise Plan", price: "₹40,800", period: "/ year", saving: "Save 15% ≈ ₹7,200", subtitle: ["Platform Fee: ₹4000/month (₹3,400/month)", "Extra Users: ₹1500/user/month", "Lead Limit: Unlimited", "Users Included: 12 included", "Facebook Pages: 5"], features: ["All Professional Plan features","Facebook integration (up to 5 pages)","Advanced analytics & insights","Follow-up tracker with automation","Import/Export functionality","Custom fields & workflows","Priority support","Team performance analytics","Bulk operations","Work Progress Tracking","Usage Dashboard"], note: "Contact sales for customized pricing.", highlighted: false, color: "bg-emerald-500" }
  ]

  const activePlans = billingCycle === 'monthly' ? plans : yearlyPlans

  const faqs = [
    { question: 'What is Fueldigi CRM software used for?', answer: 'Fueldigi CRM software is used to manage client relationships, track leads, automate sales processes, and enhance business communication seamlessly through API integration.' },
    { question: 'How does Fueldigi CRM App help businesses grow?', answer: 'Fueldigi CRM App systems collect customer data, automate workflows, and deliver analytics in custom data options that help businesses improve sales and customer engagement.' },
    { question: 'Is FuelDigi CRM suitable for small businesses?', answer: 'Yes, our team designed Fueldigi CRM is suitable for startups, small businesses, and enterprises with customizable modules for various enterprises.' },
    { question: 'Can CRM integrate with Facebook leads?', answer: 'Yes, FuelDigi CRM combines with the Facebook Graph API to collect and manage leads developed from Meta advertising campaigns. It is easy to connect with the client immediately without delay.' },
    { question: 'Does FuelDigi CRM support mobile access?', answer: 'Yes, the FuelDigi CRM App allows companies to manage customers, leads, and appointments directly from their mobile devices. We have launched our app Play Store. Users can download the app from their.' },
  ]

  const crmTabs = [
    {
      name: 'Lead CRM System for Smart Lead Management',
      role: 'Lead CRM',
      description: 'Fueldigi Lead CRM captures, tracks, monitors, and converts leads easily via data-driven insights. It supports the sales to monitor leads, follow-ups, analyze pipelines, and conversions.',
      featuresTitle: 'Key Features: Lead CRM and Benefits for Business',
      features: [
        'Using advanced analytics dashboards for lead tracking.',
        'Easily monitor initial contact to final conversion of lead data.',
        'Used smart lead scoring to analyze engagements.',
        'Supports sales productivity and conversion rates.',
      ],
      idealFor: 'The Lead CRM app is ideal for service oriented business, real estate, sales teams, and others.',
    },
    {
      name: 'Spa CRM Software for Spa & Salon Management',
      role: 'Spa CRM',
      description: 'Spa CRM system offered by Fueldigi helps spa owners manage appointments, customer profiles, and service records efficiently. It is suitable for a spa wellness & salon center that requires proper scheduling and customer management. We are offering proper scheduling and customer management support via the Fueldigi CRM App.',
      featuresTitle: 'Key Features: Spa CRM and Benefits for Spa Business',
      features: [
        'Managing client appointment scheduling easily.',
        'Maintaining detailed client profile management.',
        'Reduce your client appointment with automated reminders.',
        'Enhances customer wellness and delight',
      ],
      idealFor: 'Our Fueldigi CRM App suits spas, salons, wellness centers, beauty clinics, and hospitals.',
    },
    {
      name: 'Telecalling CRM Software for Call Centers',
      role: 'Telecalling CRM',
      description: 'The Fueldigi CRM app is highly supported for the Telecalling team. It is deisgned under the structure of using telesales and call centers. Here, you can manage business calls, track, follow-ups, and reminders efficiently.',
      featuresTitle: 'Key Features: Lead CRM and Benefits for Business',
      features: [
        'Automated dialer support reduces manual processes.',
        'Contain call recording quality monitoring, training, and customer support.',
        'Analyze team performance custom basis with dashboards.',
        'Highly manage and optimize telecall operations.',
      ],
      idealFor: 'The Fueldigi Tele CRM App helps telesales departments in any field, call centers, and customer support teams.',
    },
  ]

  return (
    <div className="min-h-screen">
      <style jsx>{customStyles}</style>
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
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-20 md:pt-0">

        {/* Single H1 for SEO - shared across mobile and desktop */}
        <h1 className="sr-only">Custom CRM Development in Chennai - FuelDigi CRM App for Business Growth</h1>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden flex flex-col">
          {/* Content */}
          <div className="bg-white px-4 sm:px-6 py-6">
            <div className="text-center max-w-lg w-full mx-auto">
              <div className="mb-3">
                <span className="text-orange-500 font-semibold text-lg">Smart CRM App</span>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-4 leading-tight">
                CRM Development Company
                <span className="text-[#870d23]"> in Chennai </span>
                - FuelDigi CRM App for Business Automation
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white px-4 sm:px-6 py-2">
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-xl font-semibold text-gray-900 mb-4">Book a Free CRM Demo</p>
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
                    onClick={() => window.open('https://apps.apple.com/us/app/fueldigi-crm-sales-leads/id6761998951', '_blank')}
                    className="flex items-center justify-center gap-2 px-3 py-3 bg-black text-white rounded-lg text-sm animate-flip-once"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Download for iOS
                  </button>
                  <button 
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fueldigi.crmapp&hl=en_IN', '_blank')}
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
             <p className="text-3xl sm:text-4xl font-bold text-black mb-4 leading-tight">
               CRM Development Company
                <span className="text-[#870d23]"> in Chennai </span>
                - FuelDigi CRM App for Business Automation
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
                      { icon: <Shield className="w-4 h-4" />, label: 'Role-Based Secure Access' },
                      { icon: <Cloud className="w-4 h-4" />, label: 'Cloud-Based SaaS Platform' },
                      { icon: <Smartphone className="w-4 h-4" />, label: 'Mobile + Web Access' },
                      { icon: <TrendingUp className="w-4 h-4" />, label: 'Sales Pipeline Management' },
                      { icon: <Zap className="w-4 h-4" />, label: 'End-to-End Business Automation' },
                      { icon: <Users className="w-4 h-4" />, label: 'Spa, Salon, Agency & More' },
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
                      onClick={() => window.open('https://apps.apple.com/us/app/fueldigi-crm-sales-leads/id6761998951', '_blank')}
                      className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl text-xs font-medium animate-flip-once hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      iOS
                    </button>
                    <button
                      onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fueldigi.crmapp&hl=en_IN', '_blank')}
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
                    <p className="text-xl font-bold text-gray-900 mb-4 text-center">Book a Free CRM Demo</p>
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

      {/* About Section */}
      <section className="py-6 bg-white relative overflow-hidden mt-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#870d23]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-black leading-relaxed mb-4 text-justify">Nowadays, are you still managing leads, calls, and follow-ups manually? Stop now onwards! Get a custom <a href="https://www.fueldigi.in/" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">CRM development in Chennai</a> to meet your needs. It supports boosting business from a slowdown to a high with simplified customer relationship management and streamlined business operations.</p>
              <p className="text-black leading-relaxed mb-4 text-justify">Start with Fueldigi CRM App to manage customers, leads, appointments, sales processing, follow-ups, and reminders. It captures leads, manages clients, schedules appointments, tracks sales and business performance, and automates follow-ups based on the input fed.</p>
              <p className="text-black leading-relaxed text-justify">You are running any kind of business, such as a spa, salon, restaurant, hotel, agency, or other. The Fueldigi CRM app helps get a sales-driven business with complete tracking and report exporting. This tool drives customer relationships efficiently and enhances productivity. It contains advanced analytics, automation features, and a seamless integration process. Download the <a href="https://play.google.com/store/apps/details?id=com.fueldigi.crmapp&hl=en_IN">Fueldigi CRM App</a> from the Play Store and enable business with high customer engagement, boost conversion, and streamline operations flawlessly.</p>
            </div>
            <div className="relative h-96">
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                <img src="/assets/crm-software-development-in-chennai.webp" alt="FuelDigi CRM Platform" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-2xl opacity-20" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-full opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CRM Types Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#870d23]">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Heading & Paragraph */}
          <div className="text-center mb-10 max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What is FuelDigi CRM?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">Fueldigi CRM software is completely designed with the structure of helping businesses manage customer relationships in the form of lead handling, customer appointments, and sales processes. This platform has tracking, telecalling management, appointment scheduling, and automation tools to improve business operations, monitor performance, track client interaction, and automate business workflow.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            {crmTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setOpenIndex(idx)}
                className={`px-6 py-3 rounded-2xl font-semibold text-sm lg:text-base transition-all duration-300 ${
                  openIndex === idx
                    ? 'bg-[#870d23] text-white shadow-lg'
                    : 'bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.role}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-12 max-w-6xl mx-auto shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left - Description */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <p className="text-xl lg:text-2xl font-bold text-white mb-4">{crmTabs[openIndex].name}</p>
                <p className="text-white text-base lg:text-lg leading-relaxed">{crmTabs[openIndex].description}</p>
              </div>
              {/* Right - Key Features */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <p className="text-lg font-bold text-[#ffcf3e] mb-4">{crmTabs[openIndex].featuresTitle}</p>
                <ul className="space-y-3">
                  {crmTabs[openIndex].features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#870d23] to-[#f59e0b] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mt-0.5">
                        <Check className="w-4 h-4 text-gray-900" />
                      </div>
                      <span className="text-white text-sm lg:text-base">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Bottom - Ideal For */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white text-sm lg:text-base italic">{crmTabs[openIndex].idealFor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FuelDigi CRM Software in Chennai Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#870d23]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#870d23]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left - Text Content */}
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Chennai's #1 CRM</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-3 mb-5 leading-tight">
                FuelDigi CRM Software
                <span className="text-[#870d23]"> in Chennai</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
               Fueldigi CRM Software is designed with current technology to support modern businesses in handling processes easily and flawlessly. Our centralized process stores customer data for managing, interacting, follow-up booking, and reminders. This app has permission to view sales performance, conversions, and team productivity. Our <a href="https://www.fueldigi.in/software-application-development-services-in-chennai" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">Mobile CRM App</a> can be used anytime and anywhere installed on the Play Store. Download now or build a custom CRM to grow your business without struggle.
              </p>
              {/* Download Buttons Row */}
              <div className="inline-flex items-center gap-3 rounded-2xl p-2" style={{background: 'linear-gradient(135deg, #EA433520 0%, #4285F420 35%, #34A85320 65%, #FBBC0420 100%)', border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(66,133,244,0.1)'}}>
                {/* Google Play - Left */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.fueldigi.crmapp&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2.5 text-white pl-3 pr-5 py-2.5 rounded-xl hover:scale-105 transition-all duration-300 shadow-md overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'}}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #EA433530, #4285F430, #34A85330, #FBBC0430)'}} />
                  <svg className="w-6 h-6 flex-shrink-0 relative z-10" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.76a2 2 0 0 0 2.08-.22l12.2-7.06-2.88-2.88L3.18 23.76z" fill="#EA4335"/>
                    <path d="M20.82 9.6A2 2 0 0 0 20 8l-2.54-1.46-3.2 3.2 3.2 3.2L20 11.48a2 2 0 0 0 .82-1.88z" fill="#FBBC04"/>
                    <path d="M3.18.24C2.74.5 2.5 1 2.5 1.6v20.8c0 .6.24 1.1.68 1.36l.1.06 11.66-11.66v-.28L3.18.24z" fill="#4285F4"/>
                    <path d="M14.94 12.12l3.32-3.32-12.2-7.06a2 2 0 0 0-2.08-.22l11.96 10.6z" fill="#34A853"/>
                  </svg>
                  <div className="relative z-10 leading-tight">
                    <p className="text-[9px] text-gray-400">Play Store</p>
                    <p className="text-sm font-bold">Android</p>
                  </div>
                </a>

                {/* Center Label */}
                <div className="text-center px-1">
                  <p className="text-[10px] text-black font-semibold uppercase tracking-widest leading-none mb-0.5">Available on</p>
                  <p className="text-xs font-bold text-gray-700 leading-tight whitespace-nowrap">Get it on Store</p>
                </div>

                {/* App Store - Right */}
                <a
                  href="https://apps.apple.com/us/app/fueldigi-crm-sales-leads/id6761998951"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2.5 text-white pl-3 pr-5 py-2.5 rounded-xl hover:scale-105 transition-all duration-300 shadow-md overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg className="w-6 h-6 flex-shrink-0 relative z-10" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="relative z-10 leading-tight">
                    <p className="text-[9px] text-gray-400">App Store</p>
                    <p className="text-sm font-bold">iOS</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right - Why Choose Card */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#f59e0b]/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#870d23]/10 rounded-full blur-lg" />
              <div className="bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-3xl p-8 shadow-2xl relative z-10">
                <p className="text-white/70 text-sm uppercase tracking-widest mb-1">Our Strengths</p>
                <h4 className="text-2xl font-bold text-white mb-3">Why Choose FuelDigi CRM?</h4>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  We support increasing your business with seamless features and design for a reliable and scalable solution through the Fueldigi CRM app to handle leads, sales, and calls.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: <Rocket className="w-5 h-5" />, text: 'Fueldigi CRM App is Proven Expertise' },
                    { icon: <Zap className="w-5 h-5" />, text: 'End-to-End Business Automation' },
                    { icon: <Settings className="w-5 h-5" />, text: 'Seamless Integration with Fueldigi CRM' },
                    { icon: <TrendingUp className="w-5 h-5" />, text: 'Scalable Business Solutions for business development' },
                    { icon: <Monitor className="w-5 h-5" />, text: 'Enrich Business Efficiency with modern tech' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#f59e0b] flex-shrink-0 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                        {item.icon}
                      </div>
                      <span className="text-white font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SaaS Architecture */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-4xl lg:text-5xl font-bold text-[#870d23] text-center mb-6">Industries That Can Use FuelDigi CRM</p>
          <p className="text-xl text-black text-center mb-12 max-w-3xl mx-auto">Our App feature will suit various industries, such as:y</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Flower className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Spa and salon businesses</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <TrendingUp className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Digital marketing agencies</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Target className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Sales and marketing teams</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Headphones className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Call centers and telecalling teams</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Building className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Real estate companies</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Stethoscope className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Healthcare clinics</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Wrench className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Service-based companies</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Factory className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Small and medium industries</p>
            </div>
          </div>
        </div>
      </section>

{/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#870d23]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#870d23]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h4 className="text-2xl md:text-3xl font-bold text-[#870d23] mt-3">CRM in Chennai Pricing Plan</h4>
            <p className="text-gray-600 mt-3 max-w-lg mx-auto">No hidden charges. No long-term contracts. Save more with yearly billing.</p>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center mb-14">
            <div className="bg-white rounded-2xl p-1.5 shadow-[4px_4px_10px_#d1d5db,-4px_-4px_10px_#ffffff] flex">
              <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>Monthly</button>
              <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>
                Yearly
              </button>
            </div>
          </div>

          {billingCycle === 'yearly' && (
            <div className="flex justify-center mb-8 -mt-4">
              <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center gap-2 mb-6">
                <span className="text-green-600">🎉</span>
                <span className="text-green-700 font-semibold text-sm">Yearly billing — pay once and save big!</span>
              </div>
            </div>
          )}

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto space-y-6 md:space-y-0">
            {activePlans.map((plan) => (
              <div key={plan.name} className={`relative rounded-3xl p-8 transition-all duration-500 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#870d23] to-[#a01129] text-white md:scale-105 shadow-2xl z-10'
                  : 'bg-white text-gray-900 border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}>
                {plan.highlighted && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#870d23] to-[#a01129] text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-lg">⭐ Most Popular</span>}
                {billingCycle === 'yearly' && 'saving' in plan && (
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                    plan.highlighted ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                  }`}>{(plan as any).saving}</span>
                )}
                <div className={`w-10 h-10 rounded-2xl mb-4 flex items-center justify-center ${plan.highlighted ? 'bg-white/20' : 'bg-[#870d23]/10'}`}>
                  <div className={`w-4 h-4 rounded-full ${plan.color}`} />
                </div>
                <p className="text-xl font-bold mb-3">{plan.name}</p>
                <div className="mb-1 flex items-end gap-1">
                  <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 font-bold ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm font-bold mb-5 ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`}>+ 18% GST</p>
                <div className={`rounded-2xl p-4 mb-5 ${plan.highlighted ? 'bg-white/10' : 'bg-gray-50'}`}>
                  <ul className="space-y-1.5">
                    {Array.isArray(plan.subtitle) ? plan.subtitle.map((s: string) => (
                      <li key={s} className={`text-xs flex items-start gap-1.5 ${plan.highlighted ? 'text-white' : 'text-black'}`}>
                        <span className={`mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-amber-300' : 'text-[#870d23]'}`}>•</span>{s}
                      </li>
                    )) : <li className={`text-xs ${plan.highlighted ? 'text-white/70' : 'text-gray-600'}`}>{plan.subtitle}</li>}
                  </ul>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? 'bg-white/20' : 'bg-[#870d23]/10'}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`} />
                      </div>
                      <span className={plan.highlighted ? 'text-white/90' : 'text-gray-700'}>{f}</span>
                    </li>
                  ))}
                  {'lockedFeatures' in plan && (plan as any).lockedFeatures.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-red-100">
                        <span className="text-red-500 text-xs font-bold">✕</span>
                      </div>
                      <span className={`line-through ${plan.highlighted ? 'text-white/40' : 'text-gray-400'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className={`text-sm mb-5 ${plan.highlighted ? 'text-white' : 'text-black'}`}>{plan.note}</p>
                <button onClick={() => router.push('/crm/payment')} className={`w-full rounded-2xl h-12 font-bold transition-all duration-300 hover:scale-105 ${
                  plan.highlighted ? 'bg-white text-[#870d23] hover:bg-gray-100 shadow-lg' : 'bg-gradient-to-br from-[#870d23] to-[#a01129] text-white hover:shadow-lg'
                }`}>Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PlayStore Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[8px_8px_16px_#6b0a1c,-8px_-8px_16px_#a91129] bg-gradient-to-br from-[#870d23] to-[#a01129]">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="block">
                <div className="relative h-[220px] sm:h-[300px] lg:h-[400px] rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
                  <img src="/assets/crm-software-mangament-in-chennai.webp" alt="CRM Mobile App" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-white">
                <span className="text-white text-xs sm:text-sm uppercase tracking-widest animate-pulse">CRM Mobile App</span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Download FuelDigi CRM App</p>
                <p className="text-base sm:text-lg mb-10 leading-relaxed">
                  The small steps of buying CRM helps business to enhance customer relationships, automate workflows, increase productivity, and handle leads, appointments, and call activities. Fueldigi CRM is a powerful management tool.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
                  {/* Download Buttons Row */}
                  <div className="inline-flex items-center gap-2 rounded-xl p-3 bg-white" style={{border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 12px rgba(66,133,244,0.15)'}}>
                    {/* Google Play - Left */}
                    <a
                      href="https://play.google.com/store/apps/details?id=com.fueldigi.crmapp&hl=en_IN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-2 text-white pl-2.5 pr-3.5 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-md overflow-hidden"
                      style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'}}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #EA433530, #4285F430, #34A85330, #FBBC0430)'}} />
                      <svg className="w-5 h-5 flex-shrink-0 relative z-10" viewBox="0 0 24 24" fill="none">
                        <path d="M3.18 23.76a2 2 0 0 0 2.08-.22l12.2-7.06-2.88-2.88L3.18 23.76z" fill="#EA4335"/>
                        <path d="M20.82 9.6A2 2 0 0 0 20 8l-2.54-1.46-3.2 3.2 3.2 3.2L20 11.48a2 2 0 0 0 .82-1.88z" fill="#FBBC04"/>
                        <path d="M3.18.24C2.74.5 2.5 1 2.5 1.6v20.8c0 .6.24 1.1.68 1.36l.1.06 11.66-11.66v-.28L3.18.24z" fill="#4285F4"/>
                        <path d="M14.94 12.12l3.32-3.32-12.2-7.06a2 2 0 0 0-2.08-.22l11.96 10.6z" fill="#34A853"/>
                      </svg>
                      <div className="relative z-10 leading-tight">
                        <p className="text-xs font-bold">Android</p>
                      </div>
                    </a>

                    {/* Center Label */}
                    <div className="text-center px-1">
                      <p className="text-[8px] text-black font-bold uppercase tracking-widest leading-none mb-0.5">Available on</p>
                      <p className="text-[12px] font-bold text-black leading-tight whitespace-nowrap">Get it on Store</p>
                    </div>

                    {/* App Store - Right */}
                    <a
                      href="https://apps.apple.com/us/app/fueldigi-crm-sales-leads/id6761998951"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-2 bg-black text-white pl-2.5 pr-3.5 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-md overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <svg className="w-5 h-5 flex-shrink-0 relative z-10" viewBox="0 0 24 24" fill="white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="relative z-10 leading-tight">
                        <p className="text-xs font-bold">iOS</p>
                      </div>
                    </a>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 sm:p-4 lg:p-5 inline-flex items-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300">
                    <div className="flex">
                      {[1, 2, 3, 4].map(i => <Star key={i} className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-amber-400 fill-amber-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                      <Star className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-amber-400 fill-amber-400/40" />
                    </div>
                    <span className="text-white font-bold text-sm sm:text-base lg:text-lg">4.8+</span>
                    <span className="text-white text-xs sm:text-sm">Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <p className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">Download Fueldigi CRM App — Grow Your Business Now</p>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed">Manage leads, calls, follow-ups, and customer relationships from one powerful platform</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fueldigi.crmapp&hl=en_IN', '_blank')} className="group bg-white hover:bg-gray-100 text-[#870d23] font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/30 flex items-center gap-3">
                <span className="text-lg">Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-transparent border-2 border-white hover:bg-white hover:text-[#870d23] text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg">Book Demo</button>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-3xl font-bold text-white mb-2">Leads</p>
                <p className="text-white/80">Capture & Convert</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-3xl font-bold text-white mb-2">100%</p>
                <p className="text-white/80">Business Automation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-3xl font-bold text-white mb-2">24/7</p>
                <p className="text-white/80">Support Available</p>
              </div>
            </div>
             <div className="mt-8 flex items-center justify-center gap-4 text-white/80 text-sm">
              <a href="/crm/privacy-policy" className="font-bold hover:text-white transition-colors duration-300">Privacy Policy</a>
              <span>|</span>
              <a href="/crm/deletion-policy" className="font-bold hover:text-white transition-colors duration-300">Delete Policy</a>
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