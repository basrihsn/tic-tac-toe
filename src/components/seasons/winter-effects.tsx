'use client'

import { Snow } from '../Snow'
import { Snowman } from '../Snowman'

export function WinterEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Snow />
      <div className="snowmen-container">
        <Snowman position="left" />
        <Snowman position="right" />
      </div>
    </div>
  )
} 