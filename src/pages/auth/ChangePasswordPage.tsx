import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '@/components/public/BrandLogo'
import Button from '@/components/ui/Button'
import { dashboardChangePassword, dashboardSignOut } from '@/data/auth'
import { supabase } from '@/lib/supabase'

export default function ChangePasswordPage() {
  const navigate = useNavigate()
  const [sessionState, setSessionState] = useState<'checking' | 'ready' | 'missing'>('checking')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const ensureSession = useCallback(async () => {
    setSessionState('checking')
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      setSessionState('ready')
      return true
    }

    const { data: refreshed } = await supabase.auth.refreshSession()
    if (refreshed.session) {
      setSessionState('ready')
      return true
    }

    setSessionState('missing')
    return false
  }, [])

  useEffect(() => {
    void ensureSession()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') setSessionState('missing')
      else if (session) setSessionState('ready')
    })
    return () => data.subscription.unsubscribe()
  }, [ensureSession])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (password.length < 8) return setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل.')
    if (password !== confirm) return setError('كلمتا المرور غير متطابقتين.')

    try {
      setBusy(true)
      setError('')
      const validSession = await ensureSession()
      if (!validSession) {
        setError('انتهت جلسة تسجيل الدخول. سجّل الدخول مرة أخرى ثم غيّر كلمة المرور.')
        return
      }
      await dashboardChangePassword(password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'تعذر تحديث كلمة المرور.'
      setError(message)
      if (/session|جلسة|auth/i.test(message)) setSessionState('missing')
    } finally {
      setBusy(false)
    }
  }

  if (sessionState === 'checking') {
    return <main dir="rtl" className="grid min-h-screen place-items-center bg-[var(--color-bg)] px-4 text-[var(--color-text-muted)]">جاري التحقق من الجلسة...</main>
  }

  if (sessionState === 'missing') {
    return (
      <main dir="rtl" className="grid min-h-screen place-items-center bg-[var(--color-bg)] px-4 py-10">
        <section className="w-full max-w-[460px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center md:p-9">
          <BrandLogo className="justify-center"/>
          <h1 className="mt-6 text-2xl font-bold">انتهت جلسة تسجيل الدخول</h1>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">سجّل الدخول بكلمة المرور المؤقتة مرة أخرى، وسيعيدك النظام مباشرة إلى خطوة تغيير كلمة المرور.</p>
          <Button size="lg" className="mt-6 w-full" onClick={() => navigate('/dashboard/login', { replace: true })}>العودة إلى تسجيل الدخول</Button>
        </section>
      </main>
    )
  }

  return (
    <main dir="rtl" className="grid min-h-screen place-items-center bg-[var(--color-bg)] px-4 py-10">
      <section className="w-full max-w-[460px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-9">
        <div className="text-center"><BrandLogo className="justify-center"/><h1 className="mt-6 text-2xl font-bold">تغيير كلمة المرور</h1><p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">يجب تغيير كلمة المرور المؤقتة قبل استخدام لوحة التحكم.</p></div>
        <form className="mt-7 space-y-4" onSubmit={submit}>
          <PasswordInput label="كلمة المرور الجديدة" value={password} onChange={setPassword} visible={showPassword} onToggle={()=>setShowPassword(value=>!value)} />
          <PasswordInput label="تأكيد كلمة المرور" value={confirm} onChange={setConfirm} visible={showConfirm} onToggle={()=>setShowConfirm(value=>!value)} />
          {error ? <div role="alert" className="rounded-xl bg-[#FFF1F1] p-3 text-center text-sm font-semibold text-[#9B2C2C]">{error}</div> : null}
          <Button size="lg" className="w-full" type="submit" disabled={busy}>{busy?'جاري الحفظ...':'حفظ كلمة المرور والمتابعة'}</Button>
        </form>
        <button className="mt-5 w-full text-sm text-[var(--color-text-muted)] underline" onClick={() => void dashboardSignOut().then(()=>navigate('/dashboard/login',{replace:true}))}>تسجيل الخروج</button>
      </section>
    </main>
  )
}

function PasswordInput({ label, value, onChange, visible, onToggle }: { label: string; value: string; onChange: (value: string) => void; visible: boolean; onToggle: () => void }) {
  return <label className="block text-right"><span className="mb-1.5 block text-sm font-semibold">{label}</span><div className="relative" dir="ltr"><input type={visible?'text':'password'} autoComplete="new-password" value={value} onChange={(e)=>onChange(e.target.value)} className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 pr-12 text-left outline-none focus:border-[var(--color-accent)]"/><button type="button" onClick={onToggle} className="absolute inset-y-0 right-2 my-auto h-9 rounded-lg px-2 text-xs font-semibold text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]" aria-label={visible?'إخفاء كلمة المرور':'إظهار كلمة المرور'}>{visible?'إخفاء':'إظهار'}</button></div></label>
}
