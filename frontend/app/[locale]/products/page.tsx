import {notFound} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {collectionsByLocaleQuery} from '@/sanity/lib/queries'
import {isValidLocale, LOCALES} from '@/sanity/lib/locale'

interface AllCollectionsPageProps {
  params: Promise<{locale: string}>
}

export default async function AllCollectionsPage({params}: AllCollectionsPageProps) {
  const {locale} = await params
  if (!isValidLocale(locale)) notFound()

  const {data: collections} = await sanityFetch({
    query: collectionsByLocaleQuery,
    params: {locale},
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">Locale Options:</h1>
      <div className="mb-16 flex gap-4">
        {LOCALES.map(({value, title}) => (
          <Link
            key={value}
            href={`/${value}/products`}
            className={`min-w-[200px] rounded-md border px-8 py-4 text-center hover:bg-slate-100 ${
              locale === value ? 'border-slate-400 bg-slate-200' : 'border-slate-200'
            }`}
          >
            {title}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Product Collections</h1>
      <p className="mt-1 text-slate-600">Browse by collection. Locale: {locale}.</p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections?.map((collection: any) => {
          const slug = collection.slug ?? undefined
          const href = slug ? `/${locale}/collections/${slug}` : '#'
          return (
            <li key={collection._id}>
              <Link
                href={href}
                className="block overflow-hidden rounded-xl border border-slate-200 transition hover:border-green-600 hover:shadow-lg"
              >
                {collection.image?.assetUrl ? (
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                      src={collection.image.assetUrl}
                      alt={collection.image.alt ?? collection.title ?? 'Collection'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-slate-100 text-slate-400">
                    No image
                  </div>
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-slate-900">
                    {collection.title ?? 'Untitled collection'}
                  </h2>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      {(!collections || collections.length === 0) && (
        <p className="mt-10 text-slate-500">No collections for this locale yet.</p>
      )}
    </div>
  )
}
