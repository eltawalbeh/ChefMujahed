import { Link } from 'react-router-dom'
import PublicHeader from '@/components/public/PublicHeader'
import PublicFooter from '@/components/public/PublicFooter'
import { useSitePage } from '@/hooks/useSitePage'

export default function ContactPage() {
  const content = useSitePage<any>('contact')
  const items = [['واتساب',content.whatsapp],['الهاتف',content.phone],['العنوان',content.address],['ساعات العمل',content.workingHours]]
  return <div className="min-h-screen bg-[var(--color-bg)]"><PublicHeader/><main className="mx-auto max-w-[1100px] px-4 py-14 md:px-16 md:py-20"><div className="max-w-2xl text-right"><p className="text-xs font-semibold text-[var(--color-accent)]">{content.eyebrow}</p><h1 className="mt-3 text-4xl font-bold">{content.title}</h1><p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{content.intro}</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2">{items.map(([label,value])=><article key={label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-right"><p className="text-xs text-[var(--color-text-muted)]">{label}</p><p className="mt-2 font-semibold">{value||'سيتم التحديث قريباً'}</p></article>)}</div><div className="mt-8 flex flex-wrap justify-end gap-3"><Link to="/products" className="rounded-xl bg-[var(--color-text)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)]">ابدأ طلباً</Link><Link to="/faq" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold">الأسئلة الشائعة</Link></div></main><PublicFooter/></div>
}
