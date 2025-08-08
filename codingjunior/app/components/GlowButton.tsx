'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'default' | 'lg'
  onClick?: () => void
  glowColor?: string
}

export default function GlowButton({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'default',
  onClick,
  glowColor = 'rgba(168, 85, 247, 0.5)'
}: GlowButtonProps) {
  const baseClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white border-0',
    outline: 'border-slate-600 text-slate-300 hover:text-white hover:border-purple-500 bg-transparent'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        scale: [1, 1.02, 1],
      }}
      transition={{
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300 animate-pulse"
        style={{ 
          background: `linear-gradient(45deg, ${glowColor}, ${glowColor.replace('0.5', '0.3')})`,
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      />
      
      <Button
        className={`relative ${baseClasses[variant]} transition-all duration-300 ${className}`}
        size={size}
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  )
}
