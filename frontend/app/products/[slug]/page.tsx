import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {productBySlugQuery, productPageBySlugQuery} from '@/sanity/lib/queries'
import ProductHeroCarousel from '@/app/components/Carousel/ProductHero'
import {productComponentMap} from '@/app/lib/productComponentMap'

interface ProductPageProps {
  params: Promise<{slug: string}>
}

export default async function ProductPage({params}: ProductPageProps) {
  const {slug} = await params

  const {data: productPage} = await sanityFetch({
    query: productPageBySlugQuery,
    params: {slug},
  })

  const product =
    (productPage as any)?.defaultProduct ??
    ((productPage as any)?.products?.find((p: any) => p.isDefault)?.product ??
      (productPage as any)?.products?.[0]?.product) ??
    null

  const fallbackProduct = product
    ? null
    : (await sanityFetch({query: productBySlugQuery, params: {slug}})).data

  const displayProduct = product ?? fallbackProduct
  if (!displayProduct) notFound()

  const components = (productPage as any)?.components ?? []

  return (
    <div className="mx-auto max-w-7xl py-10">
      <article>
        <div className="grid gap-16 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
            {displayProduct.images?.length ? (
              <ProductHeroCarousel images={displayProduct.images} />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No image
              </div>
            )}
          </div>
          <div>
            {displayProduct.modelNumber && (
              <p className="text-sm font-medium text-slate-500">{displayProduct.modelNumber}</p>
            )}
            <h1 className="text-3xl font-bold text-slate-900">
              {displayProduct.name ?? displayProduct.modelNumber ?? 'Product'}
            </h1>
            {displayProduct.features && displayProduct.features.length > 0 && (
              <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
                {displayProduct.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}
            {displayProduct.links && displayProduct.links.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4">
                {displayProduct.links.map((link: any, i: number) => (
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
