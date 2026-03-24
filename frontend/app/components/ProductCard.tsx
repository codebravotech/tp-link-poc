import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import {client} from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  if (!source?.asset) return null
  return builder.image(source)
}

interface ProductCardProps {
  id: string
  title: string
  image: any
  slug: string | null
  locale: string
}

export function ProductCard({id, title, image, slug, locale}: ProductCardProps) {
  const src = urlFor(image)?.width(400).height(400).url() ?? null

  return (
    <Link
      href={`/${locale}/products/${slug ?? id}`}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square bg-slate-100">
        {src ? (
          <Image
            src={src}
            alt={title}
            width={400}
            height={400}
            className="h-full w-full object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-slate-900 group-hover:underline">{title}</h2>
      </div>
    </Link>
  )
}
