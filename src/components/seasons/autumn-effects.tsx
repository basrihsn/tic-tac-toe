'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AutumnSquirrel } from './autumn-squirrel'

const LEAVES = ['🍁', '🍂']

interface Dimensions {
  width: number
  height: number
}

export function AutumnEffects() {
  const [leaves, setLeaves] = useState<{ id: number; x: number; y: number; rotation: number; leaf: string }[]>([])
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
      setLeaves((prev) => {
        if (prev.length > 30) {
          const [, ...rest] = prev
          return [...rest, {
            id: Date.now(),
            x: Math.random() * dimensionsRef.current.width,
            y: -20,
            rotation: Math.random() * 360,
            leaf: LEAVES[Math.floor(Math.random() * LEAVES.length)]
          }]
        }
        return [...prev, {
          id: Date.now(),
          x: Math.random() * dimensionsRef.current.width,
          y: -20,
          rotation: Math.random() * 360,
          leaf: LEAVES[Math.floor(Math.random() * LEAVES.length)]
        }]
      })
    }, 1000)

    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="seasonal-effects">
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ x: leaf.x, y: leaf.y, rotate: leaf.rotation }}
            animate={{
              y: dimensionsRef.current.height + 20,
              x: leaf.x + Math.sin(leaf.y * 0.1) * 100,
              rotate: leaf.rotation + 360
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 8,
              ease: "linear"
            }}
            className="absolute text-2xl"
          >
            {leaf.leaf}
          </motion.div>
        ))}
      </AnimatePresence>

      <AutumnSquirrel position="left" />
      <AutumnSquirrel position="right" />
    </div>
  )
} 