import { NavLink, useLocation } from 'react-router-dom'
import { canManageContent, canManageProductionAccess, canManageUsers, roleLabel } from '@/lib/dashboardPermissions'
import { useDashboard } from '@/state/DashboardContext'

const baseItems = [
  { to: '/dashboard', label: 'الرئيسية', icon: '⌂', end: true },
  { to: '/dashboard/requests', label: 'الطلبات', icon: '▤' },
  { to: '/dashboard/customers', label: 'العملاء', icon: '◉' },
  { to: '/dashboard/products', label: 'المنتجات', icon: '◇' },
  { to: '/dashboard/content', label: 'المحتوى', icon: '✦', visible: canManageContent },
  { to: '/dashboard/production-access', label: 'وصول المطبخ', icon: '▣', visible: canManageProductionAccess },
  { to: '/dashboard/users', label: 'المستخدمون', icon: '◎', visible: canManageUsers },
] as const

function pageTitle(pathname: string) {
  if (pathname.includes('/users')) return 'المستخدمون والصلاحيات'
  if (pathname.includes('/production-access')) return 'وصول شاشة الإنتاج'
  if (pathname.includes('/content')) return 'إدارة محتوى الموقع'
  if (pathname.includes('/products/import')) return 'استيراد منتجات Bulk'
  if (pathname.includes('/products/new')) return 'إضافة منتج'
  if (pathname.includes('/products/') && pathname.includes('/edit')) return 'تعديل بيانات المنتج'
  if (pathname.includes('/products')) return 'إدارة المنتجات'
  if (pathname.includes('/customers/')) return 'تفاصيل العميل'
  if (pathname.includes('/customers')) return 'إدارة العملاء'
  if (pathname.includes('/requests/')) return 'تفاصيل الطلب'
  if (pathname.includes('/requests')) return 'إدارة الطلبات'
  return 'لوحة التحكم'
}

function visibleItems(role: Parameters<typeof canManageUsers>[0]) {
  return baseItems.filter((item) => !item.visible || item.visible(role))
}

export function DashboardSidebar() {
  const { role, runtime, logout } = useDashboard()
  const items = visibleItems(role)

  return (
    <aside dir="rtl" className="fixed inset-y-0 right-0 z-30 hidden w-[260px] flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-6 lg:flex">
      <div className="flex items-center gap-3 pb-4">
        <div className="grid size-10 place-items-center rounded-[10px] bg-[var(--color-text-muted)] font-bold text-[var(--color-on-primary)]">ش</div>
        <div>
          <p className="font-bold">لوحة التحكم</p>
          <p className="text-[11px] text-[var(--color-accent)]">الشيف مجاهد</p>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] pt-5">
        <nav className="space-y-1.5" aria-label="التنقل الداخلي">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => 'flex min-h-11 items-center gap-3 rounded-lg px-4 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ' + (isActive ? 'bg-[var(--color-bg)] font-semibold text-[var(--color-text-muted)]' : 'text-[#57534E] hover:bg-[var(--color-bg)]')}>
              <span aria-hidden="true" className="grid size-5 place-items-center rounded text-xs opacity-70">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-[var(--color-border)] pt-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-[var(--color-border)] text-sm font-semibold">م</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{runtime.access?.displayName ?? 'مستخدم داخلي'}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{roleLabel(role)}{runtime.mode === 'preview' ? ' · معاينة' : ''}</p>
          </div>
        </div>
        <button type="button" onClick={() => void logout()} className="mt-3 min-h-11 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-muted)] outline-none transition-colors hover:bg-[var(--color-bg)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2">تسجيل الخروج</button>
      </div>
    </aside>
  )
}

export function DashboardTopbar() {
  const location = useLocation()
  const { role, logout } = useDashboard()
  const title = pageTitle(location.pathname)
  const items = visibleItems(role)

  return (
    <>
      <header dir="rtl" className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 lg:px-8">
        <h1 className="text-right text-lg font-bold lg:text-[22px]">{title}</h1>
        <button type="button" onClick={() => void logout()} className="min-h-11 rounded-lg bg-[var(--color-bg)] px-3 py-2 text-xs font-semibold text-[var(--color-text-muted)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2">خروج</button>
      </header>
      <nav dir="rtl" className="sticky top-[68px] z-20 flex overflow-x-auto border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 lg:hidden" aria-label="التنقل الداخلي للجوال">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => 'min-h-11 shrink-0 rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ' + (isActive ? 'bg-[var(--color-bg)] font-semibold text-[var(--color-text-muted)]' : 'text-[var(--color-text-muted)]')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
