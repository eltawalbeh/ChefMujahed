import { supabase } from '@/lib/supabase'
import { defaultSiteContent, defaultSiteContentEn, type SitePageKey } from '@/content/defaultSiteContent'

export type SiteLocale = 'ar' | 'en'

export async function getPublicSitePage<T extends Record<string, any>>(
  pageKey: SitePageKey,
  locale: SiteLocale = 'ar',
): Promise<T> {
  const fallback = locale === 'en' ? defaultSiteContentEn[pageKey] : defaultSiteContent[pageKey]
  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout fetching site page content')), 1200)
    )
    const { data, error } = await Promise.race([
      supabase.rpc('get_public_site_page_locale', {
        p_page_key: pageKey,
        p_locale: locale,
      }),
      timeout,
    ])
    if (error) return fallback as T
    const remote = (data as any)?.content
    const safeRemote = remote && typeof remote === 'object' ? Object.fromEntries(Object.entries(remote).filter(([, value]) => value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0))) : {}
    return { ...fallback, ...safeRemote } as T
  } catch {
    return fallback as T
  }
}
