import type {
  DashboardCustomerDetail,
  DashboardCustomerListItem,
  DashboardHomeData,
  DashboardProductDetail,
  DashboardProductListItem,
  DashboardRequestDetail,
  DashboardRequestListItem,
  DashboardRole,
} from '@/types/dashboard'

export const previewRole: DashboardRole = 'SUPERVISOR'

export const previewRequests: DashboardRequestListItem[] = [
  {
    id: 'preview-request-1',
    reference: 'CM-20260913-00001',
    customer_type: 'B2B',
    source: 'WEBSITE',
    status: 'NEW',
    payment_status: 'NOT_RECORDED',
    fulfillment_type: 'DELIVERY',
    customer_label: 'اسم الشركة',
    submitted_at: new Date(Date.now() - 10 * 60_000).toISOString(),
    total_jod: 45,
  },
  {
    id: 'preview-request-2',
    reference: 'CM-20260913-00002',
    customer_type: 'B2C',
    source: 'WHATSAPP',
    status: 'AWAITING_CONFIRMATION',
    payment_status: 'PENDING',
    fulfillment_type: 'COLLECTION',
    customer_label: 'عميل 01',
    submitted_at: new Date(Date.now() - 60 * 60_000).toISOString(),
    total_jod: 120,
  },
  {
    id: 'preview-request-3',
    reference: 'CM-20260913-00003',
    customer_type: 'B2B',
    source: 'WEBSITE',
    status: 'APPROVED',
    payment_status: 'MONTHLY_B2B_ACCOUNT',
    fulfillment_type: 'DELIVERY',
    customer_label: 'شركة 02',
    submitted_at: new Date(Date.now() - 2 * 60 * 60_000).toISOString(),
    total_jod: 350,
  },
  {
    id: 'preview-request-4',
    reference: 'CM-20260913-00004',
    customer_type: 'B2C',
    source: 'PHONE',
    status: 'PREPARING',
    payment_status: 'PAID',
    fulfillment_type: 'DELIVERY',
    customer_label: 'عميل 02',
    submitted_at: new Date(Date.now() - 5 * 60 * 60_000).toISOString(),
    total_jod: 85,
  },
  {
    id: 'preview-request-5',
    reference: 'CM-20260913-00005',
    customer_type: 'B2B',
    source: 'WEBSITE',
    status: 'READY',
    payment_status: 'PENDING',
    fulfillment_type: 'DELIVERY',
    customer_label: 'شركة 05',
    submitted_at: new Date(Date.now() - 26 * 60 * 60_000).toISOString(),
    total_jod: 210,
  },
]

export const previewHome: DashboardHomeData = {
  role: previewRole,
  stats: {
    total: 24,
    new: 8,
    awaitingConfirmation: 5,
    approved: 3,
    preparing: 4,
    ready: 2,
  },
  recent: previewRequests,
}

export const previewCustomers: DashboardCustomerListItem[] = [
  {
    id: 'preview-customer-b2b',
    customer_type: 'B2B',
    company_name: 'اسم الشركة',
    name: 'مستخدم 03',
    phone: '+962 79 123 4567',
    email: 'company01@example.com',
    request_count: 24,
    last_request_at: new Date(Date.now() - 10 * 60_000).toISOString(),
  },
  {
    id: 'preview-customer-b2c',
    customer_type: 'B2C',
    name: 'عميل 01',
    phone: '+962 78 987 6543',
    email: 'ahmad@gmail.com',
    request_count: 3,
    last_request_at: new Date(Date.now() - 60 * 60_000).toISOString(),
  },
]

export const previewProducts: DashboardProductListItem[] = Array.from({ length: 8 }).map(
  (_, index) => ({
    id: `preview-product-${index + 1}`,
    name_ar: `منتج ${String(index + 1).padStart(2, '0')}`,
    slug: `product-${String(index + 1).padStart(2, '0')}`,
    sku: `SKU-${String(index + 1).padStart(3, '0')}`,
    status: 'ACTIVE',
    availability: index === 3 || index === 7 ? 'UNAVAILABLE' : 'AVAILABLE',
    channel: 'BOTH',
    base_price_jod: [25, 35, 22, 28, 40, 18, 30, 20][index],
    public_visible: true,
    sort_order: index + 1,
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60_000).toISOString(),
    category_id: `preview-category-${(index % 3) + 1}`,
    category_name: `فئة ${String((index % 3) + 1).padStart(2, '0')}`,
  }),
)

