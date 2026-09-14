import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listDashboardCustomers } from '@/data/dashboard'
import { useDashboard } from '@/state/DashboardContext'
import type { DashboardCustomerListItem, DashboardListResponse } from '@/types/dashboard'
import { DashboardEmpty, DashboardError, DashboardLoading } from '@/components/dashboard/DashboardStates'
import { DashboardTable, DashboardTd, DashboardTr } from '@/components/dashboard/DashboardTable'

export default function CustomersPage() {
  const { runtime } = useDashboard()
  const [data, setData] = useState<DashboardListResponse<DashboardCustomerListItem> | null>(null)
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    try { setError(false); setData(await listDashboardCustomers(runtime, { q, customerType: type })) }
    catch { setError(true) }
  }, [runtime, q, type])
  useEffect(() => { const t = setTimeout(() => void load(), 180); return () => clearTimeout(t) }, [load])

  if (error) return <DashboardError onRetry={() => void load()} />
  if (!data) return <DashboardLoading />

  return <main className="space-y-5 p-4 lg:p-8">
    <div><h2 className="text-xl font-bold">إدارة العملاء والشركات</h2><p className="mt-1 text-sm text-[var(--color-text-muted)]">عرض وإدارة جميع العملاء والشركات المسجلة ومتابعة نشاط طلباتهم</p></div>
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم، الشركة، الهاتف أو البريد" className="h-11 flex-1 rounded-lg border border-[var(--color-border)] bg-white px-3 outline-none" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="h-11 rounded-lg border border-[var(--color-border)] bg-white px-3"><option value="">الكل</option><option value="B2C">B2C</option><option value="B2B">B2B</option></select>
      </div>
      <p className="mt-4 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">عرض {data.items.length} من أصل {data.total} عميلاً</p>
    </section>
    {data.items.length === 0 ? <DashboardEmpty title="لا يوجد عملاء بعد" description="سيظهر العملاء والشركات هنا تلقائياً بعد إنشاء أول طلب." /> : (
      <DashboardTable headers={['إجراءات','آخر طلب','عدد الطلبات','البريد الإلكتروني','الهاتف','النوع','الاسم / الشركة']} minWidth={980}>
        {data.items.map((customer) => <DashboardTr key={customer.id}>
          <DashboardTd><Link to={`/dashboard/customers/${customer.id}`} className="rounded-lg bg-[var(--color-bg)] px-3 py-1.5 text-xs">تفاصيل</Link></DashboardTd>
          <DashboardTd className="text-xs text-[#78716C]">{customer.last_request_at ? new Date(customer.last_request_at).toLocaleDateString('ar-JO') : '--'}</DashboardTd>
          <DashboardTd>{customer.request_count}</DashboardTd>
          <DashboardTd>{customer.email || '--'}</DashboardTd>
          <DashboardTd>{customer.phone || '--'}</DashboardTd>
          <DashboardTd><span className="rounded-md bg-[var(--color-bg)] px-2 py-1 text-xs">{customer.customer_type}</span></DashboardTd>
          <DashboardTd className="font-semibold">{customer.company_name || customer.name || '--'}</DashboardTd>
        </DashboardTr>)}
      </DashboardTable>
    )}
  </main>
}
