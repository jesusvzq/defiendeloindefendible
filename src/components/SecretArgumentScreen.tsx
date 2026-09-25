import { STATEMENTS } from '../data/statements'
import type { GameAction, GameState } from '../types'
import { Button } from './ui/Button'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

function formatDuration(sec: number): string {
  const minutes = Math.floor(sec / 60)
  const seconds = sec % 60
  if (seconds === 0) return `${minutes} minuto${minutes === 1 ? '' : 's'}`
  return `${minutes}:${seconds.toString().padStart(2, '0')} minutos`
}

export function SecretArgumentScreen({ state, dispatch }: Props) {
  const defender = state.players[state.defenderIndex]
  const statement = STATEMENTS.find((s) => s.id === state.currentStatementId)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className="font-display text-lg font-semibold tracking-wide text-danger uppercase">
          🔒 Solo para {defender.name}
        </p>
        <p className="text-ink-muted">No dejes que la otra persona vea esta pantalla.</p>
      </div>

      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-surface-raised px-6 py-10">
        <p className="font-display text-2xl leading-snug text-ink">
          "{statement?.text}"
        </p>
      </div>

      <p className="text-ink-muted">
        Tienes {formatDuration(state.config.defenseDurationSec)} para defenderlo.
      </p>

      <Button onClick={() => dispatch({ type: 'BEGIN_DEFENSE' })}>Empezar defensa</Button>
    </div>
  )
}
