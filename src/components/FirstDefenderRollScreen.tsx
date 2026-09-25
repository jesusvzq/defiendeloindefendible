import { useEffect } from 'react'
import type { GameAction } from '../types'

interface Props {
  dispatch: React.Dispatch<GameAction>
}

export function FirstDefenderRollScreen({ dispatch }: Props) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      dispatch({ type: 'FIRST_DEFENDER_ROLLED' })
    }, 1200)
    return () => window.clearTimeout(timeout)
  }, [dispatch])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="animate-dice-roll text-7xl">🎲</div>
      <p className="font-display text-2xl text-ink">Vamos a decidir quién empieza...</p>
    </div>
  )
}
