interface ScoreBadgeProps {
  name: string
  score: number
  highlight?: boolean
}

export function ScoreBadge({ name, score, highlight = false }: ScoreBadgeProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm ${
        highlight ? 'bg-brand/20 text-brand' : 'bg-white/5 text-ink-muted'
      }`}
    >
      <span className="font-medium">{name}</span>
      <span className="font-display font-semibold">{score}</span>
    </div>
  )
}
