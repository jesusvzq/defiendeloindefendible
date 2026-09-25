import type { GameState } from '../types'

const STORAGE_KEY = 'defiende.v1'

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore quota/private-mode failures — persistence is best-effort.
  }
}

export function loadGameState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as GameState
  } catch {
    return null
  }
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore.
  }
}

export function hasGameInProgress(state: GameState | null): boolean {
  if (!state) return false
  return state.phase !== 'setup' && state.phase !== 'gameOver'
}
