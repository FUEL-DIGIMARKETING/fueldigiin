'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'glass'
  onClick?: () => void
  className?: string
  href?: string
}

const Button = ({ children, variant = 'primary', onClick, className, href, ...props }: ButtonProps) => {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-block text-center'
  
  const variants: Record<string, string> = {
    primary: 'bg-brand-primary text-white hover:bg-opacity-90 neumorphic hover:scale-105',
    secondary: 'bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white',
    glass: 'bg-white text-gray-900 hover:bg-white hover:text-[#870d23] border-2 border-white'
  }

  if (href) {
    return (
      <a href={href} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}

export default Button
