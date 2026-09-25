import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand text-surface hover:bg-brand-dim active:scale-[0.98]',
  secondary:
    'bg-surface-raised text-ink border border-white/10 hover:bg-white/10 active:scale-[0.98]',
  success: 'bg-success text-surface hover:bg-success-dim active:scale-[0.98]',
  danger: 'bg-danger text-surface hover:bg-danger-dim active:scale-[0.98]',
  ghost: 'bg-transparent text-ink-muted hover:text-ink underline underline-offset-4',
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`min-h-14 rounded-2xl px-6 py-4 text-lg font-semibold transition-transform duration-150 disabled:opacity-40 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
