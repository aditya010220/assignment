'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedGradientTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  animationDuration?: number
}

export default function AnimatedGradientText({ 
  children, 
  className = '',
  colors = ['#a855f7', '#ec4899', '#06b6d4', '#a855f7'],
  animationDuration = 3
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})`,
        backgroundSize: '300% 300%',
        animation: `gradientShift ${animationDuration}s ease infinite`
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.span>
  )
}
