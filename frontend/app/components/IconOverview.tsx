'use client'

interface IconData {
  _id: string
  title?: string | null
  iconImageUrl?: string | null
  iconImageAlt?: string | null
}

interface IconOverviewProps {
  data: {
    title?: string | null
    icons?: IconData[] | null
  }
}

function IconItem({icon}: {icon: IconData}) {
  const src = icon.iconImageUrl ?? undefined
  const alt = icon.iconImageAlt ?? icon.title ?? ''

  return (
    <div className="mx-auto flex w-28 flex-col items-center gap-3 text-center md:mx-0">
      {src ? (
        <img src={src} alt={alt} className="h-10 w-10 object-contain" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400">
          {icon.title?.[0] ?? '—'}
        </div>
      )}
      {icon.title && <p className="text-sm font-medium text-slate-800">{icon.title}</p>}
    </div>
  )
}

export default function IconOverview({data}: IconOverviewProps) {
  const {icons} = data
  if (!icons?.length) return null

  return (
    <section className="w-full px-8">
      <div className="mx-auto grid grid-cols-2 items-start justify-center gap-x-10 gap-y-8 text-center md:max-w-5xl md:grid-cols-4 md:gap-y-10">
        {icons.map((icon) => (
          <IconItem key={icon._id} icon={icon} />
        ))}
      </div>
    </section>
  )
}
