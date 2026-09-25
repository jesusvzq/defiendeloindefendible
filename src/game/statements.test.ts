import { describe, expect, it } from 'vitest'
import type { Statement } from '../types'
import { getAvailableStatements, pickRandomStatement } from './statements'

const pool: Statement[] = [
  { id: 'a', text: 'A' },
  { id: 'b', text: 'B' },
  { id: 'c', text: 'C' },
]

describe('getAvailableStatements', () => {
  it('excludes used ids', () => {
    const available = getAvailableStatements(pool, ['a'])
    expect(available.map((s) => s.id)).toEqual(['b', 'c'])
  })

  it('falls back to the full pool when exhausted', () => {
    const available = getAvailableStatements(pool, ['a', 'b', 'c'])
    expect(available).toHaveLength(3)
  })
})

describe('pickRandomStatement', () => {
  it('only returns items from the available set', () => {
    const available = getAvailableStatements(pool, ['a'])
    for (let i = 0; i < 20; i++) {
      const picked = pickRandomStatement(available)
      expect(['b', 'c']).toContain(picked.id)
    }
  })
})
