'use client'

import { cn } from '@/lib/utils'
import React from 'react'

interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const NeumorphicCard = ({ children, className, ...props }: NeumorphicCardProps) => {
  return (
    <div 
      className={cn(
        'neumorphic p-8 hover:shadow-xl transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default NeumorphicCard
