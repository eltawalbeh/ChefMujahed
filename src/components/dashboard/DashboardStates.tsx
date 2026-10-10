import Button from '@/components/ui/Button'

export function DashboardLoading() {
  return (
    <div className="space-y-5 p-4 lg:p-8" role="status" aria-label="جاري تحميل البيانات">
      <div className="h-20 animate-pulse rounded-2xl bg-[var(--color-surface)]" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-xl bg-[var(--color-surface)]" />
        ))}
      </div>
      <div className="h-[420px] animate-pulse rounded-2xl bg-[var(--color-surface)]" />
    </div>
  )
}

export function DashboardEmpty({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="grid min-h-[420px] place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
      <div>
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-[var(--color-bg)] text-2xl">◫</div>
        <h2 className="mt-5 text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
        {action ? (
          <Button variant="secondary" className="mt-5" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export function DashboardError({
  onRetry,
}: {
  onRetry?: () => void
}) {
  return (
    <div className="grid min-h-[480px] place-items-center p-6 text-center">
      <div>
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-[var(--color-surface)] text-3xl">!</div>
        <h2 className="mt-5 text-xl font-bold">حدث خطأ في تحميل البيانات</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--color-text-muted)]">
          واجهنا مشكلة في جلب معلومات لوحة التحكم. يرجى المحاولة مجدداً.
        </p>
        {onRetry ? <Button className="mt-5" onClick={onRetry}>إعادة المحاولة</Button> : null}
      </div>
    </div>
  )
}

export function DashboardRestricted() {
  return (
    <div className="grid min-h-[480px] place-items-center p-6 text-center">
      <div>
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-[var(--color-surface)] text-2xl">⌑</div>
        <h2 className="mt-5 text-xl font-bold">لا تملك صلاحية لتنفيذ هذا الإجراء</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          يرجى التواصل مع المسؤول للحصول على الصلاحيات المطلوبة.
        </p>
      </div>
    </div>
  )
}

export function DashboardAccessRequired() {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--color-bg)] p-6 text-center">
      <div className="max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--color-bg)] text-xl">⌑</div>
        <h1 className="mt-5 text-xl font-bold">الوصول الداخلي مطلوب</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
          لوحة التحكم محمية ولا تعرض بيانات داخلية بدون جلسة مستخدم مصرح بها.
          سيتم ربط تسجيل الدخول الداخلي في مرحلة المصادقة المخصصة.
        </p>
      </div>
    </div>
  )
}
