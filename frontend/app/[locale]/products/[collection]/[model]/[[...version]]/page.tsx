import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {localizedProductPageQuery} from '@/sanity/lib/queries'
import {isValidLocale} from '@/sanity/lib/locale'
import ProductHeroCarousel from '@/app/components/Carousel/ProductHero'
import {VersionSwitcher} from '@/app/components/VersionSwitcher'
import {productComponentMap} from '@/app/lib/productComponentMap'

interface ProductPageProps {
  params: Promise<{
    locale: string
    collection: string
    model: string
    version?: string[]
  }>
}

function getActiveEntry(
  entries: any[],
  versionSegments: string[] | undefined,
): {activeEntry: any; defaultEntry: any; currentVersionName: string | null} {
  if (!entries.length) {
    return {activeEntry: null, defaultEntry: null, currentVersionName: null}
  }

  const defaultEntry = entries.find((e: any) => e.isDefault) ?? entries[0]
  const requestedVersionName =
    versionSegments && versionSegments[0] ? decodeURIComponent(versionSegments[0]) : null

  if (!requestedVersionName) {
    return {
      activeEntry: defaultEntry,
      defaultEntry,
      currentVersionName: defaultEntry.product?.versions?.versionName ?? null,
    }
  }

  const matchingEntry =
    entries.find((entry: any) => entry.product?.versions?.versionName === requestedVersionName) ??
    null

  const activeEntry = matchingEntry ?? defaultEntry
  return {
    activeEntry,
    defaultEntry,
    currentVersionName: activeEntry.product?.versions?.versionName ?? null,
  }
}

export default async function LocalizedProductPage({params}: ProductPageProps) {
  const {locale, collection, model, version: versionSegments} = await params
  if (!isValidLocale(locale)) notFound()

  const {data: productPage} = await sanityFetch({
    query: localizedProductPageQuery,
    params: {locale, model},
  })

  if (!productPage || !(productPage as any).products?.length) {
    notFound()
  }

  const entries = (productPage as any).products ?? []
  const {activeEntry, defaultEntry, currentVersionName} = getActiveEntry(entries, versionSegments)

  const effectiveEntry =
    activeEntry?.product ? activeEntry : defaultEntry?.product ? defaultEntry : null

  if (!effectiveEntry?.product) notFound()

  const product = effectiveEntry.product
  const components = (productPage as any).components ?? []

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10">
      <article>
        <div className="grid gap-16 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg">
            {product.images?.length ? (
              <ProductHeroCarousel images={product.images} />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No image
              </div>
            )}
          </div>
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              {product.modelNumber && (
                <p className="text-sm font-medium text-slate-500">{product.modelNumber}</p>
              )}
              {entries.length > 1 && (
                <VersionSwitcher
                  options={entries
                    .filter((entry: any) => entry.product?.versions?.versionName)
                    .map((entry: any) => ({
                      key: entry._key,
                      versionName: entry.product!.versions!.versionName,
                      label:
                        entry.product!.versions!.description ??
                        entry.product!.versions!.versionName,
                      isDefault: entry.isDefault,
                    }))}
                  currentVersionName={currentVersionName}
                  locale={locale}
                  collection={collection}
                  model={model}
                />
              )}
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              {product.name ?? product.modelNumber ?? 'Product'}
            </h1>
            {product.features && product.features.length > 0 && (
              <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
                {product.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}
            {product.links && product.links.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4">
                {product.links.map((link: any, i: number) => (
                  <li key={i}>
                    <a
                      href={link.url ?? '#'}
                      className="text-green-600 underline hover:text-green-700"
                    >
                      {link.label ?? 'Link'}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {components.length > 0 && (
          <div className="mt-16 space-y-16 border-t border-slate-200 pt-16">
            {components.map((block: any) => {
              const Component = productComponentMap[block._type]
              if (Component) {
                return <Component key={block._id} data={block} />
              }
              return null
            })}
          </div>
        )}
      </article>
    </div>
  )
}
