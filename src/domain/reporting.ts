import type { DashboardRequestListItem } from '@/types/dashboard'

export type RequestReport = {
  total: number
  b2c: number
  b2b: number
  delivery: number
  collection: number
  totalValue: number
  averageValue: number
  statusCounts: Record<string, number>
  paymentCounts: Record<string, number>
}

function increment(target: Record<string, number>, key: string) {
  target[key] = (target[key] ?? 0) + 1
}

export function buildRequestReport(items: DashboardRequestListItem[]): RequestReport {
  const statusCounts: Record<string, number> = {}
  const paymentCounts: Record<string, number> = {}
  let totalValue = 0
  let b2c = 0
  let b2b = 0
  let delivery = 0
  let collection = 0

  items.forEach((item) => {
    totalValue += Number(item.total_jod ?? 0)
    item.customer_type === 'B2B' ? b2b++ : b2c++
    item.fulfillment_type === 'DELIVERY' ? delivery++ : collection++
    increment(statusCounts, item.status)
    increment(paymentCounts, item.payment_status)
  })

  return {
    total: items.length,
    b2c,
    b2b,
    delivery,
    collection,
    totalValue,
    averageValue: items.length ? totalValue / items.length : 0,
    statusCounts,
    paymentCounts,
  }
}

export function reportLabel(value: string) {
  const labels: Record<string, string> = {
    NEW: 'جديد',
    CONTACT_REQUIRED: 'مطلوب تواصل',
    AWAITING_CONFIRMATION: 'بانتظار التأكيد',
    APPROVED: 'تمت الموافقة',
    PREPARING: 'قيد التجهيز',
    READY: 'جاهز للتسليم',
    OUT_FOR_DELIVERY: 'خرج للتوصيل',
    COMPLETED: 'مكتمل',
    CANCELLED: 'ملغي',
    NOT_RECORDED: 'غير مسجل',
    PENDING: 'بانتظار الدفع',
    PAID: 'مدفوع',
    CASH_ON_DELIVERY: 'دفع عند الاستلام',
    MONTHLY_B2B_ACCOUNT: 'حساب شهري B2B',
  }
  return labels[value] ?? value
}
