import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/helpers'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
  size?: 'sm' | 'md'
}

export default function IconButton({
  label,
  children,
  size = 'md',
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-full text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' ? 'size-9' : 'size-10',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
