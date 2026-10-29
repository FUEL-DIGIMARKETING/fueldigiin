'use client'

import { Phone, Sparkles } from 'lucide-react'

export default function DiwaliTopBar() {
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault()
    // Open modal on any page
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-diwali-modal'))
    }
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[60] h-10 bg-gradient-to-r from-[#4a050f] via-[#870d23] to-[#4a050f] text-white border-b border-[#ffcf3e]/40 shadow-md flex items-center px-2 sm:px-4"
      role="banner"
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
        
        {/* Left / Center announcement content */}
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="text-base sm:text-lg select-none">🪔</span>
          
          <span className="hidden sm:inline-flex items-center gap-1 bg-[#ffcf3e] text-[#6b0a1c] font-black text-[10px] uppercase px-2 py-0.5 rounded-full shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            Diwali Special
          </span>

          <span className="font-semibold text-white truncate">
            <span className="text-[#ffcf3e] font-black">Diwali Offer for HRMS: </span>
            <span className="hidden md:inline">Cut HR Manual Work by 70% — </span>
            <span className="font-black text-[#ffcf3e]">20% OFF</span>
            <span className="text-amber-200/90 text-xs hidden sm:inline ml-1.5">(Oct 25th – 07th)</span>
          </span>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
          <button
            onClick={handleOpenModal}
            className="bg-[#ffcf3e] hover:bg-yellow-400 text-[#680819] font-black text-xs px-3 sm:px-4 py-1 rounded-full shadow-sm transition-all duration-200 hover:scale-105 whitespace-nowrap flex items-center gap-1 cursor-pointer"
            title="Open Diwali Offer"
          >
            <span>Get 20% OFF</span>
            <span className="text-xs">→</span>
          </button>
          <a
            href="tel:+918438240280"
            className="hidden md:flex items-center gap-1.5 text-white/90 hover:text-[#ffcf3e] transition-colors text-xs font-semibold pl-1"
            title="Call FuelDigi"
          >
            <Phone className="w-3 h-3 text-[#ffcf3e]" />
            <span className="hidden xl:inline">+91 84382 40280</span>
          </a>
        </div>

      </div>
    </div>
  )
}
