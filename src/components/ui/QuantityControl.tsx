type QuantityControlProps = {
  value: number
  min?: number
  onChange: (value: number) => void
}

export default function QuantityControl({
  value,
  min = 1,
  onChange,
}: QuantityControlProps) {
  return (
    <div className="inline-flex h-[42px] overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <button
        type="button"
        aria-label="تقليل الكمية"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="grid w-10 place-items-center text-xl text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg)] disabled:opacity-40"
      >
        −
      </button>
      <div className="grid w-10 place-items-center border-x border-[var(--color-border)] text-sm font-semibold text-[var(--color-text)]">
        {value}
      </div>
      <button
        type="button"
        aria-label="زيادة الكمية"
        onClick={() => onChange(value + 1)}
        className="grid w-10 place-items-center text-xl text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg)]"
      >
        +
      </button>
    </div>
  )
}