export function previewRequestDetail(id: string): DashboardRequestDetail {
  const row = previewRequests.find((request) => request.id === id) ?? previewRequests[0]
  const b2b = row.customer_type === 'B2B'
  return {
    role: previewRole,
    request: {
      ...row,
      customer_name_snapshot: b2b ? 'مستخدم 03' : row.customer_label,
      company_name_snapshot: b2b ? row.customer_label : null,
      contact_name_snapshot: b2b ? 'مستخدم 03' : null,
      customer_phone_snapshot: '+962 7X XXX XXXX',
      customer_email_snapshot: 'email@example.com',
      delivery_address: 'عنوان التوصيل',
      location_notes: 'يرجى الاتصال قبل التوصيل بنصف ساعة.',
      preferred_date: '2026-09-18',
      preferred_time: '16:00',
      general_notes: 'يرجى الاتصال قبل التوصيل بنصف ساعة للتأكيد من التواجد.',
      final_total_jod: row.total_jod,
      estimated_subtotal: row.total_jod,
      discount_amount_jod: 0,
      payment_method: b2b ? 'B2B_MONTHLY_ACCOUNT' : null,
    },
    customer: {
      id: b2b ? 'preview-customer-b2b' : 'preview-customer-b2c',
      customer_type: row.customer_type,
      name: b2b ? 'مستخدم 03' : row.customer_label,
      company_name: b2b ? row.customer_label : null,
      phone: '+962 7X XXX XXXX',
      email: 'email@example.com',
    },
    possibleCustomers: [],
    items: [
      {
        id: 'preview-item-1',
        product_name_snapshot: 'منتج 01',
        quantity: b2b ? 2 : 10,
        unit_label_snapshot: 'وحدة 01',
        observed_base_price_jod: 20,
        discount_amount_jod: 0,
        final_line_total_jod: b2b ? 40 : 200,
        customization_label_snapshot: ['خيار 01'],
      },
      {
        id: 'preview-item-2',
        product_name_snapshot: 'منتج 02',
        quantity: b2b ? 3 : 5,
        unit_label_snapshot: 'وحدة 02',
        observed_base_price_jod: 20,
        discount_amount_jod: 0,
        final_line_total_jod: b2b ? 60 : 100,
        customization_label_snapshot: [],
      },
    ],
    notes: [
      {
        id: 'preview-note-1',
        body: 'ملاحظة داخلية على الطلب',
        created_at: new Date().toISOString(),
      },
    ],
    activity: [
      {
        id: 'preview-activity-1',
        description: 'تم إنشاء الطلب',
        created_at: row.submitted_at,
      },
    ],
  }
}

export function previewCustomerDetail(id: string): DashboardCustomerDetail {
  const customer = previewCustomers.find((item) => item.id === id) ?? previewCustomers[0]
  return {
    role: previewRole,
    customer,
    stats: {
      total: customer.request_count,
      completed: Math.max(customer.request_count - 4, 0),
      active: Math.min(3, customer.request_count),
      cancelled: customer.request_count > 3 ? 1 : 0,
    },
    requests: previewRequests.slice(0, 5),
    notes: [
      {
        id: 'preview-customer-note',
        body: 'يفضل التواصل قبل موعد التسليم.',
        created_at: new Date().toISOString(),
      },
    ],
  }
}

export function previewProductDetail(id: string): DashboardProductDetail {
  const product =
    previewProducts.find((item) => item.id === id) ?? previewProducts[0]
  return {
    role: previewRole,
    product: {
      ...product,
      short_description_ar: 'وصف مختصر للمنتج',
      internal_notes: 'ملاحظات داخلية على المنتج',
    },
    images: [],
    categories: [
      { id: 'preview-category-1', name_ar: 'فئة 01' },
      { id: 'preview-category-2', name_ar: 'فئة 02' },
      { id: 'preview-category-3', name_ar: 'فئة 03' },
    ],
    units: [
      {
        id: 'preview-unit-1',
        label_ar: 'وحدة 01',
        channel: 'BOTH',
        is_active: true,
        description_ar: 'وصف وحدة 01',
        sort_order: 1,
      },
      {
        id: 'preview-unit-2',
        label_ar: 'وحدة 02',
        channel: 'BOTH',
        is_active: true,
        description_ar: 'وصف وحدة 02',
        sort_order: 2,
      },
    ],
    customization: [
      {
        id: 'preview-field-1',
        label_ar: 'اختيار 01',
        field_type: 'single',
        is_required: true,
        is_active: true,
        sort_order: 1,
        options: [
          { id: 'preview-option-1', label_ar: 'خيار 01', is_active: true, sort_order: 1 },
          { id: 'preview-option-2', label_ar: 'خيار 02', is_active: true, sort_order: 2 },
        ],
      },
      {
        id: 'preview-field-2',
        label_ar: 'تفاصيل إضافية',
        field_type: 'text',
        is_required: false,
        is_active: true,
        sort_order: 2,
        options: [],
      },
    ],
  }
}
