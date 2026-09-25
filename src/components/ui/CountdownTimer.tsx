function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

interface CountdownTimerProps {
  remainingMs: number
}

export function CountdownTimer({ remainingMs }: CountdownTimerProps) {
  const remainingSec = remainingMs / 1000
  const isUrgent = remainingSec <= 10
  const isWarning = remainingSec <= 30

  return (
    <div
      className={[
        'font-display tabular-nums transition-all duration-300',
        isUrgent
          ? 'text-danger text-8xl animate-urgent-pulse'
          : isWarning
            ? 'text-brand text-7xl'
            : 'text-ink text-6xl',
      ].join(' ')}
    >
      {formatTime(remainingMs)}
    </div>
  )
}
