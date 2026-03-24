import {notFound} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {collectionBySlugQuery, localizedProductsByCollectionQuery} from '@/sanity/lib/queries'
import {isValidLocale, LOCALES} from '@/sanity/lib/locale'

interface CollectionPageProps {
  params: Promise<{locale: string; slug: string}>
}

export default async function CollectionPage({params}: CollectionPageProps) {
  const {locale, slug: collectionSlug} = await params
  if (!isValidLocale(locale)) notFound()

  const {data: products} = await sanityFetch({
    query: localizedProductsByCollectionQuery,
    params: {locale, collectionSlug},
  })
  const {data: collectionData} = await sanityFetch({
    query: collectionBySlugQuery,
    params: {locale, collectionSlug},
  })
  const {title} = collectionData ?? {}
  const localeTitle = LOCALES?.find(({value}) => value === locale)?.title ?? locale

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Collection: {title}</h1>
      <p className="mt-1 text-slate-600">
        Locale: {localeTitle}. {products?.length ?? 0} product
        {(products?.length ?? 0) > 1 ? 's' : ''}.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product: any) => (
          <li key={product._id}>
            <Link
              href={`/${locale}/products/${product.slug ?? ''}`}
              className="block rounded-lg border border-slate-200 p-4 transition hover:border-green-600 hover:shadow-md"
            >
              {product.images?.[0]?.assetUrl && (
                <Image
                  src={product.images[0].assetUrl}
                  alt={product.images[0].alt ?? product.name ?? ''}
                  width={400}
                  height={400}
                  className="aspect-square w-full rounded object-cover"
                />
              )}
              <p className="mt-2 font-medium text-slate-900">
                {product.name ?? product.modelNumber ?? product.slug ?? 'Product'}
              </p>
              {product.modelNumber && (
                <p className="text-sm text-slate-500">{product.modelNumber}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {(!products || products.length === 0) && (
        <p className="mt-8 text-slate-500">No products in this collection for this locale.</p>
      )}
    </div>
  )
}
