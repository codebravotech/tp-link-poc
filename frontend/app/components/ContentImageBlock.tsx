'use client'

import {PortableText} from '@portabletext/react'

interface ContentImageBlockProps {
  data: {
    title?: string | null
    description?: any[] | null
    image?: {url?: string | null; alt?: string | null} | null
    imagePosition?: string | null
  }
}

function normalizePosition(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'value' in value) {
    return String((value as {value: unknown}).value)
  }
  return String(value)
}

export default function ContentImageBlock({data}: ContentImageBlockProps) {
  const {title, description, image, imagePosition} = data
  const position = normalizePosition(imagePosition)
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .toLowerCase()
    .trim()
  const imageOnLeft = position === 'left'

  return (
    <section className="grid gap-6 px-8 md:grid-cols-2 md:items-center md:gap-10">
      <div
        className={
          imageOnLeft ? 'md:row-start-1 md:col-start-2' : 'md:row-start-1 md:col-start-1'
        }
      >
        {title && <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>}
        {description && description.length > 0 && (
          <div className="mt-4 text-slate-700 [&>p]:mb-3 [&>p:last-child]:mb-0">
            <PortableText value={description} />
          </div>
        )}
      </div>
      <div
        className={
          imageOnLeft ? 'md:row-start-1 md:col-start-1' : 'md:row-start-1 md:col-start-2'
        }
      >
        {image?.url ? (
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img src={image.url} alt={image.alt ?? ''} className="h-auto w-full object-cover" />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            No image
          </div>
        )}
      </div>
    </section>
  )
}
