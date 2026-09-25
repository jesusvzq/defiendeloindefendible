import { describe, expect, it } from 'vitest'
import type { RoundRecord } from '../types'
import { computeScores, computeStats, deriveSummary } from './summary'

function record(
  round: number,
  defenderIndex: 0 | 1,
  success: boolean,
): RoundRecord {
  return {
    round,
    defenderIndex,
    statementId: `s${round}`,
    success,
    pointsAwarded: success ? 1 : 0,
  }
}

describe('computeScores', () => {
  it('sums points per player', () => {
    const history = [record(1, 0, true), record(2, 1, false), record(3, 0, true)]
    expect(computeScores(history)).toEqual([2, 0])
  })
})

describe('computeStats', () => {
  it('computes wins, losses and longest streak, resetting on a loss', () => {
    // player 0 defends rounds 1,3,4,6: success, success, fail, success
    const history = [
      record(1, 0, true),
      record(2, 1, true),
      record(3, 0, true),
      record(4, 0, false),
      record(5, 1, false),
      record(6, 0, true),
    ]
    const stats = computeStats(history, 0)
    expect(stats.wins).toBe(3)
    expect(stats.losses).toBe(1)
    expect(stats.longestStreak).toBe(2)
  })
})

describe('deriveSummary', () => {
  it('detects a winner', () => {
    const history = [record(1, 0, true), record(2, 1, false)]
    const summary = deriveSummary(history)
    expect(summary.totalRounds).toBe(2)
    expect(summary.scores).toEqual([1, 0])
    expect(summary.winner).toBe(0)
  })

  it('detects a tie', () => {
    const history = [record(1, 0, true), record(2, 1, true)]
    const summary = deriveSummary(history)
    expect(summary.winner).toBe('tie')
  })
})
