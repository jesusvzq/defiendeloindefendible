import { useState } from 'react'
import { PhaseRouter } from './PhaseRouter'
import { ResumePrompt } from './components/ResumePrompt'
import { useGame } from './hooks/useGame'
import { clearGameState, hasGameInProgress, loadGameState } from './game/persistence'
import type { GameState } from './types'

type Decision = 'resume-prompt' | 'fresh' | 'resumed'

function GameShell({ initialState }: { initialState?: GameState }) {
  const { state, dispatch } = useGame(initialState)
  return <PhaseRouter state={state} dispatch={dispatch} />
}

function App() {
  const [persisted] = useState(() => loadGameState())
  const [decision, setDecision] = useState<Decision>(() =>
    hasGameInProgress(persisted) ? 'resume-prompt' : 'fresh',
  )

  if (decision === 'resume-prompt' && persisted) {
    return (
      <ResumePrompt
        state={persisted}
        onContinue={() => setDecision('resumed')}
        onNewGame={() => {
          clearGameState()
          setDecision('fresh')
        }}
      />
    )
  }

  return (
    <GameShell key={decision} initialState={decision === 'resumed' ? persisted ?? undefined : undefined} />
  )
}

export default App
