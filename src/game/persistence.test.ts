import { beforeEach, describe, expect, it } from 'vitest'
import type { GameState } from '../types'
import { clearGameState, hasGameInProgress, loadGameState, saveGameState } from './persistence'

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: 'setup',
    players: [{ name: 'Ana' }, { name: 'Carlos' }],
    config: { defenseDurationSec: 120, totalRounds: 10 },
    round: 1,
    defenderIndex: 0,
    isFirstReveal: true,
    currentStatementId: null,
    usedStatementIds: [],
    roundHistory: [],
    defenseDeadlineAt: null,
    pausedRemainingMs: null,
    lastVerdict: null,
    ...overrides,
  }
}

beforeEach(() => {
  localStorage.clear()
})

describe('persistence', () => {
  it('round-trips state through save/load', () => {
    const state = makeState({ phase: 'defense', round: 3 })
    saveGameState(state)
    expect(loadGameState()).toEqual(state)
  })

  it('returns null when nothing is stored', () => {
    expect(loadGameState()).toBeNull()
  })

  it('falls back to null on corrupted JSON', () => {
    localStorage.setItem('defiende.v1', '{not valid json')
    expect(loadGameState()).toBeNull()
  })

  it('clears stored state', () => {
    saveGameState(makeState())
    clearGameState()
    expect(loadGameState()).toBeNull()
  })
})

describe('hasGameInProgress', () => {
  it('is false for null, setup, and gameOver', () => {
    expect(hasGameInProgress(null)).toBe(false)
    expect(hasGameInProgress(makeState({ phase: 'setup' }))).toBe(false)
    expect(hasGameInProgress(makeState({ phase: 'gameOver' }))).toBe(false)
  })

  it('is true for mid-game phases', () => {
    expect(hasGameInProgress(makeState({ phase: 'defense' }))).toBe(true)
    expect(hasGameInProgress(makeState({ phase: 'verdict' }))).toBe(true)
  })
})
