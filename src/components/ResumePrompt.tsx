import { computeScores } from '../game/summary'
import type { GameState } from '../types'
import { Button } from './ui/Button'

interface Props {
  state: GameState
  onContinue: () => void
  onNewGame: () => void
}

export function ResumePrompt({ state, onContinue, onNewGame }: Props) {
  const scores = computeScores(state.roundHistory)
  const [p1, p2] = state.players

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Tienes una partida en curso
      </h1>
      <p className="text-ink-muted">
        Ronda {state.round} de {state.config.totalRounds}
      </p>
      <p className="font-display text-2xl text-ink">
        {p1.name} {scores[0]} — {scores[1]} {p2.name}
      </p>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <Button onClick={onContinue}>Continuar partida</Button>
        <Button variant="secondary" onClick={onNewGame}>
          Nueva partida
        </Button>
      </div>
    </div>
  )
}
