import { ConfigScreen } from './components/ConfigScreen'
import { DefenderRevealScreen } from './components/DefenderRevealScreen'
import { DefenseScreen } from './components/DefenseScreen'
import { FirstDefenderRollScreen } from './components/FirstDefenderRollScreen'
import { GameOverScreen } from './components/GameOverScreen'
import { InstructionsScreen } from './components/InstructionsScreen'
import { PlayerSetupScreen } from './components/PlayerSetupScreen'
import { RoundResultScreen } from './components/RoundResultScreen'
import { SecretArgumentScreen } from './components/SecretArgumentScreen'
import { VerdictScreen } from './components/VerdictScreen'
import type { GameAction, GameState } from './types'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function PhaseRouter({ state, dispatch }: Props) {
  switch (state.phase) {
    case 'setup':
      return <PlayerSetupScreen dispatch={dispatch} />
    case 'instructions':
      return <InstructionsScreen dispatch={dispatch} />
    case 'config':
      return <ConfigScreen dispatch={dispatch} />
    case 'pickingFirstDefender':
      return <FirstDefenderRollScreen dispatch={dispatch} />
    case 'revealDefender':
      return <DefenderRevealScreen state={state} dispatch={dispatch} />
    case 'secretArgument':
      return <SecretArgumentScreen state={state} dispatch={dispatch} />
    case 'defense':
      return <DefenseScreen state={state} dispatch={dispatch} />
    case 'verdict':
      return <VerdictScreen state={state} dispatch={dispatch} />
    case 'roundResult':
      return <RoundResultScreen state={state} dispatch={dispatch} />
    case 'gameOver':
      return <GameOverScreen state={state} dispatch={dispatch} />
    default:
      return null
  }
}
