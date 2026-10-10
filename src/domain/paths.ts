export const paths = {
  b2c: {
    home: '/',
    product: (slug: string) => `/product/${encodeURIComponent(slug)}`,
    details: '/request/details',
    review: '/request/review',
    submitted: (reference: string) => `/request/submitted/${encodeURIComponent(reference)}`,
  },
  b2b: {
    home: '/business',
    product: (slug: string) => `/business/product/${encodeURIComponent(slug)}`,
    company: '/business/request/company',
    fulfillment: '/business/request/fulfillment',
    review: '/business/request/review',
    submitted: (reference: string) => `/business/request/submitted/${encodeURIComponent(reference)}`,
  },
  dashboard: {
    home: '/dashboard',
    requests: '/dashboard/requests',
    request: (id: string) => `/dashboard/requests/${encodeURIComponent(id)}`,
    customers: '/dashboard/customers',
    customer: (id: string) => `/dashboard/customers/${encodeURIComponent(id)}`,
    products: '/dashboard/products',
    productEdit: (id: string) => `/dashboard/products/${encodeURIComponent(id)}/edit`,
  },
} as const
