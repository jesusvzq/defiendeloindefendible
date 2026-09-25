import type { PlayerIndex } from '../types'

export function pickFirstDefender(): PlayerIndex {
  return Math.random() < 0.5 ? 0 : 1
}

export function nextDefenderIndex(current: PlayerIndex): PlayerIndex {
  return current === 0 ? 1 : 0
}
