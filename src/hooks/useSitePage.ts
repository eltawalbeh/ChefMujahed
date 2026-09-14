import { useEffect, useState } from 'react'
import { defaultSiteContent, defaultSiteContentEn, type SitePageKey } from '@/content/defaultSiteContent'
import { getPublicSitePage, type SiteLocale } from '@/data/content'

const cache = new Map<string, Record<string, any>>()

export function useSitePage<T extends Record<string, any>>(pageKey: SitePageKey, locale: SiteLocale = 'ar') {
  const cacheKey = `${locale}:${pageKey}`
  const fallback = locale === 'en' ? defaultSiteContentEn[pageKey] : defaultSiteContent[pageKey]
  const [content, setContent] = useState<T>(() => (cache.get(cacheKey) ?? fallback) as T)

  useEffect(() => {
    let active = true
    void getPublicSitePage<T>(pageKey, locale).then((result) => {
      cache.set(cacheKey, result)
      if (active) setContent(result)
    })
    return () => { active = false }
  }, [pageKey, locale, cacheKey])

  return content
}
