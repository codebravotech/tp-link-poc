import {defineField, defineType} from 'sanity'

export const legacyMigration = defineType({
  name: 'legacyMigration',
  title: 'Legacy Migration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'externalAssets',
      title: 'External Assets',
      type: 'array',
      of: [
        defineField({
          name: 'assetUrl',
          title: 'Asset URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'bodyHtml',
      title: 'Body HTML',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legacyClassName',
      title: 'Legacy Wrapper Class',
      type: 'string',
    }),
  ],
})
