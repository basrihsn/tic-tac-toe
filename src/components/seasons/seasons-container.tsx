'use client'

import { useEffect, useState } from 'react'
import { useSeasonStore } from '../../store/use-season-store'
import { WinterEffects } from "./winter-effects"
import { SpringEffects } from "./spring-effects"
import { SummerEffects } from "./summer-effects"
import { AutumnEffects } from "./autumn-effects"
import { BeachBall } from '../ui/beach-ball'
import { cn } from '../../lib/utils'

interface Position {
  x: number
  y: number
}

export function SeasonsContainer() {
  const { currentSeason } = useSeasonStore()
  const [positions, setPositions] = useState<Position[]>([])
  const numberOfBalls = 5

  useEffect(() => {
    const newPositions = Array.from({ length: numberOfBalls }).map(() => ({
      x: Math.random() * 90,
      y: Math.random() * 90,
    }))
    setPositions(newPositions)
  }, [])

  return (
    <div className="relative w-full h-full">
      {currentSeason === 'summer' && Array.from({ length: numberOfBalls }).map((_, index) => (
        <BeachBall
          key={index}
          season={currentSeason}
          className={cn(
            "absolute w-8 h-8 transition-all duration-500",
            "animate-float"
          )}
          style={{
            left: `${positions[index]?.x ?? 0}%`,
            top: `${positions[index]?.y ?? 0}%`,
            animationDelay: `${index * 0.3}s`
          }}
        />
      ))}
      {currentSeason === 'winter' && <WinterEffects />}
      {currentSeason === 'spring' && <SpringEffects />}
      {currentSeason === 'summer' && <SummerEffects />}
      {currentSeason === 'autumn' && <AutumnEffects />}
    </div>
  )
} 