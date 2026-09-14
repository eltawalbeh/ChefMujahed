import type { CustomerType, FulfillmentType, RequestStatus } from '@/types/request'

export type ProductionView = 'ACTIVE' | 'READY' | 'COMPLETED'

export type ProductionItem = {
  id: string
  productName: string
  quantity: number
  unitLabel: string
  customization: Array<Record<string, unknown>>
  notes?: string | null
}

export type ProductionRequestCard = {
  id: string
  reference: string
  customerType: CustomerType
  customerLabel: string
  fulfillmentType: FulfillmentType
  preferredDate?: string | null
  preferredTime?: string | null
  status: Extract<RequestStatus, 'APPROVED' | 'PREPARING' | 'READY' | 'COMPLETED'>
  priority?: string | null
  assignedEmployee?: string | null
  readyAt?: string | null
  items: ProductionItem[]
}

export type ProductionQueueResult = {
  view: ProductionView
  items: ProductionRequestCard[]
  count: number
}

export type ProductionSession = {
  token: string
  expiresAt: string
  stationName: string
}

export type ProductionSessionInfo = {
  valid: true
  expiresAt: string
  stationName: string
}
