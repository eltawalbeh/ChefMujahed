export default function ProductGallery() {
  return (
    <div>
      <div className="grid h-[260px] place-items-center rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-placeholder)] md:h-[400px]">
        <div className="text-center text-[var(--color-text-muted)]">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-xl">
            ◫
          </div>
          <p className="text-sm">صورة المنتج</p>
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        {[1, 2, 3].map((item) => (
          <button
            key={item}
            type="button"
            aria-label={`صورة ${item}`}
            className="grid size-20 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-placeholder)] md:size-[100px]"
          >
            <span className="text-[var(--color-text-muted)]">◫</span>
          </button>
        ))}
      </div>
    </div>
  )
}
