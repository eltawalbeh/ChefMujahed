import { supabase } from '@/lib/supabase'
import { toBackendError } from '@/lib/backendError'
import type {
  DashboardAccessProfile,
  DashboardRole,
  DashboardUserAdminResult,
  DashboardUserListResponse,
  DashboardUserStatus,
} from '@/types/dashboard'

export async function dashboardSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
  if (error || !data.session) throw toBackendError(error, 'تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.')

  const { data: access, error: accessError } = await supabase.rpc('dashboard_my_access')
  if (accessError || !access) {
    await supabase.auth.signOut()
    throw new Error('هذا الحساب غير مصرح له بالدخول إلى لوحة التحكم.')
  }

  await supabase.rpc('dashboard_touch_login')
  return access as DashboardAccessProfile
}

export async function dashboardSignOut() {
  await supabase.auth.signOut()
}

export async function dashboardChangePassword(password: string) {
  let { data: sessionData } = await supabase.auth.getSession()

  if (!sessionData.session) {
    const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession()
    if (refreshError || !refreshed.session) {
      throw new Error('انتهت جلسة تسجيل الدخول. سجّل الدخول مرة أخرى ثم غيّر كلمة المرور.')
    }
    sessionData = refreshed
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw toBackendError(error, 'تعذر تحديث كلمة المرور.')

  const { error: markError } = await supabase.rpc('dashboard_mark_password_changed')
  if (markError) throw toBackendError(markError, 'تم تحديث كلمة المرور لكن تعذر تحديث حالة الحساب.')
}

export async function listDashboardUsers(filters: { q?: string; role?: string; status?: string } = {}) {
  const { data, error } = await supabase.rpc('dashboard_list_users', { payload: filters })
  if (error) throw toBackendError(error, 'تعذر تحميل المستخدمين.')
  return data as DashboardUserListResponse
}

export async function updateDashboardUserRole(userId: string, role: DashboardRole) {
  const { data, error } = await supabase.rpc('dashboard_update_user_role', {
    p_user_id: userId,
    p_role: role,
  })
  if (error) throw toBackendError(error, 'تعذر تحديث صلاحية المستخدم.')
  return data
}

export async function updateDashboardUserStatus(userId: string, status: DashboardUserStatus) {
  const { data, error } = await supabase.rpc('dashboard_update_user_status', {
    p_user_id: userId,
    p_status: status,
  })
  if (error) throw toBackendError(error, 'تعذر تحديث حالة المستخدم.')
  return data
}

async function invokeUserAdmin(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke('dashboard-user-admin', { body })
  if (error) throw new Error(error.message || 'تعذر تنفيذ عملية إدارة المستخدم.')
  if ((data as any)?.error) throw new Error(String((data as any).error))
  return data as DashboardUserAdminResult
}

export function createDashboardUser(input: { email: string; displayName: string; role: DashboardRole }) {
  return invokeUserAdmin({ action: 'create_user', ...input })
}

export function resetDashboardUserPassword(userId: string) {
  return invokeUserAdmin({ action: 'reset_password', userId })
}
