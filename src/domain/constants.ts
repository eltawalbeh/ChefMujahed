import type {
  CustomerType,
  FulfillmentType,
  PaymentMethod,
  PaymentStatus,
  RequestSource,
  RequestStatus,
} from '@/types/request'

export const REQUEST_STATUSES: readonly RequestStatus[] = [
  'NEW',
  'CONTACT_REQUIRED',
  'AWAITING_CONFIRMATION',
  'APPROVED',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'COMPLETED',
  'CANCELLED',
]

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  NEW: 'جديد',
  CONTACT_REQUIRED: 'مطلوب تواصل',
  AWAITING_CONFIRMATION: 'بانتظار التأكيد',
  APPROVED: 'تمت الموافقة',
  PREPARING: 'قيد التجهيز',
  READY: 'جاهز للتسليم',
  OUT_FOR_DELIVERY: 'خرج للتوصيل',
  COMPLETED: 'مكتمل',
  CANCELLED: 'ملغي',
}

export const PAYMENT_STATUSES: readonly PaymentStatus[] = [
  'NOT_RECORDED',
  'PENDING',
  'PAID',
  'CASH_ON_DELIVERY',
  'MONTHLY_B2B_ACCOUNT',
]

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  NOT_RECORDED: 'غير مسجل',
  PENDING: 'بانتظار الدفع',
  PAID: 'مدفوع',
  CASH_ON_DELIVERY: 'دفع عند الاستلام',
  MONTHLY_B2B_ACCOUNT: 'حساب شهري B2B',
}

export const PAYMENT_METHODS: readonly PaymentMethod[] = [
  'CASH',
  'BANK_TRANSFER',
  'CLIQ',
  'MOBILE_WALLET',
  'B2B_MONTHLY_ACCOUNT',
]

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH: 'نقداً',
  BANK_TRANSFER: 'حوالة بنكية',
  CLIQ: 'CliQ',
  MOBILE_WALLET: 'محفظة إلكترونية',
  B2B_MONTHLY_ACCOUNT: 'حساب شهري B2B',
}

export const REQUEST_SOURCES: readonly RequestSource[] = [
  'WEBSITE',
  'WHATSAPP',
  'INSTAGRAM',
  'PHONE',
  'WALK_IN',
  'OTHER',
]

export const REQUEST_SOURCE_LABELS: Record<RequestSource, string> = {
  WEBSITE: 'الموقع',
  WHATSAPP: 'واتساب',
  INSTAGRAM: 'إنستغرام',
  PHONE: 'هاتف',
  WALK_IN: 'زيارة مباشرة',
  OTHER: 'أخرى',
}

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  B2C: 'B2C',
  B2B: 'B2B',
}

export const FULFILLMENT_LABELS: Record<FulfillmentType, string> = {
  DELIVERY: 'توصيل',
  COLLECTION: 'استلام',
}

export const REQUEST_SEMANTICS = {
  pendingNotice: 'الطلب مسجل لكنه غير مؤكد بعد.',
  approvalNotice: 'الطلب خاضع للمراجعة ولا يعتبر تأكيداً نهائياً.',
  whatsappManualNotice: 'يجب إرسال رسالة واتساب يدوياً لإكمال المتابعة.',
} as const
