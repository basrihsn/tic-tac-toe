'use client'

import { Button } from "../components/ui/button"
import { useSeasonStore } from "../store/use-season-store"

export function SeasonSwitcher() {
  const { currentSeason, setCurrentSeason } = useSeasonStore()

  const seasons = [
    { name: 'winter', icon: '❄️', color: '#ffffff' },
    { name: 'spring', icon: '🌸', color: '#fce7f3' },
    { name: 'summer', icon: '☀️', color: '#fef9c3' },
    { name: 'autumn', icon: '🍂', color: '#ffedd5' },
  ] as const

  return (
    <div className="fixed top-4 left-4 flex gap-2 z-[9999] p-2 rounded-xl bg-white/30 backdrop-blur-md">
      {seasons.map((season) => (
        <Button
          key={season.name}
          variant={currentSeason === season.name ? "default" : "secondary"}
          size="icon"
          onClick={() => setCurrentSeason(season.name)}
          className={`
            w-10 h-10 transition-all duration-300 hover:scale-110
            flex items-center justify-center rounded-lg
            ${currentSeason === season.name 
              ? `bg-[${season.color}] shadow-lg` 
              : `bg-white/70 hover:bg-[${season.color}]`
            }
          `}
          title={`Switch to ${season.name}`}
        >
          <span className="text-lg">{season.icon}</span>
        </Button>
      ))}
    </div>
  )
} 