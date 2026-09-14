import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addDashboardCustomerNote, getDashboardCustomer } from '@/data/dashboard'
import { useDashboard } from '@/state/DashboardContext'
import type { DashboardCustomerDetail } from '@/types/dashboard'
import { DashboardError, DashboardLoading } from '@/components/dashboard/DashboardStates'
import { RequestStatusBadge } from '@/components/dashboard/DashboardStatusBadge'
import Button from '@/components/ui/Button'
import { formatJod } from '@/lib/format'

export default function CustomerDetailsPage() {
  const { id = '' } = useParams()
  const { runtime } = useDashboard()
  const [data, setData] = useState<DashboardCustomerDetail | null>(null)
  const [error, setError] = useState(false)
  const [note, setNote] = useState('')

  const load = useCallback(async () => { try { setError(false); setData(await getDashboardCustomer(runtime, id)) } catch { setError(true) } }, [runtime, id])
  useEffect(() => { void load() }, [load])

  if (error) return <DashboardError onRetry={() => void load()} />
  if (!data) return <DashboardLoading />

  const c = data.customer
  const b2b = c.customer_type === 'B2B'
  const label = c.company_name || c.name || '--'

  return <main className="space-y-6 p-4 lg:p-8">
    <div className="text-sm text-[var(--color-text-muted)]"><Link to="/dashboard/customers">العملاء</Link> ‹ <strong>{label}</strong></div>
    <section className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-4 text-sm"><span>هاتف: {c.phone || '--'}</span><span>بريد: {c.email || '--'}</span></div>
      <div className="flex items-center gap-3"><div><h1 className="text-2xl font-bold">{label}</h1><span className="text-xs text-[var(--color-text-muted)]">{b2b ? 'حساب شركات B2B' : 'عميل أفراد B2C'}</span></div><div className="grid size-14 place-items-center rounded-full bg-[var(--color-border)] font-bold">{label.slice(0,1)}</div></div>
    </section>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[['إجمالي الطلبات', data.stats.total],['طلبات مكتملة',data.stats.completed],['قيد التنفيذ',data.stats.active],['ملغاة',data.stats.cancelled]].map(([label,value]) => <div key={String(label)} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><p className="text-sm text-[var(--color-text-muted)]">{label}</p><strong className="mt-2 block text-3xl">{value}</strong></div>)}
    </section>
    <div className="grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]" dir="ltr">
      <section dir="rtl" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><h2 className="font-bold">{b2b ? 'ملاحظات ومواصفات خاصة' : 'ملاحظات على العميل'}</h2><div className="mt-4 space-y-3 border-t border-[var(--color-border)] pt-4">{data.notes.map((item) => <div key={item.id} className="rounded-lg bg-[var(--color-bg)] p-3 text-sm">{item.body}</div>)}<textarea value={note} onChange={(e)=>setNote(e.target.value)} rows={3} placeholder="إضافة ملاحظة جديدة" className="w-full rounded-lg border border-[var(--color-border)] p-3 text-sm outline-none"/><Button variant="secondary" className="w-full" disabled={!note.trim()} onClick={async()=>{ try { setData(await addDashboardCustomerNote(runtime,id,note)); setNote('') } catch { setError(true) } }}>إضافة ملاحظة جديدة</Button></div></section>
      <section dir="rtl" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"><h2 className="font-bold">{b2b ? 'آخر طلبات الشركة' : 'آخر الطلبات'}</h2><div className="mt-4 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">{data.requests.map((request) => <div key={request.id} className="grid grid-cols-[1fr_auto] gap-4 py-4"><div><Link to={`/dashboard/requests/${request.id}`} className="font-bold">{request.reference}</Link><p className="mt-1 text-xs text-[#78716C]">{new Date(request.submitted_at).toLocaleDateString('ar-JO')}</p></div><div className="text-left"><RequestStatusBadge status={request.status}/><p className="mt-2 text-sm font-semibold">{formatJod(Number(request.total_jod || 0))}</p></div></div>)}</div></section>
    </div>
  </main>
}
