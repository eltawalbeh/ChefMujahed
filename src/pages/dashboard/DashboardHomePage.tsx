import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardHome } from '@/data/dashboard'
import { useDashboard } from '@/state/DashboardContext'
import type { DashboardHomeData } from '@/types/dashboard'
import { DashboardError, DashboardLoading } from '@/components/dashboard/DashboardStates'
import { DashboardTable, DashboardTd, DashboardTr } from '@/components/dashboard/DashboardTable'
import { RequestStatusBadge } from '@/components/dashboard/DashboardStatusBadge'

const stats = [
  ['إجمالي الطلبات', 'total'],
  ['طلبات جديدة', 'new'],
  ['بانتظار التأكيد', 'awaitingConfirmation'],
  ['معتمدة', 'approved'],
  ['قيد التجهيز', 'preparing'],
  ['جاهزة للتسليم', 'ready'],
] as const

function relativeTime(value: string) {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60_000))
  if (minutes < 60) return `منذ ${minutes} دقيقة`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `منذ ${hours} ساعة`
  return `منذ ${Math.round(hours / 24)} يوم`
}

export default function DashboardHomePage() {
  const { runtime } = useDashboard()
  const [data, setData] = useState<DashboardHomeData | null>(null)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    try {
      setError(false)
      setData(await getDashboardHome(runtime))
    } catch {
      setError(true)
    }
  }, [runtime])

  useEffect(() => { void load() }, [load])

  if (error) return <DashboardError onRetry={() => void load()} />
  if (!data) return <DashboardLoading />

  const totalSegment = Math.max(
    data.stats.new + data.stats.awaitingConfirmation + data.stats.approved + data.stats.preparing + data.stats.ready,
    1,
  )

  return (
    <main className="space-y-6 p-4 lg:p-8">
      <section className="flex min-h-[148px] items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="hidden size-24 rounded-2xl bg-[var(--color-bg)] sm:block" />
        <div className="text-right">
          <h2 className="text-xl font-bold">أهلاً بك مجدداً</h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">ملخص النشاط التشغيلي</p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {stats.map(([label, key], index) => (
          <div key={key} className="rounded-xl border border-[rgba(231,217,200,.5)] bg-[var(--color-surface)] p-5">
            <div className="flex items-center gap-2 text-[13px] text-[#78716C]">
              <span className="size-2 rounded-full bg-[var(--color-text-muted)]" />
              {label}
            </div>
            <strong className="mt-3 block text-3xl">{data.stats[key]}</strong>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="text-sm font-semibold">توزيع الحالات اللحظي للطلبات اليومية</h2>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full" dir="ltr">
          {[
            ['#1565C0', data.stats.new],
            ['#F57F17', data.stats.awaitingConfirmation],
            ['#2E7D32', data.stats.approved],
            ['#6A1B9A', data.stats.preparing],
            ['#00796B', data.stats.ready],
          ].map(([color, value]) => (
            <span
              key={String(color)}
              style={{
                width: `${(Number(value) / totalSegment) * 100}%`,
                background: String(color),
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-end gap-4 text-xs text-[#78716C]">
          <span>● جديد ({data.stats.new})</span>
          <span>● بانتظار التأكيد ({data.stats.awaitingConfirmation})</span>
          <span>● معتمدة ({data.stats.approved})</span>
          <span>● قيد التجهيز ({data.stats.preparing})</span>
          <span>● جاهزة ({data.stats.ready})</span>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/dashboard/requests" className="text-xs text-[var(--color-text-muted)]">عرض الكل</Link>
          <h2 className="font-semibold">آخر الطلبات الواردة</h2>
        </div>
        <DashboardTable headers={['تاريخ الإنشاء','الحالة','النوع','العميل / الشركة','المرجع']} minWidth={700}>
          {data.recent.map((request) => (
            <DashboardTr key={request.id}>
              <DashboardTd className="text-xs text-[#78716C]">{relativeTime(request.submitted_at)}</DashboardTd>
              <DashboardTd><RequestStatusBadge status={request.status} /></DashboardTd>
              <DashboardTd className={request.customer_type === 'B2B' ? 'text-[var(--color-accent)]' : ''}>{request.customer_type}</DashboardTd>
              <DashboardTd className="font-semibold">{request.customer_label}</DashboardTd>
              <DashboardTd><Link className="font-bold text-[var(--color-text-muted)]" to={`/dashboard/requests/${request.id}`}>{request.reference}</Link></DashboardTd>
            </DashboardTr>
          ))}
        </DashboardTable>
      </section>
    </main>
  )
}
