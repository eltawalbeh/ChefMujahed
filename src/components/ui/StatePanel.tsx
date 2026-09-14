import Button from '@/components/ui/Button'

export default function StatePanel({
  title,
  description,
  actionLabel,
  onAction,
  tone = 'neutral',
}: {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  tone?: 'neutral' | 'error' | 'offline'
}) {
  const symbol = tone === 'error' ? '!' : tone === 'offline' ? '⌁' : '◫'

  return (
    <div
      role={tone === 'error' || tone === 'offline' ? 'alert' : 'status'}
      className="mx-auto flex min-h-[240px] max-w-lg flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 text-center"
    >
      <div className="grid size-14 place-items-center rounded-full bg-[var(--color-bg)] text-xl font-bold text-[var(--color-text-muted)]">
        {symbol}
      </div>
      <h2 className="mt-4 text-lg font-bold text-[var(--color-text)]">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
          {description}
        </p>
      ) : null}
      {actionLabel && onAction ? (
        <Button variant="secondary" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
