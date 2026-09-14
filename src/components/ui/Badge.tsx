import type { ReactNode } from 'react'
import { cn } from '@/lib/helpers'

type BadgeTone = 'neutral' | 'success' | 'accent'

export default function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none',
        tone === 'success' &&
          'border-[var(--color-sage)] bg-[var(--color-surface)] text-[var(--color-success-text)]',
        tone === 'accent' &&
          'border-[var(--color-accent)] bg-[var(--color-accent)] text-white',
        tone === 'neutral' &&
          'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
