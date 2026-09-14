import type {
  B2BCompanyDraft,
  B2CCustomerDraft,
  CustomerType,
} from '@/types/request'

export type CanonicalCustomerIdentity = {
  customerType: CustomerType
  displayName: string
  name?: string
  companyName?: string
  contactName?: string
  phone: string
  normalizedPhone: string
  email?: string
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, '')
}

export function normalizeEmail(value?: string) {
  const email = value?.trim().toLowerCase()
  return email || undefined
}

export function normalizeExactName(value?: string) {
  const name = value?.trim().replace(/\s+/g, ' ').toLowerCase()
  return name || undefined
}

export function toB2CCustomerIdentity(
  customer: B2CCustomerDraft,
): CanonicalCustomerIdentity {
  return {
    customerType: 'B2C',
    displayName: customer.name.trim(),
    name: customer.name.trim(),
    phone: customer.phone.trim(),
    normalizedPhone: normalizePhone(customer.phone),
    email: normalizeEmail(customer.email),
  }
}

export function toB2BCustomerIdentity(
  company: B2BCompanyDraft,
): CanonicalCustomerIdentity {
  return {
    customerType: 'B2B',
    displayName: company.companyName.trim(),
    companyName: company.companyName.trim(),
    contactName: company.contactName.trim(),
    phone: company.phone.trim(),
    normalizedPhone: normalizePhone(company.phone),
    email: normalizeEmail(company.email),
  }
}
