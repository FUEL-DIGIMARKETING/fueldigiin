'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        'glass rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassCard
