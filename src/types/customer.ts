import type { B2BCompanyDraft, B2CCustomerDraft } from '@/types/request'

export type B2CCustomer = B2CCustomerDraft & {
  type: 'B2C'
}

export type B2BCustomer = B2BCompanyDraft & {
  type: 'B2B'
}

export type Customer = B2CCustomer | B2BCustomer
