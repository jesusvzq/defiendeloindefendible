export type PlayerIndex = 0 | 1

export interface Player {
  name: string
}

export interface Statement {
  id: string
  text: string
}

export const DEFENSE_DURATIONS_SEC = [60, 90, 120, 150, 180] as const
export type DefenseDurationSec = (typeof DEFENSE_DURATIONS_SEC)[number]
export const DEFAULT_DEFENSE_DURATION_SEC: DefenseDurationSec = 120

export const MIN_ROUNDS = 5
export const MAX_ROUNDS = 20
export const DEFAULT_ROUNDS = 10

export interface GameConfig {
  defenseDurationSec: DefenseDurationSec
  totalRounds: number
}

export interface RoundRecord {
  round: number
  defenderIndex: PlayerIndex
  statementId: string
  success: boolean
  pointsAwarded: number
}

export type PhaseName =
  | 'setup'
  | 'instructions'
  | 'config'
  | 'pickingFirstDefender'
  | 'revealDefender'
  | 'secretArgument'
  | 'defense'
  | 'verdict'
  | 'roundResult'
  | 'gameOver'

export interface GameState {
  phase: PhaseName
  players: [Player, Player]
  config: GameConfig
  round: number
  defenderIndex: PlayerIndex
  isFirstReveal: boolean
  currentStatementId: string | null
  usedStatementIds: string[]
  roundHistory: RoundRecord[]
  defenseDeadlineAt: number | null
  pausedRemainingMs: number | null
  lastVerdict: { success: boolean; pointsAwarded: number } | null
}

export type GameAction =
  | { type: 'SETUP_SUBMITTED'; players: [Player, Player] }
  | { type: 'INSTRUCTIONS_DONE' }
  | { type: 'CONFIG_SUBMITTED'; config: GameConfig }
  | { type: 'FIRST_DEFENDER_ROLLED' }
  | { type: 'DEFENDER_REVEAL_DONE' }
  | { type: 'BEGIN_DEFENSE' }
  | { type: 'PAUSE_DEFENSE' }
  | { type: 'RESUME_DEFENSE' }
  | { type: 'END_DEFENSE_EARLY' }
  | { type: 'TIMER_EXPIRED' }
  | { type: 'SUBMIT_VERDICT'; success: boolean }
  | { type: 'NEXT_ROUND' }
  | { type: 'PLAY_AGAIN' }
  | { type: 'NEW_GAME' }
  | { type: 'LOAD_PERSISTED'; state: GameState }

export interface PlayerStats {
  wins: number
  losses: number
  longestStreak: number
}

export interface GameOverSummary {
  totalRounds: number
  scores: [number, number]
  stats: [PlayerStats, PlayerStats]
  winner: PlayerIndex | 'tie'
}
