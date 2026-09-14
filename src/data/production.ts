import { supabase } from '@/lib/supabase'
import { toBackendError } from '@/lib/backendError'
import type {
  ProductionQueueResult,
  ProductionSession,
  ProductionSessionInfo,
  ProductionView,
} from '@/types/production'

async function rpc<T>(name: string, params: Record<string, unknown> = {}) {
  const { data, error } = await supabase.rpc(name, params)
  if (error) throw toBackendError(error, 'تعذر إكمال عملية الإنتاج حالياً.')
  return data as T
}

export function productionLogin(pin: string, deviceKey: string) {
  return rpc<ProductionSession>('production_login', {
    p_pin: pin,
    p_device_key: deviceKey,
  })
}

export function getProductionSession(token: string) {
  return rpc<ProductionSessionInfo>('production_session_info', { p_token: token })
}

export function getProductionQueue(token: string, view: ProductionView) {
  return rpc<ProductionQueueResult>('production_queue', {
    p_token: token,
    p_view: view,
  })
}

export function updateProductionStatus(
  token: string,
  requestId: string,
  targetStatus: 'PREPARING' | 'READY',
  expectedStatus: 'APPROVED' | 'PREPARING',
) {
  return rpc<{ id: string; status: string; updated: true }>('production_update_status', {
    p_token: token,
    p_request_id: requestId,
    p_target_status: targetStatus,
    p_expected_status: expectedStatus,
  })
}

export function productionLogout(token: string) {
  return rpc<{ loggedOut: true }>('production_logout', { p_token: token })
}
