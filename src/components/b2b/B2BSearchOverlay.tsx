import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@/components/ui/SearchIcon'
import type { Product } from '@/types/product'

export default function B2BSearchOverlay({
  products,
  onClose,
}: {
  products: Product[]
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return products.slice(0, 4)
    return products.filter((product) =>
      [product.name, product.shortDescription, product.longDescription]
        .filter(Boolean)
        .some((text) => String(text).toLowerCase().includes(value)),
    )
  }, [products, query])

  return (
    <div className="fixed inset-0 z-[80] bg-[var(--color-surface)] md:bg-black/20" role="dialog" aria-modal="true" aria-label="البحث في منتجات الشركات">
      <div className="mx-auto min-h-screen max-w-[720px] bg-[var(--color-surface)] p-4 md:mt-20 md:min-h-0 md:rounded-2xl md:p-6 md:shadow-xl">
        <div className="flex items-center gap-3" dir="ltr">
          <button type="button" onClick={onClose} className="text-sm text-[var(--color-text-muted)]">إلغاء</button>
          <div dir="rtl" className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-3">
            <SearchIcon size={18} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن منتج..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-5 text-right">
          <p className="text-sm font-semibold text-[var(--color-text)]">
            {query.trim() ? `نتائج البحث عن “${query.trim()}”` : 'المنتجات المتاحة للشركات'}
          </p>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">{results.length} منتجات مطابقة للشركات</p>
        </div>

        <div className="mt-4 space-y-3">
          {results.length ? results.map((product) => (
            <Link
              key={product.id}
              to={`/business/product/${product.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-3"
              dir="ltr"
            >
              <div className="grid size-16 shrink-0 place-items-center rounded-lg bg-[var(--color-bg)]">♨</div>
              <div dir="rtl" className="min-w-0 flex-1 text-right">
                <p className="font-semibold text-[var(--color-text)]">{product.name}</p>
                <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">{product.shortDescription || 'وصف مختصر لطلب الجملة'}</p>
                <p className="mt-1 text-xs font-medium text-[var(--color-accent)]">عرض المنتج</p>
              </div>
            </Link>
          )) : (
            <div className="py-16 text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--color-bg)]">⌕</div>
              <p className="mt-4 font-bold text-[var(--color-text)]">لا توجد نتائج مطابقة</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">جرّب كلمة بحث أخرى.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
