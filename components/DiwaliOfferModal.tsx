'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X, Phone, Calendar, ArrowRight, Sparkles, Clock, CalendarDays, Wallet, FileText, CheckCircle2 } from 'lucide-react'

export default function DiwaliOfferModal() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Only auto-trigger 10s popup on Home and HRMS pages
    const isTargetPage = pathname === '/' || pathname === '/products/hrms-development-services-in-chennai'
    const dismissed = typeof window !== 'undefined' ? sessionStorage.getItem('diwali_offer_dismissed') : null
    
    let timer: NodeJS.Timeout | null = null
    if (isTargetPage && !dismissed) {
      timer = setTimeout(() => {
        setIsOpen(true)
      }, 10000)
    }

    // Manual open event - works across ALL pages when clicking topbar "Get 20% OFF"
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-diwali-modal', handleOpen)

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('open-diwali-modal', handleOpen)
    }
  }, [pathname])

  const handleClose = () => {
    setIsOpen(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('diwali_offer_dismissed', 'true')
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm transition-opacity"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Banner Modal Box - Attractive Professional White Design */}
      <div 
        className="relative w-full max-w-lg sm:max-w-xl bg-white rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(135,13,35,0.25),0_0_40px_rgba(255,207,62,0.15)] border-2 border-amber-300 text-gray-900 transition-all transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Festive Header Gradient Accent Line */}
        <div className="h-2.5 w-full bg-gradient-to-r from-[#870d23] via-[#ffcf3e] to-[#870d23]" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors"
          aria-label="Close Diwali Offer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Container */}
        <div className="p-6 sm:p-8 text-center">

          {/* Date & Diwali Special Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 text-[#870d23] border border-amber-300 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm">
            <span className="text-base select-none">🪔</span>
            <span>OCT 25th – 07th | Diwali Special</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          {/* 20% OFF Callout */}
          <div className="my-2 flex items-center justify-center gap-2">
            <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#870d23] via-[#a01129] to-[#870d23] text-transparent bg-clip-text tracking-tight">
              GET 20% OFF
            </span>
            <span className="bg-[#ffcf3e] text-[#6b0a1c] text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-400 shadow-sm">
              Festive Deal
            </span>
          </div>

          {/* Main Headline */}
          <p className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-4 max-w-lg mx-auto">
            Diwali Offer: Cut HR Manual Work by 70%. Now at <span className="text-[#870d23]">20% OFF.</span>
          </p>

          {/* Subline 4-Feature Visual Card Grid */}
          {/* <div className="bg-gradient-to-b from-gray-50 to-amber-50/20 border border-amber-100 rounded-2xl p-4 sm:p-5 mb-5 text-left shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase text-[#870d23] tracking-wider">
                All-in-One HR & Payroll Platform
              </span>
              <span className="text-[11px] font-bold text-gray-600 bg-white px-2.5 py-0.5 rounded-full border border-gray-200 shadow-xs">
                Zero Setup Hassle
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-xs hover:border-amber-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#870d23] flex items-center justify-center mx-auto mb-1.5 font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <p className="font-bold text-gray-900 text-xs">Attendance</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Biometric & Geo</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-xs hover:border-amber-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-1.5 font-bold">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <p className="font-bold text-gray-900 text-xs">Leave</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Fast Approvals</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-xs hover:border-amber-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-1.5 font-bold">
                  <Wallet className="w-4 h-4" />
                </div>
                <p className="font-bold text-gray-900 text-xs">Payroll</p>
                <p className="text-[10px] text-gray-500 mt-0.5">1-Click Salary</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-2.5 shadow-xs hover:border-amber-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-1.5 font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <p className="font-bold text-gray-900 text-xs">Payslips</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Auto PDF</p>
              </div>
            </div>
          </div> */}

          {/* Value Checklist */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-600 mb-6 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              Save up to ₹24,000/yr
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              Free Setup & Migration
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              24/7 Priority Support
            </span>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://meetings.fueldigi.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#870d23] to-[#a01129] hover:from-[#6b0a1c] hover:to-[#870d23] text-white font-black px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base tracking-wide"
            >
              <Calendar className="w-4 h-4 text-[#ffcf3e]" />
              <span>Book a Free Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:+918438240280"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold px-6 py-3.5 rounded-2xl transition-colors text-sm sm:text-base shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#870d23]" />
              <span>+91 84382 40280</span>
            </a>
          </div>

          {/* Footnote */}
          <p className="text-[11px] text-gray-500 mt-4">
            ⚡ Special Diwali Festive Pricing — Valid Oct 25th to Oct 07th only.
          </p>

        </div>
      </div>
    </div>
  )
}
