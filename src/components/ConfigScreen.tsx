import { useState } from 'react'
import {
  DEFAULT_DEFENSE_DURATION_SEC,
  DEFAULT_ROUNDS,
  DEFENSE_DURATIONS_SEC,
  MAX_ROUNDS,
  MIN_ROUNDS,
  type DefenseDurationSec,
  type GameAction,
} from '../types'
import { Button } from './ui/Button'

interface Props {
  dispatch: React.Dispatch<GameAction>
}

function formatDuration(sec: number): string {
  const minutes = Math.floor(sec / 60)
  const seconds = sec % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const ROUND_OPTIONS = Array.from(
  { length: MAX_ROUNDS - MIN_ROUNDS + 1 },
  (_, i) => MIN_ROUNDS + i,
)

export function ConfigScreen({ dispatch }: Props) {
  const [duration, setDuration] = useState<DefenseDurationSec>(DEFAULT_DEFENSE_DURATION_SEC)
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS)

  function handleStart() {
    dispatch({
      type: 'CONFIG_SUBMITTED',
      config: { defenseDurationSec: duration, totalRounds: rounds },
    })
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-10 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Antes de empezar</h1>

      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col gap-3 text-left">
          <span className="text-sm font-medium text-ink-muted">Tiempo de defensa</span>
          <div className="flex flex-wrap gap-2">
            {DEFENSE_DURATIONS_SEC.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setDuration(sec)}
                className={`min-h-12 rounded-xl px-4 text-lg font-medium transition-colors ${
                  duration === sec
                    ? 'bg-brand text-surface'
                    : 'bg-surface-raised text-ink-muted hover:text-ink'
                }`}
              >
                {formatDuration(sec)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-left">
          <span className="text-sm font-medium text-ink-muted">Número de rondas</span>
          <select
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
            className="min-h-14 rounded-2xl border border-white/10 bg-surface-raised px-4 text-lg text-ink focus:border-brand focus:outline-none"
          >
            {ROUND_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} rondas
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button onClick={handleStart}>Empezar partida</Button>
    </div>
  )
}
