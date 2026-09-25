import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { GameState } from '../types'
import { createInitialState, gameReducer } from './gameReducer'

describe('gameReducer', () => {
  it('setup -> instructions -> config flow', () => {
    let state = createInitialState()
    state = gameReducer(state, {
      type: 'SETUP_SUBMITTED',
      players: [{ name: 'Ana' }, { name: 'Carlos' }],
    })
    expect(state.phase).toBe('instructions')
    expect(state.players[0].name).toBe('Ana')

    state = gameReducer(state, { type: 'INSTRUCTIONS_DONE' })
    expect(state.phase).toBe('config')

    state = gameReducer(state, {
      type: 'CONFIG_SUBMITTED',
      config: { defenseDurationSec: 90, totalRounds: 5 },
    })
    expect(state.phase).toBe('pickingFirstDefender')
    expect(state.config.totalRounds).toBe(5)
  })

  it('picks a first defender and a statement, marking it used', () => {
    let state = createInitialState()
    state = { ...state, config: { defenseDurationSec: 120, totalRounds: 5 } }
    state = gameReducer(state, { type: 'FIRST_DEFENDER_ROLLED' })
    expect([0, 1]).toContain(state.defenderIndex)
    expect(state.currentStatementId).not.toBeNull()
    expect(state.usedStatementIds).toEqual([state.currentStatementId])
    expect(state.phase).toBe('revealDefender')
  })

  it('NEXT_ROUND alternates defender and never repeats a statement across all rounds', () => {
    let state = createInitialState()
    state = { ...state, config: { defenseDurationSec: 120, totalRounds: 8 } }
    state = gameReducer(state, { type: 'FIRST_DEFENDER_ROLLED' })
    const defenders = [state.defenderIndex]
    const statements = [state.currentStatementId]

    for (let i = 0; i < 7; i++) {
      state = gameReducer(state, { type: 'DEFENDER_REVEAL_DONE' })
      state = gameReducer(state, { type: 'BEGIN_DEFENSE' })
      state = gameReducer(state, { type: 'TIMER_EXPIRED' })
      state = gameReducer(state, { type: 'SUBMIT_VERDICT', success: true })
      state = gameReducer(state, { type: 'NEXT_ROUND' })
      expect(state.phase).toBe('revealDefender')
      defenders.push(state.defenderIndex)
      statements.push(state.currentStatementId)
    }

    for (let i = 1; i < defenders.length; i++) {
      expect(defenders[i]).not.toBe(defenders[i - 1])
    }
    expect(new Set(statements).size).toBe(statements.length)
  })

  it('ends the game after the configured number of rounds', () => {
    let state = createInitialState()
    state = { ...state, config: { defenseDurationSec: 60, totalRounds: 2 } }
    state = gameReducer(state, { type: 'FIRST_DEFENDER_ROLLED' })
    state = gameReducer(state, { type: 'DEFENDER_REVEAL_DONE' })
    state = gameReducer(state, { type: 'BEGIN_DEFENSE' })
    state = gameReducer(state, { type: 'TIMER_EXPIRED' })
    state = gameReducer(state, { type: 'SUBMIT_VERDICT', success: true })
    expect(state.round).toBe(1)

    state = gameReducer(state, { type: 'NEXT_ROUND' })
    expect(state.phase).toBe('revealDefender')
    expect(state.round).toBe(2)

    state = gameReducer(state, { type: 'DEFENDER_REVEAL_DONE' })
    state = gameReducer(state, { type: 'BEGIN_DEFENSE' })
    state = gameReducer(state, { type: 'TIMER_EXPIRED' })
    state = gameReducer(state, { type: 'SUBMIT_VERDICT', success: false })
    state = gameReducer(state, { type: 'NEXT_ROUND' })
    expect(state.phase).toBe('gameOver')
  })

  describe('pause/resume preserves remaining time', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('keeps the exact remaining duration across a pause', () => {
      let state = createInitialState()
      state = { ...state, config: { defenseDurationSec: 120, totalRounds: 5 } }
      state = gameReducer(state, { type: 'BEGIN_DEFENSE' })
      expect(state.defenseDeadlineAt).toBe(Date.now() + 120_000)

      vi.setSystemTime(new Date('2026-01-01T00:01:30Z')) // 90s elapsed
      state = gameReducer(state, { type: 'PAUSE_DEFENSE' })
      expect(state.defenseDeadlineAt).toBeNull()
      expect(state.pausedRemainingMs).toBe(30_000)

      vi.setSystemTime(new Date('2026-01-01T00:05:00Z')) // paused for a while
      state = gameReducer(state, { type: 'RESUME_DEFENSE' })
      expect(state.pausedRemainingMs).toBeNull()
      expect(state.defenseDeadlineAt).toBe(Date.now() + 30_000)
    })
  })

  it('PLAY_AGAIN keeps player names but resets everything else', () => {
    let state = createInitialState()
    state = gameReducer(state, {
      type: 'SETUP_SUBMITTED',
      players: [{ name: 'Ana' }, { name: 'Carlos' }],
    })
    state = { ...state, round: 4, usedStatementIds: ['s01', 's02'], roundHistory: [
      { round: 1, defenderIndex: 0, statementId: 's01', success: true, pointsAwarded: 1 },
    ] }

    state = gameReducer(state, { type: 'PLAY_AGAIN' })
    expect(state.players[0].name).toBe('Ana')
    expect(state.players[1].name).toBe('Carlos')
    expect(state.round).toBe(1)
    expect(state.usedStatementIds).toEqual([])
    expect(state.roundHistory).toEqual([])
    expect(state.phase).toBe('pickingFirstDefender')
  })

  it('NEW_GAME resets player names too', () => {
    let state = createInitialState()
    state = gameReducer(state, {
      type: 'SETUP_SUBMITTED',
      players: [{ name: 'Ana' }, { name: 'Carlos' }],
    })
    state = gameReducer(state, { type: 'NEW_GAME' })
    expect(state.players[0].name).toBe('')
    expect(state.players[1].name).toBe('')
    expect(state.phase).toBe('setup')
  })

  it('LOAD_PERSISTED replaces state wholesale', () => {
    const state = createInitialState()
    const persisted: GameState = { ...state, round: 7 }
    const next = gameReducer(state, { type: 'LOAD_PERSISTED', state: persisted })
    expect(next.round).toBe(7)
  })
})
