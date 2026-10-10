import PublicHeader from '@/components/public/PublicHeader'
import PublicFooter from '@/components/public/PublicFooter'
import { useSitePage } from '@/hooks/useSitePage'

export default function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const content = useSitePage<any>(type)
  return <div className="min-h-screen bg-[var(--color-bg)]"><PublicHeader/><main className="mx-auto max-w-[900px] px-4 py-14 md:px-16 md:py-20"><p className="text-xs font-semibold text-[var(--color-accent)]">معلومات قانونية</p><h1 className="mt-3 text-4xl font-bold">{content.title}</h1><div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-right"><p className="whitespace-pre-line text-sm leading-8 text-[var(--color-text-muted)]">{content.body||'سيتم إضافة النص القانوني المعتمد هنا.'}</p></div></main><PublicFooter/></div>
}
