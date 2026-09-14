import { Link } from 'react-router-dom'
import BrandLogo from '@/components/public/BrandLogo'
import BagIcon from '@/components/ui/BagIcon'
import SearchIcon from '@/components/ui/SearchIcon'
import IconButton from '@/components/ui/IconButton'
import { useB2BRequestDraft } from '@/state/B2BRequestDraftContext'

function navClass(active: boolean) {
  return active
    ? 'relative text-sm font-bold text-[var(--color-text)]'
    : 'relative text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]'
}

function ActiveUnderline({ active }: { active: boolean }) {
  return active ? <span aria-hidden="true" className="absolute -bottom-2 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[var(--color-accent)]" /> : null
}

export default function B2BHeader({ onSearch }: { onSearch?: () => void }) {
  const { itemCount, openRequest } = useB2BRequestDraft()

  const nav = (
    <>
      <Link to="/" className={navClass(false)}>الرئيسية</Link>
      <Link to="/products" className={navClass(false)}>قائمتنا</Link>
      <Link to="/business" className={navClass(true)}>للشركات<ActiveUnderline active /></Link>
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color:var(--color-surface)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:h-20 md:px-16">
        <BrandLogo compact className="md:hidden" />
        <BrandLogo className="hidden md:inline-flex" />
        <nav className="hidden items-center gap-8 md:flex" aria-label="التنقل الرئيسي">{nav}</nav>
        <div className="flex items-center gap-1.5">
          <IconButton label="البحث" onClick={onSearch}><SearchIcon /></IconButton>
          <IconButton label="الطلب الحالي" onClick={openRequest}>
            <span className="relative inline-flex"><BagIcon />{itemCount > 0 ? <span className="absolute -left-2 -top-2 min-w-4 rounded-full bg-[var(--color-accent)] px-1 text-center text-[10px] font-bold leading-4 text-white">{itemCount}</span> : null}</span>
          </IconButton>
        </div>
      </div>
      <nav className="flex h-11 items-center justify-center gap-7 border-t border-[var(--color-border)] px-4 md:hidden" aria-label="التنقل الرئيسي للجوال">{nav}</nav>
    </header>
  )
}
