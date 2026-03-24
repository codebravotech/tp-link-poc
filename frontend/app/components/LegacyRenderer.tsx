import Script from 'next/script'

interface LegacyRendererProps {
  data: {
    externalAssets?: string[] | null
    bodyHtml: string
    legacyClassName?: string | null
  }
}

export function LegacyRenderer({data}: LegacyRendererProps) {
  const assets = (data.externalAssets ?? []).map((a) => (typeof a === 'string' ? a : '')).filter(Boolean)

  const cssAssets = assets.filter((url) => url.toLowerCase().endsWith('.css'))
  const jsAssets = assets.filter((url) => url.toLowerCase().endsWith('.js'))

  return (
    <>
      {cssAssets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      {jsAssets.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
      <div className="overview-content">
        <div
          className={data.legacyClassName ?? undefined}
          dangerouslySetInnerHTML={{__html: data.bodyHtml}}
        />
      </div>
    </>
  )
}
