import { type Season } from '../../types/seasons'

interface BeachBallProps extends React.SVGProps<SVGSVGElement> {
  season?: Season
}

const seasonColors: Record<Season, {
  fill: string
  stroke: string
  opacity: number
}> = {
  winter: {
    fill: '#ffffff',
    stroke: '#86c5da',
    opacity: 0.9
  },
  spring: {
    fill: '#ffb7c5',
    stroke: '#ffffff',
    opacity: 0.8
  },
  summer: {
    fill: '#edba7c',
    stroke: '#ffffff',
    opacity: 0.8
  },
  autumn: {
    fill: '#e67e22',
    stroke: '#ffffff',
    opacity: 0.8
  }
}

export function BeachBall({ season = 'summer', ...props }: BeachBallProps) {
  const colors = seasonColors[season]

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="60" cy="60" r="50" fill={colors.fill} opacity={colors.opacity}/>
      <path d="M60 10 A50 50 0 0 1 60 110" stroke={colors.stroke} strokeWidth="2"/>
      <path d="M10 60 A50 50 0 0 1 110 60" stroke={colors.stroke} strokeWidth="2"/>
      <path d="M22 30 A50 50 0 0 1 98 30" stroke={colors.stroke} strokeWidth="2"/>
      <path d="M22 90 A50 50 0 0 1 98 90" stroke={colors.stroke} strokeWidth="2"/>
    </svg>
  )
} 