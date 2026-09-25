import { deriveSummary } from '../game/summary'
import type { GameAction, GameState } from '../types'
import { Button } from './ui/Button'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function GameOverScreen({ state, dispatch }: Props) {
  const summary = deriveSummary(state.roundHistory)
  const [p1, p2] = state.players

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <p className="text-sm font-medium tracking-wide text-ink-muted uppercase">
        Partida terminada
      </p>

      {summary.winner === 'tie' ? (
        <h1 className="font-display text-4xl font-bold text-brand">¡Empate!</h1>
      ) : (
        <h1 className="font-display text-4xl font-bold text-brand">
          🎉 ¡Gana {state.players[summary.winner].name}!
        </h1>
      )}

      <div className="flex w-full max-w-sm gap-4">
        {[p1, p2].map((player, i) => (
          <div
            key={i}
            className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-surface-raised px-4 py-6"
          >
            <span className="font-display text-lg font-semibold text-ink uppercase">
              {player.name}
            </span>
            <span className="font-display text-4xl font-bold text-brand">
              {summary.scores[i]}
            </span>
            <span className="text-sm text-ink-muted">puntos</span>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-sm flex-col gap-2 rounded-2xl bg-surface-raised px-6 py-5 text-left text-sm text-ink-muted">
        <p>Total de rondas: {summary.totalRounds}</p>
        {[p1, p2].map((player, i) => (
          <p key={i}>
            {player.name}: {summary.stats[i].wins} defensas exitosas ·{' '}
            {summary.stats[i].losses} fallidas · racha máxima {summary.stats[i].longestStreak}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={() => dispatch({ type: 'PLAY_AGAIN' })}>Jugar otra vez</Button>
        <Button variant="ghost" onClick={() => dispatch({ type: 'NEW_GAME' })}>
          Nueva partida con otros jugadores
        </Button>
      </div>
    </div>
  )
}
