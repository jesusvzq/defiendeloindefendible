import type { GameAction } from '../types'
import { Button } from './ui/Button'

interface Props {
  dispatch: React.Dispatch<GameAction>
}

const RULES = [
  'En cada ronda, una persona recibirá un argumento absurdo que solo ella podrá ver.',
  'Tendrá un tiempo limitado para defenderlo e intentar convencer a la otra persona.',
  'La otra persona puede hacer preguntas, cuestionar los argumentos y tratar de desmontar la defensa.',
  'Cuando termine el tiempo, decidirá si le ha convencido.',
  'Si le convence, el defensor gana 1 punto.',
  'Los turnos se alternan en cada ronda.',
]

export function InstructionsScreen({ dispatch }: Props) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 py-10 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Cómo se juega</h1>

      <ul className="flex w-full max-w-md flex-col gap-4 text-left">
        {RULES.map((rule) => (
          <li key={rule} className="flex gap-3 text-ink-muted">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>

      <Button onClick={() => dispatch({ type: 'INSTRUCTIONS_DONE' })}>Vale, entendido</Button>
    </div>
  )
}
