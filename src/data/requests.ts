import { supabase } from '@/lib/supabase'
import { toBackendError } from '@/lib/backendError'
import {
  buildCanonicalB2BDraft,
  buildCanonicalB2CDraft,
  toPublicSubmissionItems,
  validateCanonicalDraft,
} from '@/domain/request'
import type {
  B2BCompanyDraft,
  B2BSubmissionResult,
  B2CCustomerDraft,
  B2CSubmissionResult,
  FulfillmentDraft,
  RequestItem,
} from '@/types/request'

type SubmitB2CRequestInput = {
  clientSubmissionId: string
  customer: B2CCustomerDraft
  fulfillment: FulfillmentDraft
  generalNotes: string
  items: RequestItem[]
}

type SubmitB2BRequestInput = {
  clientSubmissionId: string
  company: B2BCompanyDraft
  fulfillment: FulfillmentDraft
  generalNotes: string
  items: RequestItem[]
}

export async function submitB2CRequest(
  input: SubmitB2CRequestInput,
): Promise<B2CSubmissionResult> {
  const draft = buildCanonicalB2CDraft(input)
  validateCanonicalDraft(draft)

  const payload = {
    clientSubmissionId: draft.clientSubmissionId,
    customer: draft.customer,
    fulfillment: draft.fulfillment,
    generalNotes: draft.generalNotes ?? '',
    items: toPublicSubmissionItems(draft.items).map(({ customUnit: _customUnit, ...item }) => item),
  }

  const { data, error } = await supabase.rpc('submit_b2c_request', { payload })
  if (error) throw toBackendError(error, 'تعذر تسجيل الطلب. حاول مرة أخرى.')
  if (!data || typeof data !== 'object') throw new Error('Invalid submission response')

  const result = data as Record<string, unknown>
  return {
    id: String(result.id ?? ''),
    reference: String(result.reference ?? ''),
    duplicate: Boolean(result.duplicate),
    estimatedSubtotal: Number(result.estimatedSubtotal ?? 0),
    status: 'NEW',
  }
}

export async function submitB2BRequest(
  input: SubmitB2BRequestInput,
): Promise<B2BSubmissionResult> {
  const draft = buildCanonicalB2BDraft(input)
  validateCanonicalDraft(draft)

  const payload = {
    clientSubmissionId: draft.clientSubmissionId,
    company: draft.company,
    fulfillment: draft.fulfillment,
    generalNotes: draft.generalNotes ?? '',
    items: toPublicSubmissionItems(draft.items),
  }

  const { data, error } = await supabase.rpc('submit_b2b_request', { payload })
  if (error) throw toBackendError(error, 'تعذر تسجيل الطلب. حاول مرة أخرى.')
  if (!data || typeof data !== 'object') throw new Error('Invalid submission response')

  const result = data as Record<string, unknown>
  return {
    id: String(result.id ?? ''),
    reference: String(result.reference ?? ''),
    duplicate: Boolean(result.duplicate),
    status: 'NEW',
  }
}
