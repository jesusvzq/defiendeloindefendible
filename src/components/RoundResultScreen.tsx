import { computeScores } from '../game/summary'
import type { GameAction, GameState } from '../types'
import { Button } from './ui/Button'
import { ScoreBadge } from './ui/ScoreBadge'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function RoundResultScreen({ state, dispatch }: Props) {
  const defender = state.players[state.defenderIndex]
  const scores = computeScores(state.roundHistory)
  const verdict = state.lastVerdict

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      {verdict?.success ? (
        <>
          <p className="text-6xl">🏆</p>
          <h1 className="font-display text-3xl font-semibold text-ink">
            ¡Defensa convincente!
          </h1>
        </>
      ) : (
        <>
          <p className="text-6xl">💀</p>
          <h1 className="font-display text-3xl font-semibold text-ink">
            No te ha comprado la moto
          </h1>
        </>
      )}

      <p className="text-xl text-ink-muted">
        {defender.name} +{verdict?.pointsAwarded ?? 0} punto{verdict?.pointsAwarded === 1 ? '' : 's'}
      </p>

      <div className="flex gap-3">
        <ScoreBadge name={state.players[0].name} score={scores[0]} />
        <ScoreBadge name={state.players[1].name} score={scores[1]} />
      </div>

      <Button onClick={() => dispatch({ type: 'NEXT_ROUND' })}>
        {state.round >= state.config.totalRounds ? 'Ver resultados' : 'Siguiente ronda'}
      </Button>
    </div>
  )
}
