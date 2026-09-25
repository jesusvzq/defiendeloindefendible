import { Button } from './ui/Button'

interface Props {
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmEndDefenseDialog({ onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 px-6">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-3xl bg-surface-raised p-6 text-center">
        <p className="text-lg font-medium text-ink">
          ¿Seguro que quieres terminar la defensa?
        </p>
        <div className="flex flex-col gap-3">
          <Button variant="danger" onClick={onConfirm}>
            Terminar defensa
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
