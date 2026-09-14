import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PublicHeader from '@/components/public/PublicHeader'
import PublicFooter from '@/components/public/PublicFooter'
import CategoryChips from '@/components/public/CategoryChips'
import ProductGrid from '@/components/public/ProductGrid'
import CatalogSkeleton from '@/components/public/CatalogSkeleton'
import SearchIcon from '@/components/ui/SearchIcon'
import StatePanel from '@/components/ui/StatePanel'
import { getPublicCategories, getPublicProducts, type CatalogCategory } from '@/data/catalog'
import type { Product } from '@/types/product'

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const searchRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState<CatalogCategory[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true); setError('')
      const [categoryRows, productRows] = await Promise.all([getPublicCategories(), getPublicProducts()])
      setCategories(categoryRows); setProducts(productRows)
    } catch {
      setError(navigator.onLine ? 'تعذر تحميل المنتجات حالياً. حاول مرة أخرى.' : 'أنت غير متصل بالإنترنت حالياً.')
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { void load() }, [load])
  useEffect(() => { if (searchParams.get('focus') === 'search') setTimeout(() => searchRef.current?.focus(), 80) }, [searchParams])

  const categoryOptions = useMemo(() => [{ id: 'all', label: 'الكل' }, ...categories.map((c) => ({ id: c.id, label: c.label }))], [categories])
  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return products.filter((product) => {
      if (activeCategory !== 'all' && product.categoryId !== activeCategory) return false
      if (!normalized) return true
      return [product.name, product.shortDescription, product.longDescription].filter(Boolean).some((value) => String(value).toLowerCase().includes(normalized))
    })
  }, [activeCategory, products, query])

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <PublicHeader />
      <main>
        <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-[1440px] px-4 py-10 text-right md:px-16 md:py-14">
            <p className="text-xs font-semibold text-[var(--color-accent)]">قائمتنا</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">اختر ما يناسب طلبك</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">تصفح المنتجات المتاحة، افتح تفاصيل المنتج وحدد الكمية والتخصيص والملاحظات قبل إضافته إلى طلبك.</p>
          </div>
        </section>

        <section className="sticky top-[108px] z-20 border-b border-[var(--color-border)] bg-[color:var(--color-bg)]/95 backdrop-blur md:top-20">
          <div className="mx-auto max-w-[1440px] space-y-4 px-4 py-4 md:px-16 md:py-5">
            <div className="flex h-11 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 md:max-w-md">
              <SearchIcon size={18} />
              <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في قائمتنا..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
            </div>
            <CategoryChips categories={categoryOptions} activeId={activeCategory} onChange={setActiveCategory} />
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 md:px-16 md:py-12">
          <div className="mb-5 flex items-center justify-between text-xs text-[var(--color-text-muted)]"><span>{visibleProducts.length} منتج</span>{(query || activeCategory !== 'all') ? <button onClick={() => { setQuery(''); setActiveCategory('all') }} className="font-semibold underline underline-offset-4">مسح الفلاتر</button> : <span>المنتجات المتاحة حالياً</span>}</div>
          {loading ? <CatalogSkeleton /> : error ? <StatePanel title="تعذر تحميل المنتجات" description={error} actionLabel="إعادة المحاولة" onAction={() => void load()} tone={navigator.onLine ? 'error' : 'offline'} /> : visibleProducts.length ? <ProductGrid products={visibleProducts} /> : <StatePanel title="لا توجد نتائج مطابقة" description="جرّب كلمة بحث أو تصنيفاً آخر." actionLabel="عرض كل المنتجات" onAction={() => { setQuery(''); setActiveCategory('all') }} />}
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
