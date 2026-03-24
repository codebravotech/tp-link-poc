import type {ComponentType} from 'react'
import ContentImageBlock from '@/app/components/ContentImageBlock'
import FeatureOverviewBlock from '@/app/components/FeatureOverviewBlock'
import HighlightsHero from '@/app/components/HighlightsHero'
import IconOverview from '@/app/components/IconOverview'
import {LegacyRenderer} from '@/app/components/LegacyRenderer'

export const productComponentMap: Record<string, ComponentType<{data: any}>> = {
  contentImageBlock: ContentImageBlock,
  featureOverviewBlock: FeatureOverviewBlock,
  highlightsHero: HighlightsHero,
  iconOverview: IconOverview,
  legacyMigration: LegacyRenderer as ComponentType<{data: any}>,
}
