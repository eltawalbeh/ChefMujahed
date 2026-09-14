import { paths } from '@/domain/paths'
import {
  PAYMENT_METHODS,
  PAYMENT_STATUSES,
  REQUEST_SOURCES,
  REQUEST_STATUSES,
} from '@/domain/constants'

export const integrationQaContract = {
  routeRoots: [paths.b2c.home, paths.b2b.home, paths.dashboard.home],
  requestStatuses: REQUEST_STATUSES,
  paymentStatuses: PAYMENT_STATUSES,
  paymentMethods: PAYMENT_METHODS,
  requestSources: REQUEST_SOURCES,
  invariants: [
    'B2C and B2B use the same RequestItem shape.',
    'B2B never renders public pricing.',
    'B2C observed price is display-only before approval.',
    'Dashboard status/payment values match database constraints.',
    'WhatsApp handoff is explicit and manual after a successful save.',
    'Request submission is not order confirmation.',
    'Delivery requires an address.',
    'Public users have no login.',
  ],
} as const
