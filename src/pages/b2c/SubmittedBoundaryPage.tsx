import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import BrandLogo from '@/components/public/BrandLogo'
import PublicFooter from '@/components/public/PublicFooter'
import Button from '@/components/ui/Button'
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  copyText,
  type WhatsAppHandoffPayload,
} from '@/lib/whatsapp'
import type {
  B2CCustomerDraft,
  FulfillmentDraft,
  RequestItem,
} from '@/types/request'

type SubmissionState = {
  requestId?: string
  reference?: string
  duplicate?: boolean
  estimatedSubtotal?: number
  customer?: B2CCustomerDraft
  fulfillment?: FulfillmentDraft
  generalNotes?: string
  items?: RequestItem[]
}

type WhatsAppState = 'idle' | 'opened' | 'failed' | 'copied' | 'offline'

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1.2 1.2-4A8 8 0 1 1 20 11.5Z" />
      <path d="M8.5 8.5c.4 2.8 2.2 4.6 5 5" />
    </svg>
  )
}

export default function SubmittedBoundaryPage() {
  const { reference = '' } = useParams()
  const location = useLocation()
  const [whatsAppState, setWhatsAppState] = useState<WhatsAppState>('idle')

  const submission = useMemo<SubmissionState>(() => {
    const routeState = location.state as SubmissionState | null
    if (routeState?.reference) return routeState

    try {
      const stored = window.sessionStorage.getItem(
        `chef-mujahed:submitted:${reference}`,
      )
      return stored ? (JSON.parse(stored) as SubmissionState) : {}
    } catch {
      return {}
    }
  }, [location.state, reference])

  const handoff: WhatsAppHandoffPayload = {
    reference,
    customer: submission.customer,
    fulfillment: submission.fulfillment,
    generalNotes: submission.generalNotes,
    items: submission.items,
  }

  const message = buildWhatsAppMessage(handoff)

  const openWhatsApp = () => {
    if (!navigator.onLine) {
      setWhatsAppState('offline')
      return
    }

    const popup = window.open(
      buildWhatsAppUrl(message),
      '_blank',
      'noopener,noreferrer',
    )

    setWhatsAppState(popup ? 'opened' : 'failed')
  }

  const copyFallback = async () => {
    try {
      await copyText(message)
      setWhatsAppState('copied')
    } catch {
      setWhatsAppState('failed')
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      <header className="hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] md:block">
        <div dir="ltr" className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-16">
          <Link to="/contact" className="text-sm font-medium text-[var(--color-text-muted)]">
            تواصل معنا
          </Link>

          <nav dir="rtl" className="flex items-center gap-8 text-sm">
            <Link to="/" className="text-[var(--color-text-muted)]">الرئيسية</Link>
            <Link to="/products" className="relative font-bold text-[var(--color-text)]">
              قائمتنا
              <span className="absolute -bottom-2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--color-accent)]" />
            </Link>
            <Link to="/business" className="text-[var(--color-text-muted)]">للشركات</Link>
          </nav>

          <div dir="rtl">
            <BrandLogo />
          </div>
        </div>
      </header>

      <main className="mx-auto grid min-h-[709px] max-w-[1440px] place-items-center px-5 py-5 md:min-h-[903px] md:px-16 md:py-16">
        <section className="w-full max-w-[600px] bg-[var(--color-surface)] text-center md:rounded-[20px] md:border md:border-[var(--color-border)] md:p-10 md:shadow-[0_10px_20px_rgba(0,0,0,.04)]">
          <div className="mx-auto grid size-[72px] place-items-center rounded-full bg-[#E8F5E9] text-[#26A661] md:size-20">
            <svg width="36" height="32" viewBox="0 0 36 32" fill="none" aria-hidden="true">
              <path d="M7 16.5 14.5 24 29 8.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="mt-4 text-[24px] font-bold text-[var(--color-text)] md:text-[28px]">
            تم تسجيل طلبك بنجاح
          </h1>

          {submission.duplicate ? (
            <div role="status" className="mt-5 rounded-xl border border-[var(--color-accent)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
              تم التحقق من الطلب السابق ومنع إنشاء نسخة مكررة. يمكنك متابعة نفس الرقم المرجعي.
            </div>
          ) : null}

          <div className="mt-6 rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-bg)] p-4 md:mt-8 md:p-5">
            <p className="text-sm text-[var(--color-text-muted)]">رقم المرجع الخاص بك</p>
            <p dir="ltr" className="mt-1 text-[22px] font-bold text-[var(--color-text)] md:text-2xl">
              {reference}
            </p>
          </div>

          <p className="mt-6 text-sm leading-7 text-[var(--color-text-muted)] md:mt-8 md:text-base">
            تم استلام طلبك المبدئي بنجاح وسيتم مراجعته والتواصل معك لتأكيد موعد التحضير وموقع التسليم النهائي.
          </p>

          <div className="my-6 border-t border-[var(--color-border)] md:my-8" />

          <div className="rounded-xl border border-[var(--color-border)] bg-white p-4 text-right md:p-6">
            <p className="text-[15px] font-semibold leading-6 text-[var(--color-text)]">
              أرسل الرسالة الجاهزة عبر واتساب لمتابعة وتأكيد طلبك مباشرة مع الشيف.
            </p>

            <button
              type="button"
              onClick={openWhatsApp}
              className="mt-4 inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#26A661] px-6 text-base font-semibold text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26A661] focus-visible:ring-offset-2"
            >
              <WhatsAppIcon />
              متابعة الطلب عبر واتساب
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[var(--color-text-muted)] md:text-[13px]">
              سيتم فتح تطبيق واتساب ومعه رسالة مجهزة بتفاصيل طلبك، يرجى إرسالها دون تعديل.
            </p>

            {whatsAppState === 'opened' ? (
              <div role="status" className="mt-4 rounded-lg bg-[#E8F5E9] px-3 py-2 text-center text-xs text-[#507047]">
                تم فتح واتساب. يرجى إرسال الرسالة يدوياً لإكمال المتابعة.
              </div>
            ) : null}

            {whatsAppState === 'offline' || whatsAppState === 'failed' ? (
              <div role="alert" className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-center">
                <p className="text-xs leading-5 text-[var(--color-text-muted)]">
                  {whatsAppState === 'offline'
                    ? 'لا يوجد اتصال بالإنترنت حالياً. يمكنك نسخ الرسالة وإرسالها لاحقاً.'
                    : 'تعذر فتح واتساب تلقائياً. يمكنك نسخ الرسالة الجاهزة وإرسالها يدوياً.'}
                </p>
                <Button variant="secondary" size="sm" className="mt-3" onClick={() => void copyFallback()}>
                  نسخ الرسالة
                </Button>
              </div>
            ) : null}

            {whatsAppState === 'copied' ? (
              <div role="status" className="mt-4 rounded-lg bg-[var(--color-bg)] px-3 py-2 text-center text-xs text-[var(--color-text-muted)]">
                تم نسخ الرسالة.
              </div>
            ) : null}
          </div>

          <Link
            to="/"
            className="mt-7 inline-block text-sm font-semibold text-[var(--color-text-muted)] underline underline-offset-4 md:text-base"
          >
            العودة للرئيسية وتصفح المزيد
          </Link>
        </section>
      </main>

      <div className="hidden md:block">
        <PublicFooter />
      </div>
    </div>
  )
}