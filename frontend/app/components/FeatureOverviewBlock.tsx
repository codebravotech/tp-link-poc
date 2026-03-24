'use client'

interface Column {
  _key?: string
  title?: string
  description?: string | null
  image?: {url?: string | null; alt?: string | null} | null
  icon?: {url?: string | null; alt?: string | null} | null
}

interface FeatureOverviewBlockProps {
  data: {
    title?: string | null
    columns?: Column[] | null
  }
}

function FeatureColumn({column}: {column: Column}) {
  const {image, icon, title, description} = column
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full overflow-hidden rounded-lg bg-slate-100">
        {image?.url ? (
          <img src={image.url} alt={image.alt ?? ''} className="h-auto w-full object-cover" />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-4 py-2">
        {icon?.url && (
          <div className="mt-4 flex justify-center">
            <img src={icon.url} alt={icon.alt ?? ''} className="h-12 w-12 object-contain" />
          </div>
        )}
        {title && <h3 className="mt-3 text-lg font-bold text-slate-900">{title}</h3>}
      </div>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
  )
}

export default function FeatureOverviewBlock({data}: FeatureOverviewBlockProps) {
  const {title, columns} = data
  if (!columns?.length) return null

  return (
    <section className="w-full px-8">
      {title && (
        <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:auto-cols-fr md:grid-flow-col md:grid-cols-[none]">
        {columns.map((column) => (
          <FeatureColumn key={column._key ?? column.title} column={column} />
        ))}
      </div>
    </section>
  )
}
