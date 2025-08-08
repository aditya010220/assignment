'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingCardProps {
  children: ReactNode
  className?: string
  delay?: number
  amplitude?: number
  duration?: number
}

export default function FloatingCard({ 
  children, 
  className = '',
  delay = 0,
  amplitude = 10,
  duration = 3
}: FloatingCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ 
        y: [-amplitude, amplitude, -amplitude],
        rotateX: [0, 2, 0],
        rotateY: [0, 1, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </motion.div>
  )
}
