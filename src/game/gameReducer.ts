import {
  DEFAULT_DEFENSE_DURATION_SEC,
  DEFAULT_ROUNDS,
  type GameAction,
  type GameState,
} from '../types'
import { getAvailableStatements, pickRandomStatement } from './statements'
import { nextDefenderIndex, pickFirstDefender } from './turnOrder'
import { STATEMENTS } from '../data/statements'

export function createInitialState(): GameState {
  return {
    phase: 'setup',
    players: [{ name: '' }, { name: '' }],
    config: {
      defenseDurationSec: DEFAULT_DEFENSE_DURATION_SEC,
      totalRounds: DEFAULT_ROUNDS,
    },
    round: 1,
    defenderIndex: 0,
    isFirstReveal: true,
    currentStatementId: null,
    usedStatementIds: [],
    roundHistory: [],
    defenseDeadlineAt: null,
    pausedRemainingMs: null,
    lastVerdict: null,
  }
}

function pickNextStatementId(usedStatementIds: string[]): string {
  const available = getAvailableStatements(STATEMENTS, usedStatementIds)
  return pickRandomStatement(available).id
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SETUP_SUBMITTED':
      return { ...state, players: action.players, phase: 'instructions' }

    case 'INSTRUCTIONS_DONE':
      return { ...state, phase: 'config' }

    case 'CONFIG_SUBMITTED':
      return {
        ...state,
        config: action.config,
        round: 1,
        phase: 'pickingFirstDefender',
      }

    case 'FIRST_DEFENDER_ROLLED': {
      const statementId = pickNextStatementId(state.usedStatementIds)
      return {
        ...state,
        defenderIndex: pickFirstDefender(),
        currentStatementId: statementId,
        usedStatementIds: [...state.usedStatementIds, statementId],
        isFirstReveal: true,
        phase: 'revealDefender',
      }
    }

    case 'DEFENDER_REVEAL_DONE':
      return { ...state, phase: 'secretArgument' }

    case 'BEGIN_DEFENSE':
      return {
        ...state,
        phase: 'defense',
        defenseDeadlineAt: Date.now() + state.config.defenseDurationSec * 1000,
        pausedRemainingMs: null,
      }

    case 'PAUSE_DEFENSE': {
      if (state.defenseDeadlineAt === null) return state
      return {
        ...state,
        pausedRemainingMs: Math.max(0, state.defenseDeadlineAt - Date.now()),
        defenseDeadlineAt: null,
      }
    }

    case 'RESUME_DEFENSE': {
      if (state.pausedRemainingMs === null) return state
      return {
        ...state,
        defenseDeadlineAt: Date.now() + state.pausedRemainingMs,
        pausedRemainingMs: null,
      }
    }

    case 'END_DEFENSE_EARLY':
    case 'TIMER_EXPIRED':
      return {
        ...state,
        phase: 'verdict',
        defenseDeadlineAt: null,
        pausedRemainingMs: null,
      }

    case 'SUBMIT_VERDICT': {
      const pointsAwarded = action.success ? 1 : 0
      const record = {
        round: state.round,
        defenderIndex: state.defenderIndex,
        statementId: state.currentStatementId ?? '',
        success: action.success,
        pointsAwarded,
      }
      return {
        ...state,
        roundHistory: [...state.roundHistory, record],
        lastVerdict: { success: action.success, pointsAwarded },
        phase: 'roundResult',
      }
    }

    case 'NEXT_ROUND': {
      if (state.round >= state.config.totalRounds) {
        return { ...state, phase: 'gameOver' }
      }
      const statementId = pickNextStatementId(state.usedStatementIds)
      return {
        ...state,
        round: state.round + 1,
        defenderIndex: nextDefenderIndex(state.defenderIndex),
        currentStatementId: statementId,
        usedStatementIds: [...state.usedStatementIds, statementId],
        isFirstReveal: false,
        phase: 'revealDefender',
      }
    }

    case 'PLAY_AGAIN':
      return {
        ...state,
        round: 1,
        usedStatementIds: [],
        roundHistory: [],
        currentStatementId: null,
        defenseDeadlineAt: null,
        pausedRemainingMs: null,
        lastVerdict: null,
        phase: 'pickingFirstDefender',
      }

    case 'NEW_GAME':
      return createInitialState()

    case 'LOAD_PERSISTED':
      return action.state

    default:
      return state
  }
}
