import { useEffect, useRef, useState } from 'react'
import { STATEMENTS } from '../data/statements'
import { useCountdown } from '../hooks/useCountdown'
import type { GameAction, GameState } from '../types'
import { ConfirmEndDefenseDialog } from './ConfirmEndDefenseDialog'
import { Button } from './ui/Button'
import { CountdownTimer } from './ui/CountdownTimer'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function DefenseScreen({ state, dispatch }: Props) {
  const [confirmingEnd, setConfirmingEnd] = useState(false)
  const { remainingMs, isExpired } = useCountdown(state.defenseDeadlineAt, state.pausedRemainingMs)
  const expiredDispatched = useRef(false)

  const defender = state.players[state.defenderIndex]
  const listener = state.players[state.defenderIndex === 0 ? 1 : 0]
  const statement = STATEMENTS.find((s) => s.id === state.currentStatementId)
  const isPaused = state.pausedRemainingMs !== null

  useEffect(() => {
    if (isExpired && !expiredDispatched.current) {
      expiredDispatched.current = true
      dispatch({ type: 'TIMER_EXPIRED' })
    }
  }, [isExpired, dispatch])

  if (isPaused) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Juego pausado</h1>
        <Button onClick={() => dispatch({ type: 'RESUME_DEFENSE' })}>Continuar</Button>
      </div>
    )
  }

  if (isExpired) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
        <h1 className="font-display text-5xl font-bold text-danger">¡TIEMPO!</h1>
        <Button onClick={() => dispatch({ type: 'TIMER_EXPIRED' })}>Veredicto</Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <p className="text-sm font-medium tracking-wide text-ink-muted uppercase">
        Ronda {state.round} / {state.config.totalRounds}
      </p>
      <h2 className="font-display text-2xl font-semibold text-ink">
        {defender.name} defiende
      </h2>

      <p className="max-w-sm text-xl leading-snug text-ink">"{statement?.text}"</p>

      <CountdownTimer remainingMs={remainingMs} />

      <p className="text-sm font-medium tracking-wide text-ink-muted uppercase">
        {listener.name} puede hacer preguntas
      </p>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => dispatch({ type: 'PAUSE_DEFENSE' })}>
          Pausar
        </Button>
        <Button variant="ghost" onClick={() => setConfirmingEnd(true)}>
          Terminar defensa
        </Button>
      </div>

      {confirmingEnd && (
        <ConfirmEndDefenseDialog
          onCancel={() => setConfirmingEnd(false)}
          onConfirm={() => {
            setConfirmingEnd(false)
            dispatch({ type: 'END_DEFENSE_EARLY' })
          }}
        />
      )}
    </div>
  )
}
