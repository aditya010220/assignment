// 'use client'

// import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
// import { useEffect, useRef } from 'react'

// interface AnimatedCounterProps {
//   value: number
//   duration?: number
//   suffix?: string
//   prefix?: string
//   className?: string
// }

// export default function AnimatedCounter({ 
//   value, 
//   duration = 2,
//   suffix = '',
//   prefix = '',
//   className = ''
// }: AnimatedCounterProps) {
//   const ref = useRef<HTMLSpanElement>(null)
//   const motionValue = useMotionValue(0)
//   const springValue = useSpring(motionValue, { duration: duration * 1000 })
//   const isInView = useInView(ref, { once: true })

//   useEffect(() => {
//     if (isInView) {
//       motionValue.set(value)
//     }
//   }, [motionValue, isInView, value])

//   useEffect(() => {
//     springValue.on("change", (latest) => {
//       if (ref.current) {
//         ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
//       }
//     })
//   }, [springValue, prefix, suffix])

//   return <span ref={ref} className={className}>0</span>
// }
'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function AnimatedCounter({ 
  value, 
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      const node = ref.current
      if (node instanceof HTMLSpanElement) {
        node.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, prefix, suffix])

  return <span ref={ref} className={className}>0</span>
}
