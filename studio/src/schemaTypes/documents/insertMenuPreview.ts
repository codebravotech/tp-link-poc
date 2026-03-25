import {defineArrayMember, defineField, defineType} from 'sanity'

const optionsMap = {
  highlightsHero: {
    title: 'Highlights Hero',
    value: 'highlightsHero',
  },
  iconOverview: {
    title: 'Icon Overview',
    value: 'iconOverview',
  },
  contentImageBlock: {
    title: 'Content Image Block',
    value: 'contentImageBlock',
  },
  featureOverviewBlock: {
    title: 'Feature Overview Block',
    value: 'featureOverviewBlock',
  },
  legacyMigration: {
    title: 'Legacy Migration',
    value: 'legacyMigration',
  },
}

export const insertMenuPreview = defineType({
  name: 'insertMenuPreview',
  title: 'Insert Menu Preview',
  type: 'document',
  fields: [
    defineField({
      name: 'previews',
      title: 'Component Previews',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',

          preview: {
            prepare({component, image}) {
              return {
                title: optionsMap[component as keyof typeof optionsMap]?.title || component,
                media: image,
              }
            },
            select: {
              component: 'component',
              image: 'image',
            },
          },
          fields: [
            defineField({
              name: 'component',
              title: 'Component',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: Object.values(optionsMap),
              },
            }),
            defineField({
              name: 'image',
              title: 'Preview Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
})
