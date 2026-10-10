export default function NotesField({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={3}
      placeholder="أضف أي طلبات خاصة بهذا المنتج..."
      className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-text-muted)]"
    />
  )
}
