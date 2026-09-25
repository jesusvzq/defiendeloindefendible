import type { GameOverSummary, PlayerIndex, PlayerStats, RoundRecord } from '../types'

export function computeScores(history: RoundRecord[]): [number, number] {
  const scores: [number, number] = [0, 0]
  for (const record of history) {
    scores[record.defenderIndex] += record.pointsAwarded
  }
  return scores
}

export function computeStats(history: RoundRecord[], playerIndex: PlayerIndex): PlayerStats {
  const records = history.filter((r) => r.defenderIndex === playerIndex)

  let wins = 0
  let losses = 0
  let currentStreak = 0
  let longestStreak = 0

  for (const record of records) {
    if (record.success) {
      wins += 1
      currentStreak += 1
      longestStreak = Math.max(longestStreak, currentStreak)
    } else {
      losses += 1
      currentStreak = 0
    }
  }

  return { wins, losses, longestStreak }
}

export function deriveSummary(history: RoundRecord[]): GameOverSummary {
  const scores = computeScores(history)
  const stats: [PlayerStats, PlayerStats] = [computeStats(history, 0), computeStats(history, 1)]
  const winner: PlayerIndex | 'tie' = scores[0] === scores[1] ? 'tie' : scores[0] > scores[1] ? 0 : 1

  return {
    totalRounds: history.length,
    scores,
    stats,
    winner,
  }
}
