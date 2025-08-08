'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MicroInteractionProps {
  children: ReactNode
  type?: 'bounce' | 'scale' | 'rotate' | 'shake' | 'pulse'
  trigger?: 'hover' | 'tap' | 'always'
  className?: string
}

export default function MicroInteraction({ 
  children, 
  type = 'scale', 
  trigger = 'hover',
  className = '' 
}: MicroInteractionProps) {
  const animations = {
    bounce: {
      hover: { y: [-2, -8, -2], transition: { duration: 0.3 } },
      tap: { y: -4, transition: { duration: 0.1 } },
      always: { y: [-2, -8, -2], transition: { duration: 2, repeat: Infinity } }
    },
    scale: {
      hover: { scale: 1.05, transition: { duration: 0.2 } },
      tap: { scale: 0.95, transition: { duration: 0.1 } },
      always: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
    },
    rotate: {
      hover: { rotate: 5, transition: { duration: 0.2 } },
      tap: { rotate: -5, transition: { duration: 0.1 } },
      always: { rotate: [0, 5, -5, 0], transition: { duration: 4, repeat: Infinity } }
    },
    shake: {
      hover: { x: [-2, 2, -2, 2, 0], transition: { duration: 0.4 } },
      tap: { x: [-1, 1, -1, 1, 0], transition: { duration: 0.2 } },
      always: { x: [-2, 2, -2, 2, 0], transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 } }
    },
    pulse: {
      hover: { scale: [1, 1.1, 1], transition: { duration: 0.6 } },
      tap: { scale: [1, 0.9, 1], transition: { duration: 0.3 } },
      always: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } }
    }
  }

  const motionProps = {
    className,
    ...(trigger === 'hover' && { whileHover: animations[type].hover }),
    ...(trigger === 'tap' && { whileTap: animations[type].tap }),
    ...(trigger === 'always' && { animate: animations[type].always })
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  )
}
