import { useCallback, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import BrandLogo from '@/components/public/BrandLogo'
import Button from '@/components/ui/Button'
import { useProduction } from '@/state/ProductionContext'

const digits = ['1','2','3','4','5','6','7','8','9','مسح','0','⌫']

export default function ProductionLoginPage() {
  const { session, loading, login } = useProduction()
  const [pin, setPin] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const press = useCallback((value: string) => {
    if (busy) return
    setError('')
    if (value === 'مسح') return setPin('')
    if (value === '⌫') return setPin((current) => current.slice(0,-1))
    if (/^[0-9]$/.test(value)) setPin((current) => current.length < 6 ? current + value : current)
  }, [busy])

  const applyPastedPin = useCallback((value: string) => {
    if (busy) return
    const digitsOnly = value.replace(/\D/g, '').slice(0, 6)
    if (!digitsOnly) return
    setError('')
    setPin(digitsOnly)
  }, [busy])

  const submit = useCallback(async () => {
    if (busy) return
    if (pin.length !== 6) { setError('أدخل رمز PIN المكوّن من 6 أرقام.'); return }
    try {
      setBusy(true); setError('')
      await login(pin)
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      if (message.includes('PRODUCTION_RATE_LIMITED')) setError('تم إيقاف المحاولات مؤقتاً بسبب تكرار الرموز غير الصحيحة.')
      else if (message.includes('PRODUCTION_PIN_REVOKED')) setError('تم إلغاء هذا الرمز. اطلب رمزاً جديداً من الإدارة.')
      else if (message.includes('PRODUCTION_PIN_INCORRECT')) setError('رمز PIN غير صحيح.')
      else setError('تعذر تسجيل الدخول إلى شاشة الإنتاج حالياً.')
      setPin('')
    } finally { setBusy(false) }
  }, [busy, login, pin])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) { event.preventDefault(); press(event.key); return }
      if (event.key === 'Backspace') { event.preventDefault(); press('⌫'); return }
      if (event.key === 'Delete' || event.key === 'Escape') { event.preventDefault(); press('مسح'); return }
      if (event.key === 'Enter' && pin.length === 6) { event.preventDefault(); void submit() }
    }
    const onPaste = (event: ClipboardEvent) => {
      const text = event.clipboardData?.getData('text') ?? ''
      const digitsOnly = text.replace(/\D/g, '').slice(0, 6)
      if (!digitsOnly) return
      event.preventDefault()
      applyPastedPin(digitsOnly)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('paste', onPaste)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('paste', onPaste)
    }
  }, [applyPastedPin, pin.length, press, submit])

  if (!loading && session) return <Navigate to="/kitchen/queue" replace />

  return <div className="grid min-h-screen place-items-center px-4 py-8"><section className="w-full max-w-[520px] rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_20px_60px_rgba(29,23,20,.08)] md:p-9">
    <div className="text-center"><BrandLogo className="justify-center"/><span className="mt-5 inline-flex rounded-full bg-[var(--color-bg)] px-4 py-2 text-xs font-bold text-[var(--color-text-muted)]">Pastry Production Display</span><h1 className="mt-5 text-3xl font-bold">دخول المطبخ</h1><p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">أدخل رمز PIN الخاص بمحطة الإنتاج. لا تشارك الرمز خارج فريق الإنتاج.</p></div>
    <div className="mx-auto mt-7 flex h-16 max-w-[300px] cursor-text items-center justify-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]" dir="ltr" title="يمكنك كتابة الرمز من لوحة الأرقام أو لصقه مباشرة">{Array.from({length:6}).map((_,i)=><span key={i} className={`size-3 rounded-full ${i<pin.length?'bg-[var(--color-text)]':'border border-[var(--color-border)] bg-[var(--color-surface)]'}`}/>)}</div>
    <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">يمكنك استخدام لوحة الأرقام في الكيبورد، Backspace، Enter، أو لصق رمز PIN مباشرة.</p>
    {error ? <div className="mt-4 rounded-xl bg-[#FFF1F1] p-3 text-center text-sm font-semibold text-[#9B2C2C]">{error}</div> : null}
    <div className="mx-auto mt-6 grid max-w-[330px] grid-cols-3 gap-3" dir="ltr">{digits.map((digit)=><button key={digit} type="button" onClick={()=>press(digit)} className="min-h-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xl font-bold active:scale-[.98]">{digit}</button>)}</div>
    <Button size="lg" className="mt-6 min-h-14 w-full text-base" onClick={() => void submit()} disabled={busy || pin.length!==6}>{busy?'جاري التحقق...':'دخول'}</Button>
    <p className="mt-5 text-center text-xs leading-6 text-[var(--color-text-muted)]">هذه الشاشة تعرض بيانات الإنتاج المعتمدة فقط ولا تعرض الأسعار أو معلومات الدفع أو بيانات العملاء الحساسة.</p>
  </section></div>
}
