'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ShimmerEffectProps {
  children: ReactNode
  className?: string
  trigger?: 'hover' | 'always' | 'inView'
}

export default function ShimmerEffect({ 
  children, 
  className = '',
  trigger = 'hover'
}: ShimmerEffectProps) {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' }
  }

  return (
    <div className={`relative overflow-hidden ${className} group`}>
      {children}
      
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate={trigger === 'always' ? 'animate' : undefined}
        whileHover={trigger === 'hover' ? 'animate' : undefined}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: trigger === 'always' ? Infinity : 0,
          repeatDelay: 2
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'skewX(-20deg)'
        }}
      />
    </div>
  )
}
