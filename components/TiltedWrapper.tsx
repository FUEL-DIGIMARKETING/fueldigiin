'use client'

import { useRef } from 'react'

export default function TiltedWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
