'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Dimensions {
  width: number
  height: number
}

export function SpringEffects() {
  const [flowers, setFlowers] = useState<{ id: number; x: number; y: number }[]>([])
  const dimensionsRef = useRef<Dimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    const handleResize = () => {
      dimensionsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    const interval = setInterval(() => {
      setFlowers((prev) => {
        if (prev.length > 20) {
          const [, ...rest] = prev
          return [...rest, {
            id: Date.now(),
            x: Math.random() * dimensionsRef.current.width,
            y: -20,
          }]
        }
        return [...prev, {
          id: Date.now(),
          x: Math.random() * dimensionsRef.current.width,
          y: -20,
        }]
      })
    }, 2000)

    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="seasonal-effects">
      <AnimatePresence>
        {flowers.map((flower) => (
          <motion.div
            key={flower.id}
            initial={{ x: flower.x, y: flower.y, rotate: 0 }}
            animate={{
              y: dimensionsRef.current.height + 20,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 10,
              ease: "linear"
            }}
            className="absolute"
          >
            🌸
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 