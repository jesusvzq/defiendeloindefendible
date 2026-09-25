import { useEffect, useState } from 'react'

export interface CountdownResult {
  remainingMs: number
  isExpired: boolean
}

/**
 * Purely a display layer over a wall-clock deadline — the deadline itself
 * (persisted in GameState) is the source of truth, so this survives refresh.
 */
export function useCountdown(
  deadlineAt: number | null,
  pausedRemainingMs: number | null,
): CountdownResult {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (deadlineAt === null) return
    const interval = window.setInterval(() => setNow(Date.now()), 200)
    return () => window.clearInterval(interval)
  }, [deadlineAt])

  if (deadlineAt !== null) {
    const remainingMs = Math.max(0, deadlineAt - now)
    return { remainingMs, isExpired: remainingMs <= 0 }
  }

  if (pausedRemainingMs !== null) {
    return { remainingMs: pausedRemainingMs, isExpired: false }
  }

  return { remainingMs: 0, isExpired: false }
}
