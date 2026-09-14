import { formatJod } from '@/lib/format'

type InvoicePanelProps = {
  request: Record<string, any>
  items: Array<Record<string, any>>
}

function invoiceNumber(request: Record<string, any>) {
  return String(request.invoice_number ?? 'INV-' + (request.reference ?? request.id))
}

export default function InvoicePanel({ request, items }: InvoicePanelProps) {
  const isB2B = request.customer_type === 'B2B'
  const paymentLabel = request.payment_status === 'MONTHLY_B2B_ACCOUNT'
    ? 'حساب شركات شهري'
    : request.payment_status === 'CASH_ON_DELIVERY'
      ? 'الدفع عند الاستلام'
      : request.payment_status === 'PAID'
        ? 'مدفوع'
        : 'غير مسجل'
  const total = Number(request.final_total_jod ?? request.estimated_subtotal ?? 0)

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:p-6 print:rounded-none print:border-0 print:p-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-bold">الفاتورة</h2>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">رقم الفاتورة: {invoiceNumber(request)}</p>
        </div>
        <button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-[var(--color-border)] px-3 text-sm font-semibold outline-none transition-colors hover:bg-[var(--color-bg)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 print:hidden">طباعة / PDF</button>
      </div>
      <div className="mt-4 space-y-3 border-t border-[var(--color-border)] pt-4 text-sm">
        <div className="flex justify-between gap-4"><span className="text-[var(--color-text-muted)]">العميل / الشركة</span><strong>{request.company_name_snapshot || request.customer_name_snapshot || '—'}</strong></div>
        <div className="flex justify-between gap-4"><span className="text-[var(--color-text-muted)]">نوع الحساب</span><span>{isB2B ? 'B2B' : 'B2C'}</span></div>
        <div className="flex justify-between gap-4"><span className="text-[var(--color-text-muted)]">طريقة الدفع</span><span>{paymentLabel}</span></div>
        <div className="flex justify-between gap-4 text-base"><span className="font-semibold">الإجمالي</span><strong>{formatJod(total)}</strong></div>
      </div>
      <div className="mt-4 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-muted)]">
        {items.length} بند · الضريبة غير مضافة ما لم تكن مهيأة في بيانات الطلب.
      </div>
    </section>
  )
}
