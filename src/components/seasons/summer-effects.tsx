'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

interface Ball {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

interface Dimensions {
  width: number
  height: number
}

export function SummerEffects() {
  const [balls, setBalls] = useState<Ball[]>([])
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const dimensionsRef = useRef<Dimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  const createInitialBalls = useCallback(() => {
    const { width, height } = dimensionsRef.current
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: height + Math.random() * 200,
      size: Math.random() * 30 + 40,
      delay: Math.random() * 2
    }))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      dimensionsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      setBalls(createInitialBalls())
    }

    setBalls(createInitialBalls())

    const sunInterval = setInterval(() => {
      const { width, height } = dimensionsRef.current
      setPosition({
        x: Math.random() * width,
        y: Math.random() * (height / 3),
      })
    }, 5000)

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(sunInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [createInitialBalls])

  const { width, height } = dimensionsRef.current

  return (
    <div className="seasonal-effects">
      <motion.div
        animate={position}
        transition={{
          duration: 5,
          ease: "easeInOut"
        }}
        className="absolute text-6xl z-10"
      >
        ☀️
      </motion.div>

      {balls.map((ball) => (
        <motion.div
          key={ball.id}
          className="absolute rounded-full overflow-hidden shadow-lg"
          style={{
            width: ball.size,
            height: ball.size,
            left: ball.x,
          }}
          animate={{
            y: [-100, height + 100],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: ball.delay,
            },
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }
          }}
        >
          <div className="absolute w-full h-full">
            {/* Red segment */}
            <div className="absolute w-full h-full" 
              style={{ 
                clipPath: 'polygon(50% 50%, 50% 0, 83.3% 0, 83.3% 100%, 50% 100%)',
                backgroundColor: '#ff0000'
              }} 
            />
            {/* Yellow segment */}
            <div className="absolute w-full h-full" 
              style={{ 
                clipPath: 'polygon(50% 50%, 83.3% 0, 116.6% 0, 116.6% 100%, 83.3% 100%)',
                backgroundColor: '#ffd700'
              }} 
            />
            {/* Blue segment */}
            <div className="absolute w-full h-full" 
              style={{ 
                clipPath: 'polygon(50% 50%, 116.6% 0, 150% 0, 150% 100%, 116.6% 100%)',
                backgroundColor: '#0066cc'
              }} 
            />
            {/* Lines */}
            <div className="absolute w-[1px] h-full bg-black/20 left-1/2 top-0 transform -translate-x-1/2" />
            <div className="absolute w-[1px] h-full bg-black/20" 
              style={{ left: '83.3%', transform: 'translateX(-50%)' }} 
            />
            <div className="absolute w-[1px] h-full bg-black/20" 
              style={{ left: '116.6%', transform: 'translateX(-50%)' }} 
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
} 