import type { Statement } from '../types'

export function getAvailableStatements(pool: Statement[], usedIds: string[]): Statement[] {
  const available = pool.filter((s) => !usedIds.includes(s.id))
  // Defensive fallback: never leave the game with no statement to show,
  // even if configured rounds exceeds the pool size.
  return available.length > 0 ? available : pool
}

export function pickRandomStatement(available: Statement[]): Statement {
  const index = Math.floor(Math.random() * available.length)
  return available[index]
}
