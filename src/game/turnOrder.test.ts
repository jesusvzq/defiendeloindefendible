import { describe, expect, it } from 'vitest'
import { nextDefenderIndex, pickFirstDefender } from './turnOrder'

describe('pickFirstDefender', () => {
  it('returns only 0 or 1, seeing both over many runs', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 200; i++) {
      const value = pickFirstDefender()
      expect([0, 1]).toContain(value)
      seen.add(value)
    }
    expect(seen).toEqual(new Set([0, 1]))
  })
})

describe('nextDefenderIndex', () => {
  it('always flips', () => {
    expect(nextDefenderIndex(0)).toBe(1)
    expect(nextDefenderIndex(1)).toBe(0)
  })
})
