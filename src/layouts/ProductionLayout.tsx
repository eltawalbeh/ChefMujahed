import { Outlet } from 'react-router-dom'
import { ProductionProvider } from '@/state/ProductionContext'

export default function ProductionLayout() {
  return (
    <ProductionProvider>
      <div dir="rtl" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Outlet />
      </div>
    </ProductionProvider>
  )
}
