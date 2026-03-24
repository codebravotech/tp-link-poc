'use client'

import {useRouter} from 'next/navigation'
import {stegaClean} from 'next-sanity'

interface VersionSwitcherProps {
  options: {
    key: string
    versionSlug: string
    label: string
    isDefault: boolean
  }[]
  currentVersionSlug: string | null
  locale: string
  model: string
}

export function VersionSwitcher({
  options,
  currentVersionSlug,
  locale,
  model,
}: VersionSwitcherProps) {
  const router = useRouter()

  if (!options?.length) return null

  const handleChange = (versionSlug: string) => {
    const base = `/${locale}/products/${model}`
    const selected = options.find((v) => v.versionSlug === versionSlug)

    const href = selected?.isDefault ? base : `${base}/${stegaClean(versionSlug)}`
    router.push(href)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="version-select" className="text-sm font-medium text-slate-700">
        Version
      </label>
      <select
        id="version-select"
        value={currentVersionSlug ?? ''}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        {options.map((opt) => (
          <option key={opt.key} value={opt.versionSlug}>
            {opt.label}
            {opt.isDefault ? ' (default)' : ''}
          </option>
        ))}
      </select>
    </div>
  )
}
