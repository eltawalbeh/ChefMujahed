import { Link } from 'react-router-dom'
import PublicHeader from '@/components/public/PublicHeader'
import PublicFooter from '@/components/public/PublicFooter'
import { useSitePage } from '@/hooks/useSitePage'

export default function AboutPage() {
  const content = useSitePage<any>('about')
  return <div className="min-h-screen bg-[var(--color-bg)]"><PublicHeader/><main>
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"><div className="mx-auto grid max-w-[1100px] gap-8 px-4 py-16 text-right md:px-16 md:py-24 lg:grid-cols-[1fr_0.55fr]" dir="ltr">{content.heroImageUrl?<img src={content.heroImageUrl} alt="" className="h-[320px] w-full rounded-[28px] object-cover"/>:<div className="hidden rounded-[28px] bg-[var(--color-text-muted)] lg:block"/>}<div dir="rtl"><p className="text-xs font-semibold text-[var(--color-accent)]">{content.eyebrow}</p><h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{content.title}</h1><p className="mt-6 text-base leading-8 text-[var(--color-text-muted)]">{content.intro}</p></div></div></section>
    <section className="mx-auto max-w-[1100px] px-4 py-14 md:px-16 md:py-20"><div className="grid gap-5 md:grid-cols-3">{(content.cards??[]).map((card:any,index:number)=><article key={index} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-right"><h2 className="font-bold">{card.title}</h2><p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--color-text-muted)]">{card.body||'سيتم إضافة التفاصيل المعتمدة هنا.'}</p></article>)}</div><div className="mt-10 text-right"><Link to="/products" className="inline-flex rounded-xl bg-[var(--color-text)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)]">استكشف قائمتنا</Link></div></section>
  </main><PublicFooter/></div>
}
