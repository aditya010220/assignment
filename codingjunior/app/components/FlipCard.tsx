'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FlipCardProps {
  frontContent: ReactNode
  backContent: ReactNode
  className?: string
  triggerOnHover?: boolean
}

export default function FlipCard({ frontContent, backContent, className = '', triggerOnHover = true }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    if (!triggerOnHover) {
      setIsFlipped(!isFlipped)
    }
  }

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      setIsFlipped(true)
    }
  }

  const handleMouseLeave = () => {
    if (triggerOnHover) {
      setIsFlipped(false)
    }
  }

  return (
    <div 
      className={`relative w-full h-full perspective-1000 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          {frontContent}
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          {backContent}
        </div>
      </motion.div>
    </div>
  )
}
