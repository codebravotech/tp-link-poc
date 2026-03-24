import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'
import {headers} from 'next/headers'
import {DEFAULT_LOCALE} from '@/sanity/lib/locale'

function resolveUrl(domain: string, entry: {_type: string; slug: string | null; language: string | null}) {
  const locale = entry.language || DEFAULT_LOCALE
  switch (entry._type) {
    case 'page':
      return `${domain}/${locale}/${entry.slug}`
    case 'productPage':
      return `${domain}/${locale}/products/${entry.slug}`
    case 'collection':
      return `${domain}/${locale}/collections/${entry.slug}`
    default:
      return null
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPages = await sanityFetch({
    query: sitemapData,
  })
  const headersList = await headers()
  const sitemap: MetadataRoute.Sitemap = []
  const host = headersList.get('host') as string
  const domain = host.startsWith('http') ? host : `https://${host}`
  sitemap.push({
    url: domain,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  })

  if (allPages?.data?.length) {
    for (const p of allPages.data) {
      const url = resolveUrl(domain, p)
      if (!url) continue
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority: 0.8,
        changeFrequency: 'monthly',
        url,
      })
    }
  }

  return sitemap
}
