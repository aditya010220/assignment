'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, ReactNode } from 'react'

interface EnhancedScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate'
  stagger?: boolean
  duration?: number
  distance?: number
}

export default function EnhancedScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  stagger = false,
  duration = 0.8,
  distance = 50
}: EnhancedScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  const variants = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: -distance, opacity: 0 },
    right: { x: distance, opacity: 0 },
    fade: { opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
    rotate: { rotate: -10, scale: 0.8, opacity: 0 }
  }

  const animate = {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0
  }

  useEffect(() => {
    if (isInView) {
      controls.start(animate)
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={controls}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        ...(stagger && {
          staggerChildren: 0.1,
          delayChildren: delay
        })
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
