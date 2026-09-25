import type { GameAction, GameState } from '../types'
import { Button } from './ui/Button'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function VerdictScreen({ state, dispatch }: Props) {
  const defender = state.players[state.defenderIndex]

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-10 text-center">
      <div>
        <p className="text-sm font-medium tracking-wide text-ink-muted uppercase">Veredicto</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          ¿Te ha convencido {defender.name}?
        </h1>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4">
        <Button
          variant="success"
          onClick={() => dispatch({ type: 'SUBMIT_VERDICT', success: true })}
        >
          🏆 Me ha convencido
        </Button>
        <Button
          variant="danger"
          onClick={() => dispatch({ type: 'SUBMIT_VERDICT', success: false })}
        >
          💀 Ni de coña
        </Button>
      </div>
    </div>
  )
}
