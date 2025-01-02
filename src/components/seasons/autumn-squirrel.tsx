'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface AutumnSquirrelProps {
  position: 'left' | 'right'
}

export function AutumnSquirrel({ position }: AutumnSquirrelProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [leaves, setLeaves] = useState<{ id: number; x: number; y: number }[]>([])

  const handleClick = () => {
    if (isAnimating) return

    setIsAnimating(true)
    const burstLeaves = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50
    }))
    setLeaves(burstLeaves)

    setTimeout(() => {
      setIsAnimating(false)
      setLeaves([])
    }, 2000)
  }

  return (
    <div
      className={`fixed bottom-20 ${position === 'left' ? 'left-[50px]' : 'right-[50px]'} cursor-pointer z-10`}
      style={{ transform: position === 'right' ? 'scaleX(-1)' : undefined }}
    >
      {/* Leaf Pile */}
      <div className="relative">
        <div className="w-24 h-16 bg-gradient-to-b from-orange-600 to-orange-700 rounded-full" />
      </div>

      {/* Squirrel */}
      <motion.div
        animate={isAnimating ? {
          y: [-20, 0],
          rotate: [0, position === 'left' ? -10 : 10, 0]
        } : {}}
        onClick={handleClick}
        className="absolute bottom-8 w-20 h-24"
      >
        <div className="relative w-full h-full">
          {/* Squirrel body - simplified for now */}
          <div className="absolute bottom-0 w-16 h-20 bg-[#8B4513] rounded-3xl" />
          <div className="absolute bottom-16 w-12 h-12 bg-[#8B4513] rounded-full" /> {/* head */}
          <div className="absolute bottom-4 right-0 w-12 h-16 bg-[#8B4513] rounded-full transform rotate-45" /> {/* tail */}
        </div>
      </motion.div>

      {/* Burst Leaves */}
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: leaf.x,
              y: leaf.y,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="absolute bottom-12 left-12 text-2xl"
          >
            🍁
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 