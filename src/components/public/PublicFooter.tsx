import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { useSitePage } from '@/hooks/useSitePage'

export default function PublicFooter() {
  const content = useSitePage<any>('footer')
  return <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"><div className="mx-auto max-w-[1440px] px-4 py-10 md:px-16 md:py-14"><div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]"><div className="text-right"><BrandLogo compact/><p className="mt-4 max-w-sm text-sm leading-7 text-[var(--color-text-muted)]">{content.description}</p></div><div className="text-right"><h2 className="text-sm font-bold">استكشف</h2><div className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]"><Link className="block" to="/">الرئيسية</Link><Link className="block" to="/products">قائمتنا</Link><Link className="block" to="/business">للشركات</Link><Link className="block" to="/about">عن الشيف مجاهد</Link></div></div><div className="text-right"><h2 className="text-sm font-bold">مساعدة ومعلومات</h2><div className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]"><Link className="block" to="/contact">تواصل معنا</Link><Link className="block" to="/faq">الأسئلة الشائعة</Link><Link className="block" to="/privacy">سياسة الخصوصية</Link><Link className="block" to="/terms">الشروط والأحكام</Link></div></div></div><div className="mt-9 border-t border-[var(--color-border)] pt-5 text-center text-xs text-[var(--color-text-muted)] md:text-right">{content.copyright}</div></div></footer>
}
