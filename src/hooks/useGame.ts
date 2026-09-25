import { useEffect, useReducer } from 'react'
import { createInitialState, gameReducer } from '../game/gameReducer'
import { clearGameState, saveGameState } from '../game/persistence'
import type { GameState } from '../types'

export function useGame(initialState?: GameState) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    () => initialState ?? createInitialState(),
  )

  useEffect(() => {
    if (state.phase === 'setup' || state.phase === 'gameOver') {
      clearGameState()
    } else {
      saveGameState(state)
    }
  }, [state])

  useEffect(() => {
    if (state.phase === 'defense' && state.defenseDeadlineAt !== null && state.defenseDeadlineAt <= Date.now()) {
      dispatch({ type: 'TIMER_EXPIRED' })
    }
    // Only relevant right after mount/resume — subsequent expiry is handled by the countdown UI.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { state, dispatch }
}
