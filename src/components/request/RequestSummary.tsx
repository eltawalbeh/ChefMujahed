import { formatJod } from '@/lib/format'

export default function RequestSummary({
  subtotal,
  compact = false,
}: {
  subtotal: number
  compact?: boolean
}) {
  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--color-text)]">
          {formatJod(subtotal)}
        </span>
        <span className="text-[var(--color-text-muted)]">المجموع الفرعي</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-[var(--color-text-muted)]">
          {formatJod(subtotal)}
        </span>
        <span className="font-bold text-[var(--color-text)]">
          {compact ? 'الإجمالي' : 'الإجمالي التقريبي'}
        </span>
      </div>
    </div>
  )
}
