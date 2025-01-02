import { create } from 'zustand'

export type Season = 'winter' | 'spring' | 'summer' | 'autumn'

interface SeasonState {
  currentSeason: Season
  setCurrentSeason: (season: Season) => void
}

export const useSeasonStore = create<SeasonState>()((set) => ({
  currentSeason: 'winter',
  setCurrentSeason: (season: Season) => set({ currentSeason: season }),
})) 