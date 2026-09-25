import type { GameAction, GameState } from '../types'
import { Button } from './ui/Button'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function DefenderRevealScreen({ state, dispatch }: Props) {
  const defender = state.players[state.defenderIndex]

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="text-sm font-medium tracking-wide text-ink-muted uppercase">
        Ronda {state.round} / {state.config.totalRounds}
      </p>
      <h1 className="font-display text-4xl font-semibold text-ink">
        {state.isFirstReveal ? 'Empieza' : 'Le toca a'}
        <br />
        <span className="text-brand">{defender.name}</span>
      </h1>
      <Button onClick={() => dispatch({ type: 'DEFENDER_REVEAL_DONE' })}>Continuar</Button>
    </div>
  )
}
