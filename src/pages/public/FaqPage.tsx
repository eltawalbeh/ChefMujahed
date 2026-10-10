import PublicHeader from '@/components/public/PublicHeader'
import PublicFooter from '@/components/public/PublicFooter'
import { useSitePage } from '@/hooks/useSitePage'

export default function FaqPage() {
  const content = useSitePage<any>('faq')
  return <div className="min-h-screen bg-[var(--color-bg)]"><PublicHeader/><main className="mx-auto max-w-[980px] px-4 py-14 md:px-16 md:py-20"><div className="text-right"><p className="text-xs font-semibold text-[var(--color-accent)]">{content.eyebrow}</p><h1 className="mt-3 text-4xl font-bold">{content.title}</h1>{content.intro?<p className="mt-4 text-sm text-[var(--color-text-muted)]">{content.intro}</p>:null}</div><div className="mt-10 space-y-3">{(content.items??[]).map((item:any,index:number)=><details key={index} className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-right"><summary className="cursor-pointer list-none font-bold">{item.question}</summary><p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--color-text-muted)]">{item.answer||'سيتم تحديث الإجابة قريباً.'}</p></details>)}</div></main><PublicFooter/></div>
}
