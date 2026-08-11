'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Shield, Cloud, Smartphone, MapPin, Clock, CheckCircle, MapPin as MapPinIcon, Calendar, DollarSign, FileText, Users, Settings, FileBarChart, IndianRupee, User, UserCheck, Crown, Database, Lock, RefreshCw, TrendingUp, Zap, BarChart, Building2, Gauge, Monitor, Rocket, Check, ArrowRight, ChevronDown, CalendarOff, Wallet, Bell, Star } from 'lucide-react'
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

  const [activeTab, setActiveTab] = useState('attendance')
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const sliderImages = [
    '/assets/hrms-login-page.png',
    '/assets/hrms-attendance-page.png',
    '/assets/hrms-levae-management-page.png',
    '/assets/hrms-employee-management-page.png',
    '/assets/employee-detail-page.png',
    '/assets/support-team-page.png'
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
        body: JSON.stringify({ ...formData, phone: `${countryCode} ${formData.phone}`, product: 'HRMS' }),
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
      { id: 'attendance', name: 'Attendance Management', icon: <MapPinIcon className="w-6 h-6" />, points: ['GPS-based check-in and check-out', 'Geofencing support', 'Multiple check-ins for field employees', 'Late and early arrival tracking', 'Work from home support', 'Detailed attendance reports'], image: "/assets/hrms-attendance-management.webp" },
      { id: 'leave', name: 'Leave Management', icon: <Calendar className="w-6 h-6" />, points: ['Apply leave from web or mobile', 'Multiple leave types (Casual, Sick, Earned, etc.)', 'Approval workflow', 'Leave balance tracking', 'Leave history', 'Holiday integration'], image: "/assets/hrms-leave-management.webp" },
      { id: 'salary', name: 'Salary Policy & Payroll', icon: <IndianRupee className="w-6 h-6" />, points: ['Create multiple salary policies', 'PF, ESI, Professional Tax support', 'Loss of Pay (LOP) calculation', 'Overtime configuration', 'Percentage or fixed salary components', 'Real-time salary breakdown'], image: "/assets/hrms-policy.webp" },
      { id: 'payslip', name: 'Salary & Payslip', icon: <FileText className="w-6 h-6" />, points: ['Automatic payslip generation', 'Detailed earnings and deductions', 'Secure PDF download', 'Email payslip sharing', 'Monthly salary reports'], image: "/assets/hrms-payslip-management.webp" },
      { id: 'employee', name: 'Employee Management', icon: <Users className="w-6 h-6" />, points: ['Complete employee database', 'Personal and professional details', 'Document storage', 'Active/inactive status', 'Bank details management', 'Search and filter employees'], image: "/assets/hrms-employee-management.webp" },
      { id: 'settings', name: 'Company Settings', icon: <Settings className="w-6 h-6" />, points: ['Role-based access control', 'SMTP email integration', 'Salary policy assignment', 'Office timing configuration', 'Holiday updater', 'Organization profile settings'], image: "/assets/hrms-software-development-commpany-in-chennai.webp" },
      { id: 'reports', name: 'Reports & Analytics', icon: <FileBarChart className="w-6 h-6" />, points: ['Attendance reports', 'Leave report', 'Payroll reports', 'Employee overview', 'Export to Excel and PDF', 'Dashboard analytics'], image: "/assets/hrms-report-analytics.webp" },
      { id: 'holiday', name: 'Holiday & Office Settings', icon: <Clock className="w-6 h-6" />, points: ['Company holiday calendar','Working days configuration','Office timing setup','Shift management','Weekend configuration'], image: "/assets/hrms-holiday-management.webp" }
  ]

  const activeFeature = features.find(f => f.id === activeTab) || features[0]
  const [openIndex, setOpenIndex] = useState(0)
  const roles = [
    { name: "Employee", capabilities: ["Mark attendance", "Apply leave", "View salary and payslip", "Download payslips", "Track leave balance"], image: "/assets/hrms-employee-access-management-software.webp" },
    { name: "HR", capabilities: ["Manage employees", "Approve leaves", "Generate reports", "Configure salary policies", "Manage attendance", "Handle payroll"], image: "/assets/hr-management-software.webp" },
    { name: "Admin", capabilities: ["Company settings", "Office timing", "Holiday management", "User management", "System configuration", "Data backup"], image: "/assets/admin-control-management.webp" },
    { name: "Super Admin", capabilities: ["Tenant management", "Company creation", "Subscription control", "System administration", "Multi-company oversight", "Advanced analytics"], image: "/assets/hrms-super-admin.webp" },
    { name: "Support", capabilities: ["Verify employees", "Handle support tickets", "Resolve technical issues", "User assistance", "Issue tracking", "Performance monitoring"], image: "/assets/hrms-support-management.webp" }
  ]

  const commonFeatures = [
    'Add Employee', 'Employee Records', 'Complaints Management', 'Calendar Access',
    'Checkout Requests', 'Monthly Attendance Tracking', 'Attendance Records',
    'Role Management', 'Document Upload', 'Holiday Updater'
  ]

  const plans = [
    {
      name: 'Basic Plan', price: '₹5,000', period: '/ month',
      tagline: 'Perfect for small teams getting started with HR automation.',
      features: ['Employee Management','Attendance Tracking','Leave Management','Holiday Calendar','Leave Request Approval','Salary Management','Email Support (Business Hours)','Initial Setup Assistance'],
      note: 'Best for startups and small teams.', highlighted: false, color: 'bg-blue-500'
    },
    {
      name: 'Pro Plan', price: '₹7,000', period: '/ month',
      tagline: 'Best for growing businesses needing better control and insights.',
      features: ['All features in Basic Plan','Payslip Download','Employee Reports','Global Updater Tool',
      'Work From Home Management','Week-off Configuration','Priority Email & Chat Support',
      'Monthly Data Backup','Standard Security'],
      note: 'Best for growing businesses.', highlighted: true, color: 'bg-gradient-to-br from-[#870d23] to-[#a01129]'
    },
    {
      name: 'Enterprise Plan', price: '₹10,000', period: '/ month',
      tagline: 'Advanced solution for organizations with complex HR needs.',
      features: ['All features in Pro Plan','Daily Work Updates','Employee Overview Dashboard','Overtime Management & Approvals','HR Meeting Scheduling','Employee Meeting Management','24/7 Priority Support','Custom Feature Development (On Request)','Advanced Security & Data Control',],
      note: 'For organizations with complex HR needs.', highlighted: false, color: 'bg-emerald-500'
    }
  ]

  const yearlyPlans = [
    {
      name: 'Basic Plan', price: '₹52,800', originalPrice: '₹60,000 / year', period: '/ year', saving: 'Save 12%',
      tagline: 'Perfect for small teams getting started with HR automation.',
      features: ['Employee Management','Attendance Tracking','Leave Management','Holiday Calendar','Leave Request Approval','Salary Management','Email Support (Business Hours)','Initial Setup Assistance'],
      note: 'Best for startups and small teams.', highlighted: false, color: 'bg-blue-500'
    },
    {
      name: 'Pro Plan', price: '₹73,920', originalPrice: '₹84,000 / year', period: '/ year', saving: 'Save 12%',
      tagline: 'Best for growing businesses needing better control and insights.',
      features: ['All features in Basic Plan','Payslip Download','Employee Reports','Global Updater Tool',
      'Work From Home Management','Week-off Configuration','Priority Email & Chat Support',
      'Monthly Data Backup','Standard Security'],
      note: 'Best for growing businesses.', highlighted: true, color: 'bg-gradient-to-br from-[#870d23] to-[#a01129]'
    },
    {
      name: 'Enterprise Plan', originalPrice: '₹1,20,000 / year', price: '₹1,05,600', period: '/ year', saving: 'Save 12%',
      tagline: 'Advanced solution for organizations with complex HR needs.',
      features: ['All features in Pro Plan','Daily Work Updates','Employee Overview Dashboard','Overtime Management & Approvals','HR Meeting Scheduling','Employee Meeting Management','24/7 Priority Support','Custom Feature Development (On Request)','Advanced Security & Data Control',],     
      note: 'For organizations with complex HR needs.', highlighted: false, color: 'bg-emerald-500'
    }
  ]

  const activePlans: any[] = billingCycle === 'monthly' ? plans : yearlyPlans

  const faqs = [
    { question: 'Is there a free trial available?', answer: 'Yes, we offer a free trial for new companies to experience the platform before choosing a plan. No credit card is required to start the trial.' },
    { question: 'Do you provide a product demo before purchase?', answer: 'Yes, you can book a free demo with our team to understand the features and see how the system works for your business needs.' },
    { question: 'How are payments processed?', answer: 'All payments are processed through a secure online payment gateway. Once the payment is completed, your subscription will be activated as per the selected plan.' },
    { question: 'What is your refund policy?', answer: 'Refunds are processed according to our Refund Policy. Eligible refunds may be issued in case of duplicate payments, technical errors, or service activation issues, subject to verification and approval.' },
    { question: 'Do you offer custom pricing for specific business needs?', answer: 'Yes, we provide custom pricing plans based on your organization size, feature requirements, and customization needs. Please contact our sales team for a tailored quote.' },
    { question: 'Is my company data safe and secure?', answer: 'Yes, your data is stored on secure cloud servers with role-based access control and strict security measures to protect confidentiality and integrity.' },
    { question: 'Can I change or upgrade my plan later?', answer: 'Yes, you can upgrade, downgrade, or change your subscription plan at any time based on your company requirements.' }
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
      <section className="relative min-h-screen overflow-hidden pt-20 md:pt-0">

        {/* Single H1 for SEO - shared across mobile and desktop */}
        <h1 className="sr-only">HRMS Development Services in Chennai for Smart Management</h1>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden flex flex-col">
          {/* Content */}
          <div className="bg-white px-4 sm:px-6 py-6">
            <div className="text-center max-w-lg w-full mx-auto">
              <div className="mb-3">
                <span className="text-orange-500 font-semibold text-lg">Smart HRMS App</span>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-black mb-4 leading-tight">
                HRMS Development Services
                <span className="text-[#870d23]"> in Chennai </span>
                for Smart Management
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
                    onClick={() => window.open('https://apps.apple.com/us/app/fueldigi-hrms-payroll/id6765691587', '_blank')}
                    className="flex items-center justify-center gap-2 px-3 py-3 bg-black text-white rounded-lg text-sm animate-flip-once"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Download for iOS
                  </button>
                  <button 
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem', '_blank')}
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
              <div className="mb-8">
                <span className="text-orange-500 font-semibold text-xl tracking-wide">Smart HRMS App</span>
              </div>
              
              <p className="text-5xl font-bold text-black leading-tight mb-12">
                HRMS Development Services
                <span className="text-[#870d23]"> in Chennai </span>
                for Smart Management
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
                      { icon: <IndianRupee className="w-4 h-4" />, label: 'Built for Indian Payroll System' },
                      { icon: <Clock className="w-4 h-4" />, label: '24-hour Setup' },
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
                      onClick={() => window.open('https://apps.apple.com/us/app/fueldigi-hrms-payroll/id6765691587', '_blank')}
                      className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl text-xs font-medium animate-flip-once hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      iOS
                    </button>
                    <button
                      onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem', '_blank')}
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
            <p className="text-3xl lg:text-4xl font-bold text-[#870d23] mb-4">Powerful Features</p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to manage your workforce efficiently</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#870d23] mt-3 mb-6">About Fueldigi HRMS Platform</h2>
              <p className="text-black leading-relaxed mb-4 text-justify">Our HRMS SaaS platform is a complete employee management solution designed to help organizations automate and simplify their daily HR operations. From attendance tracking and leave management to payroll and employee records, everything is managed in one centralized system.</p>
              <p className="text-black leading-relaxed mb-6 text-justify">The platform is built on a secure multi-tenant <a href="https://www.fueldigi.in/" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200">SaaS architecture</a>, allowing multiple companies to use the system with complete data isolation and high-level security.</p>
              <p className="text-black leading-relaxed mb-6 text-justify">The product can be customized according to customer requirements, including company policies, workflows, salary structures, and reporting needs.</p>
              <p className="font-semibold text-gray-900 mb-6 text-lg">Role-Based Login Support:</p>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => (
                  <span key={role.name} className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-900 shadow-sm border border-gray-200 cursor-default hover:bg-[#870d23] hover:text-white transition-colors duration-300">
                    <CheckCircle className="w-4 h-4 text-[#870d23]" />{role.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-96">
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                <img src="/assets/hrms-payroll-software-in-chennai.webp" alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-2xl opacity-20" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-full opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative py-10 bg-white">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/90 to-transparent z-20" />
        <div className="container mx-auto px-4 relative z-10">
          <h3 className="text-3xl lg:text-4xl font-bold text-[#840c1c] text-center mb-16">Why Smart HRMS Chennai?
</h3>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-3 rounded-2xl"><TrendingUp className="w-8 h-8 text-[#ffcf3e]" /></div>
                <p className="text-2xl font-bold text-[#840c1c]">Built for Real Company Needs</p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><IndianRupee className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Designed for the Indian payroll structure (PF, ESI, PT, LOP)</span></li>
                <li className="flex items-start gap-3"><Building2 className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Supports startups to mid-size companies</span></li>
                <li className="flex items-start gap-3"><Settings className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Customizable based on organization</span></li>
                <li className="flex items-start gap-3"><Gauge className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Reduces HR manual work by more than 70%</span></li>
                <li className="flex items-start gap-3"><Monitor className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Simple UI for non-technical HR teams</span></li>
                <li className="flex items-start gap-3"><Rocket className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Fast deployment with minimal setup time</span></li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-3 rounded-2xl"><BarChart className="w-8 h-8 text-[#ffcf3e]" /></div>
                <p className="text-2xl font-bold text-[#840c1c]">Business Benefits</p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><Shield className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Reduce HR operational costs</span></li>
                <li className="flex items-start gap-3"><Users className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Improve employee transparency</span></li>
                <li className="flex items-start gap-3"><Zap className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Centralized employee data</span></li>
                <li className="flex items-start gap-3"><BarChart className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Real-time workforce visibility</span></li>
                <li className="flex items-start gap-3"><TrendingUp className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Scalable SaaS architecture</span></li>
                <li className="flex items-start gap-3"><Shield className="w-6 h-6 text-[#ffcf3e] flex-shrink-0 mt-1" /><span className="text-black">Flexible customization options</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Role Access Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-[#870d23]">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-6">
            <div className="flex flex-wrap justify-center border-b border-gray-700 pb-4 px-2 lg:px-10 gap-2 lg:gap-4">
              {roles.map((role, idx) => (
                <button key={idx} onClick={() => setOpenIndex(idx)} className={`text-sm lg:text-lg font-semibold transition-all duration-300 pb-2 relative text-center px-3 py-2 lg:px-4 lg:py-3 rounded-xl lg:rounded-2xl lg:flex-1 ${openIndex === idx ? 'text-white shadow-[inset_4px_4px_8px_#1a1a1a,inset_-4px_-4px_8px_#3a3a3a] bg-gray-800/50' : 'text-gray-400 hover:text-gray-300 shadow-[4px_4px_8px_#1a1a1a,-4px_-4px_8px_#3a3a3a]'}`}>
                  {role.name}
                  {openIndex === idx && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffcf3e]/70 to-[#ffcf3e]/80 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 lg:p-12 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="overflow-hidden shadow-2xl">
                <img src={roles[openIndex || 0].image} alt={roles[openIndex || 0].name} className="w-full h-64 lg:h-96 object-contain rounded-3xl" />
              </div>
              <div>
                <p className="text-xl lg:text-3xl font-bold text-white mb-4 lg:mb-8">{roles[openIndex || 0].name}</p>
                <ul className="space-y-3 lg:space-y-4">
                  {roles[openIndex || 0].capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#ffcf3e] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm lg:text-lg">{cap}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-8 text-[#ffcf3e] font-semibold text-lg hover:text-[#ffcf3e]/60 transition-colors flex items-center gap-2">
                  Connect With Us <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Architecture */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-4xl lg:text-5xl font-bold text-[#870d23] text-center mb-6">SaaS Architecture</p>
          <p className="text-xl text-black text-center mb-12 max-w-3xl mx-auto">Enterprise-grade infrastructure built for scale and security</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Database className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Multi-company support</p>
              <p className="text-black">Isolated data for each organization with secure access</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Lock className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Secure tenant data separation</p>
              <p className="text-black">Complete data isolation between companies</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Cloud className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Scalable cloud infrastructure</p>
              <p className="text-black">Grows with your business needs</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <RefreshCw className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Automatic backup</p>
              <p className="text-black">Your data is always safe and recoverable</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Shield className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Centralized management</p>
              <p className="text-black">Control everything from one dashboard</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <Clock className="w-12 h-12 text-[#870d23] mb-4" />
              <p className="text-xl font-bold text-gray-900 mb-2">Subscription-based access</p>
              <p className="text-black">Flexible plans that fit your budget</p>
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
            <h4 className="text-2xl md:text-3xl font-bold text-[#870d23] mt-3">HRMS Pricing Plans</h4>
            <p className="text-gray-600 mt-3 max-w-lg mx-auto">No hidden charges. No long-term contracts. Save more with yearly billing.</p>
          </div>

          {/* Common Features Banner */}
          <div className="max-w-6xl mx-auto mb-10">
            <div className="bg-gradient-to-br from-[#870d23] to-[#a01129] rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                <p className="text-white font-bold text-lg">Common Features — Available in All Plans</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {commonFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                    <Check className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                    <span className="text-white text-xs font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center mb-10">
            <div className="bg-white rounded-2xl p-1.5 shadow-[4px_4px_10px_#d1d5db,-4px_-4px_10px_#ffffff] flex">
              <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>Monthly</button>
              <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-gradient-to-r from-[#870d23] to-[#a01129] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>Yearly</button>
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
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {activePlans.map((plan: any) => (
              <div key={plan.name} className={`relative rounded-3xl p-8 transition-all duration-500 flex flex-col ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#870d23] to-[#a01129] text-white md:scale-105 shadow-2xl z-10'
                  : 'bg-white text-gray-900 border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}>
                {plan.highlighted && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#870d23] to-[#a01129] text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-lg">⭐ Most Popular</span>}
                {'saving' in plan && billingCycle === 'yearly' && (
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                    plan.highlighted ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                  }`}>{plan.saving}</span>
                )}

                {/* Plan Header */}
                <div className={`w-10 h-10 rounded-2xl mb-4 flex items-center justify-center ${plan.highlighted ? 'bg-white/20' : 'bg-[#870d23]/10'}`}>
                  <div className={`w-4 h-4 rounded-full ${plan.color}`} />
                </div>
                <p className="text-xl font-bold mb-1">{plan.name}</p>
                <p className={`text-xs mb-4 ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>{plan.tagline}</p>
                <div className="mb-1">
                  {'originalPrice' in plan && billingCycle === 'yearly' && (
                    <span className={`text-lg line-through ${plan.highlighted ? 'text-white/50' : 'text-gray-400'}`}>{(plan as any).originalPrice}</span>
                  )}
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`}>{plan.price}</span>
                    <span className={`text-sm mb-1 font-bold ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`}>{plan.period}</span>
                  </div>
                </div>
                <p className={`text-sm font-bold mb-5 ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`}>+ 18% GST</p>

                {/* Plan Features */}
                <div className={`rounded-2xl p-4 mb-4 ${plan.highlighted ? 'bg-white/10' : 'bg-gray-50'}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${plan.highlighted ? 'text-amber-300' : 'text-[#870d23]'}`}>Plan Features</p>
                  <ul className="space-y-2">
                    {plan.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? 'bg-white/20' : 'bg-[#870d23]/10'}`}>
                          <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-white' : 'text-[#870d23]'}`} />
                        </div>
                        <span className={plan.highlighted ? 'text-white/90' : 'text-gray-700'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className={`text-xs mb-4 ${plan.highlighted ? 'text-white/60' : 'text-gray-400'}`}>{plan.note}</p>
                <button onClick={() => router.push('/hrms/payment')} className={`w-full rounded-2xl h-12 font-bold transition-all duration-300 hover:scale-105 ${
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
                  <img src="/assets/hrms-playstore.webp" alt="Mobile App" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-white">
                <span className="text-white text-xs sm:text-sm uppercase tracking-widest animate-pulse">Mobile App</span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Now Available on Google Play</p>
                <p className="text-base sm:text-lg mb-2 leading-relaxed">
                  We officially launched our HRMS mobile application in the Google Play Store and have already received positive feedback from early users with an average rating of 4.1+ stars.
                </p>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                  Employees can easily manage Attendance, leave, salary, and payslips directly from their mobile devices.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
                                  {/* Download Buttons Row */}
                                  <div className="inline-flex items-center gap-2 rounded-xl p-3 bg-white" style={{border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 12px rgba(66,133,244,0.15)'}}>
                                    {/* Google Play - Left */}
                                    <a
                                      href="https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem&hl=en_IN"
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
                                      href="https://apps.apple.com/us/app/fueldigi-hrms-payroll/id6765691587"
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
            <p className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">Experience Our HRMS with a Free Trial</p>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed">Discover how it fits your business needs</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.fdm2025.attendancehrsystem', '_blank')} className="group bg-white hover:bg-gray-100 text-[#870d23] font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/30 flex items-center gap-3">
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
              <a href="/hrms/privacy-policy" className="font-bold hover:text-white transition-colors duration-300">Privacy Policy</a>
              <span>|</span>
              <a href="/hrms/deletion-policy" className="font-bold hover:text-white transition-colors duration-300">Delete Policy</a>
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