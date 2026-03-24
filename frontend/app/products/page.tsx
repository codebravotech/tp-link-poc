import {sanityFetch} from '@/sanity/lib/live'
import {productsQuery} from '@/sanity/lib/queries'
import {ProductCard} from '@/app/components/ProductCard'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const {data: products} = await sanityFetch({query: productsQuery})

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!products || products.length === 0 ? (
          <p className="col-span-full text-slate-500">No products yet.</p>
        ) : (
          products.map((product: any) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.modelNumber || product.name || 'Untitled'}
              image={product.images?.[0] ?? null}
              slug={product?.slug ?? null}
            />
          ))
        )}
      </div>
    </div>
  )
}
