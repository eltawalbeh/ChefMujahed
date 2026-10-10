export default function CatalogSkeleton() {
  return (
    <div
      aria-label="جاري تحميل المنتجات"
      role="status"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <div className="h-[120px] animate-pulse bg-[var(--color-placeholder)] md:aspect-[31/20] md:h-auto" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--color-placeholder)]" />
            <div className="h-3 w-full animate-pulse rounded bg-[var(--color-placeholder)]" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-[var(--color-placeholder)]" />
            <div className="h-5 w-24 animate-pulse rounded bg-[var(--color-placeholder)]" />
          </div>
        </div>
      ))}
      <span className="sr-only">جاري تحميل المنتجات...</span>
    </div>
  )
}
