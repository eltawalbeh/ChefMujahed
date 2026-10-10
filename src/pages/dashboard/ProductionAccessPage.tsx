import { useCallback, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { DashboardError, DashboardLoading, DashboardRestricted } from '@/components/dashboard/DashboardStates'
import {
  createDashboardProductionPin,
  getDashboardProductionAccess,
  revokeDashboardProductionPin,
} from '@/data/dashboard'
import { canManageProductionAccess } from '@/lib/dashboardPermissions'
import { useDashboard } from '@/state/DashboardContext'
import type { DashboardProductionAccess, DashboardProductionPinCreated } from '@/types/dashboard'

export default function ProductionAccessPage() {
  const { runtime, role } = useDashboard()
  const [data, setData] = useState<DashboardProductionAccess | null>(null)
  const [created, setCreated] = useState<DashboardProductionPinCreated | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [confirmRevoke, setConfirmRevoke] = useState(false)

  const load = useCallback(async () => {
    try { setLoading(true); setError(''); setData(await getDashboardProductionAccess(runtime)) }
    catch (err) { setError(err instanceof Error ? err.message : 'تعذر تحميل إعدادات وصول الإنتاج.') }
    finally { setLoading(false) }
  }, [runtime])

  useEffect(() => { if (canManageProductionAccess(role)) void load() }, [load, role])

  if (!canManageProductionAccess(role)) return <DashboardRestricted title="وصول المطبخ" description="إدارة رمز PIN متاحة للمدير ومدير النظام فقط." />
  if (loading) return <DashboardLoading />
  if (error && !data) return <DashboardError title="تعذر تحميل وصول المطبخ" description={error} onRetry={() => void load()} />

  const create = async () => {
    try { setBusy(true); setError(''); const result=await createDashboardProductionPin(runtime); setCreated(result); await load() }
    catch (err) { setError(err instanceof Error ? err.message : 'تعذر إنشاء رمز الإنتاج.') }
    finally { setBusy(false) }
  }

  const revoke = async () => {
    if (!data?.pin?.id) return
    try { setBusy(true); setError(''); await revokeDashboardProductionPin(runtime,data.pin.id); setConfirmRevoke(false); setCreated(null); await load() }
    catch (err) { setError(err instanceof Error ? err.message : 'تعذر إلغاء رمز الإنتاج.') }
    finally { setBusy(false) }
  }

  return <div className="space-y-6 p-4 lg:p-8">
    <div className="text-right"><h2 className="text-2xl font-bold">وصول شاشة الإنتاج</h2><p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">أنشئ رمز PIN منفصلاً لفريق المطبخ. الرمز لا يمنح وصولاً إلى لوحة التحكم، الأسعار، الدفع أو بيانات العملاء الحساسة.</p></div>
    {error ? <div className="rounded-xl bg-[#FFF1F1] p-4 text-sm font-semibold text-[#9B2C2C]">{error}</div> : null}

    {created ? <section className="rounded-2xl border border-[#B9C5AE] bg-[#F4F8F1] p-6 text-right"><p className="text-sm font-bold text-[#58704E]">تم إنشاء رمز جديد — سيظهر مرة واحدة فقط</p><div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><button onClick={() => void navigator.clipboard?.writeText(created.pin)} className="min-h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-bold">نسخ الرمز</button><div dir="ltr" className="font-mono text-4xl font-bold tracking-[.22em]">{created.pin}</div></div><p className="mt-4 text-xs leading-6 text-[var(--color-text-muted)]">احفظ الرمز الآن في مكان آمن. لن يستطيع النظام عرضه مجدداً بعد مغادرة هذه الصفحة.</p></section> : null}

    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-right">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div className="flex gap-3"><Button variant="secondary" disabled={busy} onClick={() => data?.hasActivePin ? setConfirmRevoke(true) : void create()}>{data?.hasActivePin ? 'إلغاء الرمز' : 'إنشاء رمز PIN'}</Button>{data?.hasActivePin ? <Button disabled={busy} onClick={() => void create()}>إنشاء رمز جديد</Button> : null}</div><div><p className="text-sm text-[var(--color-text-muted)]">الحالة</p><p className="mt-1 text-lg font-bold">{data?.hasActivePin ? 'رمز إنتاج نشط' : 'لا يوجد رمز نشط'}</p>{data?.pin ? <p className="mt-2 text-xs text-[var(--color-text-muted)]">{data.pin.label} · أُنشئ {new Date(data.pin.createdAt).toLocaleString('ar-JO')}</p> : null}</div></div>
    </section>

    {confirmRevoke ? <section className="rounded-2xl border border-[#E7B5B5] bg-[#FFF8F8] p-6 text-right"><h3 className="font-bold">تأكيد إلغاء رمز الإنتاج</h3><p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">سيتم إنهاء جميع جلسات المطبخ المرتبطة بهذا الرمز فوراً.</p><div className="mt-5 flex gap-3"><Button variant="secondary" onClick={()=>setConfirmRevoke(false)}>رجوع</Button><Button disabled={busy} onClick={() => void revoke()}>تأكيد الإلغاء</Button></div></section> : null}

    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 text-right text-sm leading-7 text-[var(--color-text-muted)]"><strong className="text-[var(--color-text)]">ملاحظة أمنية:</strong> إنشاء رمز جديد يلغي أي رمز نشط سابقاً وينهي جلساته. شاشة الإنتاج نفسها متاحة عبر <span dir="ltr" className="font-mono">/kitchen</span>.</section>
  </div>
}
