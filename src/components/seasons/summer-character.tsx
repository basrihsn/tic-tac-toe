'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import './summer.css'

interface SummerCharacterProps {
  position: 'left' | 'right'
}

export function SummerCharacter({ position }: SummerCharacterProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [waterBalloons, setWaterBalloons] = useState<{ id: number; x: number; y: number }[]>([])
  const dimensionsRef = useRef<{ width: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000
  })

  useEffect(() => {
    const handleResize = () => {
      dimensionsRef.current.width = window.innerWidth
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClick = () => {
    if (isAnimating) return

    setIsAnimating(true)
    const targetX = position === 'left' ? dimensionsRef.current.width / 3 : -dimensionsRef.current.width / 3

    setWaterBalloons([{
      id: Date.now(),
      x: targetX,
      y: -300
    }])

    setTimeout(() => {
      setIsAnimating(false)
      setWaterBalloons([])
    }, 1500)
  }

  return (
    <div className={`summer-character ${position}`}>
      {/* Character */}
      <motion.div
        animate={isAnimating ? {
          rotate: [0, position === 'left' ? -45 : 45, 0],
          y: [0, -20, 0]
        } : {}}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
        className="relative w-24 h-32"
      >
        {/* Character design */}
        <div className="absolute bottom-0 w-20 h-24 bg-blue-500 rounded-3xl shadow-lg" />
        <div className="absolute bottom-20 w-16 h-16 bg-[#FFB6C1] rounded-full shadow-md" />
        <div className="absolute bottom-12 right-2 w-8 h-16 bg-blue-500 rounded-full transform rotate-45 shadow-sm" />
        {/* Eyes */}
        <div className="absolute bottom-24 left-4 w-3 h-3 bg-black rounded-full" />
        <div className="absolute bottom-24 left-8 w-3 h-3 bg-black rounded-full" />
        {/* Smile */}
        <div className="absolute bottom-22 left-5 w-6 h-3 border-b-2 border-black rounded-full" />
      </motion.div>

      {/* Water Balloons */}
      <AnimatePresence>
        {waterBalloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="water-balloon"
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: balloon.x,
              y: [0, balloon.y / 2, balloon.y],
              scale: [1, 1.2, 0.8],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              y: { type: "spring", stiffness: 100, damping: 10 }
            }}
          >
            <div className="relative">
              <span className="text-4xl">💧</span>
              <motion.div
                className="water-splash"
                animate={{
                  scale: [1, 3, 0],
                  opacity: [0.8, 0.5, 0]
                }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 