import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/helpers'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-interactive-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-interactive-primary-hover)] border border-transparent',
  secondary:
    'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-bg)]',
  ghost:
    'bg-transparent text-[var(--color-text-muted)] border border-transparent hover:bg-[var(--color-surface)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-xs rounded-[var(--radius-sm)]',
  md: 'h-11 px-4 text-sm rounded-[var(--radius-md)]',
  lg: 'h-12 px-5 text-sm rounded-[var(--radius-md)]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
