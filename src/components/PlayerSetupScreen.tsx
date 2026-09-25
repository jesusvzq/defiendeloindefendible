import { useState } from 'react'
import type { GameAction } from '../types'
import { Button } from './ui/Button'

interface Props {
  dispatch: React.Dispatch<GameAction>
}

export function PlayerSetupScreen({ dispatch }: Props) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')

  const canStart = name1.trim().length > 0 && name2.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canStart) return
    dispatch({
      type: 'SETUP_SUBMITTED',
      players: [{ name: name1.trim() }, { name: name2.trim() }],
    })
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-10 text-center">
      <div>
        <h1 className="font-display text-4xl font-semibold text-ink">
          Defiende lo Indefendible
        </h1>
        <p className="mt-3 text-ink-muted">
          Un juego para dos. Prepara vuestros nombres para empezar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
        <label className="flex flex-col gap-2 text-left">
          <span className="text-sm font-medium text-ink-muted">Jugador 1</span>
          <input
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Nombre"
            maxLength={20}
            className="min-h-14 rounded-2xl border border-white/10 bg-surface-raised px-4 text-lg text-ink placeholder:text-ink-muted/50 focus:border-brand focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <span className="text-sm font-medium text-ink-muted">Jugador 2</span>
          <input
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Nombre"
            maxLength={20}
            className="min-h-14 rounded-2xl border border-white/10 bg-surface-raised px-4 text-lg text-ink placeholder:text-ink-muted/50 focus:border-brand focus:outline-none"
          />
        </label>

        <Button type="submit" disabled={!canStart} className="mt-2">
          Continuar
        </Button>
      </form>
    </div>
  )
}
