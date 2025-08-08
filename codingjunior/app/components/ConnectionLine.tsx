'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ConnectionLineProps {
  fromId: string
  toId: string
  delay?: number
  duration?: number
  className?: string
  color?: string
  glowColor?: string
  strokeWidth?: number
  animated?: boolean
}

export default function ConnectionLine({
  fromId,
  toId,
  delay = 0,
  duration = 2,
  className = '',
  color = '#a855f7',
  glowColor = '#a855f7',
  strokeWidth = 2,
  animated = true
}: ConnectionLineProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [path, setPath] = useState('')
  const [pathLength, setPathLength] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const calculatePath = () => {
    const fromElement = document.getElementById(fromId)
    const toElement = document.getElementById(toId)
    
    if (!fromElement || !toElement || !svgRef.current) return

    const fromRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()
    const svgRect = svgRef.current.getBoundingClientRect()

    // Calculate connection points (center-right of from element, center-left of to element)
    const fromX = fromRect.right - svgRect.left
    const fromY = fromRect.top + fromRect.height / 2 - svgRect.top
    const toX = toRect.left - svgRect.left
    const toY = toRect.top + toRect.height / 2 - svgRect.top

    // Create a curved path using cubic bezier
    const controlPointOffset = Math.abs(toX - fromX) * 0.5
    const controlPoint1X = fromX + controlPointOffset
    const controlPoint1Y = fromY
    const controlPoint2X = toX - controlPointOffset
    const controlPoint2Y = toY

    const pathData = `M ${fromX} ${fromY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toX} ${toY}`
    
    setPath(pathData)

    // Calculate path length for animation
    const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    tempPath.setAttribute('d', pathData)
    document.body.appendChild(tempPath)
    const length = tempPath.getTotalLength()
    document.body.removeChild(tempPath)
    setPathLength(length)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      calculatePath()
      setIsVisible(true)
    }, delay * 1000)

    const handleResize = () => {
      if (isVisible) {
        calculatePath()
      }
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [fromId, toId, delay, isVisible])

  if (!isVisible || !path) return null

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        {/* Gradient for the line */}
        <linearGradient id={`gradient-${fromId}-${toId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`glow-${fromId}-${toId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Animated gradient for the flowing effect */}
        <linearGradient id={`flow-gradient-${fromId}-${toId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor={glowColor} stopOpacity="0.8" />
          <stop offset="70%" stopColor={glowColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
          {animated && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;200 0;-100 0"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>

      {/* Base glow path */}
      <motion.path
        d={path}
        stroke={glowColor}
        strokeWidth={strokeWidth + 4}
        fill="none"
        opacity={0.3}
        filter={`url(#glow-${fromId}-${toId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: duration * 0.8, ease: "easeInOut" }}
      />

      {/* Main path */}
      <motion.path
        d={path}
        stroke={`url(#gradient-${fromId}-${toId})`}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: duration * 0.8, ease: "easeInOut" }}
      />

      {/* Flowing animation path */}
      {animated && (
        <motion.path
          d={path}
          stroke={`url(#flow-gradient-${fromId}-${toId})`}
          strokeWidth={strokeWidth + 1}
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: duration * 0.8, duration: 0.5 }}
        />
      )}

      {/* Connection dots */}
      <motion.circle
        cx={path.split(' ')[1]}
        cy={path.split(' ')[2]}
        r="4"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: duration * 0.2, duration: 0.3 }}
      >
        <animate
          attributeName="r"
          values="4;6;4"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </motion.circle>

      <motion.circle
        cx={path.split(' ').slice(-2)[0]}
        cy={path.split(' ').slice(-1)[0]}
        r="4"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: duration * 0.8, duration: 0.3 }}
      >
        <animate
          attributeName="r"
          values="4;6;4"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </motion.circle>
    </svg>
  )
}
