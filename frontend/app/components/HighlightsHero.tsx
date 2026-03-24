'use client'

interface HighlightsHeroProps {
  data: {
    title?: string | null
    description?: string | null
    modelNumber?: string | null
    bgDesktopImage?: {url?: string | null; alt?: string | null} | null
    bgMobileImage?: {url?: string | null; alt?: string | null} | null
  }
}

export default function HighlightsHero({data}: HighlightsHeroProps) {
  const {title, description, modelNumber, bgDesktopImage, bgMobileImage} = data

  const desktopSrc = bgDesktopImage?.url ?? undefined
  const mobileSrc = bgMobileImage?.url ?? desktopSrc
  const alt = bgDesktopImage?.alt ?? bgMobileImage?.alt ?? title ?? modelNumber ?? ''

  if (!mobileSrc && !desktopSrc) return null

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <picture className="absolute inset-0 h-full w-full">
        {desktopSrc && <source srcSet={desktopSrc} media="(min-width: 768px)" />}
        {mobileSrc && (
          <img src={mobileSrc} alt={alt} className="h-full w-full object-cover" />
        )}
      </picture>
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-start px-8 py-12 md:min-h-[580px] md:px-24 md:py-16">
        <div className="max-w-xl space-y-4">
          {title && (
            <h2 className="text-4xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-slate-100/90 md:text-base">{description}</p>
          )}
          {modelNumber && (
            <span className="inline-flex items-center rounded-lg border border-white/40 bg-transparent px-4 py-1 text-lg font-semibold uppercase tracking-wide">
              {modelNumber}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
